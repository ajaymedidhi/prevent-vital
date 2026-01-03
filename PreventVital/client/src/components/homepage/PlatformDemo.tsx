
import { useState } from 'react';
import { ChartBar, Cpu, SlidersHorizontal, ChevronRight, Activity } from 'lucide-react';

interface DemoFeature {
    id: string;
    title: string;
    description: string;
    icon: string;
    image: string;
    alt: string;
    metrics: { label: string; value: string; }[];
}

const PlatformDemo = () => {
    const [activeFeature, setActiveFeature] = useState(0);

    const features: DemoFeature[] = [
        {
            id: 'monitoring',
            title: 'Real-Time Health Monitoring',
            description: 'Continuous tracking of vital signs with instant alerts for anomalies',
            icon: 'ChartBarIcon',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_151995676-1764659090665.png",
            alt: 'Digital health dashboard displaying real-time heart rate, blood pressure, and activity metrics on tablet screen',
            metrics: [
                { label: 'Heart Rate', value: '72 BPM' },
                { label: 'Blood Pressure', value: '120/80' },
                { label: 'Steps Today', value: '8,432' }
            ]
        },
        {
            id: 'prediction',
            title: 'AI Risk Prediction',
            description: 'Machine learning algorithms analyze patterns to predict health risks',
            icon: 'CpuChipIcon',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_1add7ce1f-1764660531679.png",
            alt: 'Futuristic AI interface showing predictive health analytics with neural network visualization and risk scores',
            metrics: [
                { label: 'Diabetes Risk', value: 'Low (12%)' },
                { label: 'Cardiac Risk', value: 'Moderate (35%)' },
                { label: 'Overall Health', value: 'Good' }
            ]
        },
        {
            id: 'therapy',
            title: 'Personalized Therapy Plans',
            description: 'Customized yoga, meditation, and exercise routines based on your health data',
            icon: 'AdjustmentsHorizontalIcon',
            image: "https://images.unsplash.com/photo-1702561474109-17616a842a5d",
            alt: 'Woman performing yoga pose on mat with personalized therapy plan displayed on smartphone beside her',
            metrics: [
                { label: 'Sessions Completed', value: '24/30' },
                { label: 'Stress Reduction', value: '42%' },
                { label: 'Sleep Quality', value: '+28%' }
            ]
        }
    ];

    const IconMap: Record<string, any> = {
        ChartBarIcon: ChartBar,
        CpuChipIcon: Cpu,
        AdjustmentsHorizontalIcon: SlidersHorizontal,
    };

    return (
        <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-500/5 via-background to-primary/5">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-100 border border-blue-200 rounded-full mb-4 dark:bg-blue-900/30 dark:border-blue-800">
                        <Activity size={16} className="text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Live Platform Demo</span>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                        Experience the Future of Healthcare
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        See how our AI-powered platform transforms preventive care with real-time insights
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        {features.map((feature, index) => {
                            const IconComponent = IconMap[feature.icon];
                            return (
                                <button
                                    key={feature.id}
                                    onClick={() => setActiveFeature(index)}
                                    className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-300 ${activeFeature === index
                                            ? 'bg-card border-primary shadow-lg'
                                            : 'bg-background border-border hover:border-primary/50'
                                        }`}
                                >
                                    <div className="flex items-start space-x-4">
                                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${activeFeature === index ? 'bg-primary' : 'bg-muted'
                                            }`}>
                                            <IconComponent
                                                size={24}
                                                className={activeFeature === index ? 'text-primary-foreground' : 'text-muted-foreground'}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-foreground mb-2">
                                                {feature.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {feature.description}
                                            </p>
                                        </div>
                                        <ChevronRight
                                            size={20}
                                            className={`text-muted-foreground transition-transform ${activeFeature === index ? 'rotate-90' : ''
                                                }`}
                                        />
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    <div className="relative">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border">
                            <img
                                src={features[activeFeature].image}
                                alt={features[activeFeature].alt}
                                className="w-full h-[400px] object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <div className="grid grid-cols-3 gap-4">
                                    {features[activeFeature].metrics.map((metric, index) => (
                                        <div key={index} className="bg-card/90 backdrop-blur-sm rounded-lg p-4 border border-border">
                                            <div className="text-xs text-muted-foreground mb-1">{metric.label}</div>
                                            <div className="text-lg font-bold text-foreground">{metric.value}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-amber-500 to-blue-600 rounded-full blur-2xl opacity-50" />
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-emerald-500 to-primary rounded-full blur-2xl opacity-50" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PlatformDemo;
