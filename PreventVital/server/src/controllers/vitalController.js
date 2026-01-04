const Vital = require('../models/Vital');

exports.getMyVitals = async (req, res) => {
    try {
        const vitals = await Vital.find({ userId: req.user._id })
            .sort({ timestamp: -1 })
            .limit(20);

        res.status(200).json({
            status: 'success',
            results: vitals.length,
            data: {
                vitals
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};
