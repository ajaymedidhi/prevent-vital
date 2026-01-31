const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Enrollment must belong to a user']
    },
    program: {
        type: mongoose.Schema.ObjectId,
        ref: 'Program',
        required: [true, 'Enrollment must belong to a program']
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'dropped'],
        default: 'active'
    },
    enrolledAt: {
        type: Date,
        default: Date.now
    },
    currentSessionIndex: {
        type: Number,
        default: 1 // 1-based index to match UI
    },
    completedSessionsCount: {
        type: Number,
        default: 0
    },
    sessions: [{
        sessionId: String, // Can be Module ID or generated session ID
        sessionNumber: Number,
        status: {
            type: String,
            enum: ['pending', 'in-progress', 'completed'],
            default: 'pending'
        },
        startTime: Date,
        endTime: Date,
        duration: Number, // Actual duration in minutes
        vitalsCheck: {
            heartRate: Number,
            bloodPressure: {
                systolic: Number,
                diastolic: Number
            },
            spo2: Number
        },
        vitalsAfter: {
            heartRate: Number,
            bloodPressure: {
                systolic: Number,
                diastolic: Number
            },
            spo2: Number
        },
        notes: String
    }]
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Prevent duplicate enrollments
enrollmentSchema.index({ user: 1, program: 1 }, { unique: true });

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = Enrollment;
