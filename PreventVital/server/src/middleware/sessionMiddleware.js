const Session = require('../models/Session');
const { ROLES } = require('../config/rbacConfig');
const crypto = require('crypto');

// Configuration for max concurrent sessions per role
const MAX_SESSIONS = {
    [ROLES.SUPER_ADMIN]: 2, // High security, limited devices
    [ROLES.ADMIN]: 3,
    [ROLES.CORPORATE_ADMIN]: 3,
    [ROLES.CONTENT_CREATOR]: 3,
    [ROLES.CUSTOMER]: 5 // More lenient for customers
};

exports.createSession = async (user, req) => {
    const deviceId = req.body.deviceId || req.headers['x-device-id'] || 'unknown-device';
    const userAgent = req.headers['user-agent'];
    const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Generate a unique token hash for this session (could be the JWT signature or a separate ID)
    // We will use a random string here which will be embedded in the JWT payload 'sessionId'
    const sessionToken = crypto.randomBytes(32).toString('hex');

    // Check existing sessions
    const activeSessions = await Session.countDocuments({ user: user._id, isValid: true });
    const limit = MAX_SESSIONS[user.role] || 5;

    if (activeSessions >= limit) {
        // Option 1: Reject login
        // throw new Error('Max sessions reached. Please log out from other devices.');

        // Option 2: Invalidate oldest session (Auto-rotation) - Preferred for UX
        const oldestSession = await Session.findOne({ user: user._id, isValid: true }).sort({ lastActive: 1 });
        if (oldestSession) {
            oldestSession.isValid = false;
            await oldestSession.save();
        }
    }

    const newSession = await Session.create({
        user: user._id,
        tokenHash: sessionToken,
        deviceId,
        userAgent,
        ip,
        location: {
            // In a real app, use geoip-lite here
            city: 'Unknown',
            country: 'Unknown'
        }
    });

    return sessionToken;
};

exports.verifySession = async (req, res, next) => {
    // This will run AFTER authController.protect which decodes the JWT
    // The JWT payload must now contain 'sessionId'

    if (!req.user || !req.user.sessionId) {
        // If legacy token without sessionId, we might allow it or force re-login.
        // For security, let's force re-login if we are enforcing strict sessions.
        // But for smooth migration, we might skip if sessionId is missing BUT valid user.
        // Let's enforce it strictly for this task.
        return res.status(401).json({
            status: 'fail',
            message: 'Invalid session context. Please log in again.'
        });
    }

    const session = await Session.findOne({
        tokenHash: req.user.sessionId,
        user: req.user._id,
        isValid: true
    });

    if (!session) {
        return res.status(401).json({
            status: 'fail',
            message: 'Session expired or invalidated. Please log in again.'
        });
    }

    // Update last active
    // Optimize: Only update lastActive if it's been more than 60 seconds
    if (Date.now() - new Date(session.lastActive).getTime() > 60000) {
        session.lastActive = Date.now();
        await session.save({ validateBeforeSave: false });
    }

    // Attach session to request for Audit logging
    req.session = session;
    next();
};
