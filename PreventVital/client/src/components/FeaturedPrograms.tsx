import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    ArrowRight,
    FlaskConical,
    Heart,
    Activity,
    Wind,
    Sparkles,
    Scale,
    LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Condition {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    image: string;
    alt: string;
    riskFactors: string[];
    preventionRate: string;
}

const conditions: Condition[] = [
    {
        id: 'diabetes',
        title: 'Diabetes Prevention',
        description: 'AI-powered glucose monitoring and lifestyle intervention programs to prevent Type 2 diabetes.',
        icon: FlaskConical,
        image: "https://images.unsplash.com/photo-1685660375327-47bcca398780",
        alt: 'Blood glucose meter with test strips on wooden table showing diabetes monitoring equipment',
        riskFactors: ['Family History', 'Obesity', 'Sedentary Lifestyle'],
        preventionRate: '78%'
    },
    {
        id: 'hypertension',
        title: 'Hypertension Management',
        description: 'Continuous blood pressure monitoring with personalized stress reduction and dietary guidance.',
        icon: Heart,
        image: "https://images.unsplash.com/photo-1623658045230-605cb00c80d6",
        alt: 'Digital blood pressure monitor displaying readings with stethoscope on medical examination table',
        riskFactors: ['High Sodium', 'Stress', 'Age'],
        preventionRate: '82%'
    },
    {
        id: 'cardiac',
        title: 'Cardiac Health',
        description: 'Advanced heart health monitoring with ECG integration and cardiovascular risk assessment.',
        icon: Activity,
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_19c8b52ae-1765801567685.png",
        alt: 'Cardiologist examining ECG heart rhythm chart with medical equipment in modern clinic',
        riskFactors: ['Cholesterol', 'Smoking', 'Inactivity'],
        preventionRate: '85%'
    },
    {
        id: 'respiratory',
        title: 'Respiratory Wellness',
        description: 'Breathwork therapy combined with air quality monitoring for optimal lung health.',
        icon: Wind,
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_11b83cbcc-1764755888108.png",
        alt: 'Person practicing deep breathing exercises outdoors in fresh mountain air with clear blue sky',
        riskFactors: ['Pollution', 'Allergies', 'Smoking'],
        preventionRate: '76%'
    },
    {
        id: 'mental',
        title: 'Mental Health',
        description: 'Meditation, mindfulness, and AI-driven mood tracking for emotional wellness.',
        icon: Sparkles,
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_11552d387-1764832853014.png",
        alt: 'Peaceful woman meditating in lotus position with eyes closed in tranquil indoor setting',
        riskFactors: ['Stress', 'Sleep Issues', 'Isolation'],
        preventionRate: '88%'
    },
    {
        id: 'weight',
        title: 'Weight Management',
        description: 'Holistic approach combining nutrition, exercise, and behavioral therapy for sustainable results.',
        icon: Scale,
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1bb8da715-1764844202208.png",
        alt: 'Athletic person jogging on outdoor trail wearing fitness tracker with healthy lifestyle concept',
        riskFactors: ['Poor Diet', 'Inactivity', 'Metabolism'],
        preventionRate: '80%'
    }
];

export const FeaturedPrograms = () => {
    // No need for isHydrated in standard React SPA
    return (
        <section className="py-16 lg:py-24 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                        Condition-Specific Prevention Programs
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Targeted interventions powered by AI analytics and traditional wellness therapies
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {conditions.map((condition) => (
                        <div
                            key={condition.id}
                            className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={condition.image}
                                    alt={condition.alt}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                                <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                                        <condition.icon size={20} className="text-primary-foreground" />
                                    </div>
                                    <span className="text-sm font-semibold text-white bg-emerald-600 px-3 py-1 rounded-full">
                                        {condition.preventionRate} Success Rate
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {condition.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                    {condition.description}
                                </p>

                                <div className="mb-4">
                                    <div className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Key Risk Factors:</div>
                                    <div className="flex flex-wrap gap-2">
                                        {condition.riskFactors.map((factor, index) => (
                                            <span
                                                key={index}
                                                className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full font-medium"
                                            >
                                                {factor}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <Button
                                    variant="link"
                                    className="p-0 h-auto font-semibold text-primary hover:text-primary/80"
                                    asChild
                                >
                                    <Link to="/disease-prevention-programs" className="inline-flex items-center">
                                        Learn More
                                        <ArrowRight size={16} className="ml-1" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Button
                        size="xl"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:scale-105 transition-all duration-300"
                        asChild
                    >
                        <Link to="/disease-prevention-programs">
                            View All Programs
                            <ArrowRight size={20} className="ml-2" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};
