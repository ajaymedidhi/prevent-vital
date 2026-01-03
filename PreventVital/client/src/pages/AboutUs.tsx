import { Heart, Shield, Lightbulb, Users, Eye } from "lucide-react";

const values = [
    {
        icon: Heart,
        title: "Patient-first, always",
        description: "Every decision we make is guided by what is best for the patient's long-term health and well-being."
    },
    {
        icon: Shield,
        title: "Science with compassion",
        description: "We combine rigorous medical evidence with genuine empathy and care for the human experience."
    },
    {
        icon: Lightbulb,
        title: "Innovation with responsibility",
        description: "We leverage cutting-edge technology responsibly to solve real healthcare challenges."
    },
    {
        icon: Users,
        title: "Accessibility for all",
        description: "We strive to make high-quality preventive care accessible to everyone, regardless of location."
    },
    {
        icon: Eye,
        title: "Transparency & trust",
        description: "We build trust through open communication, data privacy, and ethical practices."
    }
];

const AboutUs = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow pt-20">
                {/* Hero Section */}
                <section className="section-padding bg-primary text-primary-foreground">
                    <div className="container text-center max-w-4xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance text-white">
                            Building the Future of Preventive Healthcare in India
                        </h1>
                        <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed text-balance">
                            Democratizing preventive medicine through AI-powered technology and holistic wellness.
                        </p>
                    </div>
                </section>

                {/* Our Story */}
                <section className="section-padding">
                    <div className="container max-w-4xl">
                        <h2 className="text-3xl font-semibold mb-6">Our Story</h2>
                        <div className="prose prose-lg text-muted-foreground">
                            <p className="mb-4">
                                PreventVital was founded after witnessing a recurring tragedy in Indian healthcare: chronic diseases silently progressing and being detected too late — even when patients had access to top hospitals.
                            </p>
                            <p className="mb-4">
                                Founded by Dr. Rakesh Kumar, a senior interventional cardiologist with experience treating over 6,000 patients, PreventVital exists to change this narrative. We believe that with the right technology and timely intervention, most chronic diseases can be prevented before irreversible damage occurs.
                            </p>
                            <p>
                                We are on a mission to shift the paradigm from reactive "sick care" to proactive "health care," empowering individuals to take control of their health destiny.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="section-padding bg-section-alt">
                    <div className="container">
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="bg-card p-8 rounded-2xl shadow-sm">
                                <h3 className="text-2xl font-bold mb-4 text-primary">Our Mission</h3>
                                <p className="text-lg text-muted-foreground">
                                    To democratize preventive medicine in India through AI-powered technology and holistic wellness, making early detection and prevention accessible to all.
                                </p>
                            </div>
                            <div className="bg-card p-8 rounded-2xl shadow-sm">
                                <h3 className="text-2xl font-bold mb-4 text-accent">Our Vision</h3>
                                <p className="text-lg text-muted-foreground">
                                    A future where chronic diseases are rare because they are consistently detected and addressed early, leading to a healthier, more vibrant society.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core Values */}
                <section className="section-padding">
                    <div className="container">
                        <h2 className="text-3xl font-semibold mb-12 text-center">Core Values</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {values.map((value, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <value.icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {value.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AboutUs;
