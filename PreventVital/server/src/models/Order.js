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
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        creatorId: { // Denormalized for earnings calculation
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
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
        paidAt: Date,
        razorpay_order_id: String,
        razorpay_payment_id: String,
        razorpay_signature: String
    },
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String,
        fullName: String, // Added per user request
        phone: String     // Added per user request
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
