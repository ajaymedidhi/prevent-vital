import { Activity, HeartPulse, Wind, Brain, Scale, Cross } from "lucide-react";

const diseases = [
    {
        icon: Activity,
        name: "Diabetes",
        description: "Management & Reversal"
    },
    {
        icon: HeartPulse,
        name: "Hypertension",
        description: "Blood Pressure Control"
    },
    {
        icon: HeartPulse,
        name: "Cardiac Health",
        description: "Post-Event Recovery"
    },
    {
        icon: Wind,
        name: "Respiratory Conditions",
        description: "Asthma & COPD Care"
    },
    {
        icon: Brain,
        name: "Mental Health",
        description: "Anxiety & Stress"
    },
    {
        icon: Scale,
        name: "Weight Management",
        description: "Sustainable Loss"
    },
    {
        icon: Cross, // Using Cross as a proxy for Cancer ribbon/medical symbol if specific one not available
        name: "Cancer Post-Treatment",
        description: "Wellness & Recovery"
    }
];

export const Diseases = () => {
    return (
        <section className="section-padding bg-section-alt">
            <div className="container">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
                        Diseases We Focus On
                    </h2>
                    <p className="text-lg text-muted-foreground text-balance">
                        Specialized care programs designed for specific chronic conditions, helping you manage and improve your health outcomes.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {diseases.map((disease, index) => (
                        <div
                            key={index}
                            className="bg-card rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all border border-border/50 hover:border-accent/50 group"
                        >
                            <div className="w-12 h-12 mx-auto rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <disease.icon className="w-6 h-6 text-accent" />
                            </div>
                            <h3 className="font-semibold text-foreground mb-1">{disease.name}</h3>
                            <p className="text-xs text-muted-foreground">{disease.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
