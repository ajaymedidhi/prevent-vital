
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

    // In standard React SPA, hydration isn't the same issue as Next.js, 
    // but we can keep a loading state if needed for consistency or async ops.
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
        <div className="space-y-8 max-w-4xl mx-auto">
            {!showResults ? (
                <>
                    {showWearablePrompt && currentStep === 1 && (
                        <WearableIntegration onConnect={handleWearableConnect} />
                    )}

                    <AssessmentProgress
                        currentStep={currentStep}
                        totalSteps={totalSteps}
                        completionPercentage={completionPercentage}
                    />

                    <QuestionCard
                        question={currentQuestion.question}
                        description={currentQuestion.description}
                        type={currentQuestion.type}
                        options={currentQuestion.options}
                        selectedValue={currentAnswer}
                        onAnswer={(value) => handleAnswer(currentQuestion.id, value)}
                    />

                    <div className="flex items-center justify-between">
                        <button
                            onClick={handlePrevious}
                            disabled={currentStep === 1}
                            className="flex items-center space-x-2 px-6 py-3 rounded-lg border-2 border-border text-foreground font-medium hover:bg-muted transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft size={20} />
                            <span>Previous</span>
                        </button>

                        <button
                            onClick={handleNext}
                            disabled={!isAnswered}
                            className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                        >
                            <span>{currentStep === totalSteps ? 'View Results' : 'Next'}</span>
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="bg-gradient-to-br from-primary/10 via-emerald-500/10 to-blue-500/10 rounded-lg p-8 border border-border">
                        <div className="flex items-center space-x-3 mb-4">
                            <CheckCircle size={32} className="text-emerald-600" />
                            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                                Assessment Complete!
                            </h2>
                        </div>
                        <p className="text-muted-foreground">
                            Your comprehensive health assessment has been analyzed using our AI-powered predictive analytics. Below are your personalized health scores and recommendations.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-foreground mb-4">Your Health Scores</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {healthScores.map((score) => (
                                <HealthScoreCard
                                    key={score.category}
                                    score={score.score}
                                    category={score.category}
                                    status={score.status}
                                    description={score.description}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-foreground mb-4">
                            Personalized Recommendations
                        </h3>
                        <ResultsCard recommendations={recommendations} />
                    </div>

                    <div className="bg-card rounded-lg p-6 lg:p-8 border border-border shadow-md">
                        <h3 className="text-xl font-semibold text-foreground mb-4">Next Steps</h3>
                        <div className="space-y-4 mb-6">
                            <div className="flex items-start space-x-3">
                                <CheckCircle size={20} className="text-emerald-600 mt-1 flex-shrink-0" />
                                <p className="text-sm text-muted-foreground">
                                    Schedule a consultation with our medical professionals to discuss your results in detail
                                </p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <CheckCircle size={20} className="text-emerald-600 mt-1 flex-shrink-0" />
                                <p className="text-sm text-muted-foreground">
                                    Enroll in recommended prevention programs tailored to your health profile
                                </p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <CheckCircle size={20} className="text-emerald-600 mt-1 flex-shrink-0" />
                                <p className="text-sm text-muted-foreground">
                                    Connect your wearable devices for continuous health monitoring and real-time insights
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button className="flex-1 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md">
                                Start Prevention Program
                            </button>
                            <button
                                onClick={handleStartOver}
                                className="flex-1 px-6 py-3 border-2 border-border text-foreground font-medium rounded-lg hover:bg-muted transition-all duration-200"
                            >
                                Retake Assessment
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
