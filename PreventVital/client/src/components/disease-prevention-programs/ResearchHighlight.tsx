import { GraduationCap, TrendingUp, Users } from 'lucide-react';

interface ResearchHighlightProps {
    title: string;
    institution: string;
    year: number;
    finding: string;
    participants: number;
    improvement: string;
}

export default function ResearchHighlight({
    title,
    institution,
    year,
    finding,
    participants,
    improvement
}: ResearchHighlightProps) {
    return (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-5">
            <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <GraduationCap size={20} className="text-primary" />
                </div>
                <div className="flex-1">
                    <h5 className="font-bold text-foreground text-sm mb-1">{title}</h5>
                    <p className="text-xs text-muted-foreground">{institution} • {year}</p>
                </div>
            </div>

            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{finding}</p>

            <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1 text-muted-foreground">
                    <Users size={14} className="text-primary" />
                    <span>{participants.toLocaleString('en-IN')} participants</span>
                </div>
                <div className="flex items-center gap-1 text-emerald-600 font-semibold">
                    <TrendingUp size={14} />
                    <span>{improvement}</span>
                </div>
            </div>
        </div>
    );
}
