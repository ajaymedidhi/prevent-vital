import { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { Search, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { programService } from '../programService';
import ProgramCard from '../components/ProgramCard';
import ProgramFilterSidebar from '../components/ProgramFilter';
import { ProgramFilter } from '@/types/program';
import { Helmet } from 'react-helmet-async';

export default function ProgramListingPage() {
    const [filters, setFilters] = useState<ProgramFilter>({});
    const [debouncedSearch, setDebouncedSearch] = useState('');

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setFilters(prev => ({ ...prev, search: debouncedSearch || undefined }));
        }, 500);
        return () => clearTimeout(timer);
    }, [debouncedSearch]);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['programs', filters],
        queryFn: () => programService.getAllPrograms(filters),
        placeholderData: keepPreviousData
    });

    return (
        <>
            <Helmet>
                <title>Browse Health Programs - PreventVital</title>
                <meta name="description" content="Discover doctor-designed health programs for diabetes, heart health, mental wellness, and more." />
            </Helmet>

            <div className="min-h-screen bg-background pb-20">
                {/* Hero Section */}
                <div className="bg-primary/5 border-b border-primary/10 pt-24 pb-12">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
                            Discover Health Programs
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
                            Evidence-based preventive care programs designed by top medical experts.
                            Find the right path to your optimal health.
                        </p>

                        <div className="max-w-md mx-auto relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                            <Input
                                placeholder="Search programs, conditions, or therapies..."
                                className="pl-10 h-12 text-base shadow-sm"
                                value={debouncedSearch}
                                onChange={(e) => setDebouncedSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8 md:py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar Filters */}
                        <aside className="lg:col-span-1">
                            <ProgramFilterSidebar
                                filters={filters}
                                onFilterChange={setFilters}
                                className="sticky top-24"
                            />
                        </aside>

                        {/* Program Grid */}
                        <main className="lg:col-span-3">
                            <div className="mb-6 flex items-center justify-between">
                                <p className="text-muted-foreground">
                                    {isLoading ? 'Loading programs...' : `Showing ${data?.results || 0} programs`}
                                </p>
                                {/* Sorting could go here */}
                            </div>

                            {isLoading ? (
                                <div className="flex justify-center py-20">
                                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                                </div>
                            ) : isError ? (
                                <div className="text-center py-20 bg-destructive/5 rounded-xl border border-destructive/20">
                                    <h3 className="text-lg font-semibold text-destructive mb-2">Failed to load programs</h3>
                                    <p className="text-muted-foreground">Please try again later or check your connection.</p>
                                </div>
                            ) : data?.data.programs.length === 0 ? (
                                <div className="text-center py-20 bg-muted/30 rounded-xl border border-border border-dashed">
                                    <h3 className="text-lg font-semibold text-foreground mb-2">No programs found</h3>
                                    <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {data?.data.programs.map((program) => (
                                        <ProgramCard key={program._id} program={program} />
                                    ))}
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}
