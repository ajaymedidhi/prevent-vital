const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!']
    },
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
    tenantId: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'suspended'],
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    subscription: {
        planId: { type: String, enum: ['free', 'silver', 'gold', 'platinum'], default: 'free' },
        status: { type: String, enum: ['active', 'past_due', 'canceled', 'created'], default: 'active' },
        razorpaySubscriptionId: String,
        currentPeriodEnd: Date
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
