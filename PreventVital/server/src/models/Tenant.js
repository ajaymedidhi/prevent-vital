const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tenant name is required'],
        trim: true,
        unique: true
    },
    domain: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true, // e.g., 'corp.preventvital.com' or custom domain
        sparse: true
    },
    adminEmail: {
        type: String,
        required: [true, 'Admin email is required'],
        lowercase: true,
        trim: true
    },
    branding: {
        logoUrl: String,
        primaryColor: {
            type: String,
            default: '#4F46E5' // Indigo-600 default
        },
        companyName: String
    },
    subscriptionPlan: {
        type: String,
        enum: ['standard', 'premium', 'enterprise'],
        default: 'standard'
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'suspended'],
        default: 'active'
    },
    usersCount: {
        type: Number,
        default: 0
    },
    maxUsers: {
        type: Number,
        default: 100
    },
    contractEnd: Date
}, {
    timestamps: true
});

module.exports = mongoose.model('Tenant', tenantSchema);
