import { ShieldCheck, Zap, Headset, FileText } from 'lucide-react';

interface WhyPartnerProps {
    className?: string;
}

const WhyPartner = ({ className = '' }: WhyPartnerProps) => {
    return (
        <section className={`py-20 bg-slate-50 ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Why Partner with PreventVital?
                    </h2>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        {
                            icon: ShieldCheck,
                            title: 'Enterprise Security',
                            description: 'HIPAA compliant infrastructure',
                            color: 'text-purple-600',
                            bg: 'bg-purple-100'
                        },
                        {
                            icon: Zap,
                            title: 'Fast Integration',
                            description: 'Go live in weeks, not months',
                            color: 'text-blue-600',
                            bg: 'bg-blue-100'
                        },
                        {
                            icon: Headset,
                            title: 'Dedicated Support',
                            description: '24/7 technical assistance',
                            color: 'text-pink-600',
                            bg: 'bg-pink-100'
                        },
                        {
                            icon: FileText,
                            title: 'Comprehensive Docs',
                            description: 'Detailed API documentation',
                            color: 'text-indigo-600',
                            bg: 'bg-indigo-100'
                        }
                    ].map((feature, index) => (
                        <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
                            <div className={`w-14 h-14 ${feature.bg} rounded-full flex items-center justify-center mx-auto mb-6`}>
                                <feature.icon size={26} className={feature.color} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-gray-500 text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyPartner;
