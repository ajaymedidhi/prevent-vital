
import { useState } from 'react';
import {
    MessagesSquare,
    FileSearch,
    FileCheck,
    Code2,
    Beaker,
    Rocket,
    Clock,
    CheckCircle,
    ChevronUp,
    ChevronDown
} from 'lucide-react';

interface WorkflowStep {
    id: number;
    title: string;
    description: string;
    icon: any;
    duration: string;
    details: string[];
}

const workflowSteps: WorkflowStep[] = [
    {
        id: 1,
        title: 'Initial Consultation',
        description: 'Schedule a discovery call with our partnership team to discuss your goals and requirements',
        icon: MessagesSquare,
        duration: '1-2 days',
        details: [
            'Understand your organization\'s needs',
            'Discuss integration requirements',
            'Review partnership models',
            'Define success metrics'
        ]
    },
    {
        id: 2,
        title: 'Technical Assessment',
        description: 'Our technical team evaluates integration feasibility and provides detailed documentation',
        icon: FileSearch,
        duration: '3-5 days',
        details: [
            'API compatibility review',
            'Security and compliance audit',
            'Infrastructure assessment',
            'Integration roadmap creation'
        ]
    },
    {
        id: 3,
        title: 'Agreement & Onboarding',
        description: 'Finalize partnership terms and begin the onboarding process with dedicated support',
        icon: FileCheck,
        duration: '5-7 days',
        details: [
            'Contract negotiation and signing',
            'Access credentials provisioning',
            'Sandbox environment setup',
            'Training materials delivery'
        ]
    },
    {
        id: 4,
        title: 'Integration Development',
        description: 'Build and test the integration with continuous support from our technical team',
        icon: Code2,
        duration: '2-4 weeks',
        details: [
            'API integration implementation',
            'Data mapping and validation',
            'Security testing',
            'Performance optimization'
        ]
    },
    {
        id: 5,
        title: 'Testing & Validation',
        description: 'Comprehensive testing in staging environment to ensure seamless functionality',
        icon: Beaker,
        duration: '1-2 weeks',
        details: [
            'End-to-end testing',
            'User acceptance testing',
            'Load and stress testing',
            'Compliance verification'
        ]
    },
    {
        id: 6,
        title: 'Go-Live & Support',
        description: 'Launch the partnership with ongoing technical support and performance monitoring',
        icon: Rocket,
        duration: 'Ongoing',
        details: [
            'Production deployment',
            '24/7 technical support',
            'Performance monitoring',
            'Continuous optimization'
        ]
    }
];

interface OnboardingWorkflowProps {
    className?: string;
}

const OnboardingWorkflow = ({ className = '' }: OnboardingWorkflowProps) => {
    const [activeStep, setActiveStep] = useState<number | null>(null);

    return (
        <section className={`py-16 lg:py-24 bg-background ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        Partner Onboarding Workflow
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        A streamlined process designed to get you integrated and operational quickly with comprehensive support at every stage
                    </p>
                </div>

                <div className="relative">
                    {/* Connection line between cards (simplified for visual representation) */}
                    <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent" />

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {workflowSteps.map((step) => (
                            <div
                                key={step.id}
                                className="relative flex"
                            >
                                <div
                                    className={`bg-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border-2 cursor-pointer w-full flex flex-col ${activeStep === step.id ? 'border-primary shadow-primary/20' : 'border-border'
                                        }`}
                                    onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                                >
                                    {/* Icon and Number Badge */}
                                    <div className="flex items-center justify-center mb-6">
                                        <div className="relative">
                                            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                                                <step.icon size={32} className="text-primary" />
                                            </div>
                                            <div className="absolute -top-2 -right-2 w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                                                {step.id}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Title and Duration */}
                                    <div className="text-center mb-4">
                                        <h3 className="text-xl font-bold text-foreground mb-3 leading-tight">
                                            {step.title}
                                        </h3>
                                        <div className="inline-flex items-center justify-center space-x-1.5 text-xs font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                                            <Clock size={14} />
                                            <span>{step.duration}</span>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-muted-foreground text-sm text-center mb-6 leading-relaxed flex-grow min-h-[60px] flex items-center justify-center">
                                        {step.description}
                                    </p>

                                    {/* Expanded Details */}
                                    {activeStep === step.id && (
                                        <div className="mt-auto pt-5 border-t border-border space-y-3 animate-slide-up">
                                            {step.details.map((detail, idx) => (
                                                <div key={idx} className="flex items-start space-x-2.5">
                                                    <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                                                    <span className="text-sm text-muted-foreground leading-relaxed">{detail}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* View Details Button */}
                                    <button className="mt-5 text-primary font-semibold text-sm flex items-center justify-center space-x-1 hover:space-x-2 transition-all w-full py-2 rounded-lg hover:bg-primary/5">
                                        <span>{activeStep === step.id ? 'Show Less' : 'View Details'}</span>
                                        {activeStep === step.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Progress Indicator */}
                <div className="mt-12 flex items-center justify-center space-x-2">
                    {workflowSteps.map((step) => (
                        <button
                            key={step.id}
                            onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                            className={`w-3 h-3 rounded-full transition-all ${activeStep === step.id
                                    ? 'bg-primary w-8' : 'bg-border hover:bg-primary/30'
                                }`}
                            aria-label={`Go to ${step.title}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OnboardingWorkflow;
