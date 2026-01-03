// Middleware to simulate Region Locking
// In a real app, this would use `geoip-lite` or similar on req.ip
exports.checkRegion = (req, res, next) => {
    // We will use a custom header 'x-user-region' to simulate the user's location
    // Default to 'US' if not provided
    const userRegion = req.headers['x-user-region'] || 'US';

    // Attach to request for controllers to use
    req.userRegion = userRegion;

    next();
};
