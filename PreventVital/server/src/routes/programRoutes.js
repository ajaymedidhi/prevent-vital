const express = require('express');
const programController = require('../controllers/programController');
const { protect } = require('../controllers/authController');
const { restrictTo } = require('../middleware/rbacMiddleware');

const router = express.Router();

// Public routes (Discovery)
router.get('/', programController.getAllPrograms);
router.get('/:id', programController.getProgram);

// Protected Execution Routes
router.use(protect); // All routes below are protected

router.get('/:id/progress', programController.getProgramProgress);
router.get('/:id/sessions', programController.getEnrolledSessions);
router.post('/:id/sessions/:sessionId/start', programController.startSession);
router.post('/:id/sessions/:sessionId/complete', programController.completeSession);

module.exports = router;
