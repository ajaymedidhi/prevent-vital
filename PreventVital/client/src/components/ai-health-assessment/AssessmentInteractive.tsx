import { useState, useEffect } from 'react';
import QuestionCard from './QuestionCard';
import { ChevronLeft, ChevronRight, CheckCircle, Activity, Info, BarChart2, Heart, ShieldCheck, Thermometer, Brain } from 'lucide-react';

interface Question {
    id: string;
    question: string;
    description: string;
    type: 'single' | 'multiple' | 'scale' | 'input' | 'number-input';
    category: string;
    options?: Array<{ id: string; label: string; value: string | number; points?: number }>;
    inputs?: Array<{ id: string; label: string; placeholder: string; unit?: string; type: 'number' }>;
}

interface Answer {
    questionId: string;
    value: any;
}

type RiskCategory = 'Low Risk' | 'Moderate Risk' | 'High Risk';

interface ScoreResult {
    totalVitalScore: number;
    riskCategory: RiskCategory;
    ascvdRisk: number;
    bmi: number;
    breakdown: {
        ageScore: number;
        bmiScore: number;
        hypertensionScore: number;
        diabetesScore: number;
        familyHistoryScore: number;
        medicalConditionsScore: number;
        lifestyleScore: number;
    };
}

export default function AssessmentInteractive() {
    const [currentStep, setCurrentStep] = useState(1);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [results, setResults] = useState<ScoreResult | null>(null);

    useEffect(() => {
        setIsReady(true);
    }, []);

    // Questions Configuration
    const questions: Question[] = [
        {
            id: 'demographics',
            question: 'About You',
            description: 'Age and Gender are fundamental factors in calculating your health risk.',
            type: 'number-input',
            category: 'demographics',
            inputs: [
                { id: 'age', label: 'Age', placeholder: 'Enter your age', unit: 'years', type: 'number' }
            ]
        },
        {
            id: 'gender',
            question: 'Gender',
            description: 'Biological sex affects cardiovascular risk factors.',
            type: 'single',
            category: 'demographics',
            options: [
                { id: 'male', label: 'Male', value: 'male' },
                { id: 'female', label: 'Female', value: 'female' }
            ]
        },
        {
            id: 'anthropometry',
            question: 'Body Measurements',
            description: 'Standard measurements to calculate your BMI and metabolic risk.',
            type: 'number-input',
            category: 'bmi',
            inputs: [
                { id: 'weight', label: 'Weight', placeholder: 'e.g. 70', unit: 'kg', type: 'number' },
                { id: 'height', label: 'Height', placeholder: 'e.g. 170', unit: 'cm', type: 'number' }
            ]
        },
        {
            id: 'hypertension',
            question: 'Blood Pressure Status',
            description: 'Hypertension is a "silent killer" that increases heart attack and stroke risk.',
            type: 'single',
            category: 'clinical',
            options: [
                { id: 'htn_no', label: 'Normal / No History', value: 'no', points: 0 },
                { id: 'htn_controlled', label: 'Yes, Controlled with Meds', value: 'controlled', points: 3 },
                { id: 'htn_uncontrolled', label: 'Yes, Uncontrolled / High', value: 'uncontrolled', points: 6 }
            ]
        },
        {
            id: 'systolic_bp',
            question: 'Systolic Blood Pressure',
            description: 'The top number in your BP reading. Leave blank if unknown.',
            type: 'number-input',
            category: 'clinical',
            inputs: [
                { id: 'sbp', label: 'Systolic BP', placeholder: 'e.g. 120', unit: 'mmHg', type: 'number' }
            ]
        },
        {
            id: 'diabetes',
            question: 'Diabetes Status',
            description: 'Diabetes creates systemic inflammation and vascular damage.',
            type: 'single',
            category: 'clinical',
            options: [
                { id: 'dm_no', label: 'No Diabetes', value: 'no', points: 0 },
                { id: 'dm_controlled', label: 'Yes, Controlled', value: 'controlled', points: 3 },
                { id: 'dm_uncontrolled', label: 'Yes, Uncontrolled', value: 'uncontrolled', points: 6 }
            ]
        },
        {
            id: 'lifestyle_smoking',
            question: 'Smoking Habits',
            description: 'Smoking damages blood vessels and doubles cardiovascular risk.',
            type: 'single',
            category: 'lifestyle',
            options: [
                { id: 'smoker_no', label: 'Non-Smoker', value: 'no', points: 0 },
                { id: 'smoker_yes', label: 'Current Smoker', value: 'yes', points: 4 }
            ]
        },
        {
            id: 'family_history',
            question: 'Family History',
            description: 'Select conditions present in first-degree relatives (parents, siblings).',
            type: 'multiple',
            category: 'history',
            options: [
                { id: 'fh_cvd', label: 'Heart Disease', value: 'cvd', points: 2 },
                { id: 'fh_diabetes', label: 'Diabetes', value: 'diabetes', points: 2 },
                { id: 'fh_stroke', label: 'Stroke', value: 'stroke', points: 2 },
                { id: 'fh_htn', label: 'Hypertension', value: 'hypertension', points: 2 },
                { id: 'fh_none', label: 'No Known History', value: 'none', points: 0 }
            ]
        },
        {
            id: 'medical_conditions',
            question: 'Medical History',
            description: 'Do you have any of the following diagnosed conditions?',
            type: 'multiple',
            category: 'history',
            options: [
                { id: 'mc_ckd', label: 'Kidney Disease', value: 'ckd', points: 4 },
                { id: 'mc_cvd', label: 'Prior Heart Attack', value: 'cvd_history', points: 4 },
                { id: 'mc_stroke', label: 'Prior Stroke', value: 'stroke_history', points: 4 },
                { id: 'mc_cholesterol', label: 'High Cholesterol', value: 'high_chol', points: 2 },
                { id: 'mc_none', label: 'None', value: 'none', points: 0 }
            ]
        },
        {
            id: 'cholesterol_check',
            question: 'Cholesterol Profile',
            description: 'Lipid levels are key indicators of arterial health.',
            type: 'single',
            category: 'clinical',
            options: [
                { id: 'chol_normal', label: 'Normal Levels', value: 'normal', points: 0 },
                { id: 'chol_borderline', label: 'Borderline High', value: 'borderline', points: 2 },
                { id: 'chol_high', label: 'High Cholesterol', value: 'high', points: 5 }
            ]
        }
    ];

    const handleAnswer = (questionId: string, value: any) => {
        setAnswers(prev => {
            const idx = prev.findIndex(a => a.questionId === questionId);
            if (idx >= 0) {
                const updated = [...prev];
                updated[idx] = { questionId, value };
                return updated;
            }
            return [...prev, { questionId, value }];
        });
    };

    const getValue = (qId: string) => answers.find(a => a.questionId === qId)?.value;

    const calculateScores = () => {
        // Calculation Logic (Same as before)
        const age = Number(getValue('demographics')?.age || 0);
        let ageScore = 2;
        if (age >= 40 && age < 50) ageScore = 3;
        else if (age >= 50 && age < 60) ageScore = 4;
        else if (age >= 60) ageScore = 6;

        const weight = Number(getValue('anthropometry')?.weight || 0);
        const heightCm = Number(getValue('anthropometry')?.height || 0);
        const heightM = heightCm / 100;
        const bmi = (weight > 0 && heightM > 0) ? weight / (heightM * heightM) : 0;

        let bmiScore = 2;
        if (bmi >= 23 && bmi < 25) bmiScore = 4;
        else if (bmi >= 25 && bmi < 30) bmiScore = 6;
        else if (bmi >= 30) bmiScore = 8;

        const htnVal = getValue('hypertension');
        let htnScore = htnVal === 'controlled' ? 3 : htnVal === 'uncontrolled' ? 6 : 0;

        const dmVal = getValue('diabetes');
        let dmScore = dmVal === 'controlled' ? 3 : dmVal === 'uncontrolled' ? 6 : 0;

        const fhVal: string[] = getValue('family_history') || [];
        const fhScore = fhVal.includes('none') ? 0 : fhVal.length * 2;

        const mcVal: string[] = getValue('medical_conditions') || [];
        let mcScore = 0;
        if (!mcVal.includes('none')) {
            mcVal.forEach(c => {
                if (['ckd', 'cvd_history', 'stroke_history'].includes(c)) mcScore += 4;
                else mcScore += 2;
            });
        }

        let lifestyleScore = 2;
        if (getValue('lifestyle_smoking') === 'yes') lifestyleScore += 4;
        if (getValue('cholesterol_check') === 'high') lifestyleScore += 2;

        const totalVitalScore = ageScore + bmiScore + htnScore + dmScore + fhScore + mcScore + lifestyleScore;

        // ASCVD
        let ascvdPoints = 0;
        if (age < 35) ascvdPoints += 0;
        else if (age < 45) ascvdPoints += 4;
        else if (age < 55) ascvdPoints += 8;
        else if (age < 65) ascvdPoints += 12;
        else ascvdPoints += 15;

        const cholVal = getValue('cholesterol_check');
        if (cholVal === 'borderline') ascvdPoints += 2;
        if (cholVal === 'high') ascvdPoints += 5;

        const sbp = Number(getValue('systolic_bp')?.sbp || 120);
        if (sbp >= 130 && sbp < 140) ascvdPoints += 2;
        if (sbp >= 140 && sbp < 160) ascvdPoints += 3;
        if (sbp >= 160) ascvdPoints += 5;

        if (htnVal !== 'no') ascvdPoints += 3;
        if (dmVal !== 'no') ascvdPoints += 4;
        if (getValue('lifestyle_smoking') === 'yes') ascvdPoints += 4;
        if (getValue('gender') === 'male') ascvdPoints += 2;

        let baseRisk = 2;
        if (ascvdPoints > 5) baseRisk = 4;
        if (ascvdPoints > 10) baseRisk = 8;
        if (ascvdPoints > 15) baseRisk = 14;
        if (ascvdPoints > 20) baseRisk = 22;
        if (ascvdPoints > 25) baseRisk = 30;
        if (ascvdPoints > 30) baseRisk = 45;

        const adjustedRisk = baseRisk * 1.15;

        let riskCategory: RiskCategory = 'Low Risk';
        if (totalVitalScore >= 20 && totalVitalScore < 40) riskCategory = 'Moderate Risk';
        if (totalVitalScore >= 40) riskCategory = 'High Risk';

        setResults({
            totalVitalScore,
            riskCategory,
            ascvdRisk: adjustedRisk,
            bmi,
            breakdown: {
                ageScore, bmiScore, hypertensionScore: htnScore, diabetesScore: dmScore,
                familyHistoryScore: fhScore, medicalConditionsScore: mcScore, lifestyleScore
            }
        });
        setShowResults(true);
    };

    const handleNext = () => {
        if (currentStep < questions.length) {
            setCurrentStep(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            calculateScores();
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const getRiskColor = (cat: RiskCategory) => {
        if (cat === 'High Risk') return 'text-red-600 bg-red-50 border-red-100';
        if (cat === 'Moderate Risk') return 'text-amber-600 bg-amber-50 border-amber-100';
        return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    };

    const getRiskGradient = (cat: RiskCategory) => {
        if (cat === 'High Risk') return 'from-red-500 to-rose-600';
        if (cat === 'Moderate Risk') return 'from-amber-400 to-orange-500';
        return 'from-emerald-400 to-teal-500';
    };

    if (!isReady) return null;

    const currentQuestion = questions[currentStep - 1];
    const currentAnswer = getValue(currentQuestion?.id);

    if (showResults && results) {
        const riskColorClass = getRiskColor(results.riskCategory);
        const riskGradientClass = getRiskGradient(results.riskCategory);

        return (
            <div className="max-w-6xl mx-auto pb-12 animate-fade-in-up md:px-4 px-4">
                {/* Header */}
                <div className="text-center mb-8 lg:mb-12 relative">
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-200 -z-10 hidden lg:block"></div>
                    <span className="bg-background px-4 lg:px-6 text-slate-400 uppercase tracking-widest text-[10px] lg:text-xs font-bold">Vital Score Assessment v1.0</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                    {/* Main Score Card */}
                    <div className="lg:col-span-5 space-y-4 lg:space-y-6">
                        <div className={`rounded-[2rem] lg:rounded-[2.5rem] p-8 lg:p-10 text-white shadow-2xl relative overflow-hidden bg-gradient-to-br ${riskGradientClass} transition-all duration-500 hover:scale-[1.01]`}>
                            {/* Decorative Circles */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 lg:w-64 lg:h-64 bg-white/10 rounded-full blur-3xl" />
                            <div className="absolute -bottom-24 -left-24 w-48 h-48 lg:w-64 lg:h-64 bg-black/10 rounded-full blur-3xl" />

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3 py-1 lg:px-4 lg:py-1.5 rounded-full mb-6 lg:mb-8 border border-white/20 shadow-lg">
                                    <ShieldCheck size={14} className="text-white lg:w-4 lg:h-4" />
                                    <span className="text-xs lg:text-sm font-bold tracking-wide uppercase">{results.riskCategory}</span>
                                </div>

                                <div className="relative mb-4 lg:mb-6">
                                    <h3 className="text-7xl lg:text-9xl font-bold tracking-tighter drop-shadow-sm leading-none">{results.totalVitalScore}</h3>
                                    <p className="text-sm lg:text-lg font-medium opacity-80 uppercase tracking-widest mt-2 lg:mt-4">Total Vital Score</p>
                                </div>

                                <div className="w-full bg-black/20 rounded-full h-2 lg:h-3 mb-2 overflow-hidden backdrop-blur-sm">
                                    <div className="h-full bg-white/90 rounded-full shadow-sm" style={{ width: `${Math.min((results.totalVitalScore / 100) * 100, 100)}%` }} />
                                </div>
                                <div className="flex justify-between w-full text-[10px] lg:text-xs font-medium opacity-60 px-1">
                                    <span>0 (Excellent)</span>
                                    <span>100+ (Critical)</span>
                                </div>
                            </div>
                        </div>

                        {/* ASCVD Risk Card */}
                        <div className="bg-white rounded-[1.5rem] lg:rounded-[2rem] p-6 lg:p-8 border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 lg:p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Activity size={60} className="lg:w-20 lg:h-20" />
                            </div>
                            <h4 className="text-xs lg:text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">10-Year Cardiovascular Risk</h4>
                            <div className="flex items-baseline space-x-2 mb-3 lg:mb-4">
                                <span className={`text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${riskGradientClass}`}>
                                    {results.ascvdRisk.toFixed(1)}%
                                </span>
                                <span className="text-slate-500 font-medium text-sm">probability</span>
                            </div>
                            <p className="text-xs lg:text-sm text-slate-500 leading-relaxed">
                                Adjusted for Indian demographics (1.15x). This estimates your risk of developing heart disease or stroke in the next 10 years.
                            </p>
                        </div>
                    </div>

                    {/* Report & Recommendations */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* Recommendations Panel */}
                        <div className="bg-white rounded-[2rem] lg:rounded-[2.5rem] p-6 lg:p-10 border border-slate-100 shadow-xl shadow-slate-200/50">
                            <div className="flex items-center space-x-3 lg:space-x-4 mb-6 lg:mb-8">
                                <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-2xl flex items-center justify-center ${riskColorClass} bg-opacity-20`}>
                                    <Heart size={20} className={`lg:w-6 lg:h-6 ${riskColorClass.split(' ')[0]}`} />
                                </div>
                                <div>
                                    <h3 className="text-xl lg:text-2xl font-bold text-slate-900">Clinical Recommendations</h3>
                                    <p className="text-slate-500 text-xs lg:text-sm">Tailored based on your risk profile</p>
                                </div>
                            </div>

                            <div className="space-y-3 lg:space-y-4">
                                {results.riskCategory === 'Low Risk' && (
                                    <>
                                        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex gap-3 lg:gap-4">
                                            <CheckCircle className="text-emerald-600 flex-shrink-0 mt-0.5 w-5 h-5" />
                                            <div>
                                                <h5 className="font-bold text-emerald-900 text-sm lg:text-base">Maintain Healthy Habits</h5>
                                                <p className="text-emerald-700/80 text-xs lg:text-sm mt-0.5 lg:mt-1">Your risk profile is excellent. Continue your current regimen.</p>
                                            </div>
                                        </div>
                                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex gap-3 lg:gap-4">
                                            <Activity className="text-slate-500 flex-shrink-0 mt-0.5 w-5 h-5" />
                                            <div>
                                                <h5 className="font-bold text-slate-900 text-sm lg:text-base">Preventive Monitoring</h5>
                                                <p className="text-slate-500 text-xs lg:text-sm mt-0.5 lg:mt-1">Schedule annual health check-ups to track key metrics.</p>
                                            </div>
                                        </div>
                                    </>
                                )}
                                {results.riskCategory === 'Moderate Risk' && (
                                    <>
                                        <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 flex gap-3 lg:gap-4">
                                            <Activity className="text-amber-600 flex-shrink-0 mt-0.5 w-5 h-5" />
                                            <div>
                                                <h5 className="font-bold text-amber-900 text-sm lg:text-base">Lifestyle Modification Needed</h5>
                                                <p className="text-amber-700/80 text-xs lg:text-sm mt-0.5 lg:mt-1">Immediate focus on diet, exercise, and stress management is recommended.</p>
                                            </div>
                                        </div>
                                        {results.bmi >= 23 && (
                                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex gap-3 lg:gap-4">
                                                <BarChart2 className="text-slate-500 flex-shrink-0 mt-0.5 w-5 h-5" />
                                                <div>
                                                    <h5 className="font-bold text-slate-900 text-sm lg:text-base">Weight Management</h5>
                                                    <p className="text-slate-500 text-xs lg:text-sm mt-0.5 lg:mt-1">Your BMI of {results.bmi.toFixed(1)} suggests a need for weight optimization.</p>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                                {results.riskCategory === 'High Risk' && (
                                    <>
                                        <div className="p-4 rounded-xl bg-red-50 border border-red-100 flex gap-3 lg:gap-4 border-l-4 border-l-red-500">
                                            <Thermometer className="text-red-600 flex-shrink-0 mt-0.5 w-5 h-5" />
                                            <div>
                                                <h5 className="font-bold text-red-900 text-sm lg:text-base">Medical Consultation Required</h5>
                                                <p className="text-red-700/80 text-xs lg:text-sm mt-0.5 lg:mt-1">Please schedule an appointment with a specialist immediately.</p>
                                            </div>
                                        </div>
                                        <div className="p-4 rounded-xl bg-red-50/50 border border-red-100 flex gap-3 lg:gap-4">
                                            <Brain className="text-red-600 flex-shrink-0 mt-0.5 w-5 h-5" />
                                            <div>
                                                <h5 className="font-bold text-red-900 text-sm lg:text-base">Comprehensive Screening</h5>
                                                <p className="text-red-700/80 text-xs lg:text-sm mt-0.5 lg:mt-1">Full cardiovascular and metabolic panel recommended.</p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="mt-6 lg:mt-8 pt-6 lg:pt-8 border-t border-slate-100 flex flex-col gap-3 lg:flex-row lg:gap-4">
                                <button
                                    onClick={() => window.location.href = '/contact'}
                                    className="flex-1 bg-slate-900 text-white font-bold py-3 lg:py-4 px-6 lg:px-8 rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 text-sm lg:text-base"
                                >
                                    Book Specialist Consultation
                                </button>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="px-6 lg:px-8 py-3 lg:py-4 bg-white border-2 border-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-50 hover:border-slate-200 transition-all text-sm lg:text-base"
                                >
                                    Retake Assessment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto pb-16 lg:pb-32 px-4 lg:px-8">
            {!showResults && (
                <>
                    <div className="mb-8 lg:mb-16 sticky top-6 z-30 bg-white/90 backdrop-blur-xl py-5 px-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/60">
                        <div className="flex justify-between items-end mb-4">
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Assessment Progress</span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-slate-900 font-mono tracking-tight">
                                        {Math.round((currentStep / questions.length) * 100)}%
                                    </span>
                                    <span className="text-sm font-medium text-slate-400">completed</span>
                                </div>
                            </div>
                            <span className="text-sm font-bold text-slate-600 bg-slate-100/80 px-4 py-1.5 rounded-full border border-slate-200/50">
                                Step {currentStep} of {questions.length}
                            </span>
                        </div>
                        <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
                            <div
                                className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(37,99,235,0.4)] relative"
                                style={{ width: `${(currentStep / questions.length) * 100}%` }}
                            >
                                <div className="absolute inset-0 bg-white/20 animate-[pulse_2s_ease-in-out_infinite]" />
                            </div>
                        </div>
                    </div>

                    <div className="animate-fade-in-up px-4 md:px-0">
                        <QuestionCard
                            question={currentQuestion.question}
                            description={currentQuestion.description}
                            type={currentQuestion.type as any}
                            options={currentQuestion.options}
                            // @ts-ignore
                            inputs={currentQuestion.inputs}
                            selectedValue={currentAnswer}
                            onAnswer={(value) => handleAnswer(currentQuestion.id, value)}
                        />
                    </div>

                    {/* Navigation Bar */}
                    <div className="mt-10 lg:mt-16">
                        <div className="max-w-4xl mx-auto flex items-center justify-between gap-6">
                            <button
                                onClick={handlePrevious}
                                disabled={currentStep === 1}
                                className={`flex items-center space-x-3 px-8 py-4 rounded-2xl font-bold transition-all duration-300 text-base ${currentStep === 1
                                    ? 'opacity-0 cursor-default hidden lg:flex'
                                    : 'text-slate-500 hover:text-slate-900 hover:bg-white hover:shadow-lg hover:shadow-slate-200/50 active:scale-95'
                                    }`}
                            >
                                <ChevronLeft size={22} />
                                <span>Back</span>
                            </button>

                            <button
                                onClick={handleNext}
                                disabled={!currentAnswer && currentAnswer !== 0}
                                className="flex-1 lg:flex-none flex items-center justify-center space-x-3 px-12 py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:shadow-2xl hover:shadow-blue-600/40 hover:-translate-y-1 active:translate-y-0 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:active:translate-y-0 text-base lg:text-lg group"
                            >
                                <span>{currentStep === questions.length ? 'Calculate Vital Score' : 'Next Question'}</span>
                                <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
