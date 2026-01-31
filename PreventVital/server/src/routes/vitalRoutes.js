const express = require('express');
const vitalController = require('../controllers/vitalController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.get('/', vitalController.getMyVitals);
router.post('/', vitalController.logVitals);

module.exports = router;
