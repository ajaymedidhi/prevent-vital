
import { User } from 'lucide-react';

interface Appointment {
    id: number;
    patientName: string;
    time: string;
    type: string;
    status: 'scheduled' | 'in-progress' | 'completed';
}

interface AppointmentCardProps {
    appointment: Appointment;
    onManage: (id: number) => void;
}

export default function AppointmentCard({ appointment, onManage }: AppointmentCardProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900 dark:text-emerald-100 dark:border-emerald-800';
            case 'in-progress': return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900 dark:text-amber-100 dark:border-amber-800';
            default: return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-800';
        }
    };

    return (
        <div className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User size={20} className="text-primary" />
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-foreground">{appointment.patientName}</h4>
                        <p className="text-xs text-muted-foreground">{appointment.type}</p>
                    </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                    {appointment.status.replace('-', ' ')}
                </span>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">⏰ {appointment.time}</span>
                <button
                    onClick={() => onManage(appointment.id)}
                    className="px-3 py-1 bg-muted text-foreground rounded-md text-xs font-medium hover:bg-muted/80 transition-all"
                >
                    Manage
                </button>
            </div>
        </div>
    );
}
