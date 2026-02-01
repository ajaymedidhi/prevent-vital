
import { useState, useEffect } from 'react';
import AssessmentProgress from './AssessmentProgress';
import QuestionCard from './QuestionCard';
import HealthScoreCard from './HealthScoreCard';
import ResultsCard from './ResultsCard';
import WearableIntegration from './WearableIntegration';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

interface Question {
    id: string;
    question: string;
    description: string;
    type: 'single' | 'multiple' | 'scale' | 'input';
    category: string;
    options?: Array<{ id: string; label: string; value: string | number }>;
}

interface Answer {
    questionId: string;
    value: string | string[] | number;
}

interface HealthScore {
    score: number;
    category: string;
    status: 'excellent' | 'good' | 'moderate' | 'attention' | 'critical';
    description: string;
}

interface Recommendation {
    id: string;
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    icon: string;
}

export default function AssessmentInteractive() {
    const [currentStep, setCurrentStep] = useState(1);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [showWearablePrompt, setShowWearablePrompt] = useState(true);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setIsReady(true);
    }, []);

    const questions: Question[] = [
        {
            id: 'q1',
            question: 'What is your age group?',
            description: 'This helps us provide age-appropriate health recommendations.',
            type: 'single',
            category: 'demographics',
            options: [
                { id: 'age1', label: '18-30 years', value: '18-30' },
                { id: 'age2', label: '31-45 years', value: '31-45' },
                { id: 'age3', label: '46-60 years', value: '46-60' },
                { id: 'age4', label: '60+ years', value: '60+' }
            ]
        },
        {
            id: 'q2',
            question: 'Do you have any existing health conditions?',
            description: 'Select all that apply to help us understand your health profile.',
            type: 'multiple',
            category: 'medical-history',
            options: [
                { id: 'cond1', label: 'Diabetes', value: 'diabetes' },
                { id: 'cond2', label: 'Hypertension', value: 'hypertension' },
                { id: 'cond3', label: 'Heart Disease', value: 'heart-disease' },
                { id: 'cond4', label: 'Respiratory Issues', value: 'respiratory' },
                { id: 'cond5', label: 'None', value: 'none' }
            ]
        },
        {
            id: 'q3',
            question: 'How would you rate your current stress level?',
            description: 'On a scale of 1-10, where 1 is no stress and 10 is extreme stress.',
            type: 'scale',
            category: 'mental-health'
        },
        {
            id: 'q4',
            question: 'How many hours do you sleep per night on average?',
            description: 'Quality sleep is crucial for overall health and disease prevention.',
            type: 'single',
            category: 'lifestyle',
            options: [
                { id: 'sleep1', label: 'Less than 5 hours', value: '<5' },
                { id: 'sleep2', label: '5-6 hours', value: '5-6' },
                { id: 'sleep3', label: '7-8 hours', value: '7-8' },
                { id: 'sleep4', label: 'More than 8 hours', value: '>8' }
            ]
        },
        {
            id: 'q5',
            question: 'How often do you engage in physical exercise?',
            description: 'Regular physical activity is key to preventing chronic diseases.',
            type: 'single',
            category: 'lifestyle',
            options: [
                { id: 'ex1', label: 'Daily', value: 'daily' },
                { id: 'ex2', label: '3-5 times per week', value: '3-5-weekly' },
                { id: 'ex3', label: '1-2 times per week', value: '1-2-weekly' },
                { id: 'ex4', label: 'Rarely or never', value: 'rarely' }
            ]
        },
        {
            id: 'q6',
            question: 'Do you have a family history of chronic diseases?',
            description: 'Family history helps us assess your genetic risk factors.',
            type: 'multiple',
            category: 'family-history',
            options: [
                { id: 'fh1', label: 'Diabetes', value: 'diabetes' },
                { id: 'fh2', label: 'Heart Disease', value: 'heart-disease' },
                { id: 'fh3', label: 'Cancer', value: 'cancer' },
                { id: 'fh4', label: 'Hypertension', value: 'hypertension' },
                { id: 'fh5', label: 'None', value: 'none' }
            ]
        },
        {
            id: 'q7',
            question: 'How would you describe your diet?',
            description: 'Nutrition plays a vital role in disease prevention.',
            type: 'single',
            category: 'lifestyle',
            options: [
                { id: 'diet1', label: 'Balanced with fruits and vegetables', value: 'balanced' },
                { id: 'diet2', label: 'Mostly processed foods', value: 'processed' },
                { id: 'diet3', label: 'High protein, low carb', value: 'high-protein' },
                { id: 'diet4', label: 'Vegetarian/Vegan', value: 'vegetarian' }
            ]
        },
        {
            id: 'q8',
            question: 'Do you smoke or consume alcohol regularly?',
            description: 'These factors significantly impact long-term health outcomes.',
            type: 'multiple',
            category: 'lifestyle',
            options: [
                { id: 'sub1', label: 'Smoke regularly', value: 'smoke' },
                { id: 'sub2', label: 'Drink alcohol regularly', value: 'alcohol' },
                { id: 'sub3', label: 'Neither', value: 'neither' }
            ]
        }
    ];

    const healthScores: HealthScore[] = [
        {
            score: 78,
            category: 'Cardiovascular Health',
            status: 'good',
            description: 'Your heart health indicators are within healthy ranges'
        },
        {
            score: 65,
            category: 'Metabolic Health',
            status: 'moderate',
            description: 'Some metabolic markers need attention and lifestyle adjustments'
        },
        {
            score: 82,
            category: 'Mental Wellness',
            status: 'good',
            description: 'Your stress management and mental health are well-balanced'
        },
        {
            score: 55,
            category: 'Sleep Quality',
            status: 'attention',
            description: 'Sleep patterns indicate need for improvement in rest quality'
        }
    ];

    const recommendations: Recommendation[] = [
        {
            id: 'rec1',
            title: 'Personalized Diabetes Prevention Program',
            description: 'Based on your metabolic health score and family history, we recommend enrolling in our AI-guided diabetes prevention program with personalized nutrition plans and continuous glucose monitoring.',
            priority: 'high',
            icon: 'HeartIcon'
        },
        {
            id: 'rec2',
            title: 'Sleep Optimization Therapy',
            description: 'Your sleep quality assessment indicates potential for improvement. Our therapeutic programs include guided meditation, breathwork sessions, and sleep hygiene coaching.',
            priority: 'medium',
            icon: 'MoonIcon'
        },
        {
            id: 'rec3',
            title: 'Cardiovascular Wellness Monitoring',
            description: 'Continue maintaining your good cardiovascular health with our wearable-integrated monitoring system and quarterly health check-ins with medical professionals.',
            priority: 'low',
            icon: 'BoltIcon'
        },
        {
            id: 'rec4',
            title: 'Stress Management & Mental Wellness',
            description: 'Explore our comprehensive yoga and meditation programs designed to maintain your excellent mental wellness scores and prevent stress-related health issues.',
            priority: 'low',
            icon: 'SparklesIcon'
        }
    ];

    const totalSteps = questions.length;
    const completionPercentage = Math.round((currentStep / totalSteps) * 100);

    const getCurrentAnswer = (questionId: string): string | string[] | number => {
        const answer = answers.find(a => a.questionId === questionId);
        return answer?.value || '';
    };

    const handleAnswer = (questionId: string, value: string | string[] | number) => {
        setAnswers(prev => {
            const existing = prev.findIndex(a => a.questionId === questionId);
            if (existing >= 0) {
                const updated = [...prev];
                updated[existing] = { questionId, value };
                return updated;
            }
            return [...prev, { questionId, value }];
        });
    };

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(prev => prev + 1);
        } else {
            setShowResults(true);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleWearableConnect = (deviceId: string) => {
        console.log('Connecting device:', deviceId);
        setShowWearablePrompt(false);
    };

    const handleStartOver = () => {
        setCurrentStep(1);
        setAnswers([]);
        setShowResults(false);
        setShowWearablePrompt(true);
    };

    if (!isReady) {
        return (
            <div className="min-h-screen bg-background pt-24 pb-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="animate-pulse space-y-6">
                        <div className="h-8 bg-muted rounded w-3/4"></div>
                        <div className="h-4 bg-muted rounded w-1/2"></div>
                        <div className="h-64 bg-muted rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentStep - 1];
    const currentAnswer = getCurrentAnswer(currentQuestion.id);
    const isAnswered = currentAnswer !== '' &&
        (Array.isArray(currentAnswer) ? currentAnswer.length > 0 : true);

    return (
        <div className="max-w-4xl mx-auto pb-12">
            {!showResults ? (
                <>
                    {/* Modern Progress Header */}
                    <div className="mb-8">
                        {showWearablePrompt && currentStep === 1 && (
                            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 border border-slate-100 mb-6 mx-auto max-w-2xl transform transition-all duration-500 hover:scale-[1.01]">
                                <WearableIntegration onConnect={handleWearableConnect} />
                            </div>
                        )}

                        <div className="flex justify-between items-end mb-2 px-2">
                            <div className="text-sm font-semibold text-slate-400 uppercase tracking-widest">
                                Question {currentStep} of {totalSteps}
                            </div>
                            <div className="text-xl font-bold text-primary font-mono">
                                {completionPercentage}%
                            </div>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full transition-all duration-700 ease-out"
                                style={{ width: `${completionPercentage}%` }}
                            />
                        </div>
                    </div>

                    <div className="animate-fade-in-up">
                        <QuestionCard
                            question={currentQuestion.question}
                            description={currentQuestion.description}
                            type={currentQuestion.type}
                            options={currentQuestion.options}
                            selectedValue={currentAnswer}
                            onAnswer={(value) => handleAnswer(currentQuestion.id, value)}
                        />
                    </div>

                    <div className="flex items-center justify-between mt-8 px-2 max-w-2xl mx-auto">
                        <button
                            onClick={handlePrevious}
                            disabled={currentStep === 1}
                            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${currentStep === 1
                                ? 'opacity-0 cursor-default'
                                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                                }`}
                        >
                            <ChevronLeft size={20} />
                            <span>Previous</span>
                        </button>

                        <button
                            onClick={handleNext}
                            disabled={!isAnswered}
                            className="flex items-center space-x-2 px-8 py-4 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl shadow-slate-900/10 hover:translate-x-1"
                        >
                            <span>{currentStep === totalSteps ? 'Analyze' : 'Continue'}</span>
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </>
            ) : (
                <div className="space-y-12 animate-fade-in-up">
                    <div className="relative overflow-hidden bg-slate-900 rounded-[2rem] p-8 lg:p-12 text-white shadow-2xl shadow-blue-900/20">
                        {/* Background Blobs */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />

                        <div className="relative z-10 text-center max-w-2xl mx-auto">
                            <div className="inline-flex items-center justify-center p-4 bg-white/10 rounded-full backdrop-blur-md mb-6 ring-1 ring-white/20">
                                <CheckCircle size={40} className="text-emerald-400" />
                            </div>
                            <h2 className="text-3xl lg:text-5xl font-bold mb-4 tracking-tight">
                                Assessment Complete
                            </h2>
                            <p className="text-lg text-slate-300 leading-relaxed">
                                Your comprehensive health profile has been analyzed using our advanced predictive algorithms.
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                            <span className="w-1.5 h-8 bg-blue-600 rounded-full mr-4"></span>
                            Your Health Scores
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {healthScores.map((score, index) => (
                                <div key={score.category} style={{ animationDelay: `${index * 100}ms` }} className="animate-fade-in-up">
                                    <HealthScoreCard
                                        score={score.score}
                                        category={score.category}
                                        status={score.status}
                                        description={score.description}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                            <span className="w-1.5 h-8 bg-amber-500 rounded-full mr-4"></span>
                            Recommended Actions
                        </h3>
                        <ResultsCard recommendations={recommendations} />
                    </div>

                    <div className="bg-white rounded-[2rem] p-8 lg:p-12 border border-slate-100 shadow-xl shadow-slate-200/50">
                        <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Your Next Steps</h3>
                        <div className="space-y-6 max-w-3xl mx-auto mb-10">
                            {[
                                "Schedule a consultation with our medical professionals",
                                "Enroll in recommended prevention programs",
                                "Connect wearable devices for continuous monitoring"
                            ].map((step, i) => (
                                <div key={i} className="flex items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-4 flex-shrink-0">
                                        <span className="text-emerald-600 font-bold">{i + 1}</span>
                                    </div>
                                    <p className="font-medium text-slate-700">{step}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5">
                                Start Prevention Program
                            </button>
                            <button
                                onClick={handleStartOver}
                                className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-300"
                            >
                                Retake Assessment
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
