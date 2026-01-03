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
        <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
                <LinkIcon size={24} className="text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Connect Wearable Device</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
                Enhance assessment accuracy by connecting your wearable device for real-time health data.
            </p>
            <div className="grid grid-cols-2 gap-3">
                {devices.map((device) => (
                    <button
                        key={device.id}
                        onClick={() => onConnect(device.id)}
                        className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all duration-200"
                    >
                        <device.icon size={32} className="text-primary mb-2" />
                        <span className="text-sm font-medium text-foreground">{device.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
