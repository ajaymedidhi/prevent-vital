const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.DATABASE, {}).then(() => console.log('DB Connected'));

const products = [
    {
        name: 'Heart Rate Monitor Pro',
        slug: 'heart-rate-monitor-pro',
        price: 4999,
        mrp: 5999,
        description: 'Advanced heart rate monitoring with ECG capability.',
        images: ['https://placehold.co/400x400', 'https://placehold.co/400x400/png'],
        category: 'ecg_patch',
        stock: 100,
        allowedRegions: ['IN', 'US'],
        specs: [
            { label: 'Battery', value: '48 Hours' },
            { label: 'Connectivity', value: 'Bluetooth 5.0' }
        ],
        supportedVitals: ['heart_rate', 'ecg']
    },
    {
        name: 'Smart BP Monitor X1',
        slug: 'smart-bp-monitor-x1',
        price: 2499,
        mrp: 3499,
        description: 'Digital BP monitor with bluetooth sync.',
        images: ['https://placehold.co/400x400'],
        category: 'bp_monitor',
        stock: 50,
        allowedRegions: ['IN'],
        specs: [
            { label: 'Cuff Size', value: '22-42cm' },
            { label: 'Memory', value: '2 users x 60 readings' }
        ],
        supportedVitals: ['systolic_bp', 'diastolic_bp', 'heart_rate']
    },
    {
        name: 'VitalWatch Series 5',
        slug: 'vitalwatch-series-5',
        price: 29999,
        mrp: 34999,
        description: 'Track your sleep stages, SpO2 and daily activity.',
        images: ['https://placehold.co/400x400'],
        category: 'smart_watch',
        stock: 30,
        allowedRegions: [], // Global
        specs: [
            { label: 'Battery', value: '7 Days' },
            { label: 'Water Rating', value: '5 ATM' }
        ],
        supportedVitals: ['spo2', 'heart_rate']
    },
    {
        name: 'US-Only Glucose Meter',
        slug: 'us-only-glucose-meter',
        price: 3999,
        description: 'FDA Approved Glucose meter for US market.',
        images: ['https://placehold.co/400x400'],
        category: 'device',
        stock: 100,
        allowedRegions: ['US'],
        specs: [
            { label: 'Units', value: 'mg/dL' }
        ]
    },
    {
        name: 'Global Vitamin D3',
        slug: 'global-vitamin-d3',
        price: 899,
        description: 'High potency Vitamin D3.',
        images: ['https://placehold.co/400x400'],
        category: 'supplement',
        stock: 500,
        allowedRegions: []
    }
];

const seedDB = async () => {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Products seeded');
    // Create a default super admin if none exists
    const admin = await User.findOne({ email: 'admin@preventvital.com' });
    if (!admin) {
        await User.create({
            name: 'Super Admin',
            email: 'admin@preventvital.com',
            password: 'password123',
            role: 'super_admin'
        });
        console.log('Super Admin seeded');
    }
    process.exit();
};

seedDB();
