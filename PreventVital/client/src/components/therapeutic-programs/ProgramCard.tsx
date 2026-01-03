
import { Download, Play, User, Clock, Star, Users } from 'lucide-react';

interface Program {
    id: string;
    title: string;
    instructor: string;
    duration: string;
    level: string;
    image: string;
    alt: string;
    rating: number;
    participants: number;
    category: string;
    description: string;
}

interface ProgramCardProps {
    program: Program;
    onStartSession: (programId: string) => void;
    onDownload: (programId: string) => void;
}

export default function ProgramCard({ program, onStartSession, onDownload }: ProgramCardProps) {
    const getLevelColor = (level: string) => {
        switch (level.toLowerCase()) {
            case 'beginner':
                return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
            case 'intermediate':
                return 'text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30';
            case 'advanced':
                return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
            default:
                return 'text-muted-foreground bg-muted';
        }
    };

    return (
        <div className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={program.image}
                    alt={program.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>

                <div className="absolute top-3 right-3 flex items-center space-x-2">
                    <button
                        onClick={() => onDownload(program.id)}
                        className="flex items-center justify-center w-9 h-9 bg-card/90 backdrop-blur-sm rounded-lg hover:bg-card transition-colors"
                        aria-label="Download program"
                    >
                        <Download size={18} className="text-foreground" />
                    </button>
                </div>

                <div className="absolute bottom-3 left-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(program.level)}`}>
                        {program.level}
                    </span>
                </div>
            </div>

            <div className="p-5 space-y-4">
                <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                        {program.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {program.description}
                    </p>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                        <User size={16} className="text-muted-foreground" />
                        <span className="text-muted-foreground">{program.instructor}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Clock size={16} className="text-muted-foreground" />
                        <span className="text-muted-foreground">{program.duration}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                            <Star size={16} className="text-amber-500 fill-amber-500" />
                            <span className="text-sm font-medium text-foreground">{program.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Users size={16} className="text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{program.participants.toLocaleString()}</span>
                        </div>
                    </div>

                    <button
                        onClick={() => onStartSession(program.id)}
                        className="flex items-center space-x-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm font-semibold"
                    >
                        <Play size={16} className="fill-current" />
                        <span>Start</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
