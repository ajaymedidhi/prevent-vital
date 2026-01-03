
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
    className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % 3);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const slides = [
        {
            title: 'Prevention is Better Than Cure',
            subtitle: 'AI-Powered Health Predictions',
            description: 'Transform your health journey with cutting-edge predictive analytics that identify risks before they become problems.',
            cta: 'Start Free Assessment',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_15af4787e-1764671673883.png",
            alt: 'Medical professional in white coat analyzing digital health data on tablet with holographic interface'
        },
        {
            title: 'Your Health, Predicted & Protected',
            subtitle: 'Continuous Monitoring Excellence',
            description: 'Real-time health tracking integrated with wearable devices, providing 24/7 insights into your wellness metrics.',
            cta: 'Explore Platform',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c62cab06-1764998842930.png",
            alt: 'Fitness tracker on wrist displaying heart rate and health metrics with person exercising in background'
        },
        {
            title: 'Ancient Wisdom Meets AI',
            subtitle: 'Holistic Wellness Integration',
            description: 'Combine traditional yoga, meditation, and breathwork with modern AI-driven personalized health recommendations.',
            cta: 'Discover Therapies',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_169d02975-1764761369642.png",
            alt: 'Woman in lotus position meditating peacefully in serene natural setting with morning sunlight'
        }
    ];

    return (
        <section className={`relative w-full h-[600px] lg:h-[700px] overflow-hidden bg-gradient-to-br from-primary/5 via-background to-blue-500/5 ${className}`}>
            {/* Background Slides */}
            <div className="absolute inset-0">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-transparent z-10" />
                        <img
                            src={slide.image}
                            alt={slide.alt}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* Content */}
            <div className="relative z-20 container mx-auto px-4 h-full flex items-center pt-20 md:pt-0">
                <div className="max-w-2xl animate-fade-in-up">
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6">
                        <Sparkles size={16} className="text-amber-500" />
                        <span className="text-sm font-semibold text-amber-500">AI-Powered Prevention Platform</span>
                    </div>

                    <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
                        {slides[currentSlide].title}
                    </h1>

                    <p className="text-xl lg:text-2xl text-primary font-semibold mb-4">
                        {slides[currentSlide].subtitle}
                    </p>

                    <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                        {slides[currentSlide].description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            to="/ai-health-assessment"
                            className="inline-flex items-center justify-center px-8 py-4 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                            {slides[currentSlide].cta}
                            <ArrowRight size={20} className="ml-2" />
                        </Link>

                        <Link
                            to="/disease-prevention-programs"
                            className="inline-flex items-center justify-center px-8 py-4 bg-background border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                        >
                            View Programs
                        </Link>
                    </div>

                    {/* Slide Indicators */}
                    <div className="flex items-center space-x-2 mt-8">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${currentSlide === index ? 'w-8 bg-amber-500' : 'w-2 bg-muted'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-blue-500/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full blur-2xl" />
        </section>
    );
};

export default HeroSection;
