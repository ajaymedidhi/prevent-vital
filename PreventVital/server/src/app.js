const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const shopRoutes = require('./routes/shopRoutes');
const creatorRoutes = require('./routes/creatorRoutes');
const corporateRoutes = require('./routes/corporateRoutes');
const contentRoutes = require('./routes/contentRoutes');

const subscriptionRoutes = require('./routes/subscriptionRoutes');
const vitalRoutes = require('./routes/vitalRoutes');

// Initialize Email Service (registers event listeners)
require('./services/email.service');

dotenv.config();

const app = express();

app.use(cors({
    origin: true, // Allow any origin for development
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'x-user-region']
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use(express.static('public')); // Serve static files like invoices

app.use('/api/auth', authRoutes);
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/super-admin', require('./routes/superAdminRoutes')); // New Super Admin Routes
app.use('/api/admin', adminRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/creator', creatorRoutes);
app.use('/api/corporate', corporateRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/vitals', vitalRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/programs', require('./routes/programRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

// Database Connection

// Export app for server.js
module.exports = app;
