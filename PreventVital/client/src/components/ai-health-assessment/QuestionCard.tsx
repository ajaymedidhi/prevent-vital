import { useState } from 'react';
import { Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Option {
    id: string;
    label: string;
    value: string | number;
}

interface QuestionCardProps {
    question: string;
    description: string;
    type: 'single' | 'multiple' | 'scale' | 'input';
    options?: Option[];
    selectedValue: string | string[] | number;
    onAnswer: (value: string | string[] | number) => void;
    required?: boolean;
}

export default function QuestionCard({
    question,
    description,
    type,
    options = [],
    selectedValue,
    onAnswer,
    required = true
}: QuestionCardProps) {
    const [inputValue, setInputValue] = useState<string>(
        typeof selectedValue === 'string' ? selectedValue : ''
    );

    const handleSingleSelect = (value: string) => {
        onAnswer(value);
    };

    const handleMultipleSelect = (value: string) => {
        const currentValues = Array.isArray(selectedValue) ? selectedValue : [];
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];
        onAnswer(newValues);
    };

    const handleScaleSelect = (value: number) => {
        onAnswer(value);
    };

    const handleInputChange = (value: string) => {
        setInputValue(value);
        onAnswer(value);
    };

    return (
        <div className="bg-card rounded-lg p-6 lg:p-8 border border-border shadow-lg">
            <div className="mb-6">
                <h2 className="text-xl lg:text-2xl font-semibold text-foreground mb-2">
                    {question}
                    {required && <span className="text-destructive ml-1">*</span>}
                </h2>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>

            {type === 'single' && (
                <div className="space-y-3">
                    {options.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => handleSingleSelect(option.value as string)}
                            className={cn(
                                "w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200",
                                selectedValue === option.value
                                    ? "border-primary bg-primary/5"
                                    : "border-border hover:border-primary/50 hover:bg-muted"
                            )}
                        >
                            <span className="text-sm font-medium text-foreground">{option.label}</span>
                            <div className={cn(
                                "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                                selectedValue === option.value
                                    ? "border-primary bg-primary"
                                    : "border-border"
                            )}>
                                {selectedValue === option.value && (
                                    <Check size={12} className="text-primary-foreground" />
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {type === 'multiple' && (
                <div className="space-y-3">
                    {options.map((option) => {
                        const isSelected = Array.isArray(selectedValue) && selectedValue.includes(option.value as string);
                        return (
                            <button
                                key={option.id}
                                onClick={() => handleMultipleSelect(option.value as string)}
                                className={cn(
                                    "w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200",
                                    isSelected
                                        ? "border-primary bg-primary/5"
                                        : "border-border hover:border-primary/50 hover:bg-muted"
                                )}
                            >
                                <span className="text-sm font-medium text-foreground">{option.label}</span>
                                <div className={cn(
                                    "w-5 h-5 rounded border-2 flex items-center justify-center",
                                    isSelected
                                        ? "border-primary bg-primary"
                                        : "border-border"
                                )}>
                                    {isSelected && (
                                        <Check size={12} className="text-primary-foreground" />
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>
            )}

            {type === 'scale' && (
                <div className="space-y-4">
                    <div className="flex justify-between items-center flex-wrap gap-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <button
                                key={num}
                                onClick={() => handleScaleSelect(num)}
                                className={cn(
                                    "w-8 h-8 lg:w-12 lg:h-12 rounded-full font-semibold transition-all duration-200 flex items-center justify-center",
                                    selectedValue === num
                                        ? "bg-primary text-primary-foreground scale-110 shadow-md"
                                        : "bg-muted text-muted-foreground hover:bg-primary/20 hover:text-primary"
                                )}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground px-2">
                        <span>Not at all</span>
                        <span>Extremely</span>
                    </div>
                </div>
            )}

            {type === 'input' && (
                <Input
                    type="text"
                    value={inputValue}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="Enter your answer..."
                    className="w-full px-4 py-3 h-auto text-base"
                />
            )}
        </div>
    );
}
