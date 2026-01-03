import { Clock, ArrowRight } from 'lucide-react';

interface HealthMetric {
    label: string;
    before: string;
    after: string;
    improvement: string;
}

interface SuccessStoryCardProps {
    name: string;
    age: number;
    condition: string;
    image: string;
    alt: string;
    story: string;
    metrics: HealthMetric[];
    duration: string;
}

export default function SuccessStoryCard({
    name,
    age,
    condition,
    image,
    alt,
    story,
    metrics,
    duration
}: SuccessStoryCardProps) {
    return (
        <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow h-full flex flex-col">
            <div className="flex items-start gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border border-border">
                    <img
                        src={image}
                        alt={alt}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-1">
                    <h4 className="text-lg font-bold text-foreground">{name}</h4>
                    <p className="text-sm text-muted-foreground">{age} years • {condition}</p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-amber-600 font-medium">
                        <Clock size={14} />
                        <span>{duration} journey</span>
                    </div>
                </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4 italic flex-grow">&quot;{story}&quot;</p>

            <div className="space-y-3">
                <p className="text-xs font-semibold text-foreground">Health Improvements:</p>
                {metrics.map((metric, index) => (
                    <div key={index} className="bg-muted/50 rounded-lg p-3 border border-border/50">
                        <p className="text-xs font-semibold text-foreground mb-2">{metric.label}</p>
                        <div className="flex items-center justify-between text-xs">
                            <div>
                                <span className="text-muted-foreground">Before: </span>
                                <span className="font-semibold text-destructive">{metric.before}</span>
                            </div>
                            <ArrowRight size={14} className="text-muted-foreground" />
                            <div>
                                <span className="text-muted-foreground">After: </span>
                                <span className="font-semibold text-emerald-600">{metric.after}</span>
                            </div>
                        </div>
                        <p className="text-xs text-emerald-600 font-semibold mt-1">{metric.improvement}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
