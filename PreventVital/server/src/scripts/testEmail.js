const path = require('path');
const dotenv = require('dotenv');

// Load env directly for this script
dotenv.config({ path: path.join(__dirname, '../../.env') });

const emailService = require('../services/email.service');

async function testEmail() {
    console.log('--- Starting Email Test ---');
    console.log('Environment:', {
        HOST: process.env.EMAIL_HOST,
        PORT: process.env.EMAIL_PORT,
        USER: process.env.EMAIL_USER ? '***' : 'MISSING',
        PASS: process.env.EMAIL_PASS ? '***' : 'MISSING'
    });

    try {
        console.log('Sending test email...');
        const result = await emailService.sendEmail({
            to: process.env.EMAIL_USER, // Send to self
            subject: 'PreventVital Test Email',
            html: '<h1>Success!</h1><p>Your email service is configured correctly.</p>',
            text: 'Success! Your email service is configured correctly.'
        });

        if (result) {
            console.log('✅ Email sent successfully!');
            console.log('Message ID:', result.messageId);
        } else {
            console.log('❌ Email failed to send (check logs above).');
        }
    } catch (err) {
        console.error('❌ Test Script Error:', err);
    }
}

testEmail();
