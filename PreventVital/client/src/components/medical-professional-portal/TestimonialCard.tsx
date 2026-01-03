
interface Testimonial {
    id: number;
    name: string;
    role: string;
    hospital: string;
    quote: string;
    image: string;
    alt: string;
}

interface TestimonialCardProps {
    testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
    return (
        <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start space-x-4 mb-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20">
                    <img
                        src={testimonial.image}
                        alt={testimonial.alt}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-1">
                    <h4 className="text-base font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.hospital}</p>
                </div>
            </div>
            <div className="relative">
                <span className="absolute -top-2 -left-1 text-4xl text-primary/20">"</span>
                <p className="text-sm text-muted-foreground leading-relaxed pl-6 italic">{testimonial.quote}</p>
            </div>
        </div>
    );
}
