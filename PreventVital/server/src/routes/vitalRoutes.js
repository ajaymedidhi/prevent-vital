const express = require('express');
const vitalController = require('../controllers/vitalController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.get('/my-vitals', vitalController.getMyVitals);

module.exports = router;
