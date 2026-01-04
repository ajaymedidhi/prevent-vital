const AuditLog = require('../models/AuditLog');

exports.auditAction = (action, resource) => {
    return async (req, res, next) => {
        // We hook into the response 'finish' event to log the outcome
        // OR we just log the attempt. Logging the attempt + outcome is best.
        // For simplicity in middleware, we log the ATTEMPT here. 
        // A better approach is often to log after the action completes, but if it crashes, we lose it.
        // Let's log the INITIATION.

        // However, we usually want to know if it SUCCEEDED.
        // We can overwrite res.send to intercept the response, but that's invasive.
        // Let's rely on the fact that if this middleware passes, the action is likely to be attempted.
        // We will log AFTER next() returns (async) or use 'finish' listener.

        const startTime = Date.now();

        res.on('finish', async () => {
            if (!req.user) return; // Only audit authenticated actions, or log anonymous attempts differently

            const status = (res.statusCode >= 200 && res.statusCode < 300) ? 'success' : 'failure';

            // Don't log read actions unless necessary (too noisy)
            // But 'view_health_data' might be important.
            // Assuming this middleware is applied to sensitive routes.

            try {
                await AuditLog.create({
                    user: req.user._id,
                    action: action,
                    resource: resource,
                    resourceId: req.params.id || req.body.id || 'N/A',
                    details: {
                        method: req.method,
                        url: req.originalUrl,
                        statusCode: res.statusCode,
                        durationMs: Date.now() - startTime,
                        body: FILTER_SENSITIVE(req.body)
                    },
                    status: status,
                    ip: req.ip || req.connection.remoteAddress,
                    device: req.headers['user-agent'] // Simple device string
                });
            } catch (err) {
                console.error('Audit Logging Failed:', err);
                // Fail open? or Fail closed? Usually fail open for logs to not break app.
            }
        });

        next();
    };
};

const FILTER_SENSITIVE = (body) => {
    if (!body) return {};
    const copy = { ...body };
    delete copy.password;
    delete copy.passwordConfirm;
    delete copy.token;
    return copy;
};
