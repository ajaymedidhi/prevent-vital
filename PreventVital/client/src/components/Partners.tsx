import { Button } from "@/components/ui/button";
import { Building2, Stethoscope, Briefcase, ShieldCheck, ArrowRight } from "lucide-react";

const partnerTypes = [
  {
    icon: Building2,
    title: "Hospitals & Health Systems",
    description: "Integrate preventive care programs into existing patient pathways.",
  },
  {
    icon: Stethoscope,
    title: "Clinics & Specialists",
    description: "Extend care beyond clinic walls with continuous patient monitoring.",
  },
  {
    icon: Briefcase,
    title: "Corporate Wellness",
    description: "Reduce healthcare costs with proactive employee health programs.",
  },
  {
    icon: ShieldCheck,
    title: "Insurance Providers",
    description: "Enable risk-based pricing with real health outcome data.",
  },
];

export const Partners = () => {
  return (
    <section id="partners" className="section-padding">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
            Partner With Us
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            PreventVital is designed for seamless integration with healthcare ecosystems. Let's build the future of preventive care together.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
          {partnerTypes.map((item) => (
            <div
              key={item.title}
              className="text-center p-6 rounded-xl bg-card shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="hero" size="lg" asChild>
            <a href="#contact">
              Discuss Partnership
              <ArrowRight size={18} />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
