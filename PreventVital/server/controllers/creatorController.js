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
        // Mocking logic or aggregation if Order had 'program' items specifically linked to creators
        // For now, let's just return a placeholder or sum if we had the relationship
        const earnings = {
            total: 15400,
            thisMonth: 3200,
            pendingPayout: 1200
        };
        res.status(200).json({ status: 'success', data: { earnings } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};
