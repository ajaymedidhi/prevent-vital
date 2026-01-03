const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');
const Product = require('../models/Product');
const invoiceService = require('../services/invoiceService');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder'
});

exports.createRazorpayOrder = async (req, res) => {
    try {
        const { amount } = req.body; // Amount in smallest currency unit (paise)

        const options = {
            amount: amount,
            currency: 'INR',
            receipt: `order_rcptid_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);

        res.status(200).json({
            status: 'success',
            order
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

exports.verifyPaymentAndCreateOrder = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            items,
            totalAmount,
            shippingAddress
        } = req.body;

        const body = razorpay_order_id + '|' + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder')
            .update(body.toString())
            .digest('hex');

        if (expectedSignature === razorpay_signature) {
            // Payment successful

            // Atomically decrement stock
            for (const item of items) {
                const product = await Product.findById(item.product);
                if (!product) continue;

                await Product.findByIdAndUpdate(item.product, {
                    $inc: { stock: -item.quantity }
                });
            }

            // Create Order
            const newOrder = await Order.create({
                user: req.user._id,
                items,
                totalAmount,
                status: 'paid', // Or 'processing'
                paymentId: razorpay_payment_id,
                razorpayOrderId: razorpay_order_id,
                shippingAddress
            });

            // Generate Invoice
            const invoiceUrl = await invoiceService.generateInvoice(newOrder, req.user);

            // Save Invoice URL to Order
            newOrder.invoiceUrl = invoiceUrl;
            await newOrder.save();

            res.status(201).json({
                status: 'success',
                message: 'Order placed successfully',
                order: newOrder,
                invoiceUrl
            });

        } else {
            res.status(400).json({
                status: 'fail',
                message: 'Invalid signature'
            });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};
