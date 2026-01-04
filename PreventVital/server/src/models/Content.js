const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, enum: ['video', 'article', 'course'], required: true },
    url: String,
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
    tags: [String],
    engagement: {
        views: { type: Number, default: 0 },
        likes: { type: Number, default: 0 }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Content = mongoose.model('Content', contentSchema);
module.exports = Content;
