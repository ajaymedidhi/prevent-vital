
import { useState } from 'react';
import { CheckCircle, MessageSquare } from 'lucide-react';

interface PricingTier {
    id: string;
    name: string;
    description: string;
    basePrice: string;
    billingCycle: string;
    features: string[];
    highlighted: boolean;
    cta: string;
}

const pricingTiers: PricingTier[] = [
    {
        id: 'startup',
        name: 'Startup Partner',
        description: 'Perfect for small clinics and individual practitioners starting their digital health journey',
        basePrice: '₹25,000',
        billingCycle: 'per month',
        features: [
            'Up to 100 active patients',
            'Basic API access',
            'Email support (48hr response)',
            'Standard integration support',
            'Monthly performance reports',
            'Community forum access'
        ],
        highlighted: false,
        cta: 'Start Partnership'
    },
    {
        id: 'growth',
        name: 'Growth Partner',
        description: 'Ideal for growing healthcare facilities and multi-specialty clinics expanding their reach',
        basePrice: '₹75,000',
        billingCycle: 'per month',
        features: [
            'Up to 500 active patients',
            'Advanced API access',
            'Priority support (24hr response)',
            'Dedicated integration engineer',
            'Weekly performance reports',
            'Custom branding options',
            'Training and onboarding',
            'Quarterly business reviews'
        ],
        highlighted: true,
        cta: 'Get Started'
    },
    {
        id: 'enterprise',
        name: 'Enterprise Partner',
        description: 'Comprehensive solution for large hospital networks and healthcare organizations',
        basePrice: 'Custom',
        billingCycle: 'pricing',
        features: [
            'Unlimited active patients',
            'Full API suite access',
            '24/7 dedicated support',
            'Technical account manager',
            'Real-time analytics dashboard',
            'White-label solutions',
            'Custom feature development',
            'SLA guarantees (99.9% uptime)',
            'On-premise deployment option',
            'Regulatory compliance support'
        ],
        highlighted: false,
        cta: 'Contact Sales'
    }
];

interface PricingTiersProps {
    className?: string;
}

const PricingTiers = ({ className = '' }: PricingTiersProps) => {
    const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

    return (
        <section className={`py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-blue-500/5 to-cyan-500/5 ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        Partnership Pricing
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Flexible pricing models designed to scale with your organization's growth and patient volume
                    </p>

                    <div className="inline-flex items-center bg-card rounded-lg p-1 shadow-sm border border-border">
                        <button
                            onClick={() => setBillingPeriod('monthly')}
                            className={`px-6 py-2 rounded-md font-semibold transition-all duration-300 ${billingPeriod === 'monthly' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingPeriod('annual')}
                            className={`px-6 py-2 rounded-md font-semibold transition-all duration-300 ${billingPeriod === 'annual' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            Annual
                            <span className="ml-2 px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">
                                Save 20%
                            </span>
                        </button>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {pricingTiers.map((tier) => (
                        <div
                            key={tier.id}
                            className={`bg-card rounded-2xl overflow-hidden transition-all duration-300 ${tier.highlighted
                                    ? 'shadow-md border-2 border-primary scale-105'
                                    : 'shadow-sm border border-border hover:shadow-md'
                                }`}
                        >
                            {tier.highlighted && (
                                <div className="bg-gradient-to-r from-primary to-blue-600 text-white text-center py-2 text-sm font-semibold">
                                    Most Popular
                                </div>
                            )}

                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-foreground mb-2">{tier.name}</h3>
                                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                                    {tier.description}
                                </p>

                                <div className="mb-6">
                                    <div className="flex items-baseline space-x-2">
                                        <span className="text-4xl font-bold text-foreground">{tier.basePrice}</span>
                                        {tier.basePrice !== 'Custom' && (
                                            <span className="text-muted-foreground">/{tier.billingCycle}</span>
                                        )}
                                    </div>
                                    {billingPeriod === 'annual' && tier.basePrice !== 'Custom' && (
                                        <p className="text-sm text-green-600 mt-2">
                                            Save ₹{parseInt(tier.basePrice.replace(/[^0-9]/g, '')) * 2.4 / 1000}K annually
                                        </p>
                                    )}
                                </div>

                                <button
                                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 mb-6 ${tier.highlighted
                                            ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg'
                                            : 'bg-muted text-foreground hover:bg-primary hover:text-primary-foreground'
                                        }`}
                                >
                                    {tier.cta}
                                </button>

                                <div className="space-y-3">
                                    <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                                        What's Included
                                    </h4>
                                    {tier.features.map((feature, index) => (
                                        <div key={index} className="flex items-start space-x-3">
                                            <CheckCircle
                                                size={20}
                                                className={`flex-shrink-0 mt-0.5 ${tier.highlighted ? 'text-primary' : 'text-green-500'
                                                    }`}
                                            />
                                            <span className="text-sm text-muted-foreground">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-muted-foreground mb-4">
                        Need a custom solution? Our team can create a tailored partnership package for your specific needs.
                    </p>
                    <button className="px-8 py-3 bg-card text-primary font-semibold rounded-lg border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 inline-flex items-center space-x-2">
                        <MessageSquare size={20} />
                        <span>Schedule Consultation</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PricingTiers;
