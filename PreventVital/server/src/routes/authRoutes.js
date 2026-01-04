const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

const { auditAction } = require('../middleware/auditMiddleware');

router.post('/signup', authController.signup);
router.post('/login', auditAction('LOGIN', 'User'), authController.login);

module.exports = router;
