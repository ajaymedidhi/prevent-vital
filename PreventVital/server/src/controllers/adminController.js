const User = require('../models/User');
const GlobalConfig = require('../models/GlobalConfig');

exports.getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 20;
        const skip = (page - 1) * limit;

        // Searching
        const queryObj = {};
        if (req.query.search) {
            queryObj.$or = [
                { email: { $regex: req.query.search, $options: 'i' } },
                { 'profile.firstName': { $regex: req.query.search, $options: 'i' } },
                { 'profile.lastName': { $regex: req.query.search, $options: 'i' } }
            ];
        }
        if (req.query.role) queryObj.role = req.query.role;
        if (req.query.status) queryObj.status = req.query.status;

        const users = await User.find(queryObj)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await User.countDocuments(queryObj);

        res.status(200).json({
            status: 'success',
            results: users.length,
            total,
            page,
            totalPages: Math.ceil(total / limit),
            data: { users }
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 20;
        const skip = (page - 1) * limit;

        const queryObj = {};
        if (req.query.status) queryObj.orderStatus = req.query.status;
        if (req.query.search) {
            queryObj.orderId = { $regex: req.query.search, $options: 'i' };
        }

        const orders = await Order.find(queryObj)
            .populate('userId', 'email profile.firstName profile.lastName')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await Order.countDocuments(queryObj);

        res.status(200).json({
            status: 'success',
            results: orders.length,
            total,
            page,
            totalPages: Math.ceil(total / limit),
            data: { orders }
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus: status }, {
            new: true,
            runValidators: true
        }).populate('userId', 'email profile');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // TODO: Emit event here later for email notification
        // eventBus.emit(EVENTS.SHOP.ORDER_STATUS_UPDATED, order);

        res.status(200).json({
            status: 'success',
            data: { order }
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.updateUserStatus = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { status: req.body.status }, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: { user }
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.getWhoThresholds = async (req, res) => {
    try {
        let config = await GlobalConfig.findOne({ key: 'who_thresholds' });
        if (!config) {
            config = await GlobalConfig.create({
                key: 'who_thresholds',
                value: {
                    systolic: { high: 140, low: 90 },
                    diastolic: { high: 90, low: 60 },
                    heartRate: { high: 100, low: 60 }
                }
            });
        }
        res.status(200).json({
            status: 'success',
            data: { config }
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.updateWhoThresholds = async (req, res) => {
    try {
        const config = await GlobalConfig.findOneAndUpdate(
            { key: 'who_thresholds' },
            { value: req.body.value, updatedAt: Date.now() },
            { new: true, upsert: true }
        );
        res.status(200).json({
            status: 'success',
            data: { config }
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

const Order = require('../models/Order');
const Vital = require('../models/Vital');
const Consultation = require('../models/Consultation');
const Prediction = require('../models/Prediction');

exports.getDashboardStats = async (req, res) => {
    try {
        const usersCount = await User.countDocuments();
        const activeUsersCount = await User.countDocuments({ status: 'active' });
        const newUsers = await User.countDocuments({ createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } }); // Last 30 days

        // Revenue Aggregation
        const revenueAgg = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$pricing.total' },
                    todayRevenue: {
                        $sum: {
                            $cond: [
                                { $gte: ['$createdAt', new Date(new Date().setHours(0, 0, 0, 0))] },
                                '$pricing.total',
                                0
                            ]
                        }
                    }
                }
            }
        ]);

        const totalRevenue = (revenueAgg[0]?.totalRevenue || 0); // Ensure number
        const todayRevenue = (revenueAgg[0]?.todayRevenue || 0);

        const revenue = {
            today: todayRevenue,
            month: totalRevenue,
            year: totalRevenue,
            growth: 12.5,
            arr: totalRevenue * 12 || 0 // Ensure no NaN
        };

        const subscriptions = {
            free: await User.countDocuments({ 'subscription.plan': 'free' }),
            silver: await User.countDocuments({ 'subscription.plan': 'silver' }),
            gold: await User.countDocuments({ 'subscription.plan': 'gold' }),
            platinum: await User.countDocuments({ 'subscription.plan': 'platinum' }),
            churnRate: 2.3
        };

        // Role Breakdown
        const roles = {
            super_admin: await User.countDocuments({ role: 'super_admin' }),
            admin: await User.countDocuments({ role: 'admin' }),
            corporate_admin: await User.countDocuments({ role: 'corporate_admin' }),
            content_creator: await User.countDocuments({ role: 'content_creator' }),
            customer: await User.countDocuments({ role: 'customer' })
        };

        const criticalAlertsCount = await Vital.countDocuments({ status: 'critical' });
        const totalVitals = await Vital.countDocuments();
        const consultationsCount = await Consultation.countDocuments(); // Real Count
        // const activeProgramsCount = await Program.countDocuments({ status: 'published' }); // If model imported

        const healthStats = {
            criticalAlerts: criticalAlertsCount,
            consultations: consultationsCount,
            vitalsLogged: totalVitals,
            programsActive: 12, // Keep mock until Program imported or use placeholder
            avgWHOScore: 12.4
        };

        const aiMetrics = {
            predictiveAccuracy: 94.2,
            anomaliesDetected: criticalAlertsCount * 2,
            riskPredictions: await Prediction.countDocuments(), // Real Count
            modelVersion: "v2.4.1"
        };

        const orders = {
            pending: await Order.countDocuments({ orderStatus: 'pending' }),
            processing: await Order.countDocuments({ orderStatus: { $in: ['placed', 'confirmed'] } }),
            shipped: await Order.countDocuments({ orderStatus: 'shipped' }),
            delivered: await Order.countDocuments({ orderStatus: 'delivered' }),
            cancelled: await Order.countDocuments({ orderStatus: 'cancelled' })
        };

        res.status(200).json({
            status: 'success',
            data: {
                users: {
                    total: usersCount,
                    growth: 12.5,
                    active: activeUsersCount,
                    new: newUsers,
                    suspended: usersCount - activeUsersCount
                },
                revenue,
                subscriptions,
                roles, // New field
                orders,
                health: healthStats,
                aiMetrics
            }
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.getRealtimeMetrics = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        // Mocked realtime metrics based on real user base size
        const metrics = {
            activeUsers: Math.floor(totalUsers * 0.2) + Math.floor(Math.random() * 5),
            activeSessions: Math.floor(totalUsers * 0.1) + Math.floor(Math.random() * 3),
            vitalsPerMinute: Math.floor(Math.random() * 30) + 10,
            apiResponseTime: Math.floor(Math.random() * 50) + 20,
            systemHealth: 99.9,
            databaseConnections: 5
        };
        res.status(200).json({ status: 'success', data: metrics });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};


exports.getCriticalAlerts = async (req, res) => {
    try {
        const criticalVitals = await Vital.find({
            status: { $in: ['critical', 'warning'] }
        })
            .populate('userId', 'email profile.firstName profile.lastName')
            .sort({ timestamp: -1 })
            .limit(10);

        const alerts = criticalVitals.map(vital => {
            const userName = vital.userId
                ? (vital.userId.profile?.firstName ? `${vital.userId.profile.firstName} ${vital.userId.profile.lastName}` : vital.userId.email)
                : 'Unknown User';

            return {
                id: vital._id,
                userId: vital.userId?._id,
                userName: userName,
                type: vital.vitalType,
                severity: vital.status,
                value: typeof vital.value === 'object' ? `${vital.value.systolic}/${vital.value.diastolic} ${vital.unit}` : `${vital.value} ${vital.unit}`,
                message: `${vital.vitalType} is ${vital.status}`,
                timestamp: vital.timestamp,
                aiPrediction: vital.status === 'critical' ? 'Immediate attention needed' : 'Monitor closely',
                actionTaken: false
            };
        });

        res.status(200).json({ status: 'success', data: alerts });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.getAIPredictions = async (req, res) => {
    try {
        const predictions = await Prediction.find()
            .populate('user', 'profile.firstName profile.lastName email')
            .sort({ createdAt: -1 })
            .limit(20);

        // Map to match frontend expected format if needed, or stick to schema
        const mappedPredictions = predictions.map(p => ({
            userId: p.user?._id,
            userName: p.user ? (p.user.profile?.firstName ? `${p.user.profile.firstName} ${p.user.profile.lastName}` : p.user.email) : 'Unknown',
            prediction: p.riskType, // e.g. 'High risk of X'
            probability: p.probability,
            timeframe: p.timeframe,
            factors: p.factors,
            recommended: p.recommendedAction
        }));

        res.status(200).json({ status: 'success', data: mappedPredictions });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

const WHOIndiaRiskCalculator = require('../services/whoIndiaRiskCalculator');

exports.calculateRisk = async (req, res) => {
    try {
        const { patient, options } = req.body;

        if (!patient) {
            return res.status(400).json({
                status: 'fail',
                message: 'Patient data is required'
            });
        }

        const result = WHOIndiaRiskCalculator.calculate(patient, options);

        res.status(200).json({
            status: 'success',
            data: result
        });
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    }
};
