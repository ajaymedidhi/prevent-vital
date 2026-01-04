const express = require('express');
const shopController = require('../controllers/shopController');
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController'); // Assuming exists for protect

const router = express.Router();

// Public routes
router.get('/products', shopController.getProducts);
router.get('/products/:slug', shopController.getProductBySlug);

// Protected routes (Purchase Flow)
router.use(authController.protect); // Ensure user is logged in

router.post('/create-order', orderController.createRazorpayOrder);
router.post('/verify-payment', orderController.verifyPaymentAndCreateOrder);
router.get('/orders/my', orderController.getMyOrders);

module.exports = router;
