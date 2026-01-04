const mongoose = require('mongoose');
const config = require('../config/env');
const User = require('../models/User');
const Order = require('../models/Order');
const Vital = require('../models/Vital');

async function verify() {
    try {
        await mongoose.connect(config.MONGODB_URI);
        console.log('Connected to DB');

        const users = await User.countDocuments();
        const orders = await Order.countDocuments();
        const vitals = await Vital.countDocuments();

        console.log('--- DB Verification ---');
        console.log(`Users: ${users}`);
        console.log(`Orders: ${orders}`);
        console.log(`Vitals: ${vitals}`);

        if (users === 0) {
            console.error('ERROR: No users found. Seed may have failed to persist or DB mismatch.');
        } else {
            console.log('SUCCESS: Data found.');
        }

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

verify();
