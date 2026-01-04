const express = require('express');
const corporateController = require('../controllers/corporateController');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes
router.use(authController.protect);
router.use(authController.restrictTo('corporate_admin', 'super_admin')); // Super admin can access too

router.get('/dashboard', corporateController.getDashboardStats);

// Employees
router.get('/employees', corporateController.getEmployees);
router.post('/employees/invite', corporateController.inviteEmployee);
router.get('/employees/:employeeId', corporateController.getEmployee);
router.delete('/employees/:employeeId', corporateController.removeEmployee);

// Programs
router.get('/programs', corporateController.getPrograms);
router.post('/programs/:programId/assign', corporateController.assignProgram);
router.get('/programs/:programId/analytics', corporateController.programAnalytics);

// Analytics & Reports
router.get('/analytics/health', corporateController.getHealthAnalytics);
router.get('/reports/generate', corporateController.generateReport);

// Billing
router.get('/billing', corporateController.getBilling);
router.get('/billing/invoices', corporateController.getInvoices);

module.exports = router;
