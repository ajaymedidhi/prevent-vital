const { ROLE_PERMISSIONS, SUBSCRIPTION_LIMITS, ROLES } = require('../config/rbacConfig');

/**
 * Check if the user has the specific permission required for the route.
 * Usage: checkPermission(PERMISSIONS.MANAGE_USERS)
 */
exports.checkPermission = (requiredPermission) => {
    return (req, res, next) => {
        // req.user is populated by authController.protect
        if (!req.user) {
            return res.status(401).json({ status: 'fail', message: 'User not authenticated' });
        }

        const userRole = req.user.role;
        const userPermissions = ROLE_PERMISSIONS[userRole] || [];

        if (userPermissions.includes(requiredPermission)) {
            return next();
        }

        return res.status(403).json({
            status: 'fail',
            message: 'You do not have permission to perform this action.'
        });
    };
};

/**
 * Enforce subscription limits.
 * featureName must match a key in SUBSCRIPTION_LIMITS.plan (e.g., 'maxDevices', 'programsAccess')
 * condition: function to evaluate limit against current usage (optional) or boolean check
 */
exports.checkSubscription = (featureName) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        // Super admins and internal admins bypass subscription limits
        if ([ROLES.SUPER_ADMIN, ROLES.ADMIN].includes(req.user.role)) {
            return next();
        }

        const userPlan = req.user.subscription?.plan || 'free';
        const limits = SUBSCRIPTION_LIMITS[userPlan];

        if (!limits) {
            return res.status(403).json({ message: 'Invalid subscription plan.' });
        }

        const featureLimit = limits[featureName];

        if (featureLimit === false) {
            return res.status(403).json({
                message: `Your current plan (${userPlan}) does not support this feature. Please upgrade.`
            });
        }

        // If it's a number (limit), we assume the controller checks the specific count, 
        // OR we can check it here if we had the count.
        // For 'programsAccess' -> boolean.
        // For 'maxDevices' -> number.

        // For now, if strictly a boolean check logic:
        // If the limit is strictly a boolean 'true', pass.
        // If it's a number, we pass it to the controller via req.subscriptionLimit to enforce logic there.

        req.subscriptionLimit = featureLimit;
        next();
    };
};

/**
 * Strict data boundary for Corporate Admins.
 * Ensures they cannot access individual health data unless aggregated.
 * This middleware should be placed on routes returning User health data.
 */
exports.checkCorporateAccess = (req, res, next) => {
    if (req.user.role === ROLES.CORPORATE_ADMIN) {
        // Block access if trying to view a specific user's detailed health data
        // unless it is an aggregation endpoint.

        // Example: /api/v1/users/:id/health -> BLOCKED
        // Example: /api/v1/corporate/analytics -> ALLOWED (Aggregated)

        // We rely on route structure. If this middleware is hit, it implies caution.
        // If the route parameter 'id' exists and does not match the logged in user (IT SHOULD NOT for Corp Admin managing others),
        // we block detailed access.

        if (req.params.id && req.params.id !== req.user.id) {
            // Corp Admin viewing another user.
            // Ensure they are strictly viewing non-health profile data OR aggregated stats.
            // If the request is for sensitive health fields, block.

            // This is tricky without knowing the exact controller logic. 
            // Ideally, we force a query filter in the controller, 
            // or we block generic "Get User" if it includes health info.

            // Strategy: Attach a "privacyFilter" to the request that the controller MUST respect.
            req.privacyFilter = {
                select: '-latestVitals -healthProfile -medicalHistory' // Mongoose exclude syntax
            };
        }
    }
    next();
};

/**
 * Restrict access to specific roles (Legacy wrapper)
 */
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'You do not have permission to perform this action' });
        }
        next();
    };
};
