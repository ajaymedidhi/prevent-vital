export const PLANS = [
    {
        id: 'free',
        name: 'Free',
        monthlyPrice: 0,
        annualPrice: 0,
        features: ['Basic Health Tracking', 'Community Access'],
        isPopular: false
    },
    {
        id: 'silver',
        name: 'Silver',
        monthlyPrice: 499,
        annualPrice: 4999,
        features: ['Basic Health Tracking', 'Community Access', 'Priority Support', 'Ad-free Experience'],
        isPopular: false
    },
    {
        id: 'gold',
        name: 'Gold',
        monthlyPrice: 999,
        annualPrice: 9999,
        features: ['All Silver Features', 'Advanced Analytics', '1 Free Consultation/mo', 'Device Sync'],
        isPopular: true
    },
    {
        id: 'platinum',
        name: 'Platinum',
        monthlyPrice: 2499,
        annualPrice: 24999,
        features: ['All Gold Features', 'Unlimited Consultations', 'Family Plan (up to 4)', 'Personal Health Coach'],
        isPopular: false
    }
];
