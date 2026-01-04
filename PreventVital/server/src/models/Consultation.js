const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Consultation must have a patient']
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Consultation must have a doctor']
    },
    date: {
        type: Date,
        required: [true, 'Consultation must have a date/time']
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'cancelled', 'no_show'],
        default: 'scheduled'
    },
    notes: {
        type: String
    },
    meetingLink: {
        type: String
    },
    durationMinutes: {
        type: Number,
        default: 30
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Consultation = mongoose.model('Consultation', consultationSchema);

module.exports = Consultation;
