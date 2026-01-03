import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />

      {/* Soft radial glow for focus */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[700px] h-[700px] bg-primary/10 blur-3xl rounded-full -mt-40" />
      </div>

      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Grouped animation for calm entrance */}
          <div className="animate-fade-up space-y-6">
            {/* Headline with subtle depth */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-balance bg-gradient-to-b from-foreground to-foreground/80 bg-clip-text text-transparent">
              India&apos;s First AI-Powered Preventive Medicine Platform
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
              Empowering millions to prevent chronic diseases before they strike.
              Combining ancient wisdom with cutting-edge AI to transform healthcare
              from reactive to proactive.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                variant="hero"
                size="xl"
                asChild
                className="transition-all duration-300 hover:-translate-y-[1px] hover:shadow-lg"
              >
                <a href="#contact" className="flex items-center gap-2">
                  Start Your Health Journey
                  <ArrowRight size={18} />
                </a>
              </Button>

              <Button
                variant="hero-outline"
                size="xl"
                asChild
                className="transition-all duration-300 hover:-translate-y-[1px]"
              >
                <a href="#contact">Book a Demo</a>
              </Button>
            </div>
          </div>

          {/* Ultra-Premium Trust Banner */}
          <div className="relative mt-16 mx-auto max-w-4xl rounded-2xl bg-background/80 backdrop-blur-xl border border-border/60 shadow-[0_30px_80px_rgba(0,0,0,0.08)]">

            {/* Soft top glow to anchor with hero */}
            <div className="absolute inset-x-0 -top-10 h-10 bg-gradient-to-t from-background/80 to-transparent rounded-t-2xl pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 px-8 py-7 text-center">

              {/* Patients */}
              <div className="space-y-1">
                <div className="text-xs tracking-widest uppercase text-muted-foreground">
                  Patients
                </div>
                <div className="text-sm md:text-base text-muted-foreground">
                  Trusted by{" "}
                  <strong className="text-foreground font-semibold">10,000+</strong>
                </div>
              </div>

              {/* Hospitals – Primary trust signal */}
              <div className="relative space-y-1">
                <div className="absolute inset-y-0 -left-4 hidden md:block w-px bg-border/60" />
                <div className="absolute inset-y-0 -right-4 hidden md:block w-px bg-border/60" />

                <div className="text-xs tracking-widest uppercase text-muted-foreground">
                  Healthcare Partners
                </div>
                <div className="text-sm md:text-base font-medium text-foreground">
                  Partnered with{" "}
                  <strong className="font-semibold">50+</strong> hospitals
                </div>
              </div>

              {/* Investors */}
              <div className="space-y-1">
                <div className="text-xs tracking-widest uppercase text-muted-foreground">
                  Backing
                </div>
                <div className="text-sm md:text-base text-muted-foreground">
                  Backed by{" "}
                  <strong className="text-foreground font-medium">
                    leading healthcare investors
                  </strong>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
