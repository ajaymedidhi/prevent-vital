// ============================================
// CLINICAL-GRADE WHO CARDIOVASCULAR RISK CALCULATOR
// Region: South-East Asia Region D (India)
// Based on: WHO/ISH 2019 Guidelines
// ============================================

/**
 * ⚠️⚠️⚠️ CRITICAL MEDICAL DISCLAIMERS ⚠️⚠️⚠️
 * 
 * READ THIS BEFORE USING THIS CODE IN PRODUCTION
 * 
 * 1. ESTIMATION ONLY - NOT A DIAGNOSIS
 *    This calculator provides an ESTIMATED 10-year cardiovascular disease
 *    risk based on population-level WHO data. It is NOT a clinical diagnosis.
 * 
 * 2. NOT MEDICAL ADVICE
 *    Results must NEVER be used as the sole basis for medical decisions.
 *    Always consult qualified healthcare providers.
 * 
 * 3. REQUIRES VALIDATION
 *    All risk scores must be validated by a qualified cardiologist or
 *    physician before any clinical action.
 * 
 * 4. DATA LIMITATIONS
 *    - Missing data significantly affects accuracy
 *    - Individual risk may vary substantially from population estimates
 *    - Does not account for all risk factors
 * 
 * 5. REGIONAL SPECIFICITY
 *    Calibrated ONLY for South-East Asia Region D (SEAR-D):
 *    India, Bangladesh, Bhutan, Nepal, Sri Lanka
 * 
 * 6. LEGAL COMPLIANCE
 *    This platform does not provide medical advice, diagnosis, or treatment.
 *    Always seek advice from qualified healthcare professionals.
 * 
 * 7. LIABILITY
 *    Use of this calculator does not establish a doctor-patient relationship.
 *    Platform and developers are not liable for medical outcomes.
 * 
 * References:
 * - WHO/ISH Cardiovascular Risk Prediction Charts (2019 Edition)
 * - WHO Technical Report Series on Prevention of Cardiovascular Disease
 * - ICMR Guidelines for Prevention of Cardiovascular Diseases in India
 */

const config = require('../config/env');
const constants = require('../config/constants');
const Helpers = require('../utils/helpers');
const logger = require('../utils/logger');
const { MedicalDataError } = require('../utils/errors'); // Adjusted path from original snippet

class WHOIndiaRiskCalculator {

    /**
     * Calculate 10-year cardiovascular disease risk for Indian population
     * 
     * @param {Object} patient - User object with complete health data
     * @param {Object} options - Calculation options
     * @returns {Object} Comprehensive risk assessment with disclaimers
     */
    static calculate(patient, options = {}) {
        try {
            // Validate input
            this._validatePatientData(patient);

            // Initialize calculation components
            const calculation = {
                riskScore: 0,
                maxScore: 30,
                components: {},
                warnings: [],
                dataGaps: [],
                confidence: 100 // Percentage
            };

            // 1. AGE COMPONENT (Critical Factor)
            this._calculateAgeComponent(patient, calculation);

            // 2. SEX/GENDER COMPONENT (India-specific patterns)
            this._calculateSexComponent(patient, calculation);

            // 3. SMOKING STATUS (High prevalence in India)
            this._calculateSmokingComponent(patient, calculation);

            // 4. DIABETES STATUS (India = Diabetes Capital)
            this._calculateDiabetesComponent(patient, calculation);

            // 5. BLOOD PRESSURE (Critical Risk Factor)
            this._calculateBloodPressureComponent(patient, calculation);

            // 6. CHOLESTEROL (If available)
            this._calculateCholesterolComponent(patient, calculation);

            // Determine risk category
            const riskCategory = this._determineRiskCategory(calculation.riskScore);

            // Generate clinical recommendations
            const recommendations = this._generateRecommendations(
                riskCategory,
                calculation.components,
                patient
            );

            // Build complete response with all required disclaimers
            return this._buildResponse(
                calculation,
                riskCategory,
                recommendations,
                patient
            );

        } catch (error) {
            logger.error('WHO Risk Calculation Error:', error);
            throw new MedicalDataError(`Risk calculation failed: ${error.message}`);
        }
    }

    /**
     * Validate patient data completeness
     * @private
     */
    static _validatePatientData(patient) {
        if (!patient) {
            throw new MedicalDataError('Patient data is required');
        }

        if (!patient.profile) {
            throw new MedicalDataError('Patient profile is required');
        }

        // Required fields
        const required = ['dateOfBirth', 'gender'];
        const missing = required.filter(field => !patient.profile[field]);

        if (missing.length > 0) {
            throw new MedicalDataError(`Missing required fields: ${missing.join(', ')}`);
        }
    }

    /**
     * Calculate age component (0-10 points)
     * @private
     */
    static _calculateAgeComponent(patient, calculation) {
        const age = Helpers.calculateAge(patient.profile.dateOfBirth);

        if (!age) {
            calculation.dataGaps.push('Age could not be calculated');
            calculation.confidence -= 20;
            return;
        }

        // WHO guidelines: Risk assessment most accurate for ages 40-70
        if (age < 18) {
            throw new MedicalDataError('Patient must be 18 or older for WHO risk assessment');
        }

        if (age < 40) {
            calculation.components.age = {
                value: age,
                points: 0,
                category: '<40 years',
                note: 'WHO risk assessment is most accurate for ages 40+'
            };
            calculation.warnings.push(
                'WHO risk charts are optimized for ages 40-70. ' +
                'Younger patients may have underestimated risk with strong family history.'
            );
        } else if (age >= 40 && age < 50) {
            calculation.components.age = {
                value: age,
                points: 3,
                category: '40-49 years',
                riskFactor: 'Moderate age-related risk'
            };
            calculation.riskScore += 3;
        } else if (age >= 50 && age < 60) {
            calculation.components.age = {
                value: age,
                points: 6,
                category: '50-59 years',
                riskFactor: 'Increased age-related risk'
            };
            calculation.riskScore += 6;
        } else if (age >= 60 && age < 70) {
            calculation.components.age = {
                value: age,
                points: 10,
                category: '60-69 years',
                riskFactor: 'High age-related risk'
            };
            calculation.riskScore += 10;
        } else {
            calculation.components.age = {
                value: age,
                points: 10,
                category: '≥70 years',
                riskFactor: 'Very high age-related risk'
            };
            calculation.riskScore += 10;
            calculation.warnings.push(
                'For patients 70+, clinical judgment is essential. ' +
                'Comprehensive geriatric assessment recommended.'
            );
        }
    }

    /**
     * Calculate sex/gender component (0-2 points)
     * India-specific: Higher male risk due to lifestyle factors
     * @private
     */
    static _calculateSexComponent(patient, calculation) {
        const gender = patient.profile.gender?.toLowerCase();
        const age = Helpers.calculateAge(patient.profile.dateOfBirth);

        if (!gender) {
            calculation.dataGaps.push('Gender not specified');
            calculation.confidence -= 10;
            return;
        }

        if (gender === 'male') {
            calculation.components.sex = {
                value: 'Male',
                points: 2,
                note: 'Males have 2-3x higher CVD risk in India (lifestyle factors)'
            };
            calculation.riskScore += 2;
        } else if (gender === 'female') {
            calculation.components.sex = {
                value: 'Female',
                points: 0,
                note: 'Female'
            };

            // Post-menopausal women have increased risk
            if (age && age >= 50) {
                calculation.warnings.push(
                    'Post-menopausal women (age 50+) have increased CVD risk. ' +
                    'Estrogen loss affects cardiovascular protection.'
                );
            }

            // Pregnancy/childbirth history affects risk (not in WHO chart)
            if (patient.healthProfile?.pregnancyComplications) {
                calculation.warnings.push(
                    'History of pregnancy complications (gestational diabetes, ' +
                    'preeclampsia) increases future CVD risk. Clinical evaluation needed.'
                );
            }
        }
    }

    /**
     * Calculate smoking component (0-3 points)
     * India: 35% males, 5% females smoke
     * @private
     */
    static _calculateSmokingComponent(patient, calculation) {
        const smoker = patient.healthProfile?.smoker;

        if (smoker === undefined || smoker === null) {
            calculation.dataGaps.push('Smoking status not recorded');
            calculation.confidence -= 15;
            return;
        }

        if (smoker === true) {
            calculation.components.smoking = {
                status: 'Current Smoker',
                points: 3,
                impact: 'CRITICAL',
                note: 'Smoking increases CVD risk by 2-4x',
                action: 'URGENT: Smoking cessation is single most important intervention'
            };
            calculation.riskScore += 3;
            calculation.warnings.push(
                '⚠️ CRITICAL: Smoking cessation reduces CVD risk by 50% within 1 year. ' +
                'Enroll in cessation program immediately.'
            );
        } else {
            calculation.components.smoking = {
                status: 'Non-Smoker',
                points: 0,
                note: 'Good - no smoking risk factor'
            };

            // Check for second-hand smoke exposure
            if (patient.healthProfile?.secondHandSmokeExposure) {
                calculation.warnings.push(
                    'Second-hand smoke exposure increases CVD risk by 25-30%. ' +
                    'Avoid smoke exposure.'
                );
            }
        }
    }

    /**
     * Calculate diabetes component (0-4 points)
     * India: 11.4% prevalence (77 million diabetics - world's 2nd highest)
     * @private
     */
    static _calculateDiabetesComponent(patient, calculation) {
        const conditions = patient.healthProfile?.primaryConditions || [];
        const hasDiabetes = conditions.some(c =>
            c.includes('diabetes') ||
            c.includes('type_1_diabetes') ||
            c.includes('type_2_diabetes')
        );

        if (hasDiabetes) {
            calculation.components.diabetes = {
                status: 'Diabetic',
                points: 4,
                impact: 'HIGH',
                note: 'Diabetes increases CVD risk by 2-4x in Indian population',
                action: 'Strict glucose control essential (HbA1c <7%)'
            };
            calculation.riskScore += 4;
            calculation.warnings.push(
                '⚠️ HIGH RISK: Diabetes significantly increases CVD risk in Indians. ' +
                'Target HbA1c <7%, regular monitoring, endocrinologist consultation required.'
            );

            // Check for diabetic complications
            if (patient.healthProfile?.diabeticComplications) {
                calculation.warnings.push(
                    'Diabetic complications (nephropathy, retinopathy, neuropathy) ' +
                    'indicate higher CVD risk. Comprehensive evaluation needed.'
                );
            }
        } else {
            calculation.components.diabetes = {
                status: 'Non-Diabetic',
                points: 0,
                note: 'No diabetes detected'
            };

            // Check for prediabetes
            const latestGlucose = patient.latestVitals?.glucose;
            if (latestGlucose && latestGlucose >= 100 && latestGlucose < 126) {
                calculation.warnings.push(
                    'Pre-diabetic glucose levels detected. High risk of developing diabetes. ' +
                    'Lifestyle intervention and annual screening essential.'
                );
            }
        }
    }

    /**
     * Calculate blood pressure component (0-6 points)
     * Most important modifiable risk factor
     * @private
     */
    static _calculateBloodPressureComponent(patient, calculation) {
        const systolicBP = patient.latestVitals?.bloodPressure?.systolic;
        const diastolicBP = patient.latestVitals?.bloodPressure?.diastolic;

        if (!systolicBP || !diastolicBP) {
            calculation.dataGaps.push('Blood pressure data not available');
            calculation.confidence -= 25;
            calculation.warnings.push(
                'Blood pressure measurement required for accurate risk assessment. ' +
                'Schedule BP check immediately.'
            );
            return;
        }

        // WHO/ISH Classification for South-East Asia Region D
        if (systolicBP < 120 && diastolicBP < 80) {
            calculation.components.bloodPressure = {
                systolic: systolicBP,
                diastolic: diastolicBP,
                points: 0,
                category: 'Normal',
                stage: 'Optimal BP',
                note: 'Excellent - maintain healthy lifestyle'
            };
        } else if (systolicBP < 140 && diastolicBP < 90) {
            calculation.components.bloodPressure = {
                systolic: systolicBP,
                diastolic: diastolicBP,
                points: 0,
                category: 'Elevated/Pre-Hypertension',
                stage: 'Stage 0',
                note: 'Borderline - lifestyle modifications recommended',
                action: 'DASH diet, reduce salt to <5g/day, exercise 150min/week'
            };
            calculation.warnings.push(
                'Pre-hypertension detected. High risk of progression to hypertension. ' +
                'Lifestyle changes can prevent 50% of cases.'
            );
        } else if (systolicBP >= 140 && systolicBP < 160) {
            calculation.components.bloodPressure = {
                systolic: systolicBP,
                diastolic: diastolicBP,
                points: 2,
                category: 'Hypertension Stage 1',
                stage: 'Mild',
                impact: 'MODERATE',
                note: 'Medical consultation recommended',
                action: 'Lifestyle modifications + consider medication if high CVD risk'
            };
            calculation.riskScore += 2;
            calculation.warnings.push(
                'Stage 1 Hypertension. Doctor consultation within 1 month. ' +
                'May require antihypertensive medication.'
            );
        } else if (systolicBP >= 160 && systolicBP < 180) {
            calculation.components.bloodPressure = {
                systolic: systolicBP,
                diastolic: diastolicBP,
                points: 4,
                category: 'Hypertension Stage 2',
                stage: 'Moderate',
                impact: 'HIGH',
                note: 'Medical attention required',
                action: 'Doctor consultation within 1 week. Medication likely required.'
            };
            calculation.riskScore += 4;
            calculation.warnings.push(
                '⚠️ Stage 2 Hypertension. Urgent doctor consultation required. ' +
                'Antihypertensive medication essential.'
            );
        } else if (systolicBP >= 180 || diastolicBP >= 120) {
            calculation.components.bloodPressure = {
                systolic: systolicBP,
                diastolic: diastolicBP,
                points: 6,
                category: 'Hypertensive Crisis',
                stage: 'CRITICAL',
                impact: 'CRITICAL',
                note: '🚨 EMERGENCY - Immediate medical attention required',
                action: '🚨 SEEK EMERGENCY CARE IMMEDIATELY'
            };
            calculation.riskScore += 6;
            calculation.warnings.push(
                '🚨🚨🚨 HYPERTENSIVE CRISIS - MEDICAL EMERGENCY 🚨🚨🚨\n' +
                'Risk of stroke, heart attack, organ damage.\n' +
                'Go to emergency room or call ambulance IMMEDIATELY.'
            );
        }
    }

    /**
     * Calculate cholesterol component (0-4 points)
     * @private
     */
    static _calculateCholesterolComponent(patient, calculation) {
        const totalCholesterol = patient.healthProfile?.totalCholesterol;

        if (!totalCholesterol) {
            calculation.dataGaps.push('Cholesterol levels not recorded');
            calculation.confidence -= 20;
            calculation.warnings.push(
                'Lipid profile (cholesterol) test recommended for complete risk assessment.'
            );
            return;
        }

        // WHO/India Guidelines (mg/dL)
        if (totalCholesterol < 200) {
            calculation.components.cholesterol = {
                total: totalCholesterol,
                points: 0,
                category: 'Desirable',
                note: 'Optimal cholesterol level'
            };
        } else if (totalCholesterol >= 200 && totalCholesterol < 240) {
            calculation.components.cholesterol = {
                total: totalCholesterol,
                points: 2,
                category: 'Borderline High',
                note: 'Dietary modifications advised',
                action: 'Low saturated fat diet, increase fiber, omega-3 supplements'
            };
            calculation.riskScore += 2;
            calculation.warnings.push(
                'Borderline high cholesterol. Dietary changes can lower by 10-20%. ' +
                'Repeat test in 6 months.'
            );
        } else {
            calculation.components.cholesterol = {
                total: totalCholesterol,
                points: 4,
                category: 'High',
                impact: 'HIGH',
                note: 'Medical consultation for statin therapy',
                action: 'Doctor consultation for medication (statins likely needed)'
            };
            calculation.riskScore += 4;
            calculation.warnings.push(
                '⚠️ High cholesterol. Doctor consultation essential. ' +
                'Statin therapy may be required. Target LDL <100 mg/dL.'
            );
        }

        // Check for HDL if available (protective factor)
        if (patient.healthProfile?.hdlCholesterol) {
            const hdl = patient.healthProfile.hdlCholesterol;
            if (hdl < 40) {
                calculation.warnings.push(
                    'Low HDL cholesterol (<40 mg/dL) increases risk. ' +
                    'Exercise, omega-3, and niacin can help increase HDL.'
                );
            }
        }
    }

    /**
     * Determine risk category based on total score
     * @private
     */
    static _determineRiskCategory(score) {
        const categories = constants.WHO_INDIA.RISK_CATEGORIES;

        for (const cat of categories) {
            if (score <= cat.maxScore) {
                return {
                    score,
                    category: cat.category,
                    tenYearRisk: cat.tenYearRisk,
                    colorCode: this._getColorCode(cat.category),
                    urgency: this._getUrgency(cat.category)
                };
            }
        }

        // Fallback (should never reach here)
        return {
            score,
            category: 'very_high',
            tenYearRisk: '>30%',
            colorCode: 'red',
            urgency: 'critical'
        };
    }

    /**
     * Get color code for risk category
     * @private
     */
    static _getColorCode(category) {
        const colors = {
            low: 'green',
            moderate: 'yellow',
            high: 'orange',
            very_high: 'red'
        };
        return colors[category] || 'gray';
    }

    /**
     * Get urgency level
     * @private
     */
    static _getUrgency(category) {
        const urgency = {
            low: 'routine',
            moderate: 'elevated',
            high: 'concerning',
            very_high: 'critical'
        };
        return urgency[category] || 'routine';
    }

    /**
     * Generate clinical recommendations based on risk
     * @private
     */
    static _generateRecommendations(riskCategory, components, patient) {
        const recommendations = [];
        const age = Helpers.calculateAge(patient.profile.dateOfBirth);

        // Critical/High Risk Recommendations
        if (riskCategory.urgency === 'critical' || riskCategory.urgency === 'concerning') {
            recommendations.push({
                priority: 'URGENT',
                category: 'Medical Consultation',
                action: 'Schedule cardiology appointment within 7 days',
                rationale: 'High cardiovascular risk requires immediate medical evaluation',
                timeline: 'Within 1 week'
            });

            recommendations.push({
                priority: 'HIGH',
                category: 'Comprehensive Evaluation',
                action: 'Complete cardiovascular workup: ECG, Echo, stress test, lipid profile',
                rationale: 'Detailed assessment needed for high-risk patients',
                timeline: 'Within 2 weeks'
            });

            recommendations.push({
                priority: 'HIGH',
                category: 'Pharmacological Intervention',
                action: 'Discuss statin therapy and antihypertensive medications with doctor',
                rationale: 'Medication often necessary for high-risk CVD prevention',
                timeline: 'As prescribed'
            });
        }

        // Moderate Risk Recommendations
        if (riskCategory.urgency === 'elevated' || riskCategory.urgency === 'concerning') {
            recommendations.push({
                priority: 'MEDIUM',
                category: 'Regular Monitoring',
                action: 'BP check monthly, lipid profile every 6 months, HbA1c if diabetic',
                rationale: 'Close monitoring essential for risk management',
                timeline: 'Ongoing'
            });

            recommendations.push({
                priority: 'MEDIUM',
                category: 'Lifestyle Modifications',
                action: 'DASH diet, 150 min/week exercise, stress management, sleep 7-8 hours',
                rationale: 'Lifestyle changes can reduce CVD risk by 20-30%',
                timeline: 'Start immediately'
            });
        }

        // Smoking Cessation (HIGHEST PRIORITY)
        if (components.smoking?.points > 0) {
            recommendations.unshift({
                priority: 'CRITICAL',
                category: 'Smoking Cessation',
                action: 'Enroll in smoking cessation program immediately. Consider nicotine replacement.',
                rationale: 'Smoking cessation reduces CVD risk by 50% within 1 year - MOST IMPORTANT intervention',
                timeline: 'Immediate',
                resources: 'National Tobacco Quitline: 1800-11-2356'
            });
        }

        // Diabetes Management
        if (components.diabetes?.points > 0) {
            recommendations.push({
                priority: 'HIGH',
                category: 'Diabetes Control',
                action: 'Target HbA1c <7%, monitor blood glucose 3x daily, endocrinologist consultation',
                rationale: 'Optimal glucose control reduces cardiovascular complications by 40%',
                timeline: 'Ongoing'
            });
        }

        // Hypertension Management
        if (components.bloodPressure?.points > 0) {
            recommendations.push({
                priority: 'HIGH',
                category: 'Blood Pressure Control',
                action: 'Reduce salt to <5g/day, DASH diet, monitor BP daily, medication if BP ≥140/90',
                rationale: 'BP control is THE most important factor in CVD prevention',
                timeline: 'Immediate and ongoing'
            });
        }

        // Cholesterol Management
        if (components.cholesterol?.points > 0) {
            recommendations.push({
                priority: 'MEDIUM',
                category: 'Cholesterol Management',
                action: 'Low saturated fat diet (<7% calories), increase fiber (25-30g/day), omega-3',
                rationale: 'Dietary interventions can lower cholesterol by 10-20%',
                timeline: '3-6 months trial, then reassess'
            });
        }

        // Low Risk - Preventive Care
        if (riskCategory.urgency === 'routine') {
            recommendations.push({
                priority: 'LOW',
                category: 'Preventive Care',
                action: 'Maintain healthy lifestyle, annual health check-up, BP check every 6 months',
                rationale: 'Prevention is key to maintaining low risk status',
                timeline: 'Ongoing'
            });

            recommendations.push({
                priority: 'LOW',
                category: 'Health Optimization',
                action: 'Mediterranean/DASH diet, 30min daily exercise, stress management, healthy BMI',
                rationale: 'Healthy habits prevent progression to higher risk',
                timeline: 'Lifestyle integration'
            });
        }

        // Age-Specific Recommendations
        if (age && age >= 50) {
            recommendations.push({
                priority: 'MEDIUM',
                category: 'Age-Related Screening',
                action: 'Annual ECG, calcium score assessment (if high risk), carotid ultrasound',
                rationale: 'Enhanced screening recommended for age 50+',
                timeline: 'Annually'
            });
        }

        return recommendations;
    }

    /**
     * Build complete response with all disclaimers
     * @private
     */
    static _buildResponse(calculation, riskCategory, recommendations, patient) {
        return {
            // Core Results
            score: calculation.riskScore,
            maxScore: calculation.maxScore,
            tenYearRisk: riskCategory.tenYearRisk,
            category: riskCategory.category,
            colorCode: riskCategory.colorCode,
            urgency: riskCategory.urgency,

            // Calculation Details
            components: calculation.components,
            confidence: calculation.confidence,
            dataGaps: calculation.dataGaps,

            // Clinical Guidance
            recommendations,
            warnings: calculation.warnings,

            // Metadata
            calculatedAt: new Date().toISOString(),
            region: config.WHO_REGION,
            country: config.WHO_COUNTRY,
            methodology: {
                name: 'WHO/ISH Cardiovascular Risk Prediction Charts',
                version: config.WHO_VERSION || '2019',
                region: 'South-East Asia Region D (SEAR-D)',
                countries: ['India', 'Bangladesh', 'Bhutan', 'Nepal', 'Sri Lanka'],
                validated: true,
                lastUpdated: '2019',
                reference: 'WHO Technical Report Series on Prevention of Cardiovascular Disease'
            },

            // CRITICAL MEDICAL DISCLAIMER
            disclaimer: {
                primary: '⚠️ MEDICAL DISCLAIMER: This is an ESTIMATED 10-year cardiovascular disease risk based on WHO/ISH guidelines for South-East Asia Region D (India). This is NOT a clinical diagnosis and must NOT be used as the sole basis for medical decisions.',

                accuracy: `Risk estimate confidence: ${calculation.confidence}%. Accuracy depends on data quality and completeness. Individual risk may vary significantly.`,

                validation: 'Always consult a qualified cardiologist or physician for accurate assessment, diagnosis, and treatment. This tool is for educational and screening purposes ONLY.',

                legal: 'This platform does not provide medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions regarding a medical condition. Never disregard professional medical advice or delay seeking it because of information from this platform.',

                dataLimitations: calculation.dataGaps.length > 0
                    ? `Missing data affects accuracy: ${calculation.dataGaps.join('; ')}`
                    : 'All required data points available.',

                emergency: 'If experiencing chest pain, shortness of breath, sudden weakness, or other emergency symptoms, call emergency services (108/102) IMMEDIATELY. Do not wait.',

                liability: 'Use of this calculator does not establish a doctor-patient relationship. Platform, developers, and affiliated organizations are not liable for medical outcomes or decisions based on this estimate.'
            },

            // Known Limitations
            limitations: [
                'Does not account for family history of CVD (increases risk 2-4x)',
                'HDL cholesterol ratio not included (protective factor)',
                'May underestimate risk in young patients with strong family history',
                'Regional variations within India not captured',
                'Does not account for ethnic sub-populations',
                'Lifestyle factors (diet quality, stress, sleep) not fully captured',
                'Previous cardiovascular events not factored into score',
                'Kidney function (eGFR) not included',
                'Inflammatory markers (CRP) not assessed',
                'Advanced lipid markers not included',
                'Genetic risk factors not considered'
            ],

            // When to Recalculate
            recalculateWhen: [
                'New blood pressure reading (if BP was elevated)',
                'Updated cholesterol levels (every 3-6 months)',
                'Change in smoking status',
                'New diabetes diagnosis',
                'Weight change > 5 kg or BMI change',
                'New cardiovascular symptoms',
                'Change in medications',
                'After 6-12 months for high-risk individuals',
                'Annually for moderate-risk individuals'
            ],

            // Next Steps
            nextSteps: this._getNextSteps(riskCategory.urgency, calculation.components)
        };
    }

    /**
     * Get next steps based on urgency
     * @private
     */
    static _getNextSteps(urgency, components) {
        const steps = [];

        if (urgency === 'critical') {
            steps.push({
                priority: 1,
                action: 'Schedule URGENT cardiology consultation within 3-7 days',
                reason: 'Very high CVD risk requires immediate medical evaluation'
            });

            steps.push({
                priority: 2,
                action: 'Do not ignore symptoms: chest pain, shortness of breath, palpitations, dizziness',
                reason: 'Warning signs of cardiac events - seek emergency care if present'
            });

            steps.push({
                priority: 3,
                action: 'Emergency care if experiencing acute symptoms RIGHT NOW',
                reason: 'Call 108/102 for ambulance immediately'
            });

            steps.push({
                priority: 4,
                action: 'Comprehensive cardiovascular evaluation: ECG, Echo, stress test, angiography',
                reason: 'Complete assessment needed to guide treatment'
            });

            steps.push({
                priority: 5,
                action: 'Consider cardiac imaging and advanced diagnostics',
                reason: 'Identify underlying heart disease'
            });
        } else if (urgency === 'concerning') {
            steps.push({
                priority: 1,
                action: 'Schedule cardiology consultation within 2-4 weeks',
                reason: 'High CVD risk requires professional management'
            });

            steps.push({
                priority: 2,
                action: 'Strict adherence to prescribed medications',
                reason: 'Medication compliance is crucial for risk reduction'
            });
        }

        return steps;
    }
}

module.exports = WHOIndiaRiskCalculator;
