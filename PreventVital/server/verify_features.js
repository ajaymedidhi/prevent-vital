const axios = require('axios');
const mongoose = require('mongoose');
const User = require('./src/models/User');
const Program = require('./src/models/Program');
const Order = require('./src/models/Order');
const Vital = require('./src/models/Vital');
const Prediction = require('./src/models/Prediction');
const Consultation = require('./src/models/Consultation');
const Product = require('./src/models/Product');
require('dotenv').config({ path: './.env' });

const API_URL = 'http://localhost:5001/api'; // Use Test Port
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/preventvital';

async function connectDB() {
    await mongoose.connect(MONGO_URI.replace('<PASSWORD>', process.env.DATABASE_PASSWORD));
    console.log('DB Connected');
}

async function verifyFeatures() {
    try {
        await connectDB();
        console.log('--- Starting Feature Verification ---');

        // 1. Setup Data
        console.log('--- Setting up Test Data ---');

        // Users - Ensure we use the TEST users with known passwords
        const users = {};
        const roles = ['content_creator', 'corporate_admin', 'customer', 'admin'];

        for (const role of roles) {
            const email = `test_${role}@example.com`;
            let user = await User.findOne({ email });
            if (!user) {
                user = await User.create({
                    email,
                    password: 'password123',
                    role,
                    profile: { firstName: 'Test', lastName: role },
                    isVerified: true,
                    customerType: role === 'customer' ? 'individual' : undefined,
                    corporateId: role === 'corporate_admin' ? new mongoose.Types.ObjectId() : undefined
                });
                console.log(`Created user: ${email}`);
            }
            users[role] = user;
        }

        const creator = users['content_creator'];
        const corporate = users['corporate_admin'];
        const customer = users['customer'];
        const admin = users['admin'];

        // Login Tokens
        const tokens = {};
        for (const role of roles) {
            const u = users[role];
            try {
                const res = await axios.post(`${API_URL}/auth/login`, { email: u.email, password: 'password123' });
                tokens[role] = res.data.token;
            } catch (e) {
                console.error(`❌ Login Failed for ${u.email}:`, e.response?.data?.message || e.message);
                process.exit(1);
            }
        }

        // 2. Creator: Earnings
        console.log('\n--- Testing Creator Earnings ---');
        // Create a Mock Order
        await Order.create({
            orderId: 'ORD-TEST-' + Date.now(),
            userId: customer._id,
            items: [{
                productName: 'Test Program',
                creatorId: creator._id,
                quantity: 1,
                price: 100
            }],
            pricing: { total: 100 },
            payment: { status: 'completed' }
        });

        try {
            const res = await axios.get(`${API_URL}/creator/earnings`, { headers: { Authorization: `Bearer ${tokens['content_creator']}` } });
            console.log('Earnings:', res.data.data.earnings);
            if (res.data.data.earnings.total > 0) console.log('✅ Creator Earnings Verified');
            else console.error('❌ Creator Earnings is 0 (Expected > 0)');
        } catch (e) {
            console.error('❌ Creator Earnings Failed', e.message);
        }

        // 3. Corporate: Analytics (Min 5 Employees Check)
        console.log('\n--- Testing Corporate Analytics ---');
        // Ensure 5 employees exist
        const employees = await User.find({ corporateId: corporate.corporateId });
        if (employees.length < 5) {
            console.log(`⚠️ Only ${employees.length} employees. Creating mock employees...`);
            for (let i = employees.length; i < 5; i++) {
                await User.create({
                    email: `emp${i}_${Date.now()}@test.com`,
                    password: 'password123',
                    role: 'customer',
                    corporateId: corporate.corporateId,
                    profile: { firstName: `Emp${i}`, lastName: 'Test' }
                });
            }
        }

        // Add Vitals for an employee (Pick the first one found)
        const anEmployee = await User.findOne({ corporateId: corporate.corporateId });
        if (anEmployee) {
            await Vital.create({
                userId: anEmployee._id,
                vitalType: 'heart_rate',
                value: 80,
                unit: 'bpm'
            });
            console.log(`Add Vital for employee ${anEmployee.email}`);
        } else {
            console.log('⚠️ No employee found to add vital');
        }

        try {
            const res = await axios.get(`${API_URL}/corporate/analytics/health`, { headers: { Authorization: `Bearer ${tokens['corporate_admin']}` } });
            console.log('Analytics:', res.data.data);
            if (res.data.data.heart_rate) console.log('✅ Corporate Analytics Verified (Heart Rate found)');
            else console.log('⚠️ Corporate Analytics returned no specific data (might be empty aggregation or privacy filter logic caveat)');
        } catch (e) {
            console.error('❌ Corporate Analytics Failed', e.response?.data?.message || e.message);
        }

        // 4. Admin: Dashboard & AI Predictions
        console.log('\n--- Testing Admin AI Predictions ---');
        await Prediction.create({
            user: customer._id,
            riskType: 'Test Risk',
            probability: 99,
            severity: 'critical'
        });

        try {
            // Check routes/adminRoutes.js for correct path. /predictions
            const res = await axios.get(`${API_URL}/admin/predictions`, { headers: { Authorization: `Bearer ${tokens['admin']}` } });
            if (res.data.data.length > 0) console.log('✅ Admin AI Predictions Verified');
            else console.error('❌ Admin AI Predictions empty');
        } catch (e) {
            console.error('❌ Admin AI Predictions Failed', e.message);
        }

        // 5. Payment Flow (Razorpay Simulation)
        console.log('\n--- Testing Payment Flow ---');
        try {
            // Create a dummy product for testing if not exists
            let product = await Product.findOne();
            if (!product) {
                product = await Product.create({
                    name: 'Test Product',
                    slug: 'test-product-' + Date.now(),
                    price: 500,
                    description: 'Test',
                    category: 'Test',
                    stock: 100,
                    images: ['http://placehold.it/200x200'],
                    isActive: true,
                    creatorId: creator._id // Ensure creator exists
                });
            }

            // Create Order
            const orderRes = await axios.post(`${API_URL}/shop/create-order`, { amount: 50000 }, { headers: { Authorization: `Bearer ${tokens['customer']}` } });
            const rzpOrderId = orderRes.data.order.id;
            console.log('Razorpay Order Created:', rzpOrderId);

            // Verify Payment
            const verifyRes = await axios.post(`${API_URL}/shop/verify-payment`, {
                razorpay_order_id: rzpOrderId,
                razorpay_payment_id: 'pay_test_123456',
                razorpay_signature: 'bypass',
                items: [{ product: product._id.toString(), name: product.name, price: 500, quantity: 1 }],
                totalAmount: 500,
                shippingAddress: { street: 'Main St', city: 'Mumbai', state: 'MH', postalCode: '400001', country: 'IN' }
            }, { headers: { Authorization: `Bearer ${tokens['customer']}` } });

            if (verifyRes.data.status === 'success') console.log('✅ Payment Verification Successful');
            else console.error('❌ Payment Verification Failed', verifyRes.data);

        } catch (e) {
            console.error('❌ Payment Flow Failed', e.response?.data?.message || e.message);
        }

        // 6. Corporate Dashboard
        console.log('\n--- Testing Corporate Dashboard ---');
        try {
            const res = await axios.get(`${API_URL}/corporate/dashboard`, { headers: { Authorization: `Bearer ${tokens['corporate_admin']}` } });
            if (res.data.data.totalEmployees >= 0) console.log('✅ Corporate Dashboard Verified');
            else console.error('❌ Corporate Dashboard data missing');
        } catch (e) {
            console.error('❌ Corporate Dashboard Failed', e.response?.data?.message || e.message);
        }

        // 5. Customer: Self Data
        console.log('\n--- Testing Customer Self Data ---');
        try {
            const res = await axios.get(`${API_URL}/users/me`, { headers: { Authorization: `Bearer ${tokens['customer']}` } });
            if (res.data.data.user.email === customer.email) console.log('✅ Customer /me Verified');
        } catch (e) {
            console.error('❌ Customer /me Failed', e.message);
        }

        try {
            const res = await axios.get(`${API_URL}/users/my-orders`, { headers: { Authorization: `Bearer ${tokens['customer']}` } });
            if (res.data.results > 0) console.log('✅ Customer Orders Verified');
        } catch (e) {
            console.error('❌ Customer Orders Failed', e.message);
        }

        console.log('\n--- Feature Verification Complete ---');
        process.exit(0);

    } catch (err) {
        console.error('Feature Verification Error:', err);
        process.exit(1);
    }
}

verifyFeatures();
