const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const config = require('../config/env');
const logger = require('../utils/logger');
const { eventBus, EVENTS } = require('../events/eventBus');

class EmailService {
    constructor() {
        this.transporter = null;
        this.initializeTransporter();
        this.registerEventListeners();
    }

    // ... (initializeTransporter and verifyConnection remain same)

    initializeTransporter() {
        logger.info(`Email Service: Initializing with Host: ${config.EMAIL_HOST}, Port: ${config.EMAIL_PORT}, User: ${config.EMAIL_USER ? '***' : 'Missing'}`);

        if (config.NODE_ENV === 'production' && !config.EMAIL_USER) {
            logger.warn('Email Service: Production credentials missing. Emails will not be sent.');
            return;
        }

        this.transporter = nodemailer.createTransport({
            host: config.EMAIL_HOST,
            port: config.EMAIL_PORT,
            secure: config.EMAIL_PORT === 465, // true for 465, false for other ports
            auth: {
                user: config.EMAIL_USER,
                pass: config.EMAIL_PASS
            }
        });

        this.verifyConnection();
    }

    async verifyConnection() {
        if (!this.transporter) return;
        try {
            await this.transporter.verify();
            logger.info('Email Service: Connected to SMTP server');
        } catch (error) {
            logger.error('Email Service: Connection failed', error);
        }
    }

    registerEventListeners() {
        eventBus.on(EVENTS.USER.REGISTERED, async (user) => {
            logger.info(`Event received: ${EVENTS.USER.REGISTERED} for ${user.email}`);
            await this.sendWelcomeEmail(user);
        });

        eventBus.on(EVENTS.USER.PASSWORD_RESET_REQUESTED, async ({ user, token }) => {
            logger.info(`Event received: ${EVENTS.USER.PASSWORD_RESET_REQUESTED} for ${user.email}`);
            await this.sendPasswordResetEmail(user, token);
        });

        eventBus.on(EVENTS.SHOP.ORDER_PLACED, async (order) => {
            logger.info(`Event received: ${EVENTS.SHOP.ORDER_PLACED} for order ${order.orderId}`);
            await this.sendOrderConfirmationEmail(order);
        });
    }

    // --- Helper to load and replace template variables ---
    async loadTemplate(templateName, variables) {
        try {
            const templatePath = path.join(__dirname, '../templates/emails', `${templateName}.html`);
            const basePath = path.join(__dirname, '../templates/emails/base.html');

            let content = await fs.promises.readFile(templatePath, 'utf8');
            let base = await fs.promises.readFile(basePath, 'utf8');

            // Replace variables in content
            Object.keys(variables).forEach(key => {
                const regex = new RegExp(`{{${key}}}`, 'g');
                content = content.replace(regex, variables[key]);
            });

            // Handle looped content (basic {{#items}}...{{/items}} logic for orders)
            // This is a very simple manual parser substitute for Handlebars
            if (variables.items && Array.isArray(variables.items)) {
                const listStart = '{{#items}}';
                const listEnd = '{{/items}}';
                const startIndex = content.indexOf(listStart);
                const endIndex = content.indexOf(listEnd);

                if (startIndex !== -1 && endIndex !== -1) {
                    const itemTemplate = content.substring(startIndex + listStart.length, endIndex);
                    const listHtml = variables.items.map(item => {
                        let itemHtml = itemTemplate;
                        Object.keys(item).forEach(k => {
                            const r = new RegExp(`{{${k}}}`, 'g');
                            itemHtml = itemHtml.replace(r, item[k]);
                        });
                        return itemHtml;
                    }).join('');

                    content = content.substring(0, startIndex) + listHtml + content.substring(endIndex + listEnd.length);
                }
            }

            // Inject content into base template
            const finalHtml = base.replace('{{CONTENT}}', content);
            return finalHtml;

        } catch (err) {
            logger.error(`Failed to load template ${templateName}:`, err);
            return `<p>Error loading template. Original message: ${JSON.stringify(variables)}</p>`;
        }
    }

    // --- Email Handlers ---

    async sendWelcomeEmail(user) {
        const html = await this.loadTemplate('customer/welcome', {
            name: user.name,
            loginLink: `${config.CLIENT_URL}/login`
        });

        await this.sendEmail({
            to: user.email,
            subject: 'Welcome to PreventVital',
            html,
            text: `Welcome, ${user.name}! Thank you for joining PreventVital.`
        });
    }

    async sendPasswordResetEmail(user, token) {
        const resetLink = `${config.CLIENT_URL}/reset-password?token=${token}`;
        const html = await this.loadTemplate('auth/reset-password', {
            name: user.name || user.email,
            resetLink
        });

        await this.sendEmail({
            to: user.email,
            subject: 'Reset Password Request',
            html,
            text: `Click here to reset your password: ${resetLink}`
        });
    }

    async sendOrderConfirmationEmail(order) {
        const recipient = order.user?.email || order.shippingAddress?.email;
        if (!recipient) return;

        const html = await this.loadTemplate('shop/order-confirmation', {
            name: order.user?.name || 'Customer',
            orderId: order.orderId,
            total: order.pricing.total,
            shippingAddress: order.shippingAddress ? `${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.postalCode}` : 'N/A',
            orderLink: `${config.CLIENT_URL}/account/orders`,
            items: order.items // Passed as array for list parser
        });

        await this.sendEmail({
            to: recipient,
            subject: `Order Confirmation #${order.orderId}`,
            html,
            text: `Order Confirmed. Order ID: ${order.orderId}. Total: ₹${order.pricing.total}`
        });
    }

    /**
     * Send an email
     * @param {Object} options
     * @param {string} options.to - Recipient email
     * @param {string} options.subject - Email subject
     * @param {string} options.html - HTML content
     * @param {string} options.text - Plain text content (fallback)
     */
    async sendEmail({ to, subject, html, text }) {
        if (!this.transporter) {
            logger.warn(`Email Service: Transporter not initialized. Dropping email to ${to}`);
            return;
        }

        logger.info(`Email Service: Attempting to send '${subject}' to ${to}`);

        const mailOptions = {
            from: config.EMAIL_FROM,
            to,
            subject,
            html,
            text
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            logger.info(`Email sent successfully: ${info.messageId} to ${to}`);
            return info;
        } catch (error) {
            logger.error(`Email sending failed to ${to}. Error: ${error.message}`, error);
            // We do not throw here to prevent crashing the event loop, just log error
        }
    }
}

// Singleton instance
module.exports = new EmailService();
