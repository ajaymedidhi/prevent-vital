import { Activity, TrendingUp, Users, Clock } from "lucide-react";

const metrics = [
    {
        icon: Activity,
        value: "85%",
        label: "Improvement in wellness scores",
        description: "Patients report significantly better quality of life within 3 months."
    },
    {
        icon: TrendingUp,
        value: "70%",
        label: "Reduction in hospital readmissions",
        description: "Proactive care prevents complications requiring hospitalization."
    },
    {
        icon: Users,
        value: "50,000+",
        label: "Therapy sessions delivered",
        description: "Yoga, meditation, and counseling sessions conducted."
    },
    {
        icon: Clock,
        value: "24/7",
        label: "Real-time health monitoring",
        description: "Continuous tracking of vitals for immediate intervention."
    }
];

export const WhatWeDo = () => {
    return (
        <section className="section-padding bg-section-alt">
            <div className="container">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
                        Prevention Is Better Than Cure. We Make It Possible.
                    </h2>
                    <p className="text-lg text-muted-foreground text-balance">
                        PreventVital unifies real-time wearable monitoring, AI-driven predictive analytics, yoga therapy, meditation, breathwork, and lifestyle coaching into one preventive healthcare platform — helping people stay ahead of chronic diseases.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {metrics.map((metric, index) => (
                        <div
                            key={index}
                            className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                                <metric.icon className="w-6 h-6 text-accent" />
                            </div>
                            <div className="text-3xl font-bold text-foreground mb-2">{metric.value}</div>
                            <div className="font-medium text-foreground mb-2">{metric.label}</div>
                            <p className="text-sm text-muted-foreground">{metric.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
