const express = require('express');
const subscriptionController = require('../controllers/subscriptionController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.post('/create', subscriptionController.createSubscription);
router.post('/verify', subscriptionController.verifySubscription);

module.exports = router;
