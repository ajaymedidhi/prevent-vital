
import { CheckCircle, AlertTriangle, AlertCircle, XCircle } from 'lucide-react';

interface HealthScoreCardProps {
    score: number;
    category: string;
    status: 'excellent' | 'good' | 'moderate' | 'attention' | 'critical';
    description: string;
}

export default function HealthScoreCard({
    score,
    category,
    status,
    description
}: HealthScoreCardProps) {
    const statusConfig = {
        excellent: { color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-900', icon: CheckCircle },
        good: { color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900', icon: CheckCircle },
        moderate: { color: 'text-amber-600', bg: 'bg-amber-100 dark:bg-amber-900', icon: AlertTriangle },
        attention: { color: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-900', icon: AlertCircle },
        critical: { color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900', icon: XCircle }
    };

    const config = statusConfig[status];
    const IconComponent = config.icon;

    return (
        <div className="bg-card rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1">{category}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
                <div className={`flex items-center justify-center w-12 h-12 rounded-full ${config.bg} flex-shrink-0 ml-4`}>
                    <IconComponent size={24} className={config.color} />
                </div>
            </div>
            <div className="flex items-baseline space-x-2">
                <span className={`text-3xl font-bold ${config.color}`}>{score}</span>
                <span className="text-sm text-muted-foreground">/100</span>
            </div>
        </div>
    );
}
