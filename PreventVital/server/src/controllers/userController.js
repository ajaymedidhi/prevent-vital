const User = require('../models/User');
const Order = require('../models/Order'); // Requires Order model
const Consultation = require('../models/Consultation');
// const Subscription = require('../models/Subscription'); // If we split subscription out

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: { user }
        });
    } catch (err) {
        res.status(404).json({ status: 'fail', message: 'User not found' });
    }
};

exports.updateMe = async (req, res) => {
    try {
        // 1) Create error if user POSTs password data
        if (req.body.password || req.body.passwordConfirm) {
            return res.status(400).json({
                status: 'fail',
                message: 'This route is not for password updates. Please use /updateMyPassword.'
            });
        }

        // 2) Filtered out unwanted field names that are not allowed to be updated
        const filteredBody = filterObj(req.body, 'profile', 'healthProfile', 'privacySettings');

        // Handle nested updates carefully if needed, simpler to replace object for now or use dot notation update in frontend
        // Assuming body contains { profile: { ... } } which Mongoose handles well with merge if configured, 
        // but strict replacement is safer.
        // For deep merge updates, we might need flattening. 
        // Let's assume the client sends the sub-objects they want to update.

        const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                user: updatedUser
            }
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.deleteMe = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user.id, { status: 'suspended' }); // Soft delete

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id }).sort('-createdAt');
        res.status(200).json({
            status: 'success',
            results: orders.length,
            data: { orders }
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.getMyConsultations = async (req, res) => {
    try {
        const consultations = await Consultation.find({ patient: req.user.id })
            .populate('doctor', 'profile.firstName profile.lastName')
            .sort('-date');

        res.status(200).json({
            status: 'success',
            results: consultations.length,
            data: { consultations }
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.getMySubscription = async (req, res) => {
    // If subscription is embedded in User
    res.status(200).json({
        status: 'success',
        data: {
            subscription: req.user.subscription
        }
    });
};
