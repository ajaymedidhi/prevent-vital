const express = require('express');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);
router.use(authController.restrictTo('super_admin', 'admin'));

router.get('/users', adminController.getAllUsers);
router.patch('/users/:id/suspend', adminController.updateUserStatus);

router.get('/config/who-thresholds', adminController.getWhoThresholds);
router.post('/config/who-thresholds', adminController.updateWhoThresholds);

// Order Management
router.get('/orders', adminController.getAllOrders);
router.patch('/orders/:id/status', adminController.updateOrderStatus);

// Dashboard Routes
router.get('/stats', adminController.getDashboardStats);
router.get('/realtime', adminController.getRealtimeMetrics);
router.get('/alerts', adminController.getCriticalAlerts);
router.get('/predictions', adminController.getAIPredictions);

// Risk Calculator
router.post('/calculate-risk', adminController.calculateRisk);

module.exports = router;
