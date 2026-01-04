const Content = require('../models/Content');

exports.createContent = async (req, res) => {
    try {
        const { title, type, url, tags } = req.body;

        const newContent = await Content.create({
            title,
            type,
            url,
            tags,
            creatorId: req.user._id,
            status: 'draft'
        });

        res.status(201).json({
            status: 'success',
            data: newContent
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.getMyContent = async (req, res) => {
    try {
        console.log('GET /api/content/my request received for user:', req.user._id);
        const content = await Content.find({ creatorId: req.user._id });
        console.log(`Found ${content.length} content items`);

        res.status(200).json({
            status: 'success',
            results: content.length,
            data: content
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.updateContent = async (req, res) => {
    try {
        const content = await Content.findOneAndUpdate(
            { _id: req.params.contentId, creatorId: req.user._id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!content) {
            return res.status(404).json({ status: 'fail', message: 'Content not found or you do not own it' });
        }

        res.status(200).json({
            status: 'success',
            data: content
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.deleteContent = async (req, res) => {
    try {
        const content = await Content.findOneAndDelete({
            _id: req.params.contentId,
            creatorId: req.user._id
        });

        if (!content) {
            return res.status(404).json({ status: 'fail', message: 'Content not found or you do not own it' });
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!['draft', 'published', 'archived'].includes(status)) {
            return res.status(400).json({ status: 'fail', message: 'Invalid status' });
        }

        const content = await Content.findOneAndUpdate(
            { _id: req.params.contentId, creatorId: req.user._id },
            { status },
            { new: true }
        );

        if (!content) {
            return res.status(404).json({ status: 'fail', message: 'Content not found' });
        }

        res.status(200).json({
            status: 'success',
            data: content
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.getAnalytics = async (req, res) => {
    try {
        console.log('GET /api/content/analytics request received for user:', req.user._id);
        // Aggregated stats for the creator
        const stats = await Content.aggregate([
            { $match: { creatorId: req.user._id } },
            {
                $group: {
                    _id: null,
                    totalViews: { $sum: '$engagement.views' },
                    totalLikes: { $sum: '$engagement.likes' },
                    totalContent: { $sum: 1 }
                }
            }
        ]);

        res.status(200).json({
            status: 'success',
            data: stats[0] || { totalViews: 0, totalLikes: 0, totalContent: 0 }
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};
