import { useState } from 'react';
import { Filter, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FilterOption {
    id: string;
    label: string;
    count: number;
}

interface ProgramFilterProps {
    categories: FilterOption[];
    therapyTypes: FilterOption[];
    onFilterChange: (filters: { category: string; therapy: string }) => void;
}

export default function ProgramFilter({
    categories,
    therapyTypes,
    onFilterChange
}: ProgramFilterProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedTherapy, setSelectedTherapy] = useState<string>('all');
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategory(categoryId);
        onFilterChange({ category: categoryId, therapy: selectedTherapy });
    };

    const handleTherapyChange = (therapyId: string) => {
        setSelectedTherapy(therapyId);
        onFilterChange({ category: selectedCategory, therapy: therapyId });
    };

    return (
        <div className="bg-card border border-border rounded-xl p-4 lg:p-6 sticky top-24">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <Filter size={20} className="text-primary" />
                    Filter Programs
                </h3>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="lg:hidden text-muted-foreground"
                >
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
            </div>

            <div className={cn("space-y-6", isExpanded ? 'block' : 'hidden lg:block')}>
                <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3">Condition Category</h4>
                    <div className="space-y-2">
                        {categories.map((category) => (
                            <label
                                key={category.id}
                                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                                onClick={() => handleCategoryChange(category.id)}
                            >
                                <div className="flex items-center gap-2">
                                    <div className={cn("w-4 h-4 rounded-full border flex items-center justify-center", selectedCategory === category.id ? "border-primary" : "border-muted-foreground")}>
                                        {selectedCategory === category.id && <div className="w-2 h-2 rounded-full bg-primary" />}
                                    </div>
                                    <span className="text-sm text-muted-foreground">{category.label}</span>
                                </div>
                                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                                    {category.count}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3">Therapy Type</h4>
                    <div className="space-y-2">
                        {therapyTypes.map((therapy) => (
                            <label
                                key={therapy.id}
                                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                                onClick={() => handleTherapyChange(therapy.id)}
                            >
                                <div className="flex items-center gap-2">
                                    <div className={cn("w-4 h-4 rounded-full border flex items-center justify-center", selectedTherapy === therapy.id ? "border-primary" : "border-muted-foreground")}>
                                        {selectedTherapy === therapy.id && <div className="w-2 h-2 rounded-full bg-primary" />}
                                    </div>
                                    <span className="text-sm text-muted-foreground">{therapy.label}</span>
                                </div>
                                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                                    {therapy.count}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <Button
                    onClick={() => {
                        setSelectedCategory('all');
                        setSelectedTherapy('all');
                        onFilterChange({ category: 'all', therapy: 'all' });
                    }}
                    variant="outline"
                    className="w-full text-sm font-semibold text-primary hover:bg-primary/10 transition-colors border-primary/20"
                >
                    Clear All Filters
                </Button>
            </div>
        </div>
    );
}
