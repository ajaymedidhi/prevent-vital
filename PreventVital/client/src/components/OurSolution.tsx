import { Brain, Watch, Heart, Stethoscope } from "lucide-react";

const pillars = [
    {
        icon: Brain,
        title: "AI-Powered Predictive Health",
        description: "Early risk detection & forecasting using advanced machine learning algorithms to identify potential health issues before they manifest."
    },
    {
        icon: Watch,
        title: "Wearable Integration",
        description: "Continuous vitals & lifestyle monitoring through seamless integration with leading wearable devices for real-time health data."
    },
    {
        icon: Heart,
        title: "Therapeutic Programs",
        description: "Holistic care including Yoga, meditation, breathwork & rehab tailored to your specific condition and recovery needs."
    },
    {
        icon: Stethoscope,
        title: "Medical Oversight",
        description: "Doctor dashboards & remote care ensuring that your health journey is always supervised by qualified medical professionals."
    }
];

export const OurSolution = () => {
    return (
        <section className="section-padding">
            <div className="container">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
                        A Complete Chronic Disease Prevention Ecosystem
                    </h2>
                    <p className="text-lg text-muted-foreground text-balance">
                        We combine technology and tradition to provide a comprehensive solution for your health.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {pillars.map((pillar, index) => (
                        <div key={index} className="text-center group">
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                                <pillar.icon className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-3">
                                {pillar.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {pillar.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
