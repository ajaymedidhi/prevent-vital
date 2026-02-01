import { Link } from 'react-router-dom';
import { Beaker, Heart, Zap, Cloud, Sparkles, Scale, ArrowRight } from 'lucide-react';

interface Condition {
    id: string;
    title: string;
    description: string;
    icon: string;
    image: string;
    alt: string;
    riskFactors: string[];
    preventionRate: string;
}

const ConditionCards = () => {
    const conditions: Condition[] = [
        {
            id: 'diabetes',
            title: 'Diabetes Prevention',
            description: 'AI-powered glucose monitoring and lifestyle intervention programs to prevent Type 2 diabetes.',
            icon: 'BeakerIcon',
            image: "https://images.unsplash.com/photo-1685660375327-47bcca398780",
            alt: 'Blood glucose meter',
            riskFactors: ['Family History', 'Obesity', 'Sedentary Lifestyle'],
            preventionRate: '78%'
        },
        {
            id: 'hypertension',
            title: 'Hypertension Management',
            description: 'Continuous blood pressure monitoring with personalized stress reduction and dietary guidance.',
            icon: 'HeartIcon',
            image: "https://images.unsplash.com/photo-1623658045230-605cb00c80d6",
            alt: 'Digital blood pressure monitor',
            riskFactors: ['High Sodium', 'Stress', 'Age'],
            preventionRate: '82%'
        },
        {
            id: 'cardiac',
            title: 'Cardiac Health',
            description: 'Advanced heart health monitoring with ECG integration and cardiovascular risk assessment.',
            icon: 'BoltIcon',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_19c8b52ae-1765801567685.png",
            alt: 'Cardiologist examining ECG',
            riskFactors: ['Cholesterol', 'Smoking', 'Inactivity'],
            preventionRate: '85%'
        },
        {
            id: 'respiratory',
            title: 'Respiratory Wellness',
            description: 'Breathwork therapy combined with air quality monitoring for optimal lung health.',
            icon: 'CloudIcon',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_11b83cbcc-1764755888108.png",
            alt: 'Person practicing deep breathing',
            riskFactors: ['Pollution', 'Allergies', 'Smoking'],
            preventionRate: '76%'
        },
        {
            id: 'mental',
            title: 'Mental Health',
            description: 'Meditation, mindfulness, and AI-driven mood tracking for emotional wellness.',
            icon: 'SparklesIcon',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_11552d387-1764832853014.png",
            alt: 'Peaceful woman meditating',
            riskFactors: ['Stress', 'Sleep Issues', 'Isolation'],
            preventionRate: '88%'
        },
        {
            id: 'weight',
            title: 'Weight Management',
            description: 'Holistic approach combining nutrition, exercise, and behavioral therapy for sustainable results.',
            icon: 'ScaleIcon',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_1bb8da715-1764844202208.png",
            alt: 'Healthy lifestyle concept',
            riskFactors: ['Poor Diet', 'Inactivity', 'Metabolism'],
            preventionRate: '80%'
        }
    ];

    const IconMap: Record<string, any> = {
        BeakerIcon: Beaker,
        HeartIcon: Heart,
        BoltIcon: Zap,
        CloudIcon: Cloud,
        SparklesIcon: Sparkles,
        ScaleIcon: Scale,
    };

    return (
        <section className="py-24 bg-section-alt/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">Targeted Programs</span>
                    <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 tracking-tight pb-1">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600">
                            Condition-Specific Prevention
                        </span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Clinically validated interventions powered by AI analytics to address chronic risks effectively.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {conditions.map((condition) => {
                        const IconComponent = IconMap[condition.icon];
                        return (
                            <div
                                key={condition.id}
                                className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="relative h-52 overflow-hidden">
                                    {/* Image Overlay */}
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />

                                    <img
                                        src={condition.image}
                                        alt={condition.alt}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                    />

                                    <div className="absolute top-4 right-4 z-20">
                                        <span className="inline-flex items-center px-3 py-1 bg-white/90 backdrop-blur-sm text-primary text-xs font-bold rounded-full shadow-sm">
                                            {condition.preventionRate} Success
                                        </span>
                                    </div>

                                    <div className="absolute bottom-4 left-4 z-20">
                                        <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-md">
                                            <IconComponent size={20} className="text-primary" />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                        {condition.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                                        {condition.description}
                                    </p>

                                    <div className="mb-6">
                                        <div className="flex flex-wrap gap-2">
                                            {condition.riskFactors.map((factor, index) => (
                                                <span
                                                    key={index}
                                                    className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-secondary text-secondary-foreground rounded border border-border"
                                                >
                                                    {factor}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <Link
                                        to="/disease-prevention-programs"
                                        className="inline-flex items-center text-sm font-bold text-primary hover:text-primary/80 transition-colors group/link"
                                    >
                                        View Program Details
                                        <ArrowRight size={16} className="ml-2 transform group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="text-center mt-16">
                    <Link
                        to="/disease-prevention-programs"
                        className="inline-flex items-center px-8 py-4 bg-background border border-border text-foreground font-semibold rounded-lg hover:border-primary hover:text-primary transition-all duration-300 hover:shadow-md"
                    >
                        Explore Complete Catalog
                        <ArrowRight size={20} className="ml-2" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ConditionCards;
