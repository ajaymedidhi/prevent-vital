import { useState } from 'react';
import { Smartphone, Watch, MapPin, Heart, Link as LinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WearableDevice {
    id: string;
    name: string;
    icon: any;
    connected: boolean;
}

interface WearableIntegrationProps {
    onConnect: (deviceId: string) => void;
}

export default function WearableIntegration({ onConnect }: WearableIntegrationProps) {
    const [devices] = useState<WearableDevice[]>([
        { id: 'fitbit', name: 'Fitbit', icon: Smartphone, connected: false },
        { id: 'apple-watch', name: 'Apple Watch', icon: Watch, connected: false },
        { id: 'garmin', name: 'Garmin', icon: MapPin, connected: false },
        { id: 'samsung', name: 'Samsung Health', icon: Heart, connected: false }
    ]);

    return (
        <div className="w-full">
            <div className="mb-6 text-center space-y-2">
                <h3 className="text-lg font-semibold text-slate-900">Connect Wearable Device</h3>
                <p className="text-sm text-slate-500 max-w-lg mx-auto">
                    Enhance assessment accuracy by connecting your wearable device for real-time health data.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {devices.map((device) => (
                    <button
                        key={device.id}
                        onClick={() => onConnect(device.id)}
                        className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 group"
                    >
                        <device.icon size={28} className="text-slate-400 group-hover:text-blue-500 mb-3 transition-colors" />
                        <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors">{device.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
