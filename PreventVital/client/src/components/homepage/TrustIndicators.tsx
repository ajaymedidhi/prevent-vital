import { Users, Heart, ShieldCheck, GraduationCap } from 'lucide-react';

interface TrustIndicator {
    icon: string;
    value: string;
    label: string;
}

const TrustIndicators = () => {
    const indicators: TrustIndicator[] = [
        {
            icon: 'UserGroupIcon',
            value: '50,000+',
            label: 'Active Users'
        },
        {
            icon: 'HeartIcon',
            value: '95%',
            label: 'Health Improvement'
        },
        {
            icon: 'ShieldCheckIcon',
            value: 'ISO 27001',
            label: 'Certified Security'
        },
        {
            icon: 'AcademicCapIcon',
            value: '200+',
            label: 'Medical Experts'
        }
    ];

    const IconMap: Record<string, any> = {
        UserGroupIcon: Users,
        HeartIcon: Heart,
        ShieldCheckIcon: ShieldCheck,
        AcademicCapIcon: GraduationCap,
    };

    return (
        <section className="py-20 bg-background relative z-30 -mt-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {indicators.map((indicator, index) => {
                        const IconComponent = IconMap[indicator.icon];
                        // Define specific gradient border colors for each card to match the variety in ClinicalCredibility
                        const gradients = [
                            'from-pink-500/20 via-purple-500/20 to-indigo-500/20',
                            'from-purple-500/20 via-indigo-500/20 to-blue-500/20',
                            'from-indigo-500/20 via-blue-500/20 to-teal-500/20',
                            'from-blue-500/20 via-teal-500/20 to-emerald-500/20'
                        ];
                        const iconGradients = [
                            'from-pink-50 to-purple-50 ring-purple-100 text-purple-600',
                            'from-purple-50 to-indigo-50 ring-indigo-100 text-indigo-600',
                            'from-indigo-50 to-blue-50 ring-blue-100 text-blue-600',
                            'from-blue-50 to-teal-50 ring-teal-100 text-teal-600'
                        ];

                        return (
                            <div
                                key={index}
                                className="relative bg-card rounded-2xl p-6 shadow-xl border border-white/10 overflow-hidden group hover:-translate-y-1 transition-all duration-300"
                            >
                                {/* Gradient Border Overlay */}
                                <div className={`absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br ${gradients[index % gradients.length]} -z-10`} />

                                <div className="flex flex-col items-center text-center relative z-10">
                                    <div className={`w-14 h-14 bg-gradient-to-br ${iconGradients[index % iconGradients.length]} rounded-2xl flex items-center justify-center mb-4 ring-1`}>
                                        <IconComponent size={24} strokeWidth={2.5} />
                                    </div>
                                    <div className="text-2xl lg:text-4xl font-bold text-foreground mb-1 tracking-tight">
                                        {indicator.value}
                                    </div>
                                    <div className="text-xs lg:text-sm font-medium text-muted-foreground tracking-wide uppercase">
                                        {indicator.label}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TrustIndicators;
