const axios = require('axios');
const mongoose = require('mongoose');
const User = require('./src/models/User');
const AuditLog = require('./src/models/AuditLog');
require('dotenv').config({ path: './.env' }); // Load env variables

const API_URL = 'http://localhost:5001/api'; // Test Server Port
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/preventvital';
console.log('DEBUG: Using MONGO_URI:', MONGO_URI);

async function connectDB() {
    await mongoose.connect(MONGO_URI.replace('<PASSWORD>', process.env.DATABASE_PASSWORD));
    console.log('DB Connected for verification');
}

async function verify() {
    try {
        await connectDB();

        console.log('--- Starting Verification ---');

        // 1. Create Test Users
        const roles = ['super_admin', 'admin', 'corporate_admin', 'customer', 'content_creator'];
        const users = {};

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
                    corporateId: role === 'corporate_admin' ? new mongoose.Types.ObjectId() : undefined // Mock Corp ID
                });
                console.log(`Created user: ${role}`);
            } else if (role === 'corporate_admin' && !user.corporateId) {
                user.corporateId = new mongoose.Types.ObjectId();
                await user.save();
                console.log(`Updated user corporateId: ${role}`);
            }
            users[role] = user;
        }

        // 2. Test Auth & Session
        console.log('\n--- Testing Auth & Session ---');
        const tokens = {};
        for (const role of roles) {
            try {
                // Correct Path: /auth/login
                const res = await axios.post(`${API_URL}/auth/login`, {
                    email: `test_${role}@example.com`,
                    password: 'password123'
                });
                tokens[role] = res.data.token;
                console.log(`✅ Login Success: ${role}`);
            } catch (err) {
                // Log detailed error
                console.error(`❌ Login Failed: ${role}`, err.response?.data || err.message);
            }
        }

        // 3. Test RBAC: Admin Access vs Customer Access
        console.log('\n--- Testing RBAC: View Users ---');

        // Correct Path: /admin/users
        const adminUrl = `${API_URL}/admin/users`;

        const adminToken = tokens['admin'];
        const customerToken = tokens['customer'];

        if (adminToken) {
            try {
                await axios.get(adminUrl, {
                    headers: { Authorization: `Bearer ${adminToken}` }
                });
                console.log('✅ Admin accessed users list (Expected)');
            } catch (err) {
                console.error('❌ Admin failed to access users (Unexpected)', err.response?.status, err.response?.data);
            }
        } else {
            console.log('⚠️ Skipping Admin RBAC test (No Token)');
        }

        if (customerToken) {
            try {
                await axios.get(adminUrl, {
                    headers: { Authorization: `Bearer ${customerToken}` }
                });
                console.error('❌ Customer accessed users list (Unexpected Failure)');
            } catch (err) {
                console.log('✅ Customer denied users list (Expected)', err.response?.status);
            }
        } else {
            console.log('⚠️ Skipping Customer RBAC test (No Token)');
        }

        // 4. Test Privacy: Corp Admin Access
        console.log('\n--- Testing Privacy: Corp Admin ---');
        const corpToken = tokens['corporate_admin'];
        if (corpToken) {
            // Access /corporate/employees
            const url = `${API_URL}/corporate/employees`;
            try {
                const res = await axios.get(url, {
                    headers: { Authorization: `Bearer ${corpToken}` }
                });
                // Check if ANY employee has health data (vitals, etc)
                const hasHealthData = res.data.data.some(e => e.latestVitals || e.healthProfile);
                if (hasHealthData) {
                    console.error('❌ Privacy Fail: Corporate Admin receives health data!');
                } else {
                    console.log('✅ Privacy Pass: Corporate Admin receives stripped data.');
                }
            } catch (err) {
                console.error('❌ Corp Admin failed to access employees', err.response?.data || err.message);
            }
        } else {
            console.log('⚠️ Skipping Corp Privacy test (No Token)');
        }

        // 5. Test Audit Log
        console.log('\n--- Verifying Audit Logs ---');
        // We need a brief pause or check if we generated logs.
        // Login creates sessions, but does audit log?
        // Audit log middleware is on sensitive routes.
        // Did we hit any sensitive routes? 
        // Admin accessed /admin/users -> usually read-only, might not be audited by specific middleware unless configured.
        // Let's manually check DB for ANY logs.
        const logs = await AuditLog.find().sort({ timestamp: -1 }).limit(5);
        if (logs.length > 0) {
            console.log(`✅ Audit Logs found: ${logs.length}`);
            console.log('Last Log Action:', logs[0].action);
        } else {
            console.log('ℹ️ No Audit Logs found yet (Ensure middleware is attached to tested routes)');
        }

        console.log('\n--- Verification Complete ---');
        process.exit(0);
    } catch (err) {
        console.error('Verification Error:', err);
        process.exit(1);
    }
}

verify();
