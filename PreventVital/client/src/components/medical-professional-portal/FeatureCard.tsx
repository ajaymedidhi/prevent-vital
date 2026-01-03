
import { ChartBar, Smartphone, FileText, Video } from 'lucide-react';

interface Feature {
    icon: string;
    title: string;
    description: string;
    color: string;
}

interface FeatureCardProps {
    feature: Feature;
}

const IconMap: Record<string, any> = {
    ChartBarIcon: ChartBar,
    DevicePhoneMobileIcon: Smartphone,
    DocumentTextIcon: FileText,
    VideoCameraIcon: Video,
};

export default function FeatureCard({ feature }: FeatureCardProps) {
    const getColorClasses = (color: string) => {
        switch (color) {
            case 'primary': return 'bg-primary/10 text-primary';
            case 'success': return 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400';
            case 'accent': return 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400';
            case 'trust': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
            default: return 'bg-primary/10 text-primary';
        }
    };

    const IconComponent = IconMap[feature.icon] || ChartBar;

    return (
        <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
            <div className={`w-14 h-14 rounded-xl ${getColorClasses(feature.color)} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <IconComponent size={28} />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
        </div>
    );
}
