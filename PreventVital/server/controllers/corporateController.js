const User = require('../models/User');

exports.addEmployees = async (req, res) => {
    try {
        const { employees } = req.body; // Array of { name, email }
        const tenantId = req.user.tenantId;

        if (!tenantId) {
            return res.status(400).json({ message: 'No tenant ID associated with this corporate admin' });
        }

        const createdUsers = [];
        const errors = [];

        for (const emp of employees) {
            try {
                // Check if exists
                let user = await User.findOne({ email: emp.email });
                if (user) {
                    errors.push(`${emp.email} already exists`);
                    continue;
                }

                user = await User.create({
                    name: emp.name,
                    email: emp.email,
                    password: 'password123', // Default password
                    role: 'customer', // Or strict 'employee' role if needed
                    tenantId: tenantId,
                    status: 'active'
                });
                createdUsers.push(user);
            } catch (err) {
                errors.push(`Failed to create ${emp.email}: ${err.message}`);
            }
        }

        res.status(200).json({
            status: 'success',
            data: {
                created: createdUsers.length,
                errors
            }
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.getDashboardStats = async (req, res) => {
    try {
        const tenantId = req.user.tenantId;
        const employeeCount = await User.countDocuments({ tenantId });

        // Mock health stats
        const wellnessScore = 82;
        const activePrograms = 5;

        res.status(200).json({
            status: 'success',
            data: {
                employeeCount,
                wellnessScore,
                activePrograms
            }
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};
