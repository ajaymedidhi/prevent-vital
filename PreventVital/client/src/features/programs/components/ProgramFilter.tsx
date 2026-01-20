import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ProgramFilter as FilterType } from '@/types/program';

interface ProgramFilterSidebarProps {
    filters: FilterType;
    onFilterChange: (newFilters: FilterType) => void;
    className?: string;
}

export default function ProgramFilterSidebar({ filters, onFilterChange, className }: ProgramFilterSidebarProps) {

    const categories = ['metabolic', 'cardiovascular', 'respiratory', 'mental', 'musculoskeletal', 'preventive'];
    const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

    const toggleFilter = (key: keyof FilterType, value: any) => {
        if (filters[key] === value) {
            const newFilters = { ...filters };
            delete newFilters[key];
            onFilterChange(newFilters);
        } else {
            onFilterChange({ ...filters, [key]: value });
        }
    };

    const clearFilters = () => {
        onFilterChange({});
    };

    const hasActiveFilters = Object.keys(filters).length > 0;

    return (
        <div className={`space-y-6 ${className}`}>
            <div className="flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2">
                    <Filter size={18} className="text-primary" /> Filters
                </h3>
                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="h-8 px-2 text-xs text-muted-foreground hover:text-destructive"
                    >
                        Clear All
                    </Button>
                )}
            </div>

            <Separator />

            {/* Categories */}
            <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground">Category</h4>
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                        <Badge
                            key={cat}
                            variant={filters.category === cat ? "default" : "outline"}
                            className="cursor-pointer capitalize hover:bg-primary/20 hover:text-primary transition-colors"
                            onClick={() => toggleFilter('category', cat)}
                        >
                            {cat}
                        </Badge>
                    ))}
                </div>
            </div>

            <Separator />

            {/* Difficulty */}
            <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground">Difficulty</h4>
                <div className="space-y-2">
                    {difficulties.map((diff) => (
                        <div
                            key={diff}
                            className={`flex items-center justify-between text-sm px-3 py-2 rounded-md cursor-pointer transition-colors ${filters.difficulty === diff ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted text-muted-foreground'}`}
                            onClick={() => toggleFilter('difficulty', diff)}
                        >
                            <span>{diff}</span>
                            {filters.difficulty === diff && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                        </div>
                    ))}
                </div>
            </div>

            <Separator />

            {/* Rating */}
            <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground">Minimum Rating</h4>
                <div className="space-y-2">
                    {[4, 3, 2].map((rating) => (
                        <div
                            key={rating}
                            className={`flex items-center gap-2 text-sm px-3 py-2 rounded-md cursor-pointer transition-colors ${filters.minRating === rating ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted text-muted-foreground'}`}
                            onClick={() => toggleFilter('minRating', rating)}
                        >
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star size={12} key={i} className={i < rating ? "fill-amber-400 text-amber-400" : "text-muted"} />
                                ))}
                            </div>
                            <span className="text-xs">& Up</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function Star({ className, ...props }: any) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
}
