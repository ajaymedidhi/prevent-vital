import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const slides = [
    {
        title: 'Prevention is Better Than Cure',
        subtitle: 'AI-Powered Health Predictions',
        description: 'Transform your health journey with cutting-edge predictive analytics that identify risks before they become problems.',
        cta1: 'Start Free Assessment',
        cta2: 'View Programs',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_15af4787e-1764671673883.png",
        alt: 'Medical professional in white coat analyzing digital health data on tablet with holographic interface'
    },
    {
        title: 'Your Health, Predicted & Protected',
        subtitle: 'Continuous Monitoring Excellence',
        description: 'Real-time health tracking integrated with wearable devices, providing 24/7 insights into your wellness metrics.',
        cta1: 'Explore Platform',
        cta2: 'View Programs',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c62cab06-1764998842930.png",
        alt: 'Fitness tracker on wrist displaying heart rate and health metrics with person exercising in background'
    },
    {
        title: 'Ancient Wisdom Meets AI',
        subtitle: 'Holistic Wellness Integration',
        description: 'Combine traditional yoga, meditation, and breathwork with modern AI-driven personalized health recommendations.',
        cta1: 'Discover Therapies',
        cta2: 'View Programs',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_169d02975-1764761369642.png",
        alt: 'Woman in lotus position meditating peacefully in serene natural setting with morning sunlight'
    }
];

export const HeroCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isPaused]);

    return (
        <section
            className="relative w-full min-h-[600px] lg:h-[700px] overflow-hidden bg-background flex flex-col justify-center" // Changed h- to min-h- for mobile flexibility
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
        >
            {/* Background Slides */}
            <div className="absolute inset-0">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={cn(
                            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                            currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        )}
                    >
                        {/* Gradient Overlay - Stronger on mobile for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent/60 lg:from-background lg:via-background/90 lg:to-transparent z-10" />

                        <img
                            src={slide.image}
                            alt={slide.alt}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* Content */}
            <div className="relative z-20 container h-full flex items-center pt-20 pb-12 lg:py-0">
                <div className="max-w-2xl animate-fade-up px-4 md:px-0"> {/* Added padding for mobile */}

                    {/* Badge */}
                    <div className="inline-flex items-center space-x-2 px-3 py-1.5 lg:px-4 lg:py-2 bg-primary/10 border border-primary/20 rounded-full mb-6 backdrop-blur-sm max-w-full">
                        <Sparkles size={14} className="text-primary flex-shrink-0" />
                        <span className="text-xs lg:text-sm font-semibold text-primary truncate">AI-Powered Preventive Health, Wellness & Diagnostics</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
                        {slides[currentSlide].title}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl lg:text-2xl text-primary font-semibold mb-4">
                        {slides[currentSlide].subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
                        {slides[currentSlide].description}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                            variant="hero"
                            size="lg" // Adjusted size for better mobile fit
                            asChild
                            className="w-full sm:w-auto transition-all duration-300 hover:-translate-y-[1px] hover:shadow-lg"
                        >
                            <a href="#contact" className="flex items-center justify-center gap-2">
                                {slides[currentSlide].cta1}
                                <ArrowRight size={20} />
                            </a>
                        </Button>

                        <Button
                            variant="hero-outline"
                            size="lg" // Adjusted size
                            asChild
                            className="w-full sm:w-auto transition-all duration-300 hover:-translate-y-[1px]"
                        >
                            <a href="#programs" className="flex items-center justify-center">
                                {slides[currentSlide].cta2}
                            </a>
                        </Button>
                    </div>

                    {/* Slide Indicators */}
                    <div className="flex items-center space-x-2 mt-8 lg:mt-12">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={cn(
                                    "h-1.5 lg:h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary",
                                    currentSlide === index ? 'w-6 lg:w-8 bg-primary' : 'w-1.5 lg:w-2 bg-muted hover:bg-muted-foreground'
                                )}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 right-0 w-48 h-48 lg:w-64 lg:h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-20 right-5 lg:top-20 lg:right-20 w-24 h-24 lg:w-32 lg:h-32 bg-accent/10 rounded-full blur-2xl pointer-events-none" />
        </section>
    );
};
