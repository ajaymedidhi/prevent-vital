import { ShieldCheck, FileCheck, Award } from "lucide-react";

const trustItems = [
    {
        icon: FileCheck,
        title: "ISO 27001 Certified",
        description: "International standard for information security management"
    },
    {
        icon: ShieldCheck,
        title: "HIPAA Compliant",
        description: "Ensuring the highest level of patient data protection"
    }
];

export const TrustedBy = () => {
    return (
        <section className="py-24 bg-background">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                        <Award className="w-4 h-4" />
                        <span>Clinical Excellence</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                        Trusted by Medical Professionals
                    </h2>
                    <p className="text-lg text-muted-foreground text-balance">
                        Our platform is built on rigorous scientific research and validated by leading healthcare institutions.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {trustItems.map((item, index) => (
                        <div key={index} className="flex items-start gap-5 p-8 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                <item.icon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
