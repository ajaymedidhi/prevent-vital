import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Milestone {
    week: number;
    title: string;
    description: string;
    completed: boolean;
}

interface ProgressTrackerProps {
    programName: string;
    currentWeek: number;
    totalWeeks: number;
    milestones: Milestone[];
}

export default function ProgressTracker({
    programName,
    currentWeek,
    totalWeeks,
    milestones
}: ProgressTrackerProps) {
    const progressPercentage = (currentWeek / totalWeeks) * 100;

    return (
        <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-foreground">{programName} Progress</h3>
                <span className="text-sm font-semibold text-primary">
                    Week {currentWeek} of {totalWeeks}
                </span>
            </div>

            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Overall Progress</span>
                    <span className="text-sm font-semibold text-foreground">{Math.round(progressPercentage)}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-primary to-emerald-500 transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
            </div>

            <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground">Program Milestones</h4>
                <div className="relative">
                    {/* Connector Line */}
                    <div className="absolute left-4 top-4 bottom-4 w-px bg-border z-0" />

                    {milestones.map((milestone, index) => (
                        <div
                            key={index}
                            className={cn("flex items-start gap-4 p-3 rounded-lg relative z-10 transition-colors",
                                milestone.completed ? 'bg-primary/5' : 'bg-transparent'
                            )}
                        >
                            <div
                                className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2",
                                    milestone.completed
                                        ? 'bg-primary border-primary text-primary-foreground'
                                        : 'bg-background border-muted text-muted-foreground'
                                )}
                            >
                                {milestone.completed ? (
                                    <Check size={16} />
                                ) : (
                                    <span className="text-xs font-semibold">{milestone.week}</span>
                                )}
                            </div>
                            <div className="flex-1 pt-1">
                                <h5 className={cn("text-sm font-semibold mb-1", milestone.completed ? "text-primary" : "text-foreground")}>
                                    Week {milestone.week}: {milestone.title}
                                </h5>
                                <p className="text-xs text-muted-foreground">{milestone.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
