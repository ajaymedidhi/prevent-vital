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
    ENABLE_AUDIT_LOG: process.env.ENABLE_AUDIT_LOG === 'true',
    EMAIL_HOST: process.env.EMAIL_HOST || 'smtp.gmail.com',
    EMAIL_PORT: parseInt(process.env.EMAIL_PORT, 10) || 587,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    EMAIL_FROM: process.env.EMAIL_FROM || 'no-reply@preventvital.com',
    EMAIL_SUPPORT: process.env.EMAIL_SUPPORT || 'support@preventvital.com',
    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173'
};
