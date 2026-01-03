import { Heart, Moon, Zap, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Recommendation {
    id: string;
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    icon: string;
}

interface ResultsCardProps {
    recommendations: Recommendation[];
}

const IconMap: Record<string, any> = {
    HeartIcon: Heart,
    MoonIcon: Moon,
    BoltIcon: Zap,
    SparklesIcon: Sparkles,
};

export default function ResultsCard({ recommendations }: ResultsCardProps) {
    const priorityConfig = {
        high: { color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900', border: 'border-red-200 dark:border-red-800' },
        medium: { color: 'text-amber-600', bg: 'bg-amber-100 dark:bg-amber-900', border: 'border-amber-200 dark:border-amber-800' },
        low: { color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-900', border: 'border-emerald-200 dark:border-emerald-800' }
    };

    return (
        <div className="space-y-4">
            {recommendations.map((rec) => {
                const config = priorityConfig[rec.priority];
                const IconComponent = IconMap[rec.icon] || Sparkles;

                return (
                    <div
                        key={rec.id}
                        className={cn("bg-card rounded-lg p-6 border-2 shadow-sm hover:shadow-md transition-shadow duration-300", config.border)}
                    >
                        <div className="flex items-start space-x-4">
                            <div className={cn("flex items-center justify-center w-12 h-12 rounded-full flex-shrink-0", config.bg)}>
                                <IconComponent size={24} className={config.color} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-foreground mb-2">{rec.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{rec.description}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
