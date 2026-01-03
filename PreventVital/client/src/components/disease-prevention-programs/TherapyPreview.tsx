
import { Sparkles, Heart, User, Zap, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TherapyPreviewProps {
    name: string;
    icon: string;
    description: string;
    duration: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    onTry: () => void;
}

const IconMap: Record<string, any> = {
    SparklesIcon: Sparkles,
    HeartIcon: Heart,
    UserIcon: User,
    BoltIcon: Zap,
};

export default function TherapyPreview({
    name,
    icon,
    description,
    duration,
    difficulty,
    onTry
}: TherapyPreviewProps) {
    const difficultyColors = {
        Beginner: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100',
        Intermediate: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100',
        Advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
    };

    const IconComponent = IconMap[icon] || Sparkles;

    return (
        <div className="bg-card border border-border rounded-lg p-4 hover:border-primary transition-colors flex flex-col h-full">
            <div className="flex items-start gap-4 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <IconComponent size={20} className="text-primary" />
                </div>
                <div className="flex-1">
                    <h5 className="font-semibold text-foreground text-sm mb-1">{name}</h5>
                    <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
                </div>
            </div>

            <div className="flex items-center justify-between mb-4 mt-auto">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock size={14} />
                    <span>{duration}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${difficultyColors[difficulty]}`}>
                    {difficulty}
                </span>
            </div>

            <Button
                onClick={onTry}
                variant="secondary"
                className="w-full text-sm font-semibold h-9"
            >
                Try Session
            </Button>
        </div>
    );
}
