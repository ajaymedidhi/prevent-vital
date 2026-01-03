
import { Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProgramCardProps {
    title: string;
    description: string;
    image: string;
    alt: string;
    therapies: string[];
    successRate: string;
    duration: string;
    onClick: () => void;
}

export default function ProgramCard({
    title,
    description,
    image,
    alt,
    therapies,
    successRate,
    duration,
    onClick
}: ProgramCardProps) {
    return (
        <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col h-full">
            <div className="relative h-48 overflow-hidden shrink-0">
                <img
                    src={image}
                    alt={alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                    {successRate} Success Rate
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>

                <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                    <Clock size={16} className="text-primary" />
                    <span>{duration}</span>
                </div>

                <div className="mb-4 flex-grow">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Integrated Therapies:</p>
                    <div className="flex flex-wrap gap-2">
                        {therapies.map((therapy, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md"
                            >
                                {therapy}
                            </span>
                        ))}
                    </div>
                </div>

                <Button
                    onClick={onClick}
                    className="w-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 mt-auto"
                >
                    Explore Program
                    <ArrowRight size={16} className="ml-2" />
                </Button>
            </div>
        </div>
    );
}
