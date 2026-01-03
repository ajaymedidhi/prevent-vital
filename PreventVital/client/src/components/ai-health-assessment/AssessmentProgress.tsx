
interface AssessmentProgressProps {
    currentStep: number;
    totalSteps: number;
    completionPercentage: number;
}

export default function AssessmentProgress({
    currentStep,
    totalSteps,
    completionPercentage
}: AssessmentProgressProps) {
    return (
        <div className="w-full bg-card rounded-lg p-6 border border-border shadow-sm">
            <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-muted-foreground">
                    Step {currentStep} of {totalSteps}
                </span>
                <span className="text-sm font-semibold text-primary">
                    {completionPercentage}% Complete
                </span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-primary to-emerald-500 transition-all duration-500 ease-out"
                    style={{ width: `${completionPercentage}%` }}
                />
            </div>
        </div>
    );
}
