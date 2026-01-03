
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
            label: 'Health Improvement Rate'
        },
        {
            icon: 'ShieldCheckIcon',
            value: 'ISO 27001',
            label: 'Certified Security'
        },
        {
            icon: 'AcademicCapIcon',
            value: '200+',
            label: 'Medical Professionals'
        }
    ];

    const IconMap: Record<string, any> = {
        UserGroupIcon: Users,
        HeartIcon: Heart,
        ShieldCheckIcon: ShieldCheck,
        AcademicCapIcon: GraduationCap,
    };

    return (
        <section className="py-12 bg-muted/50 border-y border-border">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {indicators.map((indicator, index) => {
                        const IconComponent = IconMap[indicator.icon];
                        return (
                            <div key={index} className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                                    <IconComponent size={24} className="text-primary" />
                                </div>
                                <div className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
                                    {indicator.value}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {indicator.label}
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
