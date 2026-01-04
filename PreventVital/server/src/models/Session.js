const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    tokenHash: {
        type: String,
        required: true,
        unique: true
    },
    deviceId: {
        type: String,
        required: [true, 'Session must be tied to a specific device identifier']
    },
    deviceType: {
        type: String, // e.g., 'mobile', 'desktop', 'tablet'
        default: 'unknown'
    },
    userAgent: String,
    ip: String,
    location: {
        city: String,
        country: String
    },
    lastActive: {
        type: Date,
        default: Date.now
    },
    isValid: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '90d' // Auto-remove session entries after 90 days (Compliance/Cleanup)
    }
});

sessionSchema.index({ user: 1, isValid: 1 }); // Quick lookup for active user sessions

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
