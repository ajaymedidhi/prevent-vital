const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Program = require('./src/models/Program');
const User = require('./src/models/User');

dotenv.config();

const seedPrograms = [
    {
        title: 'Diabetes Prevention & Management',
        description: 'Comprehensive program combining AI-powered glucose monitoring with yoga, meditation, and personalized nutrition plans to prevent and manage diabetes effectively.',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c7fc6a7f-1764743297281.png",
        category: 'metabolic',
        difficulty: 'Beginner',
        durationWeeks: 12,
        totalSessions: 36,
        averageRating: 4.8,
        reviewCount: 124,
        enrollmentCount: 1540,
        pricingType: 'subscription',
        status: 'published',
        modules: [
            { title: 'Understanding Glucose Dynamics', content: 'Introductory session', duration: 15, videoUrl: 'https://example.com/video1' },
            { title: 'Morning Yoga Sequence', content: 'Yoga for metabolism', duration: 25, videoUrl: 'https://example.com/video2' },
            { title: 'Nutrition Basics', content: 'Low GI Diet', duration: 20, videoUrl: 'https://example.com/video3' }
        ]
    },
    {
        title: 'Hypertension Control Program',
        description: 'Integrated approach to blood pressure management through stress reduction techniques, cardiovascular exercises, and continuous AI monitoring.',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_18fdc3d89-1765186858638.png",
        category: 'cardiovascular',
        difficulty: 'Intermediate',
        durationWeeks: 10,
        totalSessions: 30,
        averageRating: 4.7,
        reviewCount: 98,
        enrollmentCount: 1200,
        pricingType: 'subscription',
        status: 'published',
        modules: [
            { title: 'Breathwork for BP', content: 'Pranayama techniques', duration: 15, videoUrl: 'https://example.com/video1' },
            { title: 'Guided Meditation', content: 'Stress reduction', duration: 20, videoUrl: 'https://example.com/video2' }
        ]
    },
    {
        title: 'Cardiac Health Optimization',
        description: 'Heart health program integrating wearable monitoring, gentle cardiac rehabilitation exercises, and ancient wellness practices for optimal cardiovascular function.',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_15af4787e-1764671673883.png",
        category: 'cardiovascular',
        difficulty: 'Intermediate',
        durationWeeks: 16,
        totalSessions: 48,
        averageRating: 4.9,
        reviewCount: 156,
        enrollmentCount: 890,
        pricingType: 'subscription',
        status: 'published'
    },
    {
        title: 'Respiratory Wellness Program',
        description: 'Advanced breathing techniques combined with AI-powered lung function monitoring to improve respiratory health and prevent chronic conditions.',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_11970c2d4-1765782851419.png",
        category: 'respiratory',
        difficulty: 'Beginner',
        durationWeeks: 8,
        totalSessions: 24,
        averageRating: 4.6,
        reviewCount: 75,
        enrollmentCount: 650,
        pricingType: 'one-time',
        price: 49.99,
        status: 'published'
    },
    {
        title: 'Mental Wellness & Stress Management',
        description: 'Holistic mental health program combining cognitive behavioral techniques with meditation, yoga, and AI-driven mood tracking for comprehensive wellness.',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b56c2cc1-1764999507242.png",
        category: 'mental',
        difficulty: 'Beginner',
        durationWeeks: 12,
        totalSessions: 36,
        averageRating: 4.9,
        reviewCount: 210,
        enrollmentCount: 2300,
        pricingType: 'subscription',
        status: 'published'
    },
    {
        title: 'Weight Management & Metabolic Health',
        description: 'Science-backed weight management program integrating personalized nutrition, exercise protocols, and behavioral modification techniques.',
        image: "https://images.unsplash.com/photo-1675270347058-8066cd1fe523",
        category: 'metabolic',
        difficulty: 'Advanced',
        durationWeeks: 16,
        totalSessions: 48,
        averageRating: 4.7,
        reviewCount: 180,
        enrollmentCount: 1800,
        pricingType: 'subscription',
        status: 'published'
    }
];

const DB = process.env.MONGODB_URI;

mongoose.connect(DB).then(() => console.log('DB connection successful!'));

const importData = async () => {
    try {
        // Need a creator
        const creator = await User.findOne({ role: 'content_creator' }) || await User.findOne({ role: 'super_admin' });

        if (!creator) {
            console.error('No creator or super_admin found to assign programs to.');
            process.exit(1);
        }

        const programsWithCreator = seedPrograms.map(p => ({ ...p, creator: creator._id, price: p.price || 99 }));

        await Program.deleteMany(); // Clear existing
        await Program.create(programsWithCreator);
        console.log('Data successfully loaded!');
    } catch (err) {
        console.error(err);
    }
    process.exit();
};

const deleteData = async () => {
    try {
        await Program.deleteMany();
        console.log('Data successfully deleted!');
    } catch (err) {
        console.error(err);
    }
    process.exit();
};

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
} else {
    console.log('Please specify --import or --delete');
    process.exit();
}
