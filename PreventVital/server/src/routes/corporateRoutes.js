const express = require('express');
const authController = require('../controllers/authController');
const corporateController = require('../controllers/corporateController');

const router = express.Router();

router.use(authController.protect);
router.use(authController.restrictTo('corporate_admin'));

router.post('/employees', corporateController.addEmployees);
router.get('/dashboard', corporateController.getDashboardStats);

module.exports = router;
