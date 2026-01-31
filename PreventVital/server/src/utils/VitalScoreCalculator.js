/**
 * VITAL SCORE CALCULATION ENGINE
 * 
 * This is the core scoring algorithm that determines if a user's body is stable
 * enough to safely continue normal activities.
 * 
 * Score Range: 0-100
 * - 85-100: Excellent (Safe for all activities)
 * - 70-84: Good (Safe with minor precautions)
 * - 55-69: Fair (Caution, limited activities)
 * - 0-54: Poor (Unsafe, medical attention needed)
 * 
 * CRITICAL: This follows WHO guidelines and medical safety protocols
 */

class VitalScoreCalculator {
    constructor() {
        // WHO-validated thresholds
        this.thresholds = {
            bloodPressure: {
                optimal: { systolic: 120, diastolic: 80 },
                normal: { systolic: 130, diastolic: 85 },
                highNormal: { systolic: 139, diastolic: 89 },
                grade1: { systolic: 159, diastolic: 99 },
                grade2: { systolic: 179, diastolic: 109 },
                crisis: { systolic: 180, diastolic: 110 }
            },
            heartRate: {
                min: 60,
                max: 100,
                athleticMin: 40,
                tachycardiaThreshold: 100,
                severeTachycardia: 120
            },
            glucose: {
                normalFasting: { min: 70, max: 100 },
                preDiabetesFasting: { min: 100, max: 125 },
                diabetesFasting: 126,
                hypoglycemiaCritical: 54,
                hypoglycemia: 70,
                hyperglycemiaCritical: 400,
                hyperglycemia: 250
            },
            spo2: {
                normal: 95,
                concern: 92,
                critical: 88,
                severe: 85
            },
            bmi: {
                underweight: 18.5,
                normalMax: 24.9,  // Using Asian-specific
                overweight: 27.4,  // Using Asian-specific
                obese: 30
            }
        };

        // Weights for each vital sign (must sum to 100)
        this.weights = {
            bloodPressure: 30,
            heartRate: 20,
            glucose: 25,
            spo2: 15,
            bmi: 10
        };
    }

    /**
     * Main calculation function
     * @param {Object} vitals - Current vital signs
     * @returns {Object} - Score, status, breakdown, and recommendations
     */
    calculateVitalScore(vitals) {
        try {
            // Validate input
            this.validateVitals(vitals);

            // Calculate individual component scores
            const bpScore = this.calculateBPScore(vitals.bloodPressure);
            const hrScore = this.calculateHRScore(vitals.heartRate, vitals.context);
            const glucoseScore = this.calculateGlucoseScore(vitals.glucose, vitals.glucoseContext);
            const spo2Score = this.calculateSpO2Score(vitals.spo2);
            const bmiScore = this.calculateBMIScore(vitals.bmi);

            // Calculate weighted total
            const totalScore = Math.round(
                (bpScore.score * this.weights.bloodPressure +
                    hrScore.score * this.weights.heartRate +
                    glucoseScore.score * this.weights.glucose +
                    spo2Score.score * this.weights.spo2 +
                    bmiScore.score * this.weights.bmi) / 100
            );

            // Determine status and recommendations
            const status = this.determineStatus(totalScore);
            const recommendations = this.generateRecommendations(
                totalScore,
                { bpScore, hrScore, glucoseScore, spo2Score, bmiScore }
            );

            // Check for critical alerts
            const criticalAlerts = this.checkCriticalConditions(vitals);

            return {
                score: totalScore,
                status: status,
                breakdown: {
                    bloodPressure: bpScore,
                    heartRate: hrScore,
                    glucose: glucoseScore,
                    spo2: spo2Score,
                    bmi: bmiScore
                },
                recommendations: recommendations,
                criticalAlerts: criticalAlerts,
                timestamp: new Date().toISOString(),
                confidence: this.calculateConfidence(vitals)
            };
        } catch (error) {
            console.error('Vital Score Calculation Error:', error);
            throw new Error('Unable to calculate vital score: ' + error.message);
        }
    }

    /**
     * Blood Pressure Score Calculation
     */
    calculateBPScore(bp) {
        if (!bp || !bp.systolic || !bp.diastolic) {
            return { score: 50, status: 'unknown', message: 'BP data missing' };
        }

        const { systolic, diastolic } = bp;
        let score = 100;
        let status = 'optimal';
        let message = '';

        // Critical conditions (override everything)
        if (systolic >= this.thresholds.bloodPressure.crisis.systolic ||
            diastolic >= this.thresholds.bloodPressure.crisis.diastolic) {
            return {
                score: 0,
                status: 'critical',
                message: 'HYPERTENSIVE CRISIS - Immediate medical attention required',
                detail: `${systolic}/${diastolic} mmHg`,
                action: 'emergency'
            };
        }

        if (systolic < 90 || diastolic < 60) {
            return {
                score: 30,
                status: 'critical',
                message: 'Hypotension - Low blood pressure detected',
                detail: `${systolic}/${diastolic} mmHg`,
                action: 'urgent'
            };
        }

        // Grade 2 Hypertension
        if (systolic >= this.thresholds.bloodPressure.grade2.systolic ||
            diastolic >= this.thresholds.bloodPressure.grade2.diastolic) {
            score = 40;
            status = 'poor';
            message = 'Grade 2 Hypertension - Doctor consultation required';
        }
        // Grade 1 Hypertension
        else if (systolic >= this.thresholds.bloodPressure.grade1.systolic ||
            diastolic >= this.thresholds.bloodPressure.grade1.diastolic) {
            score = 60;
            status = 'fair';
            message = 'Grade 1 Hypertension - Lifestyle changes needed';
        }
        // High Normal
        else if (systolic >= this.thresholds.bloodPressure.highNormal.systolic ||
            diastolic >= this.thresholds.bloodPressure.highNormal.diastolic) {
            score = 75;
            status = 'good';
            message = 'High Normal - Monitor regularly';
        }
        // Normal
        else if (systolic >= this.thresholds.bloodPressure.normal.systolic ||
            diastolic >= this.thresholds.bloodPressure.normal.diastolic) {
            score = 85;
            status = 'good';
            message = 'Normal blood pressure';
        }
        // Optimal
        else {
            score = 100;
            status = 'excellent';
            message = 'Optimal blood pressure';
        }

        return {
            score,
            status,
            message,
            detail: `${systolic}/${diastolic} mmHg`,
            trend: bp.trend || 'stable'
        };
    }

    /**
     * Heart Rate Score Calculation
     */
    calculateHRScore(heartRate, context = {}) {
        if (!heartRate) {
            return { score: 50, status: 'unknown', message: 'Heart rate data missing' };
        }

        let score = 100;
        let status = 'normal';
        let message = '';

        const { isAthlete, activity, medications } = context;

        // Severe conditions
        if (heartRate > 150) {
            return {
                score: 20,
                status: 'critical',
                message: 'Severe tachycardia - Immediate attention needed',
                detail: `${heartRate} bpm`,
                action: 'emergency'
            };
        }

        if (heartRate < 45 && !isAthlete) {
            return {
                score: 30,
                status: 'critical',
                message: 'Severe bradycardia - Medical evaluation required',
                detail: `${heartRate} bpm`,
                action: 'urgent'
            };
        }

        // Context-aware scoring
        if (activity === 'resting') {
            // Athletic heart (low resting HR is good)
            if (heartRate >= 40 && heartRate < 60) {
                if (isAthlete) {
                    score = 100;
                    status = 'excellent';
                    message = 'Athletic heart rate';
                } else {
                    score = 70;
                    status = 'fair';
                    message = 'Low heart rate - Monitor for symptoms';
                }
            }
            // Normal resting
            else if (heartRate >= 60 && heartRate <= 100) {
                score = 100;
                status = 'normal';
                message = 'Normal resting heart rate';
            }
            // Elevated resting
            else if (heartRate > 100) {
                score = 60;
                status = 'fair';
                message = 'Elevated resting heart rate';
            }
        } else if (activity === 'post-exercise') {
            // Post-exercise recovery is expected to be higher
            if (heartRate > 120) {
                score = 80;
                status = 'normal';
                message = 'Normal post-exercise heart rate';
            }
        }

        return {
            score,
            status,
            message,
            detail: `${heartRate} bpm`,
            context: activity || 'resting'
        };
    }

    /**
     * Glucose Score Calculation
     */
    calculateGlucoseScore(glucose, context = {}) {
        if (!glucose || glucose <= 0) {
            return { score: 50, status: 'unknown', message: 'Glucose data missing' };
        }

        let score = 100;
        let status = 'normal';
        let message = '';

        const { timing, isDiabetic } = context;

        // Critical hypoglycemia
        if (glucose < this.thresholds.glucose.hypoglycemiaCritical) {
            return {
                score: 0,
                status: 'critical',
                message: 'SEVERE HYPOGLYCEMIA - Emergency glucose needed',
                detail: `${glucose} mg/dL`,
                action: 'emergency'
            };
        }

        // Hypoglycemia
        if (glucose < this.thresholds.glucose.hypoglycemia) {
            return {
                score: 30,
                status: 'critical',
                message: 'Hypoglycemia - Consume fast-acting carbs immediately',
                detail: `${glucose} mg/dL`,
                action: 'immediate'
            };
        }

        // Critical hyperglycemia
        if (glucose > this.thresholds.glucose.hyperglycemiaCritical) {
            return {
                score: 10,
                status: 'critical',
                message: 'SEVERE HYPERGLYCEMIA - Medical attention required NOW',
                detail: `${glucose} mg/dL`,
                action: 'emergency'
            };
        }

        // Hyperglycemia
        if (glucose > this.thresholds.glucose.hyperglycemia) {
            return {
                score: 40,
                status: 'poor',
                message: 'High blood sugar - Contact doctor today',
                detail: `${glucose} mg/dL`,
                action: 'urgent'
            };
        }

        // Timing-specific interpretation
        if (timing === 'fasting') {
            if (glucose < 100) {
                score = 100;
                status = 'normal';
                message = 'Normal fasting glucose';
            } else if (glucose <= 125) {
                score = 70;
                status = 'fair';
                message = 'Pre-diabetes range - Prevention program recommended';
            } else {
                score = 50;
                status = 'poor';
                message = 'Diabetes range - Doctor consultation needed';
            }
        } else if (timing === 'post-meal') {
            // 2 hours after meal
            if (glucose < 140) {
                score = 100;
                status = 'normal';
                message = 'Normal post-meal glucose';
            } else if (glucose <= 199) {
                score = 70;
                status = 'fair';
                message = 'Elevated post-meal glucose';
            } else {
                score = 50;
                status = 'poor';
                message = 'High post-meal glucose - Medical evaluation needed';
            }
        }

        // Adjust for diabetic patients
        if (isDiabetic) {
            // Different targets for diabetics
            if (timing === 'fasting' && glucose < 130) {
                score = Math.max(score, 80);
                message += ' (Good control for diabetes)';
            }
        }

        return {
            score,
            status,
            message,
            detail: `${glucose} mg/dL`,
            timing: timing || 'unknown'
        };
    }

    /**
     * SpO2 Score Calculation
     */
    calculateSpO2Score(spo2) {
        if (!spo2 || spo2 <= 0 || spo2 > 100) {
            return { score: 50, status: 'unknown', message: 'SpO2 data missing or invalid' };
        }

        let score = 100;
        let status = 'normal';
        let message = '';

        // Severe hypoxia
        if (spo2 < this.thresholds.spo2.severe) {
            return {
                score: 0,
                status: 'critical',
                message: 'SEVERE HYPOXIA - Call emergency services NOW',
                detail: `${spo2}%`,
                action: 'emergency'
            };
        }

        // Critical hypoxia
        if (spo2 < this.thresholds.spo2.critical) {
            return {
                score: 20,
                status: 'critical',
                message: 'Critical oxygen level - Hospital oxygen needed',
                detail: `${spo2}%`,
                action: 'emergency'
            };
        }

        // Low oxygen
        if (spo2 < this.thresholds.spo2.concern) {
            score = 50;
            status = 'poor';
            message = 'Low oxygen saturation - Doctor evaluation today';
        }
        // Slightly low
        else if (spo2 < this.thresholds.spo2.normal) {
            score = 75;
            status = 'fair';
            message = 'Oxygen slightly low - Monitor closely';
        }
        // Normal
        else {
            score = 100;
            status = 'normal';
            message = 'Normal oxygen saturation';
        }

        return {
            score,
            status,
            message,
            detail: `${spo2}%`
        };
    }

    /**
     * BMI Score Calculation
     */
    calculateBMIScore(bmi) {
        if (!bmi || bmi <= 0) {
            return { score: 50, status: 'unknown', message: 'BMI data missing' };
        }

        let score = 100;
        let status = 'normal';
        let message = '';

        // Severe underweight
        if (bmi < 16) {
            score = 40;
            status = 'poor';
            message = 'Severely underweight - Nutritional support needed';
        }
        // Underweight
        else if (bmi < this.thresholds.bmi.underweight) {
            score = 70;
            status = 'fair';
            message = 'Underweight - Consider weight gain program';
        }
        // Normal (Asian-specific)
        else if (bmi <= this.thresholds.bmi.normalMax) {
            score = 100;
            status = 'normal';
            message = 'Healthy weight';
        }
        // Overweight (Asian-specific)
        else if (bmi <= this.thresholds.bmi.overweight) {
            score = 80;
            status = 'good';
            message = 'Slightly overweight - Weight management beneficial';
        }
        // Obese Class 1
        else if (bmi < this.thresholds.bmi.obese) {
            score = 60;
            status = 'fair';
            message = 'Overweight - Weight loss recommended';
        }
        // Obese Class 2+
        else {
            score = 40;
            status = 'poor';
            message = 'Obese - Medical weight management program needed';
        }

        return {
            score,
            status,
            message,
            detail: `${bmi.toFixed(1)} kg/m²`
        };
    }

    /**
     * Determine overall status based on total score
     */
    determineStatus(score) {
        if (score >= 85) return { level: 'excellent', color: 'green', label: 'Excellent' };
        if (score >= 70) return { level: 'good', color: 'blue', label: 'Good' };
        if (score >= 55) return { level: 'fair', color: 'yellow', label: 'Fair' };
        return { level: 'poor', color: 'red', label: 'Poor' };
    }

    /**
     * Generate personalized recommendations
     */
    generateRecommendations(totalScore, breakdown) {
        const recommendations = [];

        // Identify weakest areas
        const weakestAreas = Object.entries(breakdown)
            .map(([key, value]) => ({ key, score: value.score, status: value.status }))
            .filter(item => item.score < 70)
            .sort((a, b) => a.score - b.score);

        // Critical recommendations
        if (totalScore < 55) {
            recommendations.push({
                priority: 'critical',
                message: 'Your vital signs indicate significant health stress',
                actions: [
                    'Contact your doctor TODAY',
                    'Do NOT start any new exercise programs',
                    'Rest and monitor vitals every 4 hours',
                    'Keep emergency contacts informed'
                ]
            });
        }

        // Area-specific recommendations
        weakestAreas.forEach(area => {
            if (area.key === 'bloodPressure' && area.score < 70) {
                recommendations.push({
                    priority: 'high',
                    category: 'Blood Pressure',
                    message: 'Your blood pressure needs attention',
                    actions: [
                        'Reduce salt intake (< 5g per day)',
                        'Practice stress-reduction techniques',
                        'Monitor BP 2x daily',
                        'Consider doctor consultation if elevated for >1 week'
                    ]
                });
            }

            if (area.key === 'glucose' && area.score < 70) {
                recommendations.push({
                    priority: 'high',
                    category: 'Blood Sugar',
                    message: 'Your blood sugar control needs improvement',
                    actions: [
                        'Follow diabetes-friendly diet',
                        'Check glucose before/after meals',
                        'Increase physical activity gradually',
                        'Review medications with doctor'
                    ]
                });
            }

            if (area.key === 'bmi' && area.score < 70) {
                recommendations.push({
                    priority: 'medium',
                    category: 'Weight Management',
                    message: 'Weight optimization recommended',
                    actions: [
                        'Set realistic weight goal (lose 0.5-1 kg per week)',
                        'Track daily food intake',
                        'Aim for 150 minutes moderate exercise per week',
                        'Consider nutritionist consultation'
                    ]
                });
            }
        });

        // Positive reinforcement for good areas
        const strongAreas = Object.entries(breakdown)
            .filter(([_, value]) => value.score >= 85)
            .map(([key]) => key);

        if (strongAreas.length > 0) {
            recommendations.push({
                priority: 'low',
                category: 'Positive',
                message: 'Keep up the good work!',
                actions: [
                    `Your ${strongAreas.join(', ')} ${strongAreas.length > 1 ? 'are' : 'is'} excellent`,
                    'Continue current lifestyle habits',
                    'Maintain regular monitoring'
                ]
            });
        }

        return recommendations;
    }

    /**
     * Check for critical conditions that require immediate action
     */
    checkCriticalConditions(vitals) {
        const alerts = [];

        // BP Crisis
        if (vitals.bloodPressure?.systolic >= 180 || vitals.bloodPressure?.diastolic >= 110) {
            alerts.push({
                severity: 'critical',
                type: 'hypertensive_crisis',
                message: 'Hypertensive Crisis Detected',
                action: 'Call emergency services (102) immediately',
                vital: 'Blood Pressure',
                value: `${vitals.bloodPressure.systolic}/${vitals.bloodPressure.diastolic}`,
                timestamp: new Date().toISOString()
            });
        }

        // Severe Hypoglycemia
        if (vitals.glucose && vitals.glucose < 54) {
            alerts.push({
                severity: 'critical',
                type: 'severe_hypoglycemia',
                message: 'Severe Low Blood Sugar',
                action: 'Consume 15-20g fast-acting carbs NOW. Call someone to be with you.',
                vital: 'Blood Glucose',
                value: `${vitals.glucose} mg/dL`,
                timestamp: new Date().toISOString()
            });
        }

        // Severe Hyperglycemia
        if (vitals.glucose && vitals.glucose > 400) {
            alerts.push({
                severity: 'critical',
                type: 'severe_hyperglycemia',
                message: 'Dangerously High Blood Sugar',
                action: 'Seek immediate medical care. Risk of DKA.',
                vital: 'Blood Glucose',
                value: `${vitals.glucose} mg/dL`,
                timestamp: new Date().toISOString()
            });
        }

        // Critical Low Oxygen
        if (vitals.spo2 && vitals.spo2 < 88) {
            alerts.push({
                severity: 'critical',
                type: 'severe_hypoxia',
                message: 'Critical Low Oxygen Level',
                action: 'Seek emergency medical care immediately',
                vital: 'SpO2',
                value: `${vitals.spo2}%`,
                timestamp: new Date().toISOString()
            });
        }

        return alerts;
    }

    /**
     * Calculate confidence level based on data completeness
     */
    calculateConfidence(vitals) {
        const requiredFields = ['bloodPressure', 'heartRate', 'glucose', 'spo2', 'bmi'];
        const presentFields = requiredFields.filter(field =>
            vitals[field] &&
            (typeof vitals[field] === 'object' ?
                Object.values(vitals[field]).some(v => v !== null && v !== undefined) :
                vitals[field] !== null && vitals[field] !== undefined)
        );

        const completeness = (presentFields.length / requiredFields.length) * 100;

        // Check data freshness (vitals should be recent)
        const dataAge = vitals.timestamp ?
            (Date.now() - new Date(vitals.timestamp).getTime()) / (1000 * 60 * 60) :
            null;

        let freshnessScore = 100;
        if (dataAge) {
            if (dataAge > 48) freshnessScore = 50; // >2 days old
            else if (dataAge > 24) freshnessScore = 75; // >1 day old
            else freshnessScore = 100; // Recent
        }

        const overallConfidence = (completeness * 0.7 + freshnessScore * 0.3);

        return {
            score: Math.round(overallConfidence),
            level: overallConfidence >= 80 ? 'high' : overallConfidence >= 60 ? 'medium' : 'low',
            message: this.getConfidenceMessage(overallConfidence, completeness, freshnessScore)
        };
    }

    getConfidenceMessage(overall, completeness, freshness) {
        if (overall >= 80) return 'High confidence in assessment';
        if (completeness < 70) return 'Some vital signs missing - complete profile for better assessment';
        if (freshness < 70) return 'Vital signs are outdated - please log recent measurements';
        return 'Moderate confidence - consider updating vital signs';
    }

    /**
     * Validate input vitals
     */
    validateVitals(vitals) {
        if (!vitals || typeof vitals !== 'object') {
            throw new Error('Vitals must be an object');
        }

        // Blood pressure validation
        if (vitals.bloodPressure) {
            const { systolic, diastolic } = vitals.bloodPressure;
            if (systolic < 50 || systolic > 300) throw new Error('Invalid systolic BP');
            if (diastolic < 30 || diastolic > 200) throw new Error('Invalid diastolic BP');
        }

        // Heart rate validation
        if (vitals.heartRate) {
            if (vitals.heartRate < 30 || vitals.heartRate > 250) {
                throw new Error('Invalid heart rate');
            }
        }

        // Glucose validation
        if (vitals.glucose) {
            if (vitals.glucose < 20 || vitals.glucose > 700) {
                throw new Error('Invalid glucose reading');
            }
        }

        // SpO2 validation
        if (vitals.spo2) {
            if (vitals.spo2 < 50 || vitals.spo2 > 100) {
                throw new Error('Invalid SpO2 reading');
            }
        }

        // BMI validation
        if (vitals.bmi) {
            if (vitals.bmi < 10 || vitals.bmi > 80) {
                throw new Error('Invalid BMI');
            }
        }
    }
}

// Export for use
module.exports = VitalScoreCalculator;
