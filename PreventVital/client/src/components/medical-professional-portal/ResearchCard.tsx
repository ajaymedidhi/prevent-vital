
interface Research {
    id: number;
    title: string;
    journal: string;
    date: string;
    category: string;
}

interface ResearchCardProps {
    research: Research;
}

export default function ResearchCard({ research }: ResearchCardProps) {
    return (
        <div className="bg-card border border-border rounded-lg p-5 hover:shadow-sm transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full border border-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-800">
                    {research.category}
                </span>
                <span className="text-xs text-muted-foreground">{research.date}</span>
            </div>
            <h4 className="text-base font-semibold text-foreground mb-2 line-clamp-2">{research.title}</h4>
            <p className="text-sm text-muted-foreground mb-4">{research.journal}</p>
            <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                Read Publication →
            </button>
        </div>
    );
}
