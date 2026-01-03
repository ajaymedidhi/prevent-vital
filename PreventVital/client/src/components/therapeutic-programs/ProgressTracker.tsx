
import { Plus, Flame, Clock, Heart, BarChart, Sparkles } from 'lucide-react';

interface ProgressMetric {
    id: string;
    label: string;
    value: number;
    target: number;
    unit: string;
    icon: string;
    color: string;
}

interface ProgressTrackerProps {
    metrics: ProgressMetric[];
    onSetGoal: () => void;
}

const getIcon = (iconName: string) => {
    switch (iconName) {
        case 'FireIcon': return Flame;
        case 'ClockIcon': return Clock;
        case 'HeartIcon': return Heart;
        case 'ChartBarIcon': return BarChart;
        default: return BarChart;
    }
};

const getColorClasses = (color: string) => {
    // Basic mapping, can be improved with full tailwind palette if needed
    const colorMap: Record<string, string> = {
        primary: 'blue',
        secondary: 'purple',
        trust: 'cyan',
        accent: 'amber',
        warning: 'orange',
        success: 'green'
    };
    return colorMap[color] || 'blue';
};

export default function ProgressTracker({ metrics, onSetGoal }: ProgressTrackerProps) {
    const calculatePercentage = (value: number, target: number) => {
        return Math.min((value / target) * 100, 100);
    };

    return (
        <section className="bg-gradient-to-br from-cyan-500/5 to-purple-500/5 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-10">
                    <div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                            Track Your Wellness Journey
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Monitor your progress with AI-powered insights and personalized goals
                        </p>
                    </div>

                    <button
                        onClick={onSetGoal}
                        className="mt-6 lg:mt-0 flex items-center space-x-2 px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-semibold shadow-sm"
                    >
                        <Plus size={20} />
                        <span>Set New Goal</span>
                    </button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {metrics.map((metric) => {
                        const percentage = calculatePercentage(metric.value, metric.target);
                        const IconComponent = getIcon(metric.icon);
                        const colorName = getColorClasses(metric.color);

                        return (
                            <div
                                key={metric.id}
                                className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-all duration-300"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`flex items-center justify-center w-12 h-12 bg-${colorName}-100 dark:bg-${colorName}-900/30 rounded-xl`}>
                                        <IconComponent size={24} className={`text-${colorName}-600 dark:text-${colorName}-400`} />
                                    </div>
                                    <span className="text-xs font-medium text-muted-foreground">
                                        This Week
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground mb-1">
                                            {metric.label}
                                        </h3>
                                        <div className="flex items-baseline space-x-2">
                                            <span className="text-2xl font-bold text-foreground">
                                                {metric.value}
                                            </span>
                                            <span className="text-sm text-muted-foreground">
                                                / {metric.target} {metric.unit}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-muted-foreground">Progress</span>
                                            <span className="font-medium text-foreground">{percentage.toFixed(0)}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className={`h-full bg-${colorName}-500 rounded-full transition-all duration-500`}
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-8 bg-card border border-border rounded-xl p-6">
                    <div className="flex items-start space-x-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex-shrink-0">
                            <Sparkles size={24} className="text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">
                                AI-Powered Recommendations
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Based on your progress, we recommend increasing your meditation sessions to 20 minutes daily and adding 2 more yoga sessions this week to reach your wellness goals faster.
                            </p>
                            <button className="text-sm font-semibold text-amber-500 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                                View Detailed Insights →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
