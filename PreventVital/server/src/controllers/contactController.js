const Contact = require('../models/Contact');

exports.submitContactForm = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        const newContact = await Contact.create({
            name,
            email,
            subject,
            message
        });

        res.status(201).json({
            status: 'success',
            message: 'Your message has been sent successfully!',
            data: {
                contact: newContact
            }
        });
    } catch (error) {
        console.error('Contact Form Error:', error);
        res.status(400).json({
            status: 'fail',
            message: error.message || 'Something went wrong while sending your message.'
        });
    }
};
