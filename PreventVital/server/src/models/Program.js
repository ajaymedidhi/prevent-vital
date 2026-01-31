const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Program must belong to a creator']
    },
    title: {
        type: String,
        required: [true, 'Program must have a title'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Program must have a description']
    },
    price: {
        type: Number,
        required: [true, 'Program must have a price']
    },
    image: {
        type: String,
        default: 'https://placehold.co/600x400'
    },
    modules: [
        {
            title: String,
            content: String, // Text content or description
            videoUrl: String,
            duration: Number // minutes
        }
    ],
    category: {
        type: String,
        enum: ['metabolic', 'cardiovascular', 'respiratory', 'mental', 'musculoskeletal', 'preventive'],
        required: [true, 'Program must have a category'],
        index: true
    },
    difficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: [true, 'Program must have a difficulty level']
    },
    durationWeeks: {
        type: Number,
        required: true
    },
    totalSessions: {
        type: Number,
        required: true
    },
    averageRating: {
        type: Number,
        default: 4.5,
        min: 1,
        max: 5
    },
    reviewCount: {
        type: Number,
        default: 0
    },
    enrollmentCount: {
        type: Number,
        default: 0
    },
    pricingType: {
        type: String,
        enum: ['free', 'subscription', 'one-time'],
        default: 'subscription'
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft',
        index: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    enrolledUsers: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        enrolledAt: {
            type: Date,
            default: Date.now
        },
        progress: {
            type: Number,
            default: 0
        },
        completedModules: [String]
    }]
});

const Program = mongoose.model('Program', programSchema);

module.exports = Program;
