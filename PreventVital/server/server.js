const app = require('./src/app');
const config = require('./src/config/env');
const logger = require('./src/utils/logger');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('Connected to MongoDB');

        // Start Server
        const PORT = config.PORT || 5000;
        app.listen(PORT, () => {
            logger.info(`Server running in ${config.NODE_ENV} mode on port ${PORT}`);
        });
    })
    .catch((err) => {
        logger.error('MongoDB connection error:', err);
        process.exit(1);
    });
