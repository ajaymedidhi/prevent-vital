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
const subscriptionRoutes = require('./routes/subscriptionRoutes');

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
app.use('/api/admin', adminRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/creator', creatorRoutes);
app.use('/api/corporate', corporateRoutes);

// Database Connection

// Export app for server.js
module.exports = app;
