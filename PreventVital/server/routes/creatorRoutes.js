const express = require('express');
const authController = require('../controllers/authController');
const creatorController = require('../controllers/creatorController');

const router = express.Router();

router.use(authController.protect);
router.use(authController.restrictTo('content_creator', 'super_admin')); // Allow super admin to debug if needed

router.post('/programs', creatorController.createProgram);
router.get('/programs', creatorController.getMyPrograms);
router.get('/earnings', creatorController.getEarnings);

module.exports = router;
