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
        <div className="bg-white rounded-[2rem] p-8 lg:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100 mx-auto max-w-2xl relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full opacity-50 pointer-events-none" />

            <div className="relative z-10 mb-10">
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-3 leading-tight">
                    {question}
                    {required && <span className="text-amber-500 ml-1">*</span>}
                </h2>
                <p className="text-lg text-slate-500">{description}</p>
            </div>

            {type === 'single' && (
                <div className="space-y-4">
                    {options.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => handleSingleSelect(option.value as string)}
                            className={cn(
                                "group w-full flex items-center justify-between p-5 rounded-xl border-2 transition-all duration-300",
                                selectedValue === option.value
                                    ? "border-blue-500 bg-blue-50/50 shadow-md shadow-blue-500/10"
                                    : "border-slate-100 bg-white hover:border-blue-200 hover:bg-slate-50"
                            )}
                        >
                            <span className={cn(
                                "text-lg font-medium transition-colors",
                                selectedValue === option.value ? "text-blue-700" : "text-slate-700"
                            )}>{option.label}</span>

                            <div className={cn(
                                "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                                selectedValue === option.value
                                    ? "border-blue-500 bg-blue-500 scale-110"
                                    : "border-slate-300 group-hover:border-blue-300"
                            )}>
                                {selectedValue === option.value && (
                                    <Check size={14} className="text-white" />
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {type === 'multiple' && (
                <div className="space-y-4">
                    {options.map((option) => {
                        const isSelected = Array.isArray(selectedValue) && selectedValue.includes(option.value as string);
                        return (
                            <button
                                key={option.id}
                                onClick={() => handleMultipleSelect(option.value as string)}
                                className={cn(
                                    "group w-full flex items-center justify-between p-5 rounded-xl border-2 transition-all duration-300",
                                    isSelected
                                        ? "border-blue-500 bg-blue-50/50 shadow-md shadow-blue-500/10"
                                        : "border-slate-100 bg-white hover:border-blue-200 hover:bg-slate-50"
                                )}
                            >
                                <span className={cn(
                                    "text-lg font-medium transition-colors",
                                    isSelected ? "text-blue-700" : "text-slate-700"
                                )}>{option.label}</span>
                                <div className={cn(
                                    "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300",
                                    isSelected
                                        ? "border-blue-500 bg-blue-500 scale-110"
                                        : "border-slate-300 group-hover:border-blue-300"
                                )}>
                                    {isSelected && (
                                        <Check size={14} className="text-white" />
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>
            )}

            {type === 'scale' && (
                <div className="space-y-8">
                    <div className="flex justify-between items-center gap-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <button
                                key={num}
                                onClick={() => handleScaleSelect(num)}
                                className={cn(
                                    "w-8 h-12 lg:w-12 lg:h-16 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center relative overflow-hidden group",
                                    selectedValue === num
                                        ? "bg-blue-600 text-white scale-110 shadow-lg shadow-blue-500/30"
                                        : "bg-slate-50 text-slate-500 hover:bg-blue-100 hover:text-blue-600"
                                )}
                            >
                                <span className="relative z-10">{num}</span>
                                {selectedValue === num && (
                                    <div className="absolute inset-0 bg-gradient-to-t from-blue-700 to-transparent opacity-50" />
                                )}
                            </button>
                        ))}
                    </div>
                    <div className="flex justify-between text-sm font-semibold text-slate-400 px-2 uppercase tracking-wide">
                        <span>Not at all</span>
                        <span>Extremely</span>
                    </div>
                </div>
            )}

            {type === 'input' && (
                <div className="relative">
                    <Input
                        type="text"
                        value={inputValue}
                        onChange={(e) => handleInputChange(e.target.value)}
                        placeholder="Type your answer here..."
                        className="w-full px-6 py-5 text-lg rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-slate-50 focus:bg-white"
                    />
                </div>
            )}
        </div>
    );
}
