const mongoose = require('mongoose');

const vitalSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    vitalType: {
        type: String,
        enum: ['blood_pressure', 'heart_rate', 'blood_glucose', 'spo2', 'weight', 'body_temperature', 'respiratory_rate'],
        required: true
    },
    value: {
        type: mongoose.Schema.Types.Mixed, // Can be number or object (e.g., BP {systolic, diastolic})
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['normal', 'warning', 'critical'],
        default: 'normal'
    },
    alertTriggered: {
        type: Boolean,
        default: false
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Vital', vitalSchema);
