import { Award, ShieldCheck, Users, Building2, MapPin, IndianRupee, Activity } from "lucide-react";

const stats = [
    { label: "Patients", value: "10,000+", icon: Users },
    { label: "Therapy Sessions", value: "500,000+", icon: Activity },
    { label: "Hospital Partners", value: "50+", icon: Building2 },
    { label: "States Present", value: "15", icon: MapPin },
    { label: "Healthcare Costs Saved", value: "₹450 Cr", icon: IndianRupee },
    { label: "Patient Satisfaction", value: "4.8/5", icon: Award },
];

const badges = [
    "ABDM Compliant",
    "ISO 27001 Certified",
    "ISO 13485 Certified",
    "HIPAA-Equivalent Security",
    "Startup India Recognized"
];

const Team = () => {
    return (
        <div className="pt-24 min-h-screen">
            {/* Founders Section */}
            <section className="section-padding bg-section-alt">
                <div className="container space-y-12">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-semibold mb-4">Leadership</h2>
                        <p className="text-muted-foreground">Visionaries driving the future of preventive healthcare</p>
                    </div>

                    {/* Dr. Sindhura Nalluru */}
                    <div className="max-w-5xl mx-auto bg-card rounded-3xl overflow-hidden shadow-lg border border-border">
                        <div className="grid md:grid-cols-2">
                            <div className="bg-primary/5 min-h-[300px] md:min-h-full flex items-center justify-center p-8">
                                <div className="w-48 h-48 rounded-full bg-primary/20 flex items-center justify-center text-primary text-4xl font-bold border-4 border-background shadow-sm">
                                    DS
                                </div>
                            </div>
                            <div className="p-8 md:p-12 flex flex-col justify-center">
                                <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4 self-start">
                                    Founder & Managing Director
                                </div>
                                <h3 className="text-3xl font-bold mb-2">Dr. Sindhura Nalluru</h3>
                                <p className="text-lg text-muted-foreground mb-6">
                                    MBBS, MD
                                </p>
                                <div className="space-y-4 text-muted-foreground leading-relaxed">
                                    <p>
                                        Dr. Sindhura Nalluru is the Founder and Managing Director of PreventVital AI and the driving force behind its vision to build an AI‑first preventive health ecosystem from India. With a strong clinical background and hands-on experience in managing complex patients, she brings a deep understanding of real-world healthcare gaps that AI and digital tools must address.
                                    </p>
                                    <p>
                                        As a clinician–entrepreneur, Dr. Sindhura leads strategy across AI-based medical device R&D, preventive health platforms, EMR/EHR, and AI‑enabled wearables, ensuring every solution is clinically relevant, safe, and usable at the bedside and in the community. Her leadership emphasizes evidence-based medicine, ethical AI, and regulatory readiness.
                                    </p>
                                    <p>
                                        She also champions education, publications, and digital medical learning as core pillars of PreventVital AI, positioning the company as a trusted, clinically grounded partner in the future of digital and preventive healthcare.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dr. Rakesh Kumar */}
                    <div className="max-w-5xl mx-auto bg-card rounded-3xl overflow-hidden shadow-lg border border-border">
                        <div className="grid md:grid-cols-2">
                            <div className="bg-primary/5 min-h-[300px] md:min-h-full flex items-center justify-center p-8 md:order-last">
                                <div className="w-48 h-48 rounded-full bg-primary/20 flex items-center justify-center text-primary text-4xl font-bold border-4 border-background shadow-sm">
                                    DR
                                </div>
                            </div>
                            <div className="p-8 md:p-12 flex flex-col justify-center">
                                <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4 self-start">
                                    Founder Chairman
                                </div>
                                <h3 className="text-3xl font-bold mb-2">Dr. Rakesh Kumar</h3>
                                <p className="text-lg text-muted-foreground mb-6">
                                    MBBS, MD, DNB (Cardiology) | Senior Interventional Cardiologist
                                </p>
                                <div className="space-y-4 text-muted-foreground leading-relaxed">
                                    <p>
                                        Dr. Rakesh Kumar is the Founder Chairman of PreventVital AI and a senior interventional cardiologist with a deep commitment to preventive and precision cardiovascular care. He brings extensive experience in managing complex coronary, structural, and heart failure patients.
                                    </p>
                                    <p>
                                        As Chairman, Dr. Rakesh Kumar provides strategic direction for AI‑based medical device R&D, preventive cardiology programs, and digitally enabled care pathways that can scale across India and emerging markets. His leadership ensures that every product is grounded in evidence-based medicine, ethical practice, and measurable patient outcomes.
                                    </p>
                                    <p>
                                        He plays a key role in shaping collaborations with hospitals, clinics, and corporate health partners, championing a culture where innovation, safety, and continuous learning go hand in hand.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Advisory Board */}
            <section className="section-padding">
                <div className="container text-center max-w-4xl">
                    <h2 className="text-3xl font-semibold mb-6">Advisory Board</h2>
                    <p className="text-lg text-muted-foreground mb-12">
                        Guided by leading medical experts across cardiology, endocrinology, pulmonology, mental health, yoga therapy, and AI.
                    </p>
                    {/* Add Advisory Board members grid here if specific names are provided later */}
                </div>
            </section>

            {/* Impact Stats */}
            <section className="section-padding bg-primary text-primary-foreground">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-semibold mb-4 text-white">Our Impact</h2>
                        <p className="text-primary-foreground/80">Making a measurable difference in India's healthcare landscape</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center p-4">
                                <div className="w-12 h-12 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-4">
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                                <div className="text-sm md:text-base text-primary-foreground/80">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Compliance */}
            <section className="section-padding">
                <div className="container text-center">
                    <h2 className="text-2xl font-semibold mb-12">Trust & Compliance</h2>
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                        {badges.map((badge, index) => (
                            <div key={index} className="flex items-center gap-2 px-6 py-3 bg-secondary rounded-full text-secondary-foreground font-medium">
                                <ShieldCheck className="w-5 h-5 text-primary" />
                                {badge}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Team;
