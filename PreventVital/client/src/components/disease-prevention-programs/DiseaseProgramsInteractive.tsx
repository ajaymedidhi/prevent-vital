
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import ProgramCard from './ProgramCard';
import SuccessStoryCard from './SuccessStoryCard';
import TherapyPreview from './TherapyPreview';
import ResearchHighlight from './ResearchHighlight';
import ProgramFilter from './ProgramFilter';
import ProgressTracker from './ProgressTracker';
import { Button } from '@/components/ui/button';

interface Program {
    id: string;
    title: string;
    description: string;
    image: string;
    alt: string;
    therapies: string[];
    successRate: string;
    duration: string;
    category: string;
}

interface SuccessStory {
    name: string;
    age: number;
    condition: string;
    image: string;
    alt: string;
    story: string;
    metrics: Array<{
        label: string;
        before: string;
        after: string;
        improvement: string;
    }>;
    duration: string;
}

interface Therapy {
    name: string;
    icon: string;
    description: string;
    duration: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface Research {
    title: string;
    institution: string;
    year: number;
    finding: string;
    participants: number;
    improvement: string;
}

export default function DiseaseProgramsInteractive() {
    const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'programs' | 'success' | 'research'>('programs');
    const [filteredPrograms, setFilteredPrograms] = useState<Program[]>([]);

    const programs: Program[] = [
        {
            id: 'diabetes',
            title: 'Diabetes Prevention & Management',
            description: 'Comprehensive program combining AI-powered glucose monitoring with yoga, meditation, and personalized nutrition plans to prevent and manage diabetes effectively.',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c7fc6a7f-1764743297281.png",
            alt: 'Healthcare professional checking blood glucose levels with digital monitor for diabetes patient',
            therapies: ['Yoga', 'Meditation', 'Nutrition', 'Breathwork'],
            successRate: '87%',
            duration: '12 weeks',
            category: 'metabolic'
        },
        {
            id: 'hypertension',
            title: 'Hypertension Control Program',
            description: 'Integrated approach to blood pressure management through stress reduction techniques, cardiovascular exercises, and continuous AI monitoring.',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_18fdc3d89-1765186858638.png",
            alt: 'Medical professional measuring blood pressure of middle-aged patient with digital sphygmomanometer',
            therapies: ['Meditation', 'Breathwork', 'Physiotherapy', 'Yoga'],
            successRate: '82%',
            duration: '10 weeks',
            category: 'cardiovascular'
        },
        {
            id: 'cardiac',
            title: 'Cardiac Health Optimization',
            description: 'Heart health program integrating wearable monitoring, gentle cardiac rehabilitation exercises, and ancient wellness practices for optimal cardiovascular function.',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_15af4787e-1764671673883.png",
            alt: 'Cardiologist examining heart health data on digital tablet with ECG monitor in background',
            therapies: ['Physiotherapy', 'Yoga', 'Meditation', 'Nutrition'],
            successRate: '85%',
            duration: '16 weeks',
            category: 'cardiovascular'
        },
        {
            id: 'respiratory',
            title: 'Respiratory Wellness Program',
            description: 'Advanced breathing techniques combined with AI-powered lung function monitoring to improve respiratory health and prevent chronic conditions.',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_11970c2d4-1765782851419.png",
            alt: 'Patient performing breathing exercises with respiratory therapist using spirometer device',
            therapies: ['Breathwork', 'Yoga', 'Physiotherapy', 'Meditation'],
            successRate: '79%',
            duration: '8 weeks',
            category: 'respiratory'
        },
        {
            id: 'mental-health',
            title: 'Mental Wellness & Stress Management',
            description: 'Holistic mental health program combining cognitive behavioral techniques with meditation, yoga, and AI-driven mood tracking for comprehensive wellness.',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b56c2cc1-1764999507242.png",
            alt: 'Young woman practicing mindfulness meditation in peaceful outdoor setting with eyes closed',
            therapies: ['Meditation', 'Yoga', 'Breathwork', 'Counseling'],
            successRate: '91%',
            duration: '12 weeks',
            category: 'mental'
        },
        {
            id: 'weight',
            title: 'Weight Management & Metabolic Health',
            description: 'Science-backed weight management program integrating personalized nutrition, exercise protocols, and behavioral modification techniques.',
            image: "https://images.unsplash.com/photo-1675270347058-8066cd1fe523",
            alt: 'Nutritionist creating personalized meal plan with fresh vegetables and fruits on table',
            therapies: ['Nutrition', 'Yoga', 'Physiotherapy', 'Meditation'],
            successRate: '84%',
            duration: '16 weeks',
            category: 'metabolic'
        }
    ];

    const successStories: SuccessStory[] = [
        {
            name: 'Rajesh Kumar',
            age: 52,
            condition: 'Type 2 Diabetes',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b99e36f9-1763295192405.png",
            alt: 'Middle-aged Indian man with gray hair smiling confidently in business casual attire',
            story: 'Within 12 weeks, my HbA1c dropped from 8.5% to 6.2%. The combination of yoga and AI monitoring changed my life completely.',
            metrics: [
                {
                    label: 'HbA1c Level',
                    before: '8.5%',
                    after: '6.2%',
                    improvement: '27% reduction'
                },
                {
                    label: 'Fasting Glucose',
                    before: '165 mg/dL',
                    after: '105 mg/dL',
                    improvement: '36% improvement'
                }
            ],
            duration: '12-week'
        },
        {
            name: 'Priya Sharma',
            age: 45,
            condition: 'Hypertension',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f0883a0c-1763299171534.png",
            alt: 'Professional Indian woman in blue blazer with warm smile in modern office setting',
            story: 'The meditation and breathwork techniques helped me reduce my blood pressure medication by 50%. I feel more energetic than ever.',
            metrics: [
                {
                    label: 'Blood Pressure',
                    before: '145/95 mmHg',
                    after: '125/80 mmHg',
                    improvement: 'Normal range achieved'
                },
                {
                    label: 'Stress Levels',
                    before: 'High',
                    after: 'Low',
                    improvement: '65% reduction'
                }
            ],
            duration: '10-week'
        },
        {
            name: 'Amit Patel',
            age: 38,
            condition: 'Obesity & Pre-diabetes',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b5ea51b0-1763293852695.png",
            alt: 'Young Indian professional man in casual shirt with confident expression outdoors',
            story: 'Lost 18 kg and reversed my pre-diabetic condition. The personalized nutrition plan and yoga sessions were game-changers.',
            metrics: [
                {
                    label: 'Weight',
                    before: '98 kg',
                    after: '80 kg',
                    improvement: '18 kg lost'
                },
                {
                    label: 'BMI',
                    before: '32.5',
                    after: '26.5',
                    improvement: 'Healthy range'
                }
            ],
            duration: '16-week'
        }
    ];

    const therapies: Therapy[] = [
        {
            name: 'Pranayama Breathwork',
            icon: 'SparklesIcon',
            description: 'Ancient breathing techniques to improve lung capacity and reduce stress',
            duration: '15 min',
            difficulty: 'Beginner'
        },
        {
            name: 'Guided Meditation',
            icon: 'HeartIcon',
            description: 'Mindfulness practices for mental clarity and emotional balance',
            duration: '20 min',
            difficulty: 'Beginner'
        },
        {
            name: 'Therapeutic Yoga',
            icon: 'UserIcon',
            description: 'Condition-specific yoga sequences for physical and mental wellness',
            duration: '30 min',
            difficulty: 'Intermediate'
        },
        {
            name: 'Physiotherapy Sessions',
            icon: 'BoltIcon',
            description: 'Targeted exercises for rehabilitation and strength building',
            duration: '45 min',
            difficulty: 'Intermediate'
        }
    ];

    const research: Research[] = [
        {
            title: 'AI-Enhanced Diabetes Prevention Study',
            institution: 'AIIMS Delhi',
            year: 2024,
            finding: 'Continuous glucose monitoring combined with yoga reduced diabetes incidence by 43% in high-risk individuals.',
            participants: 2500,
            improvement: '43% reduction'
        },
        {
            title: 'Meditation Impact on Hypertension',
            institution: 'PGIMER Chandigarh',
            year: 2023,
            finding: 'Daily meditation practice for 8 weeks showed significant reduction in systolic blood pressure among hypertensive patients.',
            participants: 1800,
            improvement: '15 mmHg average drop'
        },
        {
            title: 'Integrated Wellness for Cardiac Health',
            institution: 'CMC Vellore',
            year: 2024,
            finding: 'Combination of physiotherapy, yoga, and AI monitoring improved cardiac function by 32% in post-MI patients.',
            participants: 1200,
            improvement: '32% improvement'
        }
    ];

    const filterCategories = [
        { id: 'all', label: 'All Programs', count: programs.length },
        { id: 'cardiovascular', label: 'Cardiovascular', count: 2 },
        { id: 'metabolic', label: 'Metabolic', count: 2 },
        { id: 'respiratory', label: 'Respiratory', count: 1 },
        { id: 'mental', label: 'Mental Health', count: 1 }
    ];

    const therapyTypes = [
        { id: 'all', label: 'All Therapies', count: programs.length },
        { id: 'yoga', label: 'Yoga', count: 5 },
        { id: 'meditation', label: 'Meditation', count: 5 },
        { id: 'breathwork', label: 'Breathwork', count: 3 },
        { id: 'physiotherapy', label: 'Physiotherapy', count: 3 }
    ];

    const progressMilestones = [
        {
            week: 1,
            title: 'Initial Assessment',
            description: 'Complete health evaluation and baseline measurements',
            completed: true
        },
        {
            week: 4,
            title: 'First Progress Check',
            description: 'Review initial improvements and adjust program',
            completed: true
        },
        {
            week: 8,
            title: 'Mid-Program Evaluation',
            description: 'Comprehensive health metrics review',
            completed: false
        },
        {
            week: 12,
            title: 'Program Completion',
            description: 'Final assessment and long-term plan',
            completed: false
        }
    ];

    useEffect(() => {
        setFilteredPrograms(programs);
    }, []);

    const handleFilterChange = (filters: { category: string; therapy: string }) => {
        let filtered = programs;

        if (filters.category !== 'all') {
            filtered = filtered.filter((p) => p.category === filters.category);
        }

        if (filters.therapy !== 'all') {
            filtered = filtered.filter((p) =>
                p.therapies.some((t) => t.toLowerCase() === filters.therapy)
            );
        }

        setFilteredPrograms(filtered);
    };

    const handleProgramClick = (programId: string) => {
        setSelectedProgram(programId);
    };

    const handleTherapyTry = () => {
        window.location.href = '#therapy-signup';
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="h-16" />

            <section className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-16 lg:py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center animate-fade-up">
                        <div className="inline-flex items-center gap-2 bg-emerald-600/10 text-emerald-600 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-emerald-600/20">
                            <ShieldCheck size={16} />
                            <span>Clinically Validated Programs</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                            Disease Prevention Programs
                        </h1>
                        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                            Comprehensive prevention ecosystem combining AI-powered monitoring with ancient wellness therapies. Transform your health journey with personalized programs designed for lasting results.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <Button asChild size="lg" className="text-lg px-8 py-6 rounded-xl">
                                <Link to="/contact">
                                    Start Free Assessment
                                    <ArrowRight size={20} className="ml-2" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 rounded-xl hover:bg-muted">
                                <Link to="/contact">
                                    Explore Therapies
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 lg:py-16">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
                        <button
                            onClick={() => setActiveTab('programs')}
                            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${activeTab === 'programs' ? 'bg-primary text-primary-foreground shadow-md' : 'bg-card text-muted-foreground hover:bg-muted'
                                }`}
                        >
                            Programs
                        </button>
                        <button
                            onClick={() => setActiveTab('success')}
                            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${activeTab === 'success' ? 'bg-primary text-primary-foreground shadow-md' : 'bg-card text-muted-foreground hover:bg-muted'
                                }`}
                        >
                            Success Stories
                        </button>
                        <button
                            onClick={() => setActiveTab('research')}
                            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${activeTab === 'research' ? 'bg-primary text-primary-foreground shadow-md' : 'bg-card text-muted-foreground hover:bg-muted'
                                }`}
                        >
                            Research
                        </button>
                    </div>

                    <div className="animate-fade-in duration-500">
                        {activeTab === 'programs' && (
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                                <div className="lg:col-span-1">
                                    <ProgramFilter
                                        categories={filterCategories}
                                        therapyTypes={therapyTypes}
                                        onFilterChange={handleFilterChange}
                                    />
                                </div>
                                <div className="lg:col-span-3">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {filteredPrograms.map((program) => (
                                            <ProgramCard
                                                key={program.id}
                                                {...program}
                                                onClick={() => handleProgramClick(program.id)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'success' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {successStories.map((story, index) => (
                                    <SuccessStoryCard key={index} {...story} />
                                ))}
                            </div>
                        )}

                        {activeTab === 'research' && (
                            <div className="max-w-4xl mx-auto space-y-6">
                                {research.map((item, index) => (
                                    <ResearchHighlight key={index} {...item} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className="py-12 lg:py-16 bg-muted/50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                            Integrated Therapy Sessions
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Experience our AI-enhanced therapy programs combining ancient wisdom with modern technology
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {therapies.map((therapy, index) => (
                            <TherapyPreview key={index} {...therapy} onTry={handleTherapyTry} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 lg:py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8 text-center">
                            Track Your Progress
                        </h2>
                        <ProgressTracker
                            programName="Diabetes Prevention"
                            currentWeek={4}
                            totalWeeks={12}
                            milestones={progressMilestones}
                        />
                    </div>
                </div>
            </section>

            <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/10 to-accent/10">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                            Ready to Transform Your Health?
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            Join thousands of Indians who have successfully prevented chronic diseases through our integrated wellness programs
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <Button asChild size="lg" className="text-lg px-8 py-6 h-auto">
                                <Link to="/contact">
                                    Start Your Journey Today
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 h-auto bg-card border-2 border-primary text-primary hover:bg-primary hover:text-white">
                                <a href="#">
                                    Healthcare Providers
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
