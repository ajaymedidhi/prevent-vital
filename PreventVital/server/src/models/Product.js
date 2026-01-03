const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product must have a name'],
        trim: true
    },
    slug: {
        type: String,
        unique: true,
        sparse: true // Allow null/undefined to not conflict, or ensure unique generation
    },
    price: {
        type: Number,
        required: [true, 'Product must have a price']
    },
    mrp: {
        type: Number
    },
    description: {
        type: String,
        required: [true, 'Product must have a description']
    },
    images: [{
        type: String // S3 URLs
    }],
    image: { // Backwards compatibility if needed, or deprecate
        type: String
    },
    category: {
        type: String,
        enum: ['bp_monitor', 'ecg_patch', 'smart_watch', 'accessory', 'device', 'supplement', 'program'], // Merged existing and new
        required: true,
        default: 'device'
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    allowedRegions: [{
        type: String // ['IN', 'US']
    }],
    specs: [{
        label: String,
        value: String
    }],
    supportedVitals: [{
        type: String,
        enum: ['heart_rate', 'systolic_bp', 'diastolic_bp', 'spo2', 'ecg', 'glucose']
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    creator: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create slug from name before saving if not present
productSchema.pre('save', function (next) {
    if (!this.slug && this.name) {
        this.slug = this.name.toLowerCase().split(' ').join('-');
    }
    next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
