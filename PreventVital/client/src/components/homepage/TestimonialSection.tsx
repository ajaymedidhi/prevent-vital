
import { useState } from 'react';
import { Star, Check, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
    id: string;
    name: string;
    age: number;
    condition: string;
    image: string;
    alt: string;
    quote: string;
    improvement: string;
    duration: string;
    rating: number;
}

const TestimonialSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials: Testimonial[] = [
        {
            id: '1',
            name: 'Rajesh Kumar',
            age: 52,
            condition: 'Type 2 Diabetes Prevention',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_11f1b3ee2-1763295843469.png",
            alt: 'Middle-aged Indian man with short black hair wearing blue shirt smiling confidently at camera',
            quote: 'PreventVital helped me prevent diabetes through personalized lifestyle changes. The AI predictions were accurate, and the yoga therapy programs transformed my health. My HbA1c dropped from 6.2 to 5.4 in just 6 months.',
            improvement: '87% Risk Reduction',
            duration: '6 Months',
            rating: 5
        },
        {
            id: '2',
            name: 'Priya Sharma',
            age: 45,
            condition: 'Hypertension Management',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_115d61d2c-1765988781101.png",
            alt: 'Professional Indian woman with long dark hair in white blazer smiling warmly in office setting',
            quote: 'The continuous blood pressure monitoring and stress reduction programs have been life-changing. I no longer need medication, and my blood pressure is consistently normal. The meditation sessions are incredibly effective.',
            improvement: 'Medication-Free',
            duration: '8 Months',
            rating: 5
        },
        {
            id: '3',
            name: 'Amit Patel',
            age: 38,
            condition: 'Weight Management',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f0b12253-1763295388033.png",
            alt: 'Young Indian man with beard wearing casual gray t-shirt smiling outdoors with natural background',
            quote: 'Lost 18 kg in 10 months with PreventVital\'s holistic approach. The combination of AI-driven nutrition plans, exercise tracking, and behavioral therapy made weight loss sustainable. I feel healthier and more energetic than ever.',
            improvement: '18 kg Weight Loss',
            duration: '10 Months',
            rating: 5
        }
    ];

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    return (
        <section className="py-24 bg-background relative">
            <div className="container mx-auto px-6 md:px-16">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Left Panel: Header & Controls */}
                    <div className="w-full lg:w-4/12 space-y-6">
                        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full">
                            <Star size={14} className="text-accent fill-accent" />
                            <span className="text-xs font-bold text-accent uppercase tracking-widest">Success Stories</span>
                        </div>

                        <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-[1.1]">
                            Life-Changing <br />
                            <span className="text-accent">Transformations</span>
                        </h2>

                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Join thousands who have rewritten their health stories with PreventVital's AI-driven guidance.
                        </p>

                        <div className="flex items-center space-x-3 pt-4">
                            <button
                                onClick={handlePrevious}
                                className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={handleNext}
                                className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Right Panel: Testimonial Card */}
                    <div className="w-full lg:w-8/12">
                        <div className="relative bg-secondary/30 rounded-[2rem] p-8 lg:p-12 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 border border-border/50">
                            {/* Decorative Quote Icon */}
                            <div className="absolute top-10 right-10 opacity-10">
                                <MessageSquare size={120} className="text-primary" />
                            </div>

                            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                                <div className="flex-shrink-0">
                                    <div className="relative w-24 h-24 lg:w-32 lg:h-32">
                                        <img
                                            src={testimonials[currentIndex].image}
                                            alt={testimonials[currentIndex].alt}
                                            className="w-full h-full rounded-2xl object-cover shadow-lg"
                                        />
                                        <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-md border-2 border-background">
                                            <Check size={18} className="text-white" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 space-y-6">
                                    <div className="flex items-center space-x-1">
                                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                            <Star key={i} size={18} className="text-amber-500 fill-amber-500" />
                                        ))}
                                    </div>

                                    <blockquote className="text-2xl font-medium text-foreground leading-normal font-sans tracking-tight">
                                        "{testimonials[currentIndex].quote}"
                                    </blockquote>

                                    <div>
                                        <h4 className="text-lg font-bold text-foreground">
                                            {testimonials[currentIndex].name}
                                        </h4>
                                        <p className="text-sm text-muted-foreground font-medium">
                                            {testimonials[currentIndex].condition} • Age {testimonials[currentIndex].age}
                                        </p>
                                    </div>

                                    <div className="flex gap-4 border-t border-border pt-6">
                                        <div>
                                            <div className="text-xs font-bold text-muted-foreground/70 uppercase tracking-wider mb-1">Result</div>
                                            <div className="text-lg font-bold text-accent">
                                                {testimonials[currentIndex].improvement}
                                            </div>
                                        </div>
                                        <div className="w-px bg-border"></div>
                                        <div>
                                            <div className="text-xs font-bold text-muted-foreground/70 uppercase tracking-wider mb-1">Timeframe</div>
                                            <div className="text-lg font-bold text-foreground">
                                                {testimonials[currentIndex].duration}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;
