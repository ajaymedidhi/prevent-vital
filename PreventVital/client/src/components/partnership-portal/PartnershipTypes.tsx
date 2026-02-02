
import {
    Building2,
    Smartphone,
    Users,
    Code,
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
        description: 'Integrate PreventVital into your healthcare facility to enhance patient outcomes through predictive analytics.',
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
        description: 'Connect your wearable devices and health monitoring equipment to our AI-powered platform.',
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
        description: 'Join our network of medical professionals delivering preventive care through technology.',
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
        description: 'Build innovative health solutions together through our comprehensive API platform.',
        icon: Code,
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
        <section className={`py-20 lg:py-24 bg-white ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
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
                            className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 flex flex-col h-full"
                        >
                            <div className="flex items-start space-x-4 mb-6">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${type.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                                    type.color === 'amber' ? 'bg-purple-100 text-purple-600' :
                                        type.color === 'emerald' ? 'bg-indigo-100 text-indigo-600' :
                                            'bg-cyan-100 text-cyan-600'
                                    }`}>
                                    <type.icon size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-foreground mb-2">{type.title}</h3>
                                    <p className="text-gray-500 leading-relaxed text-sm">{type.description}</p>
                                </div>
                            </div>

                            <div className="space-y-3 mb-8 flex-grow">
                                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-4">Key Benefits</h4>
                                {type.benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <CheckCircle size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-600 text-sm">{benefit}</span>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full mt-auto px-6 py-3 bg-gray-50 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-2 border border-gray-100 group">
                                <span>Learn More</span>
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PartnershipTypes;
