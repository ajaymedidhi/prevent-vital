
import { MessageSquare, User } from 'lucide-react';

interface PartnerCase {
    id: string;
    partnerName: string;
    partnerType: string;
    logo: string;
    logoAlt: string;
    challenge: string;
    solution: string;
    results: {
        metric: string;
        value: string;
        description: string;
    }[];
    testimonial: string;
    author: string;
    authorRole: string;
}

const partnerCases: PartnerCase[] = [
    {
        id: 'apollo',
        partnerName: 'Apollo Hospitals',
        partnerType: 'Hospital Partnership',
        logo: "https://img.rocket.new/generatedImages/rocket_gen_img_180fba7dc-1764649751287.png",
        logoAlt: 'Modern hospital building exterior with glass facade and medical cross signage',
        challenge: 'Managing chronic disease patients across multiple facilities with inconsistent monitoring and delayed interventions',
        solution: 'Integrated PreventVital platform across 12 facilities enabling real-time patient monitoring and predictive analytics',
        results: [
            { metric: 'Patient Readmissions', value: '35%', description: 'Reduction in 30-day readmissions' },
            { metric: 'Early Detection', value: '48%', description: 'Increase in early intervention cases' },
            { metric: 'Patient Satisfaction', value: '92%', description: 'Positive feedback score' }
        ],
        testimonial: 'PreventVital has transformed how we deliver preventive care. The predictive analytics have enabled us to intervene earlier, resulting in significantly better patient outcomes and reduced healthcare costs.',
        author: 'Dr. Rajesh Kumar',
        authorRole: 'Chief Medical Officer, Apollo Hospitals'
    },
    {
        id: 'max',
        partnerName: 'Max Healthcare',
        partnerType: 'Hospital Partnership',
        logo: "https://img.rocket.new/generatedImages/rocket_gen_img_139aa3e39-1765942074845.png",
        logoAlt: 'Modern healthcare facility entrance with glass doors and medical center signage',
        challenge: 'Limited visibility into patient health between appointments leading to preventable complications',
        solution: 'Deployed continuous monitoring system with AI-powered alerts for high-risk patients across cardiology and diabetes departments',
        results: [
            { metric: 'Complication Prevention', value: '42%', description: 'Reduction in preventable complications' },
            { metric: 'Patient Engagement', value: '78%', description: 'Active daily monitoring participation' },
            { metric: 'Cost Savings', value: '₹2.4Cr', description: 'Annual healthcare cost reduction' }
        ],
        testimonial: 'The platform\'s ability to predict health deterioration before it becomes critical has been game-changing. Our patients feel more secure knowing they\'re continuously monitored.',
        author: 'Dr. Priya Sharma',
        authorRole: 'Director of Cardiology, Max Healthcare'
    }
];

interface PartnerSuccessMetricsProps {
    className?: string;
}

const PartnerSuccessMetrics = ({ className = '' }: PartnerSuccessMetricsProps) => {
    return (
        <section className={`py-16 lg:py-24 bg-muted/30 ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        Partner Success Stories
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Real results from healthcare organizations transforming patient care through our partnership ecosystem
                    </p>
                </div>

                <div className="space-y-12">
                    {partnerCases.map((partner) => (
                        <div
                            key={partner.id}
                            className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border"
                        >
                            <div className="grid lg:grid-cols-5 gap-8 p-8 lg:p-10">
                                <div className="lg:col-span-2 space-y-6">
                                    <div className="h-20 flex items-center">
                                        <img
                                            src={partner.logo}
                                            alt={partner.logoAlt}
                                            className="max-h-full w-auto object-contain"
                                        />
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-bold text-foreground mb-2">
                                            {partner.partnerName}
                                        </h3>
                                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                                            {partner.partnerType}
                                        </span>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2">
                                                Challenge
                                            </h4>
                                            <p className="text-muted-foreground text-sm leading-relaxed">
                                                {partner.challenge}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2">
                                                Solution
                                            </h4>
                                            <p className="text-muted-foreground text-sm leading-relaxed">
                                                {partner.solution}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:col-span-3 space-y-6">
                                    <div className="grid sm:grid-cols-3 gap-4">
                                        {partner.results.map((result, index) => (
                                            <div
                                                key={index}
                                                className="bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-xl p-6 border border-primary/10"
                                            >
                                                <div className="text-3xl font-bold text-primary mb-1">
                                                    {result.value}
                                                </div>
                                                <div className="text-sm font-semibold text-foreground mb-1">
                                                    {result.metric}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {result.description}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="bg-muted rounded-xl p-6">
                                        <div className="flex items-start space-x-3 mb-4">
                                            <MessageSquare size={24} className="text-primary flex-shrink-0" />
                                            <p className="text-foreground italic leading-relaxed">
                                                "{partner.testimonial}"
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-3 pl-9">
                                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                                <User size={20} className="text-primary" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-foreground">{partner.author}</div>
                                                <div className="text-sm text-muted-foreground">{partner.authorRole}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PartnerSuccessMetrics;
