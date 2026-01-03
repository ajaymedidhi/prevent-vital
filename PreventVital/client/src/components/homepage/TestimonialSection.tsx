
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
        <section className="py-16 lg:py-24 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-100 border border-emerald-200 rounded-full mb-4 dark:bg-emerald-900/30 dark:border-emerald-800">
                        <Star size={16} className="text-emerald-600 dark:text-emerald-400" />
                        <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Patient Success Stories</span>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                        Real Results, Real People
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Discover how PreventVital has transformed lives through preventive healthcare
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="relative bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
                        <div className="grid md:grid-cols-5 gap-6 p-8 lg:p-12">
                            <div className="md:col-span-2 flex flex-col items-center text-center">
                                <div className="relative w-32 h-32 mb-4">
                                    <img
                                        src={testimonials[currentIndex].image}
                                        alt={testimonials[currentIndex].alt}
                                        className="w-full h-full rounded-full object-cover border-4 border-primary"
                                    />
                                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-card">
                                        <Check size={20} className="text-white" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-1">
                                    {testimonials[currentIndex].name}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                    Age {testimonials[currentIndex].age}
                                </p>
                                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                                    {testimonials[currentIndex].condition}
                                </span>

                                <div className="flex items-center space-x-1 mt-4">
                                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                        <Star key={i} size={16} className="text-amber-500 fill-amber-500" />
                                    ))}
                                </div>
                            </div>

                            <div className="md:col-span-3">
                                <MessageSquare size={32} className="text-primary/20 mb-4" />
                                <blockquote className="text-foreground text-lg leading-relaxed mb-6">
                                    "{testimonials[currentIndex].quote}"
                                </blockquote>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-emerald-100 dark:bg-emerald-900/30 rounded-lg p-4 border border-emerald-200 dark:border-emerald-800">
                                        <div className="text-xs text-muted-foreground mb-1">Health Improvement</div>
                                        <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                                            {testimonials[currentIndex].improvement}
                                        </div>
                                    </div>
                                    <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                                        <div className="text-xs text-muted-foreground mb-1">Program Duration</div>
                                        <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                            {testimonials[currentIndex].duration}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between px-8 py-4 bg-muted/50 border-t border-border">
                            <button
                                onClick={handlePrevious}
                                className="p-2 hover:bg-background rounded-lg transition-colors"
                                aria-label="Previous testimonial"
                            >
                                <ChevronLeft size={24} className="text-muted-foreground" />
                            </button>

                            <div className="flex items-center space-x-2">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`h-2 rounded-full transition-all duration-300 ${currentIndex === index ? 'w-8 bg-primary' : 'w-2 bg-muted'
                                            }`}
                                        aria-label={`Go to testimonial ${index + 1}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={handleNext}
                                className="p-2 hover:bg-background rounded-lg transition-colors"
                                aria-label="Next testimonial"
                            >
                                <ChevronRight size={24} className="text-muted-foreground" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;
