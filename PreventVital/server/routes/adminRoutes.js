const express = require('express');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);
router.use(authController.restrictTo('super_admin'));

router.get('/users', adminController.getAllUsers);
router.patch('/users/:id/suspend', adminController.updateUserStatus);

router.get('/config/who-thresholds', adminController.getWhoThresholds);
router.post('/config/who-thresholds', adminController.updateWhoThresholds);

module.exports = router;
