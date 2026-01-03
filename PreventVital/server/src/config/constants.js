module.exports = {
    WHO_INDIA: {
        RISK_CATEGORIES: [
            {
                maxScore: 9,
                category: 'low',
                tenYearRisk: '<10%',
                description: 'Low cardiovascular risk'
            },
            {
                maxScore: 19,
                category: 'moderate',
                tenYearRisk: '10% to <20%',
                description: 'Moderate cardiovascular risk'
            },
            {
                maxScore: 29,
                category: 'high',
                tenYearRisk: '20% to <30%',
                description: 'High cardiovascular risk'
            },
            {
                maxScore: 100, // Catch-all for very high
                category: 'very_high',
                tenYearRisk: '≥30%',
                description: 'Very high cardiovascular risk'
            }
        ]
    }
};
