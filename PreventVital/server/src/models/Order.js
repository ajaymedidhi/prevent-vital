const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        productName: String,
        productImage: String,
        quantity: Number,
        price: Number
    }],
    pricing: {
        subtotal: Number,
        shipping: Number,
        gst: Number,
        discount: Number,
        total: Number
    },
    orderStatus: {
        type: String,
        enum: ['pending', 'placed', 'shipped', 'delivered', 'cancelled', 'returned', 'confirmed'],
        default: 'pending'
    },
    payment: {
        status: {
            type: String,
            enum: ['pending', 'completed', 'failed', 'refunded'],
            default: 'pending'
        },
        method: String,
        paidAt: Date
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
