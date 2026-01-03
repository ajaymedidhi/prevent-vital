const logger = {
    info: (msg) => console.log(`[INFO] ${msg}`),
    error: (msg, err) => console.error(`[ERROR] ${msg}`, err || ''),
    warn: (msg) => console.warn(`[WARN] ${msg}`),
    debug: (msg) => {
        if (process.env.NODE_ENV === 'development') {
            console.log(`[DEBUG] ${msg}`);
        }
    }
};

module.exports = logger;
