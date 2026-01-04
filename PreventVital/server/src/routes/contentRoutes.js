const express = require('express');
const contentController = require('../controllers/contentController');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes
router.use(authController.protect);
router.use(authController.restrictTo('content_creator', 'super_admin'));

router.post('/', contentController.createContent);
router.get('/my', contentController.getMyContent);
router.get('/analytics', contentController.getAnalytics);

router.route('/:contentId')
    .put(contentController.updateContent)
    .delete(contentController.deleteContent);

router.patch('/:contentId/status', contentController.updateStatus);

module.exports = router;
