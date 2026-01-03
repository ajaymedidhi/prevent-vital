import React from 'react';
import { Heart, Activity, Droplets, Waves } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface VitalsIconsProps {
    vitals: string[];
}

const VitalsIcons: React.FC<VitalsIconsProps> = ({ vitals }) => {
    if (!vitals || vitals.length === 0) return null;

    const getIcon = (vital: string) => {
        switch (vital) {
            case 'heart_rate':
                return { icon: <Heart className="text-red-500" />, label: 'Heart Rate' };
            case 'systolic_bp':
            case 'diastolic_bp':
                return { icon: <Activity className="text-blue-500" />, label: 'Blood Pressure' };
            case 'spo2':
                return { icon: <Droplets className="text-cyan-500" />, label: 'SpO2' };
            case 'ecg':
                return { icon: <Waves className="text-green-500" />, label: 'ECG' };
            default:
                return { icon: <Activity />, label: vital };
        }
    };

    return (
        <div className="flex gap-2">
            <TooltipProvider>
                {vitals.map((vital) => {
                    const { icon, label } = getIcon(vital);
                    return (
                        <Tooltip key={vital}>
                            <TooltipTrigger asChild>
                                <div className="p-2 border rounded-full bg-background hover:bg-muted/50 transition-colors">
                                    {icon}
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{label}</p>
                            </TooltipContent>
                        </Tooltip>
                    );
                })}
            </TooltipProvider>
        </div>
    );
};

export default VitalsIcons;
