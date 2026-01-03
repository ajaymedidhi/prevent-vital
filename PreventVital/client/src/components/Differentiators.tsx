import { Dumbbell, HeartPulse, ScanFace, Layers, CheckCircle } from "lucide-react";

const differentiators = [
  {
    icon: Dumbbell,
    title: "Disease-Specific Wellness Programs",
    points: [
      "Tailored exercises for diabetes, heart disease, hypertension",
      "Progressive difficulty based on health improvements",
      "Evidence-based protocols from clinical research",
    ],
  },
  {
    icon: HeartPulse,
    title: "Real-Time Vitals Monitoring",
    points: [
      "Track heart rate, SpO2, and stress during sessions",
      "Automatic intensity adjustments for safety",
      "Post-session health impact analysis",
    ],
  },
  {
    icon: ScanFace,
    title: "AI-Guided Posture Correction",
    points: [
      "Computer vision for form analysis",
      "Real-time audio and visual feedback",
      "Injury prevention through proper technique",
    ],
  },
  {
    icon: Layers,
    title: "Unified Ecosystem",
    points: [
      "Wearables, mobile app, and physician portal integrated",
      "Seamless data flow between all touchpoints",
      "Single source of truth for health journey",
    ],
  },
];

export const Differentiators = () => {
  return (
    <section id="differentiators" className="section-padding bg-section-alt">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
            What Sets Us Apart
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            Purpose-built for chronic disease management in India, with technology designed around patient outcomes rather than engagement metrics.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {differentiators.map((item) => (
            <div
              key={item.title}
              className="bg-card rounded-xl p-8 shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {item.title}
                  </h3>
                  <ul className="space-y-3">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
