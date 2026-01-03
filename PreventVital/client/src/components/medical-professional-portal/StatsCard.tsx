
interface StatsCardProps {
    icon: string;
    label: string;
    value: string;
    trend?: string;
    trendDirection?: 'up' | 'down';
}

export default function StatsCard({ icon, label, value, trend, trendDirection }: StatsCardProps) {
    return (
        <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground mb-1">{label}</p>
                    <p className="text-3xl font-bold text-foreground mb-2">{value}</p>
                    {trend && (
                        <div className="flex items-center space-x-1">
                            <span className={`text-sm font-medium ${trendDirection === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                                {trend}
                            </span>
                            <span className="text-xs text-muted-foreground">vs last month</span>
                        </div>
                    )}
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${icon === 'users' ? 'bg-primary/10' :
                        icon === 'chart' ? 'bg-emerald-100 dark:bg-emerald-900/30' :
                            icon === 'calendar' ? 'bg-amber-100 dark:bg-amber-900/30' : 'bg-blue-100 dark:bg-blue-900/30'
                    }`}>
                    <span className="text-2xl">{
                        icon === 'users' ? '👥' :
                            icon === 'chart' ? '📊' :
                                icon === 'calendar' ? '📅' : '⚕️'
                    }</span>
                </div>
            </div>
        </div>
    );
}
