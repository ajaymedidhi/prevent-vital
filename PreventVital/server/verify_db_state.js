const mongoose = require('mongoose');
const User = require('./src/models/User');
require('dotenv').config({ path: './.env' });

async function verifyDb() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        // User ID from last failure log
        // UserID: 695bd3dabbc602a219f8dafc
        const id = '695bd3dabbc602a219f8dafc';

        // Wait, user says he just upgraded. Let's find by email to be sure we get the right one.
        // Assuming test_sub_user or the one he logged in with.
        // He logged in with johndoe@gmail.com which is seed data.
        const user = await User.findOne({ email: 'johndoe@gmail.com' });

        console.log('User Found:', user.email);
        console.log('Subscription:', JSON.stringify(user.subscription, null, 2));

    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
}

verifyDb();
