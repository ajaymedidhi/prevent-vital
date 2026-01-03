
import { Smartphone, CheckCircle, Heart, Zap, Moon } from 'lucide-react';

interface WearableDevice {
    id: string;
    name: string;
    brand: string;
    image: string;
    alt: string;
    connected: boolean;
    lastSync: string;
}

interface WearableIntegrationProps {
    devices: WearableDevice[];
    onConnect: (deviceId: string) => void;
    onSync: (deviceId: string) => void;
}

export default function WearableIntegration({
    devices,
    onConnect,
    onSync
}: WearableIntegrationProps) {
    return (
        <section className="bg-background py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-full mb-6">
                        <Smartphone size={20} className="text-cyan-600 dark:text-cyan-400" />
                        <span className="text-sm font-medium text-cyan-700 dark:text-cyan-300">Real-Time Biometric Monitoring</span>
                    </div>

                    <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                        Connect Your Wearable Devices
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Sync your fitness trackers and smartwatches for personalized therapy recommendations based on real-time health data
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {devices.map((device) => (
                        <div
                            key={device.id}
                            className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-muted flex items-center justify-center">
                                    <img
                                        src={device.image}
                                        alt={device.alt}
                                        className="w-16 h-16 object-contain"
                                    />
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-foreground mb-1">
                                        {device.brand}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {device.name}
                                    </p>
                                </div>

                                {device.connected ? (
                                    <div className="w-full space-y-3">
                                        <div className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-400">
                                            <CheckCircle size={18} className="fill-current" />
                                            <span className="text-sm font-medium">Connected</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Last synced: {device.lastSync}
                                        </p>
                                        <button
                                            onClick={() => onSync(device.id)}
                                            className="w-full px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors text-sm font-medium"
                                        >
                                            Sync Now
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => onConnect(device.id)}
                                        className="w-full px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm font-semibold"
                                    >
                                        Connect Device
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-border rounded-xl p-8">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-2xl font-bold text-foreground mb-4">
                                Enhanced Session Experience
                            </h3>
                            <p className="text-muted-foreground mb-6">
                                Your wearable data helps us provide real-time feedback during sessions, adjust intensity levels, and track your biometric responses to optimize your wellness journey.
                            </p>

                            <div className="space-y-3">
                                <div className="flex items-start space-x-3">
                                    <div className="flex items-center justify-center w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex-shrink-0">
                                        <Heart size={18} className="text-green-600 dark:text-green-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-foreground mb-1">Heart Rate Monitoring</h4>
                                        <p className="text-xs text-muted-foreground">Track cardiovascular response during breathwork and meditation</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <div className="flex items-center justify-center w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex-shrink-0">
                                        <Zap size={18} className="text-orange-600 dark:text-orange-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-foreground mb-1">Activity Tracking</h4>
                                        <p className="text-xs text-muted-foreground">Monitor movement patterns and calorie burn during yoga sessions</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <div className="flex items-center justify-center w-8 h-8 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex-shrink-0">
                                        <Moon size={18} className="text-cyan-600 dark:text-cyan-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-foreground mb-1">Sleep Quality Analysis</h4>
                                        <p className="text-xs text-muted-foreground">Correlate therapy sessions with improved sleep patterns</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="relative rounded-xl overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1611072365334-079f5ae37b32"
                                    alt="Close-up of person wearing black smartwatch showing heart rate data during workout"
                                    className="w-full h-64 object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
