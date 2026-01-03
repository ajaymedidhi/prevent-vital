const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../../.env') });

module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRE: process.env.JWT_EXPIRE,
    BCRYPT_ROUNDS: parseInt(process.env.BCRYPT_ROUNDS, 10),
    WHO_REGION: process.env.WHO_REGION,
    WHO_COUNTRY: process.env.WHO_COUNTRY,
    WHO_VERSION: process.env.WHO_VERSION,
    CORS_ORIGIN: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [],
    ENABLE_AUDIT_LOG: process.env.ENABLE_AUDIT_LOG === 'true'
};
