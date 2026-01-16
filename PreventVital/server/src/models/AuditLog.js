const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Audit log must belong to a user']
    },
    action: {
        type: String,
        required: [true, 'Audit log must have an action'],
        uppercase: true
    },
    resource: {
        type: String, // e.g., 'User', 'Order', 'Program'
        required: true
    },
    resourceId: {
        type: String
    },
    details: {
        type: mongoose.Schema.Types.Mixed // Flexible object for diffs or metadata
    },
    status: {
        type: String,
        enum: ['success', 'failure', 'denied'],
        default: 'success'
    },
    ip: String,
    device: String,
    userAgent: String,
    timestamp: {
        type: Date,
        default: Date.now,
        index: true, // Important for querying logs by date
        expires: 31536000 // 1 year (365 * 24 * 60 * 60)
    }
});

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

module.exports = AuditLog;
