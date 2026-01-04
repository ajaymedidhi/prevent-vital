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
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft'
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
