
import { Link } from 'lucide-react';

interface Integration {
    id: string;
    name: string;
    category: string;
    description: string;
    image: string;
    alt: string;
    status: 'active' | 'coming-soon';
    capabilities: string[];
}

const integrations: Integration[] = [
    {
        id: 'fitbit',
        name: 'Fitbit',
        category: 'Wearable Device',
        description: 'Continuous heart rate, activity, and sleep monitoring with real-time sync',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ab7eab3c-1765955320109.png",
        alt: 'Black Fitbit smartwatch displaying heart rate on wrist with fitness tracking interface',
        status: 'active',
        capabilities: ['Heart Rate', 'Activity Tracking', 'Sleep Analysis', 'SpO2']
    },
    {
        id: 'apple-watch',
        name: 'Apple Watch',
        category: 'Wearable Device',
        description: 'Advanced health metrics including ECG and blood oxygen monitoring',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1daf25bf1-1764679076102.png",
        alt: 'Silver Apple Watch on wrist showing health app with heart rate and activity rings',
        status: 'active',
        capabilities: ['ECG', 'Blood Oxygen', 'Fall Detection', 'Workout Tracking']
    },
    {
        id: 'omron',
        name: 'Omron BP Monitor',
        category: 'Medical Device',
        description: 'Clinical-grade blood pressure monitoring with automatic data upload',
        image: "https://images.unsplash.com/photo-1666887360819-8b1209e802f8",
        alt: 'White digital blood pressure monitor with cuff on wooden table displaying readings',
        status: 'active',
        capabilities: ['Blood Pressure', 'Pulse Rate', 'Irregular Heartbeat', 'Hypertension Indicator']
    },
    {
        id: 'accu-chek',
        name: 'Accu-Chek Glucometer',
        category: 'Medical Device',
        description: 'Bluetooth-enabled glucose monitoring for diabetes management',
        image: "https://images.unsplash.com/photo-1685485276228-e7e75ceba593",
        alt: 'Blue digital glucometer with test strips on white surface showing blood sugar reading',
        status: 'active',
        capabilities: ['Blood Glucose', 'Trend Analysis', 'Meal Tagging', 'Insulin Tracking']
    },
    {
        id: 'withings',
        name: 'Withings Body+',
        category: 'Smart Scale',
        description: 'Body composition analysis with weight, BMI, and body fat percentage',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_15a84df04-1765141019257.png",
        alt: 'Modern white smart scale on bathroom floor with digital display showing weight',
        status: 'active',
        capabilities: ['Weight', 'BMI', 'Body Fat %', 'Muscle Mass']
    },
    {
        id: 'continuous-glucose',
        name: 'CGM Sensors',
        category: 'Medical Device',
        description: 'Continuous glucose monitoring with real-time alerts and insights',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ad16a03c-1765216425133.png",
        alt: 'Small circular continuous glucose monitor sensor attached to upper arm',
        status: 'coming-soon',
        capabilities: ['24/7 Monitoring', 'Trend Alerts', 'Predictive Insights', 'Meal Impact']
    }
];

interface IntegrationShowcaseProps {
    className?: string;
}

const IntegrationShowcase = ({ className = '' }: IntegrationShowcaseProps) => {
    return (
        <section className={`py-16 lg:py-24 bg-background ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        Device Integration Marketplace
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Seamlessly connect with leading health monitoring devices and wearables for comprehensive patient data
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {integrations.map((integration) => (
                        <div
                            key={integration.id}
                            className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-border"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={integration.image}
                                    alt={integration.alt}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 right-4">
                                    {integration.status === 'active' ? (
                                        <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                                            Active
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full">
                                            Coming Soon
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-xl font-bold text-foreground">{integration.name}</h3>
                                    <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                                        {integration.category}
                                    </span>
                                </div>

                                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                                    {integration.description}
                                </p>

                                <div className="space-y-2 mb-4">
                                    <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide">
                                        Capabilities
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {integration.capabilities.map((capability, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded"
                                            >
                                                {capability}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    className={`w-full px-4 py-2 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 ${integration.status === 'active'
                                            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                            : 'bg-muted text-muted-foreground cursor-not-allowed'
                                        }`}
                                    disabled={integration.status === 'coming-soon'}
                                >
                                    <Link size={18} />
                                    <span>{integration.status === 'active' ? 'View Integration' : 'Notify Me'}</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default IntegrationShowcase;
