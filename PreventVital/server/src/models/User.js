const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    role: {
        type: String,
        enum: ['super_admin', 'admin', 'corporate_admin', 'content_creator', 'customer'],
        default: 'customer'
    },
    // New: Differentiate between individual and corporate customers
    customerType: {
        type: String,
        enum: ['individual', 'corporate'],
        default: 'individual',
        required: function () { return this.role === 'customer'; }
    },
    // Privacy & Data Control
    privacySettings: {
        dataSharing: { type: Boolean, default: false }, // Aggregated data sharing
        marketingEmails: { type: Boolean, default: true },
        twoFactorEnabled: { type: Boolean, default: false }
    },
    loginHistory: [{
        timestamp: Date,
        ip: String,
        device: String,
        location: String
    }],
    // Corporate Metadata
    corporateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Corporate', // We assume a Corporate model will exist or just store ID for now
        index: true
    },
    corporateProfile: {
        department: String,
        employeeId: String,
        designation: String,
        joiningDate: Date,
        corporateEnrolledAt: { type: Date, default: Date.now }
    },
    profile: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        gender: { type: String, enum: ['male', 'female', 'other'] },
        dateOfBirth: Date,
        phoneNumber: String,
        height: Number,
        weight: Number,
        bmi: Number
    },
    healthProfile: {
        primaryConditions: [String],
        smoker: Boolean,
        totalCholesterol: Number
    },
    latestVitals: {
        heartRate: Number,
        bloodPressure: {
            systolic: Number,
            diastolic: Number
        },
        glucose: Number,
        spo2: Number,
        lastUpdated: Date
    },
    subscription: {
        plan: { type: String, enum: ['free', 'silver', 'gold', 'platinum'], default: 'free' },
        status: { type: String, default: 'active' },
        razorpaySubscriptionId: String,
        currentPeriodEnd: Date
    },
    gamification: {
        points: { type: Number, default: 0 },
        level: { type: Number, default: 1 },
        streaks: {
            current: { type: Number, default: 0 },
            longest: { type: Number, default: 0 }
        }
    },
    tenantId: String,
    status: {
        type: String,
        enum: ['active', 'suspended'],
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
