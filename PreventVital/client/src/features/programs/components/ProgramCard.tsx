import { Clock, Star, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Program } from '@/types/program';
import { Link } from 'react-router-dom';

interface ProgramCardProps {
    program: Program;
}

export default function ProgramCard({ program }: ProgramCardProps) {
    return (
        <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col h-full animate-fade-in">
            <div className="relative h-48 overflow-hidden shrink-0">
                <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                    <Badge variant={program.category === 'preventive' ? 'default' : 'secondary'} className="bg-background/80 backdrop-blur-sm hover:bg-background/90 text-foreground">
                        {program.category.charAt(0).toUpperCase() + program.category.slice(1)}
                    </Badge>
                </div>
                <div className="absolute bottom-4 left-4">
                    <Badge className={`${program.difficulty === 'Beginner' ? 'bg-emerald-500' : program.difficulty === 'Intermediate' ? 'bg-amber-500' : 'bg-red-500'} text-white border-0`}>
                        {program.difficulty}
                    </Badge>
                </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1 text-amber-500">
                        <Star size={14} fill="currentColor" />
                        <span className="text-sm font-semibold">{program.averageRating}</span>
                        <span className="text-xs text-muted-foreground">({program.reviewCount})</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground text-xs">
                        <Users size={14} />
                        <span>{program.enrollmentCount.toLocaleString()} enrolled</span>
                    </div>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                    {program.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">
                    {program.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-5 pt-4 border-t border-border">
                    <div className="flex items-center gap-1.5">
                        <Clock size={14} className="text-primary" />
                        <span>{program.durationWeeks} weeks</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-primary">{program.totalSessions}</span>
                        <span>sessions</span>
                    </div>
                </div>

                <div className="mt-auto flex items-center justify-between gap-3">
                    <div className="text-sm font-semibold">
                        {program.pricingType === 'free' ? (
                            <span className="text-emerald-600">Free Program</span>
                        ) : (
                            <span className="text-primary">Subscription</span>
                        )}
                    </div>
                    <Button asChild size="sm" className="gap-2">
                        <Link to={`/programs/${program._id}`}>
                            View Details <ArrowRight size={14} />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
