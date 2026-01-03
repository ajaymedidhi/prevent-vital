const User = require('../models/User');
const GlobalConfig = require('../models/GlobalConfig');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: 'success',
            data: { users }
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
