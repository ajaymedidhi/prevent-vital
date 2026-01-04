const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/env');
const User = require('../models/User');
const Vital = require('../models/Vital');
const Order = require('../models/Order');
const logger = require('../utils/logger');
async function seedDatabase() {
    try {
        await mongoose.connect(config.MONGODB_URI);
        logger.info('Connected to MongoDB');
        // Clear existing data (BE CAREFUL IN PRODUCTION!)
        await User.deleteMany({});
        await Vital.deleteMany({});
        await Order.deleteMany({});
        logger.info('Cleared existing data');
        // Create Super Admin
        const superAdmin = await User.create({
            email: 'superadmin@gruentzig.ai',
            password: 'Admin@123456', // Will be hashed automatically
            role: 'super_admin',
            profile: {
                firstName: 'Super',
                lastName: 'Admin',
                gender: 'male'
            },
            status: 'active'
        });
        logger.info('✓ Super Admin created: superadmin@gruentzig.ai / Admin@123456');
        // Create Admin
        const admin = await User.create({
            email: 'admin@gruentzig.ai',
            password: 'Admin@123456',
            role: 'admin',
            profile: {
                firstName: 'Operations',
                lastName: 'Admin',
                gender: 'female'
            },
            status: 'active'
        });
        logger.info('✓ Admin created: admin@gruentzig.ai / Admin@123456');
        // Create Sample Customers
        const customer1 = await User.create({
            email: 'ramesh.kumar@example.com',
            password: 'User@123456',
            role: 'customer',
            profile: {
                firstName: 'Ramesh',
                lastName: 'Kumar',
                dateOfBirth: new Date('1978-05-15'),
                gender: 'male',
                phoneNumber: '+919876543210',
                height: 175,
                weight: 78,
                bmi: 25.5
            },
            healthProfile: {
                primaryConditions: ['hypertension', 'pre-diabetes'],
                smoker: false,
                totalCholesterol: 215
            },
            latestVitals: {
                heartRate: 76,
                bloodPressure: { systolic: 142, diastolic: 88 },
                glucose: 115,
                spo2: 97,
                lastUpdated: new Date()
            },
            subscription: {
                plan: 'gold',
                status: 'active'
            },
            gamification: {
                points: 2450,
                level: 3,
                streaks: { current: 12, longest: 28 }
            },
            status: 'active'
        });
        const customer2 = await User.create({
            email: 'priya.sharma@example.com',
            password: 'User@123456',
            role: 'customer',
            profile: {
                firstName: 'Priya',
                lastName: 'Sharma',
                dateOfBirth: new Date('1985-08-22'),
                gender: 'female',
                phoneNumber: '+919876543211',
                height: 162,
                weight: 65,
                bmi: 24.8
            },
            healthProfile: {
                primaryConditions: ['diabetes'],
                smoker: false,
                totalCholesterol: 198
            },
            latestVitals: {
                heartRate: 72,
                bloodPressure: { systolic: 128, diastolic: 82 },
                glucose: 145,
                spo2: 98,
                lastUpdated: new Date()
            },
            subscription: {
                plan: 'platinum',
                status: 'active'
            },
            gamification: {
                points: 5670,
                level: 6,
                streaks: { current: 45, longest: 60 }
            },
            status: 'active'
        });
        const customer3 = await User.create({
            email: 'anjali.reddy@example.com',
            password: 'User@123456',
            role: 'customer',
            profile: {
                firstName: 'Anjali',
                lastName: 'Reddy',
                dateOfBirth: new Date('1992-03-10'),
                gender: 'female',
                phoneNumber: '+919876543212',
                height: 168,
                weight: 58,
                bmi: 20.5
            },
            healthProfile: {
                primaryConditions: [],
                smoker: false,
                totalCholesterol: 175
            },
            latestVitals: {
                heartRate: 68,
                bloodPressure: { systolic: 118, diastolic: 75 },
                glucose: 92,
                spo2: 99,
                lastUpdated: new Date()
            },
            subscription: {
                plan: 'silver',
                status: 'active'
            },
            gamification: {
                points: 890,
                level: 1,
                streaks: { current: 3, longest: 7 }
            },
            status: 'active'
        });
        // Create Corporate Admin
        const corporateId = new mongoose.Types.ObjectId();
        const corporateAdmin = await User.create({
            email: 'corp.admin@techcorp.com',
            password: 'Corp@123456',
            role: 'corporate_admin',
            corporateId: corporateId,
            corporateProfile: {
                department: 'HR',
                employeeId: 'TC-001',
                designation: 'HR Manager',
                joiningDate: new Date('2023-01-15')
            },
            profile: {
                firstName: 'Corporate',
                lastName: 'Manager',
                gender: 'female'
            },
            status: 'active'
        });
        logger.info('✓ Corporate Admin created: corp.admin@techcorp.com / Corp@123456');

        // Create Corporate Employee (Customer role but with corporateId)
        await User.create({
            email: 'employee@techcorp.com',
            password: 'User@123456',
            role: 'customer',
            corporateId: corporateId,
            corporateProfile: {
                department: 'Engineering',
                employeeId: 'TC-101',
                designation: 'Senior Dev',
                joiningDate: new Date('2023-03-10')
            },
            profile: {
                firstName: 'John',
                lastName: 'Employee',
                gender: 'male',
                dateOfBirth: new Date('1990-01-01') // Vital for risk calc
            },
            healthProfile: {
                smoker: false,
                totalCholesterol: 180
            },
            latestVitals: { bloodPressure: { systolic: 120, diastolic: 80 } },
            status: 'active'
        });
        logger.info('✓ Corporate Employee created: employee@techcorp.com / User@123456');

        // Create Content Creator
        const contentCreator = await User.create({
            email: 'creator@gruentzig.ai',
            password: 'Creator@123456',
            role: 'content_creator',
            profile: {
                firstName: 'Content',
                lastName: 'Creator',
                gender: 'other'
            },
            status: 'active'
        });
        logger.info('✓ Content Creator created: creator@gruentzig.ai / Creator@123456');

        logger.info('✓ Sample customers created');
        // Create Sample Vitals
        const vitalsData = [
            {
                userId: customer1._id,
                vitalType: 'blood_pressure',
                value: { systolic: 145, diastolic: 90 },
                unit: 'mmHg',
                status: 'warning',
                timestamp: new Date()
            },
            {
                userId: customer1._id,
                vitalType: 'heart_rate',
                value: 82,
                unit: 'bpm',
                status: 'normal',
                timestamp: new Date()
            },
            {
                userId: customer2._id,
                vitalType: 'blood_glucose',
                value: 168,
                unit: 'mg/dL',
                status: 'warning',
                timestamp: new Date()
            },
            {
                userId: customer2._id,
                vitalType: 'spo2',
                value: 91,
                unit: '%',
                status: 'critical',
                alertTriggered: true,
                timestamp: new Date()
            },
            {
                userId: customer3._id,
                vitalType: 'weight',
                value: 58,
                unit: 'kg',
                status: 'normal',
                timestamp: new Date()
            }
        ];
        await Vital.insertMany(vitalsData);
        logger.info('✓ Sample vitals created');
        // Create Sample Orders (Requires Products to be real, but for now we mocked items. 
        // Ideally we should create products first and use their IDs)

        // Create Products
        const Product = require('../models/Product'); // Require here or top
        await Product.deleteMany({});

        const productsData = [
            {
                name: 'PreventVital BP Monitor Pro',
                description: 'Clinical grade blood pressure monitor with Bluetooth connectivity and arrhythmia detection.',
                price: 2499,
                category: 'bp_monitor',
                stock: 50,
                images: ['https://placehold.co/600x400?text=BP+Monitor'],
                supportedVitals: ['systolic_bp', 'diastolic_bp', 'heart_rate'],
                specs: [{ label: 'Connectivity', value: 'Bluetooth 5.0' }, { label: 'Memory', value: '100 readings' }]
            },
            {
                name: 'Gruentzig ECG Patch',
                description: '24/7 continuous heart rate and ECG monitoring patch. water resistant and comfortable.',
                price: 4999,
                category: 'ecg_patch',
                stock: 100,
                images: ['https://placehold.co/600x400?text=ECG+Patch'],
                supportedVitals: ['ecg', 'heart_rate']
            },
            {
                name: 'GlucoSmart Connect',
                description: 'Smart blood glucose meter that syncs directly with the PreventVital app.',
                price: 1999,
                category: 'device',
                stock: 75,
                images: ['https://placehold.co/600x400?text=GlucoSmart'],
                supportedVitals: ['glucose']
            },
            {
                name: 'VitalWatch Series 5',
                description: 'Advanced smartwatch for monitoring SpO2, Heart Rate, and Sleep quality.',
                price: 8999,
                category: 'smart_watch',
                stock: 30,
                images: ['https://placehold.co/600x400?text=VitalWatch'],
                supportedVitals: ['heart_rate', 'spo2']
            }
        ];

        const createdProducts = await Product.insertMany(productsData);
        logger.info(`✓ Created ${createdProducts.length} sample products`);

        const ordersData = [
            {
                orderId: 'PV-2025-001',
                userId: customer1._id,
                items: [
                    {
                        productName: createdProducts[0].name,
                        productImage: createdProducts[0].images[0],
                        quantity: 1,
                        price: createdProducts[0].price
                    }
                ],
                pricing: {
                    subtotal: 10000,
                    shipping: 200,
                    gst: 1836,
                    discount: 0,
                    total: 12036
                },
                orderStatus: 'shipped',
                payment: {
                    status: 'completed',
                    method: 'razorpay',
                    paidAt: new Date()
                }
            },
            {
                orderId: 'PV-2025-002',
                userId: customer2._id,
                items: [
                    {
                        productName: 'PreventVital Heart Monitor',
                        productImage: 'https://example.com/heart-monitor.jpg',
                        quantity: 1,
                        price: 15000
                    }
                ],
                pricing: {
                    subtotal: 15000,
                    shipping: 0,
                    gst: 2700,
                    discount: 1500,
                    total: 16200
                },
                orderStatus: 'confirmed',
                payment: {
                    status: 'completed',
                    method: 'razorpay',
                    paidAt: new Date()
                }
            },
            {
                orderId: 'PV-2025-003',
                userId: customer1._id,
                items: [
                    {
                        productName: 'PreventVital Glucose Monitor',
                        productImage: 'https://example.com/glucose-monitor.jpg',
                        quantity: 1,
                        price: 8000
                    }
                ],
                pricing: {
                    subtotal: 8000,
                    shipping: 200,
                    gst: 1476,
                    discount: 0,
                    total: 9676
                },
                orderStatus: 'placed',
                payment: {
                    status: 'pending',
                    method: 'razorpay'
                }
            }
        ];
        await Order.insertMany(ordersData);
        logger.info('✓ Sample orders created');
        logger.info('\n✅ Database seeded successfully!\n');
        logger.info('Login Credentials:');
        logger.info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        logger.info('Super Admin: superadmin@gruentzig.ai / Admin@123456');
        logger.info('Admin: admin@gruentzig.ai / Admin@123456');
        logger.info('Customer 1: ramesh.kumar@example.com / User@123456');
        logger.info('Customer 2: priya.sharma@example.com / User@123456');
        logger.info('Customer 3: anjali.reddy@example.com / User@123456');
        logger.info('Corporate Admin: corp.admin@techcorp.com / Corp@123456');
        logger.info('Corporate Employee: employee@techcorp.com / User@123456');
        logger.info('Content Creator: creator@gruentzig.ai / Creator@123456');
        logger.info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        process.exit(0);
    } catch (error) {
        logger.error('Seeding error:', error);
        process.exit(1);
    }
}
seedDatabase();
