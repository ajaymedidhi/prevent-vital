const express = require('express');
const authController = require('../controllers/authController');
const superAdminController = require('../controllers/superAdminController');

const router = express.Router();

// Strict Protection: Only Super Admins
router.use(authController.protect);
router.use(authController.restrictTo('super_admin'));

// Tenant Management
router.post('/tenants', superAdminController.createTenant);
router.get('/tenants', superAdminController.getAllTenants);

// Platform Configuration
// Example: key=who_thresholds
router.patch('/config', superAdminController.updateGlobalConfig);
router.get('/config/:key', superAdminController.getGlobalConfig);

// Stats & Logs
router.get('/stats', superAdminController.getDashboardStats); // Reusing admin logic
router.get('/audit-logs', superAdminController.getAuditLogs);
router.get('/approvals', superAdminController.getApprovals);

module.exports = router;
