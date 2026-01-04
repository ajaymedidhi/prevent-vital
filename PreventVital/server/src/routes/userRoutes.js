const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const rbacMiddleware = require('../middleware/rbacMiddleware');
const { PERMISSIONS } = require('../config/rbacConfig');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

// Current User Routes
router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

// My Data
router.get('/my-orders', userController.getMyOrders);
router.get('/my-consultations', userController.getMyConsultations);
router.get('/my-subscription', userController.getMySubscription);

// Other specific routes (e.g. Health Profile update could be separate)

module.exports = router;
