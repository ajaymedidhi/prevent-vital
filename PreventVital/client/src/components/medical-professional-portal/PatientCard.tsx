
interface Patient {
    id: number;
    name: string;
    age: number;
    condition: string;
    riskLevel: 'low' | 'medium' | 'high';
    lastVisit: string;
    nextAppointment: string;
    image: string;
    alt: string;
}

interface PatientCardProps {
    patient: Patient;
    onViewDetails: (id: number) => void;
}

export default function PatientCard({ patient, onViewDetails }: PatientCardProps) {
    const getRiskColor = (level: string) => {
        switch (level) {
            case 'high': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900 dark:text-red-100 dark:border-red-800';
            case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900 dark:text-amber-100 dark:border-amber-800';
            default: return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900 dark:text-emerald-100 dark:border-emerald-800';
        }
    };

    return (
        <div className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start space-x-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-border">
                    <img
                        src={patient.image}
                        alt={patient.alt}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                        <div>
                            <h3 className="text-lg font-semibold text-foreground truncate">{patient.name}</h3>
                            <p className="text-sm text-muted-foreground">{patient.age} years • {patient.condition}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRiskColor(patient.riskLevel)}`}>
                            {patient.riskLevel.toUpperCase()}
                        </span>
                    </div>
                    <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                            <span className="mr-2">🕐</span>
                            <span>Last Visit: {patient.lastVisit}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                            <span className="mr-2">📅</span>
                            <span>Next: {patient.nextAppointment}</span>
                        </div>
                    </div>
                    <button
                        onClick={() => onViewDetails(patient.id)}
                        className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all duration-300"
                    >
                        View Full Record
                    </button>
                </div>
            </div>
        </div>
    );
}
