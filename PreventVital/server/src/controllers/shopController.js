const Product = require('../models/Product');
const geoip = require('geoip-lite');

exports.getProducts = async (req, res) => {
    try {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        // Check for manual override header (e.g. from Demo Mode)
        const manualRegion = req.headers['x-user-region'];

        let userCountry = 'IN'; // Default

        if (manualRegion && manualRegion.length === 2) {
            userCountry = manualRegion.toUpperCase();
        } else {
            // Geographic lookup
            const geo = geoip.lookup(ip);
            if (geo) userCountry = geo.country;
        }

        console.log(`User IP: ${ip}, Detected Region: ${geoip.lookup(ip)?.country}, Effective Region: ${userCountry}`);



        // Return all active products (Region Locking disabled per user request)
        const products = await Product.find({
            isActive: true
        }).sort('-createdAt');

        res.status(200).json({
            status: 'success',
            results: products.length,
            userRegion: userCountry,
            data: {
                products
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

exports.getProductBySlug = async (req, res) => {
    try {
        const identifier = req.params.slug;
        let query = { slug: identifier, isActive: true };

        // If identifier looks like a MongoID, search by ID as fallback
        if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
            query = { $or: [{ slug: identifier }, { _id: identifier }], isActive: true };
        }

        const product = await Product.findOne(query);

        if (!product) {
            return res.status(404).json({
                status: 'fail',
                message: 'Product not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                product
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};
