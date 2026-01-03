import { Flower2, Wind, Brain, Apple, Smile } from "lucide-react";

const components = [
    {
        icon: Flower2,
        title: "Yoga Therapy",
        description: "Disease-specific yoga protocols designed to improve flexibility, strength, and physiological function."
    },
    {
        icon: Brain,
        title: "Meditation & Mindfulness",
        description: "Guided practices to reduce stress, improve focus, and promote mental clarity and emotional balance."
    },
    {
        icon: Wind,
        title: "Breathwork (Pranayama)",
        description: "Controlled breathing techniques to regulate the nervous system and enhance respiratory health."
    },
    {
        icon: Apple,
        title: "Lifestyle & Nutrition",
        description: "Personalized dietary and lifestyle coaching to support your body's natural healing processes."
    },
    {
        icon: Smile,
        title: "Mental Health Support",
        description: "Compassionate support to address anxiety, depression, and the psychological aspects of chronic disease."
    }
];

const WellnessPhilosophy = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow pt-20">
                {/* Hero Section */}
                <section className="section-padding bg-section-alt">
                    <div className="container text-center max-w-4xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
                            Holistic Wellness, Rooted in Science & Tradition
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
                            We integrate time-tested ancient wellness practices with modern medical science to provide a truly holistic approach to health.
                        </p>
                    </div>
                </section>

                {/* Components Grid */}
                <section className="section-padding">
                    <div className="container">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {components.map((item, index) => (
                                <div key={index} className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all group">
                                    <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                                        <item.icon className="w-7 h-7 text-accent" />
                                    </div>
                                    <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default WellnessPhilosophy;
