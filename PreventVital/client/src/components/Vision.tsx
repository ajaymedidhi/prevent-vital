import { Target, Heart, Globe } from "lucide-react";

export const Vision = () => {
  return (
    <section id="vision" className="section-padding bg-section-alt">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
            Our Vision
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            We believe healthcare should prevent disease, not just treat it. PreventVital is building the future of preventive medicine in India — making proactive health management accessible to everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-card rounded-xl p-8 shadow-card hover:shadow-card-hover transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
              <Heart className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Preventive-First Philosophy
            </h3>
            <p className="text-muted-foreground">
              Shifting from reactive treatment to proactive prevention. We help identify risks years before they become critical conditions.
            </p>
          </div>

          <div className="bg-card rounded-xl p-8 shadow-card hover:shadow-card-hover transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
              <Globe className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              India-Focused Healthcare
            </h3>
            <p className="text-muted-foreground">
              Designed for Indian health patterns, dietary habits, and genetic predispositions. Culturally relevant solutions for our unique challenges.
            </p>
          </div>

          <div className="bg-card rounded-xl p-8 shadow-card hover:shadow-card-hover transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Accessible at Scale
            </h3>
            <p className="text-muted-foreground">
              Building technology that can reach millions across urban and rural India, making quality preventive care universally accessible.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
