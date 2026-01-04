const User = require('../models/User');
const Program = require('../models/Program');
const Vital = require('../models/Vital');
const crypto = require('crypto');

// --- Dashboard ---
exports.getDashboardStats = async (req, res) => {
    try {
        if (!req.user.corporateId) {
            return res.status(400).json({ status: 'fail', message: 'User is not associated with a corporate account' });
        }

        const employeeCount = await User.countDocuments({
            corporateId: req.user.corporateId,
            role: 'customer'
        });

        // Mock aggregated risk distribution
        const riskDistribution = {
            low: Math.floor(employeeCount * 0.6),
            moderate: Math.floor(employeeCount * 0.3),
            high: Math.floor(employeeCount * 0.1)
        };

        const stats = {
            totalEmployees: employeeCount,
            activePrograms: 3,
            averageRiskScore: 12,
            enrolledThisMonth: 5,
            riskDistribution,
            engagementRate: '78%'
        };

        res.status(200).json({
            status: 'success',
            data: stats
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// --- Employee Management ---
exports.getEmployees = async (req, res) => {
    try {
        if (!req.user.corporateId) {
            return res.status(400).json({ status: 'fail', message: 'User is not associated with a corporate account' });
        }

        const employees = await User.find({
            corporateId: req.user.corporateId,
            role: 'customer',
            status: { $ne: 'deleted' }
        }).select('profile.firstName profile.lastName corporateProfile status email'); // STRICTLY NO HEALTH DATA

        res.status(200).json({
            status: 'success',
            results: employees.length,
            data: employees
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.getEmployee = async (req, res) => {
    try {
        const employee = await User.findOne({
            _id: req.params.employeeId,
            corporateId: req.user.corporateId
        }).select('-healthProfile -latestVitals -medicalHistory'); // Exclude sensitive health data

        if (!employee) {
            return res.status(404).json({ status: 'fail', message: 'Employee not found' });
        }

        res.status(200).json({
            status: 'success',
            data: employee
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.inviteEmployee = async (req, res) => {
    try {
        // In a real app, we'd send an email. Here we create a user with a temp password.
        const { email, firstName, lastName, department, employeeId, designation } = req.body;

        const tempPassword = crypto.randomBytes(8).toString('hex');

        const newUser = await User.create({
            email,
            password: tempPassword,
            role: 'customer',
            corporateId: req.user.corporateId,
            corporateProfile: {
                department,
                employeeId,
                designation,
                joiningDate: new Date()
            },
            profile: {
                firstName,
                lastName
            },
            status: 'active' // Or 'pending' if we had email verification
        });

        // Omit password from response
        newUser.password = undefined;

        res.status(201).json({
            status: 'success',
            message: 'Employee invited successfully',
            tempCredentials: { email, password: tempPassword }, // Returned ONLY for demo purposes
            data: newUser
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.removeEmployee = async (req, res) => {
    try {
        const employee = await User.findOneAndUpdate(
            { _id: req.params.employeeId, corporateId: req.user.corporateId },
            { status: 'suspended' }, // Soft delete/suspend
            { new: true }
        );

        if (!employee) {
            return res.status(404).json({ status: 'fail', message: 'Employee not found' });
        }

        res.status(200).json({
            status: 'success',
            message: 'Employee suspended successfully'
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// --- Programs ---
exports.getPrograms = async (req, res) => {
    try {
        const programs = await Program.find({ status: 'published' });

        // Enhance with enrollment data specific to this corporation
        const employees = await User.find({ corporateId: req.user.corporateId }).select('_id');
        const employeeIds = employees.map(e => e._id.toString());

        const enhancedPrograms = programs.map(p => {
            const corpEnrolled = p.enrolledUsers.filter(u => employeeIds.includes(u.user.toString())).length;
            return {
                ...p.toObject(),
                enrolledCount: corpEnrolled,
                completionRate: 'N/A' // Placeholder until progress tracking is detailed
            };
        });

        res.status(200).json({
            status: 'success',
            data: enhancedPrograms
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.assignProgram = async (req, res) => {
    try {
        const { employeeId, programId } = req.body;

        // Verify employee belongs to corporation
        const employee = await User.findOne({ _id: employeeId, corporateId: req.user.corporateId });
        if (!employee) {
            return res.status(404).json({ status: 'fail', message: 'Employee not found in your organization' });
        }

        const program = await Program.findById(programId);
        if (!program) {
            return res.status(404).json({ status: 'fail', message: 'Program not found' });
        }

        // Check if already enrolled
        const alreadyEnrolled = program.enrolledUsers.some(u => u.user.toString() === employeeId);
        if (alreadyEnrolled) {
            return res.status(400).json({ status: 'fail', message: 'Employee already enrolled' });
        }

        // Enroll
        program.enrolledUsers.push({ user: employeeId });
        await program.save();

        res.status(200).json({ status: 'success', message: 'Program assigned to employee' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.programAnalytics = async (req, res) => {
    // Placeholder for deeper analytics
    res.status(200).json({ status: 'success', data: { participation: 'High', effectiveness: 'Good' } });
};

// --- Analytics ---
exports.getHealthAnalytics = async (req, res) => {
    try {
        const employees = await User.find({ corporateId: req.user.corporateId }).select('_id');
        const employeeCount = employees.length;

        // Minimum sample size check for privacy
        if (employeeCount < 5) {
            return res.status(403).json({
                status: 'fail',
                message: 'Insufficient data points for aggregated analytics (needs min 5 employees) to ensure privacy.'
            });
        }

        const employeeIds = employees.map(e => e._id);

        // Aggregate Vitals
        // Note: For complex values like BP (systolic/diastolic), aggregation needs specific handling.
        // Simplified here for single-value vitals or just counting logs.

        const vitalsStats = await Vital.aggregate([
            { $match: { userId: { $in: employeeIds } } },
            {
                $group: {
                    _id: '$vitalType',
                    avgValue: { $avg: { $cond: [{ $isNumber: '$value' }, '$value', 0] } }, // Only avg numbers
                    count: { $sum: 1 }
                }
            }
        ]);

        const formattedStats = vitalsStats.reduce((acc, curr) => {
            acc[curr._id] = { count: curr.count, avg: Math.round(curr.avgValue) };
            return acc;
        }, {});

        res.status(200).json({
            status: 'success',
            data: formattedStats
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.generateReport = async (req, res) => {
    res.status(200).json({ status: 'success', message: 'Report generation started. You will be notified via email.' });
};

// --- Billing ---
exports.getBilling = async (req, res) => {
    try {
        const employees = await User.countDocuments({ corporateId: req.user.corporateId });
        const plan = 'Enterprise Gold'; // This should come from Corporate User subscription field
        const seatLimit = 100; // Define in Config or User model

        res.status(200).json({
            status: 'success',
            data: {
                plan,
                seats: { total: seatLimit, used: employees },
                nextBillingDate: '2026-02-01',
                amountDue: 0 // Fetch from Stripe or Orders if implemented
            }
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.getInvoices = async (req, res) => {
    res.status(200).json({
        status: 'success',
        data: []
    });
};
