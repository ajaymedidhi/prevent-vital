const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const { createSession } = require('../middleware/sessionMiddleware');

const signToken = (user, sessionId) => {
    const payload = {
        id: user._id,
        role: user.role,
        sessionId: sessionId // IMPORTANT: Bind token to a specific session
    };

    if (user.corporateId) {
        payload.corporateId = user.corporateId;
    }

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

const { ROLE_PERMISSIONS } = require('../config/rbacConfig');

const createSendToken = async (user, statusCode, res, req) => {
    // 1. Create a session in DB
    const sessionId = await createSession(user, req);

    // Attach user to req for Audit Middleware (hooks on finish)
    req.user = user;

    // 2. Sign token with sessionId
    const token = signToken(user, sessionId);

    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);

    user.password = undefined;

    // Attach Permissions based on Role
    const permissions = ROLE_PERMISSIONS[user.role] || [];

    const userObj = user.toObject ? user.toObject() : user;
    userObj.permissions = permissions;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user: userObj
        }
    });
};

exports.signup = async (req, res, next) => {
    try {
        // Split name into firstName and lastName (required by Schema)
        const nameParts = (req.body.name || '').trim().split(' ');
        const firstName = nameParts[0] || 'New';
        const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : 'User';

        const newUser = await User.create({
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            tenantId: req.body.tenantId,
            profile: {
                firstName: firstName,
                lastName: lastName
            }
        });

        await createSendToken(newUser, 201, res, req);
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }

        if (user.status === 'suspended') {
            console.log(`Login blocked: User ${user.email} is suspended.`);
            return res.status(403).json({ message: 'Your account has been suspended.' });
        }

        console.log(`Login proceeding for ${user.email}. Status: ${user.status}`);

        await createSendToken(user, 200, res, req);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.protect = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    console.log('[DEBUG] Protect Middleware. Headers:', req.headers.authorization ? 'Auth Header Present' : 'No Auth Header');
    if (req.headers.authorization) console.log('[DEBUG] Auth Header Value:', req.headers.authorization.substring(0, 20) + '...');

    if (!token) {
        return res.status(401).json({ message: 'You are not logged in!' });
    }

    try {
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        console.log(`[DEBUG] Token Verified. UserID: ${decoded.id}, Role: ${decoded.role}`);

        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            console.error(`[DEBUG] User not found in DB with ID: ${decoded.id}`);
            return res.status(401).json({ message: 'The user belonging to this token no longer does exist.' });
        }

        req.user = currentUser;
        req.user.sessionId = decoded.sessionId;
        next();
    } catch (err) {
        console.error('[DEBUG] JWT Verification Error:', err.message);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'You do not have permission to perform this action' });
        }
        next();
    };
};

exports.getMe = async (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            user: req.user
        }
    });
};
