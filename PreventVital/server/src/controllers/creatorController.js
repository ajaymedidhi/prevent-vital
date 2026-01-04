const Program = require('../models/Program');
const Order = require('../models/Order'); // To calc earnings

exports.createProgram = async (req, res) => {
    try {
        const newProgram = await Program.create({
            ...req.body,
            creator: req.user._id
        });
        res.status(201).json({
            status: 'success',
            data: { program: newProgram }
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.getMyPrograms = async (req, res) => {
    try {
        const programs = await Program.find({ creator: req.user._id });
        res.status(200).json({
            status: 'success',
            data: { programs }
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.getEarnings = async (req, res) => {
    try {
        // Aggregate Orders where items.creatorId matches req.user._id
        const stats = await Order.aggregate([
            { $unwind: '$items' },
            { $match: { 'items.creatorId': req.user._id, 'payment.status': 'completed' } },
            {
                $group: {
                    _id: null,
                    totalEarnings: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
                    totalSales: { $sum: '$items.quantity' }
                }
            }
        ]);

        // Get monthly earnings (simplified for brevity, can duplicate group with date match)
        const currentMonth = new Date();
        currentMonth.setDate(1); // First day

        const monthlyStats = await Order.aggregate([
            { $match: { createdAt: { $gte: currentMonth }, 'payment.status': 'completed' } },
            { $unwind: '$items' },
            { $match: { 'items.creatorId': req.user._id } },
            {
                $group: {
                    _id: null,
                    total: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
                }
            }
        ]);

        const earnings = {
            total: stats[0]?.totalEarnings || 0,
            thisMonth: monthlyStats[0]?.total || 0,
            pendingPayout: 0 // Logic for payouts would be separate
        };

        res.status(200).json({ status: 'success', data: { earnings } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};
