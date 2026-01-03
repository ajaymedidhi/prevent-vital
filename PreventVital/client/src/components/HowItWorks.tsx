import { Watch, Brain, Activity, Stethoscope } from "lucide-react";

const steps = [
  {
    icon: Watch,
    step: "01",
    title: "Continuous Health Monitoring",
    description:
      "Wearable devices collect real-time health data including heart rate, activity levels, sleep patterns, and vital signs throughout your day.",
  },
  {
    icon: Brain,
    step: "02",
    title: "AI Risk Prediction",
    description:
      "Our AI analyzes your health patterns to identify early warning signs and predict potential risks before they become serious conditions.",
  },
  {
    icon: Activity,
    step: "03",
    title: "Personalized Programs",
    description:
      "Receive tailored wellness and therapy programs designed for your specific health profile, lifestyle, and chronic disease management needs.",
  },
  {
    icon: Stethoscope,
    step: "04",
    title: "Doctor Oversight",
    description:
      "Qualified physicians review your progress and AI insights, providing safety alerts and medical guidance when intervention is needed.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section-padding">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
            How PreventVital Works
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            A seamless integration of wearable technology, artificial intelligence, and medical expertise to deliver preventive care that actually works.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="relative bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all group"
            >
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
              )}
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  Step {item.step}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
