const axios = require('axios');
const mongoose = require('mongoose');
const User = require('./src/models/User');
require('dotenv').config({ path: './.env' });

const API_URL = 'http://localhost:8080/api';

async function testSubscriptionFlow() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('DB Connected');

        // 1. Create/Get a User
        const email = 'test_sub_user@preventvital.com';
        const password = 'password123';

        // Clean up previous test user
        await User.deleteOne({ email });

        // Signup fresh
        console.log('Creating fresh user...');
        await axios.post(`${API_URL}/auth/signup`, {
            name: 'Test Sub User',
            email,
            password,
            passwordConfirm: password
        });

        // Login
        console.log('Logging in...');
        const loginRes = await axios.post(`${API_URL}/auth/login`, { email, password });
        const token = loginRes.data.token;
        console.log('✅ Login Successful. Token received.');

        // 2. Try creating a subscription
        console.log('Testing /api/subscriptions/create ...');
        const subRes = await axios.post(`${API_URL}/subscriptions/create`, {
            planId: 'silver',
            interval: 'monthly'
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log('✅ Subscription Create Response:', subRes.status);
        console.log('Data:', subRes.data);

    } catch (err) {
        console.error('❌ Error:', err.message);
        if (err.response) {
            console.error('Status:', err.response.status);
            console.error('Data:', err.response.data);
        }
    } finally {
        await mongoose.disconnect();
    }
}

testSubscriptionFlow();
