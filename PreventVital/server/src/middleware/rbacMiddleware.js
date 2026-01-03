const { ROLE_PERMISSIONS } = require('../config/rbacConfig');

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
