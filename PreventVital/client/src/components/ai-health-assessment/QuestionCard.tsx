import { useState, useEffect } from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils'; // Assuming standard Shadcn utils

interface Option {
    id: string;
    label: string;
    value: string | number;
    points?: number;
}

interface InputField {
    id: string;
    label: string;
    placeholder: string;
    unit?: string;
    type: 'number';
}

interface QuestionCardProps {
    question: string;
    description: string;
    type: 'single' | 'multiple' | 'scale' | 'input' | 'number-input';
    options?: Option[];
    inputs?: InputField[];
    selectedValue: any;
    onAnswer: (value: any) => void;
    required?: boolean;
}

export default function QuestionCard({
    question,
    description,
    type,
    options = [],
    inputs = [],
    selectedValue,
    onAnswer,
    required = true
}: QuestionCardProps) {
    const [inputValue, setInputValue] = useState<string>(
        typeof selectedValue === 'string' ? selectedValue : ''
    );

    // For multi-inputs, selectedValue is an object { [id]: value }
    const [multiInputValues, setMultiInputValues] = useState<Record<string, string>>(
        (typeof selectedValue === 'object' && selectedValue !== null) ? selectedValue : {}
    );

    useEffect(() => {
        if (type === 'number-input' && inputs.length > 0) {
            setMultiInputValues(
                (typeof selectedValue === 'object' && selectedValue !== null) ? selectedValue : {}
            );
        } else if (typeof selectedValue === 'string') {
            setInputValue(selectedValue);
        }
    }, [selectedValue, type, inputs.length]);

    const handleSingleSelect = (value: string) => {
        onAnswer(value);
    };

    const handleMultipleSelect = (value: string) => {
        const currentValues = Array.isArray(selectedValue) ? selectedValue : [];
        const newValues = currentValues.includes(value)
            ? currentValues.filter((v: any) => v !== value)
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

    const handleMultiInputChange = (id: string, value: string) => {
        const newValues = { ...multiInputValues, [id]: value };
        setMultiInputValues(newValues);
        onAnswer(newValues);
    };

    return (
        <div className="bg-white rounded-[1.5rem] lg:rounded-[2rem] p-5 lg:p-12 shadow-2xl shadow-slate-200/60 border border-slate-100 mx-auto max-w-3xl relative overflow-hidden transition-all duration-500 hover:shadow-slate-300/50">
            {/* Background Decoration */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-emerald-50 to-teal-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

            <div className="relative z-10 mb-8 lg:mb-12 text-center lg:text-left">
                <h2 className="text-2xl lg:text-5xl font-bold text-slate-900 mb-4 lg:mb-6 leading-tight tracking-tight">
                    {question}
                    {required && <span className="text-amber-500 ml-2 text-2xl lg:text-4xl align-top animate-pulse">*</span>}
                </h2>
                <div className="h-1.5 w-16 lg:w-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4 lg:mb-6 mx-auto lg:mx-0"></div>
                <p className="text-base lg:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">{description}</p>
            </div>

            <div className="relative z-10">
                {type === 'single' && (
                    <div className="grid grid-cols-1 gap-2.5 lg:gap-4">
                        {options.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => handleSingleSelect(option.value as string)}
                                className={cn(
                                    "group w-full flex items-center justify-between p-4 lg:p-6 rounded-2xl border-2 text-left transition-all duration-200 ease-out hover:scale-[1.01] active:scale-[0.99]",
                                    selectedValue === option.value
                                        ? "border-blue-600 bg-blue-50/80 shadow-lg shadow-blue-500/10 ring-2 ring-blue-600 ring-offset-2"
                                        : "border-slate-100 bg-white hover:border-blue-300 hover:bg-slate-50 hover:shadow-md"
                                )}
                            >
                                <span className={cn(
                                    "text-base lg:text-xl font-bold transition-colors pr-4",
                                    selectedValue === option.value ? "text-blue-700" : "text-slate-700"
                                )}>{option.label}</span>

                                <div className={cn(
                                    "w-6 h-6 lg:w-8 lg:h-8 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-300 shadow-sm",
                                    selectedValue === option.value
                                        ? "border-blue-600 bg-blue-600 scale-100"
                                        : "border-slate-200 bg-slate-50 group-hover:border-blue-300"
                                )}>
                                    {selectedValue === option.value && (
                                        <Check size={14} className="text-white lg:w-4 lg:h-4" strokeWidth={3} />
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {type === 'multiple' && (
                    <div className="grid grid-cols-1 gap-2.5 lg:gap-4">
                        {options.map((option) => {
                            const isSelected = Array.isArray(selectedValue) && selectedValue.includes(option.value as string);
                            return (
                                <button
                                    key={option.id}
                                    onClick={() => handleMultipleSelect(option.value as string)}
                                    className={cn(
                                        "group w-full flex items-center justify-between p-4 lg:p-6 rounded-2xl border-2 text-left transition-all duration-200 ease-out hover:scale-[1.01] active:scale-[0.99]",
                                        isSelected
                                            ? "border-blue-600 bg-blue-50/80 shadow-lg shadow-blue-500/10 ring-2 ring-blue-600 ring-offset-2"
                                            : "border-slate-100 bg-white hover:border-blue-300 hover:bg-slate-50 hover:shadow-md"
                                    )}
                                >
                                    <span className={cn(
                                        "text-base lg:text-xl font-bold transition-colors pr-4",
                                        isSelected ? "text-blue-700" : "text-slate-700"
                                    )}>{option.label}</span>
                                    <div className={cn(
                                        "w-6 h-6 lg:w-8 lg:h-8 rounded-lg border-2 flex-shrink-0 flex items-center justify-center transition-all duration-300 shadow-sm",
                                        isSelected
                                            ? "border-blue-600 bg-blue-600 scale-100"
                                            : "border-slate-200 bg-slate-50 group-hover:border-blue-300"
                                    )}>
                                        {isSelected && (
                                            <Check size={14} className="text-white lg:w-4 lg:h-4" strokeWidth={3} />
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                )}

                {type === 'scale' && (
                    <div className="space-y-6 lg:space-y-12 py-2 lg:py-8">
                        <div className="grid grid-cols-5 gap-1.5 lg:flex lg:justify-between lg:items-center lg:gap-1.5 px-0 lg:px-2">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                <button
                                    key={num}
                                    onClick={() => handleScaleSelect(num)}
                                    className={cn(
                                        "w-full aspect-square lg:aspect-[3/4] lg:max-w-[60px] rounded-xl font-bold text-base lg:text-xl transition-all duration-300 flex items-center justify-center relative overflow-hidden group border-b-4 active:border-b-0 active:translate-y-1",
                                        selectedValue === num
                                            ? "bg-blue-600 text-white border-blue-800 shadow-lg shadow-blue-500/30 lg:-translate-y-2 lg:scale-110 z-10"
                                            : "bg-white border-slate-200 text-slate-400 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
                                    )}
                                >
                                    <span className="relative z-10">{num}</span>
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-between text-[10px] lg:text-sm font-bold text-slate-400 px-1 lg:px-2 uppercase tracking-widest">
                            <span className="flex items-center text-slate-300"><div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-slate-300 mr-1.5 lg:mr-2" /> Not at all</span>
                            <span className="flex items-center text-slate-900"><div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-blue-600 mr-1.5 lg:mr-2" /> Extremely</span>
                        </div>
                    </div>
                )}

                {type === 'input' && (
                    <div className="relative group">
                        <Input
                            type="text"
                            value={inputValue}
                            onChange={(e) => handleInputChange(e.target.value)}
                            placeholder="Type your answer here..."
                            className="w-full px-5 py-5 lg:px-8 lg:py-8 text-base lg:text-xl rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-slate-50 focus:bg-white placeholder:text-slate-300 font-medium"
                        />
                        <div className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors">
                            <ChevronRight size={20} className="lg:w-6 lg:h-6" />
                        </div>
                    </div>
                )}

                {type === 'number-input' && (
                    <div className="space-y-4 lg:space-y-6">
                        {inputs.map((input) => (
                            <div key={input.id} className="relative group p-0.5 transition-all">
                                <label className="block text-xs lg:text-sm font-bold text-slate-600 mb-1.5 lg:mb-2 ml-1 uppercase tracking-wider">
                                    {input.label}
                                </label>
                                <div className="relative">
                                    <Input
                                        type="number"
                                        value={multiInputValues[input.id] || ''}
                                        onChange={(e) => handleMultiInputChange(input.id, e.target.value)}
                                        placeholder={input.placeholder}
                                        className="w-full px-5 py-5 lg:px-8 lg:py-8 text-lg lg:text-2xl font-bold text-slate-900 rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white focus:bg-blue-50/30 placeholder:text-slate-200 placeholder:font-normal"
                                    />
                                    {input.unit && (
                                        <div className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 px-2 lg:px-3 py-1 bg-slate-100 rounded-lg text-slate-500 font-bold text-[10px] lg:text-sm pointer-events-none group-focus-within:bg-blue-100 group-focus-within:text-blue-700 transition-colors">
                                            {input.unit}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
