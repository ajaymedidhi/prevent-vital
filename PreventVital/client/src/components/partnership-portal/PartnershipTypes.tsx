
import {
    Building2,
    Smartphone,
    Users,
    Cpu,
    CheckCircle,
    ArrowRight
} from 'lucide-react';

interface PartnershipType {
    id: string;
    title: string;
    description: string;
    icon: any;
    benefits: string[];
    color: string;
}

const partnershipTypes: PartnershipType[] = [
    {
        id: 'hospital',
        title: 'Hospital Partnerships',
        description: 'Integrate PreventVital into your healthcare facility to enhance patient outcomes through predictive analytics and continuous monitoring.',
        icon: Building2,
        benefits: [
            'Patient referral tracking system',
            'Outcome metrics dashboard',
            'Seamless EHR integration',
            'Revenue sharing model',
            'Co-branded patient programs'
        ],
        color: 'blue'
    },
    {
        id: 'device',
        title: 'Device Integration',
        description: 'Connect your wearable devices and health monitoring equipment to our AI-powered platform for comprehensive health insights.',
        icon: Smartphone,
        benefits: [
            'Real-time data synchronization',
            'SDK and API access',
            'Technical integration support',
            'Joint marketing opportunities',
            'Expanded user base access'
        ],
        color: 'amber'
    },
    {
        id: 'provider',
        title: 'Healthcare Provider Network',
        description: 'Join our network of medical professionals delivering preventive care through technology-enhanced patient management.',
        icon: Users,
        benefits: [
            'Patient management tools',
            'Clinical decision support',
            'Telemedicine integration',
            'Continuing education credits',
            'Practice growth support'
        ],
        color: 'emerald'
    },
    {
        id: 'technology',
        title: 'Technology Alliances',
        description: 'Collaborate on innovative solutions combining your technology expertise with our healthcare platform capabilities.',
        icon: Cpu,
        benefits: [
            'API-first integration',
            'White-label opportunities',
            'Joint solution development',
            'Technical co-innovation',
            'Market expansion support'
        ],
        color: 'purple'
    }
];

interface PartnershipTypesProps {
    className?: string;
}

const PartnershipTypes = ({ className = '' }: PartnershipTypesProps) => {
    return (
        <section className={`py-16 lg:py-24 bg-background ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        Partnership Opportunities
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Choose the partnership model that aligns with your organization's goals and capabilities
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {partnershipTypes.map((type) => (
                        <div
                            key={type.id}
                            className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-border"
                        >
                            <div className="flex items-start space-x-4 mb-6">
                                <div className={`w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0`}>
                                    <type.icon size={28} className="text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-foreground mb-2">{type.title}</h3>
                                    <p className="text-muted-foreground">{type.description}</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">Key Benefits</h4>
                                {type.benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <CheckCircle size={20} className="text-primary flex-shrink-0 mt-0.5" />
                                        <span className="text-muted-foreground">{benefit}</span>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full mt-6 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center space-x-2">
                                <span>Learn More</span>
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PartnershipTypes;
