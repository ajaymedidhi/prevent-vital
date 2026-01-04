const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    riskType: {
        type: String, // e.g., 'cardiovascular', 'diabetes', 'hypertension'
        required: true
    },
    probability: {
        type: Number, // 0-100
        required: true
    },
    severity: {
        type: String,
        enum: ['low', 'moderate', 'high', 'critical'],
        required: true
    },
    factors: [String], // Contributing factors derived from AI analysis
    recommendedAction: String,
    timeframe: String, // e.g., 'within 6 months'
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Prediction = mongoose.model('Prediction', predictionSchema);

module.exports = Prediction;
