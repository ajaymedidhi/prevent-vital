import { Shield, Lock, FileCheck, UserCheck } from "lucide-react";

const securityItems = [
  {
    icon: FileCheck,
    title: "Indian Data Compliance",
    description:
      "Full compliance with Indian data protection regulations including the Digital Personal Data Protection Act (DPDPA).",
  },
  {
    icon: Shield,
    title: "HIPAA-Inspired Standards",
    description:
      "We follow healthcare data security standards inspired by international best practices including HIPAA guidelines.",
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description:
      "All health data is encrypted at rest and in transit using industry-standard AES-256 encryption protocols.",
  },
  {
    icon: UserCheck,
    title: "Consent-Driven Sharing",
    description:
      "You control your data. Health information is only shared with explicit user consent and full transparency.",
  },
];

export const Compliance = () => {
  return (
    <section id="compliance" className="section-padding">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
            Trust & Data Security
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            Your health data deserves the highest level of protection. We've built enterprise-grade security into every layer of our platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {securityItems.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 p-6 rounded-xl border border-border bg-card hover:border-accent/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badge row */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-muted-foreground text-sm">
          <span className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            SOC 2 Compliant
          </span>
          <span className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            256-bit Encryption
          </span>
          <span className="flex items-center gap-2">
            <FileCheck className="w-4 h-4" />
            DPDPA Ready
          </span>
        </div>
      </div>
    </section>
  );
};
