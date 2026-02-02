import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroSectionProps {
    className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % 3);
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    const slides = [
        {
            titlePrefix: 'Prevention is Better Than',
            titleHighlight: 'Cure',
            titleSuffix: '',
            subtitle: 'AI-Powered Health Predictions',
            description: 'Transform your health journey with cutting-edge predictive analytics that identify risks before they become problems.',
            cta: 'Start Free Assessment',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_15af4787e-1764671673883.png",
            alt: 'Medical professional in white coat analyzing digital health data'
        },
        {
            titlePrefix: 'Your Health,',
            titleHighlight: 'Predicted & Protected',
            titleSuffix: '',
            subtitle: 'Continuous Monitoring Excellence',
            description: 'Real-time health tracking integrated with wearable devices, providing 24/7 insights into your wellness metrics.',
            cta: 'Explore Platform',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c62cab06-1764998842930.png",
            alt: 'Fitness tracker on wrist displaying heart rate'
        },
        {
            titlePrefix: 'Ancient Wisdom Meets',
            titleHighlight: 'AI Innovation',
            titleSuffix: '',
            subtitle: 'Holistic Wellness Integration',
            description: 'Combine traditional yoga, meditation, and breathwork with modern AI-driven personalized health recommendations.',
            cta: 'Discover Therapies',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_169d02975-1764761369642.png",
            alt: 'Woman in lotus position meditating peacefully'
        }
    ];

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % 3);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + 3) % 3);

    return (
        <section className={`relative w-full h-[700px] lg:h-[800px] overflow-hidden bg-background ${className}`}>
            {/* Background Slides */}
            <div className="absolute inset-0">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentSlide === index ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        {/* Gradient Overlay for Text Readability */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent/10 z-10" />
                        <img
                            src={slide.image}
                            alt={slide.alt}
                            className={`w-full h-full object-cover origin-center transform transition-transform duration-[20s] ease-linear ${currentSlide === index ? 'scale-110' : 'scale-100'
                                }`}
                        />
                    </div>
                ))}
            </div>

            {/* Content */}
            {/* Content */}
            <div className="relative z-20 container mx-auto px-6 md:px-16 h-full flex flex-col justify-start pt-24 md:pt-32">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="max-w-3xl space-y-8"
                    >
                        {/* Premium Pills Badge with Shimmer */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.4 }}
                        >
                            <div className="relative inline-flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-border/50 rounded-full shadow-sm overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] animate-shimmer" />
                                <Sparkles size={16} className="text-accent relative z-10" />
                                <span className="text-sm font-semibold text-primary tracking-wide relative z-10">AI-POWERED PREVENTIVE ECOSYSTEM</span>
                            </div>
                        </motion.div>

                        <div className="space-y-4">
                            <motion.h1
                                className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground leading-[1.1] tracking-tight pb-2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                {slides[currentSlide].titlePrefix}{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 block md:inline">
                                    {slides[currentSlide].titleHighlight}
                                </span>
                                {slides[currentSlide].titleSuffix}
                            </motion.h1>

                            <motion.p
                                className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-medium tracking-tight"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                {slides[currentSlide].subtitle}
                            </motion.p>
                        </div>

                        <motion.p
                            className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed border-l-4 border-accent pl-4 md:pl-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            {slides[currentSlide].description}
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 sm:gap-5 pt-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            <Link
                                to="/ai-health-assessment"
                                className="group w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                            >
                                {slides[currentSlide].cta}
                                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <Link
                                to="/disease-prevention-programs"
                                className="group inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-primary/20 text-primary font-semibold rounded-lg hover:bg-primary/5 hover:border-primary/40 transition-all duration-300"
                            >
                                View Programs
                            </Link>
                        </motion.div>

                        {/* Modern Tab Navigation */}
                        <div className="flex flex-wrap gap-4 mt-8 pt-8 border-t border-border/50">
                            {slides.map((slide, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`relative pb-2 text-xs md:text-sm font-bold tracking-wide transition-all duration-300 ${currentSlide === index ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    <span className="mr-1 md:mr-2 opacity-50">0{index + 1}</span>
                                    {index === 0 && 'PREDICTION'}
                                    {index === 1 && 'MONITORING'}
                                    {index === 2 && 'THERAPY'}

                                    {currentSlide === index && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 h-0.5 bg-accent w-full"
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="absolute inset-0 bg-white/50 animate-shimmer" />
                                        </motion.div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Decorative Elements - Animated Blobs */}
            <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[100px] pointer-events-none mix-blend-multiply animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-emerald-400/20 rounded-full blur-[100px] pointer-events-none mix-blend-multiply animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        </section>
    );
};

export default HeroSection;
