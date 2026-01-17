const Tenant = require('../models/Tenant');
const GlobalConfig = require('../models/GlobalConfig');
const User = require('../models/User');
const AuditLog = require('../models/AuditLog');
const adminController = require('./adminController'); // Reuse logic

exports.createTenant = async (req, res) => {
    try {
        const { name, adminEmail, domain, branding } = req.body;
        const newTenant = await Tenant.create({ name, adminEmail, domain, branding });

        // Log action
        await AuditLog.create({
            user: req.user._id,
            action: 'CREATE_TENANT',
            resource: 'Tenant',
            resourceId: newTenant._id,
            details: { name, adminEmail },
            ip: req.ip
        });

        res.status(201).json({ status: 'success', data: { tenant: newTenant } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.getAllTenants = async (req, res) => {
    try {
        const tenants = await Tenant.find().sort({ createdAt: -1 });
        res.status(200).json({ status: 'success', results: tenants.length, data: { tenants } });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.updateGlobalConfig = async (req, res) => {
    try {
        const { key, value } = req.body;
        const config = await GlobalConfig.findOneAndUpdate(
            { key },
            { value, updatedAt: Date.now() },
            { upsert: true, new: true }
        );

        await AuditLog.create({
            user: req.user._id,
            action: 'UPDATE_CONFIG',
            resource: 'GlobalConfig',
            details: { key, value },
            ip: req.ip
        });

        res.status(200).json({ status: 'success', data: { config } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.getGlobalConfig = async (req, res) => {
    try {
        const { key } = req.params;
        const config = await GlobalConfig.findOne({ key });
        if (!config) return res.status(404).json({ message: 'Configuration not found' });
        res.status(200).json({ status: 'success', data: { config } });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// --- NEW ENDPOINTS ---

// Reuse Admin Stats logic but ensuring Super Admin context if needed
exports.getDashboardStats = adminController.getDashboardStats;

exports.getAuditLogs = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 20;
        const skip = (page - 1) * limit;

        const logs = await AuditLog.find()
            .populate('user', 'email profile.firstName profile.lastName role')
            .sort({ timestamp: -1 })
            .skip(skip)
            .limit(limit);

        const total = await AuditLog.countDocuments();

        res.status(200).json({
            status: 'success',
            results: logs.length,
            total,
            page,
            totalPages: Math.ceil(total / limit),
            data: { logs }
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Mock approvals for now, or fetch from a future 'ProgramSubmission' model
exports.getApprovals = async (req, res) => {
    try {
        // Placeholder: Fetch confirmed orders that might need manual review, or submitted programs
        // For now, return empty or mock
        res.status(200).json({
            status: 'success',
            data: {
                approvals: [],
                message: "No pending approvals found."
            }
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};
