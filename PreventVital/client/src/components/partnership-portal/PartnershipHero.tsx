
import {
    Building,
    ArrowRight,
    FileText,
    Building2,
    Smartphone,
    BadgeCheck,
    MessageSquare
} from 'lucide-react';

interface PartnershipHeroProps {
    className?: string;
}

const PartnershipHero = ({ className = '' }: PartnershipHeroProps) => {
    return (
        <section className={`relative bg-gradient-to-br from-primary/5 via-blue-500/5 to-cyan-500/5 py-20 lg:py-28 ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                        <Building size={20} className="text-primary" />
                        <span className="text-sm font-semibold text-primary">Partnership Ecosystem</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
                        Build the Future of <span className="text-primary">Preventive Healthcare</span> Together
                    </h1>

                    <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
                        Join India's pioneering integrated wellness-technology platform. Partner with PreventVital to transform healthcare delivery through AI-powered prevention, seamless integrations, and collaborative innovation.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center space-x-2">
                            <span>Become a Partner</span>
                            <ArrowRight size={20} />
                        </button>
                        <button className="w-full sm:w-auto px-8 py-4 bg-background text-primary font-semibold rounded-lg border-2 border-primary hover:bg-primary/5 transition-all duration-300 flex items-center justify-center space-x-2">
                            <FileText size={20} />
                            <span>View API Docs</span>
                        </button>
                    </div>
                </div>

                <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 animate-fade-in-up delay-100">
                    {[
                        { value: '500+', label: 'Healthcare Partners', icon: Building2 },
                        { value: '50+', label: 'Device Integrations', icon: Smartphone },
                        { value: '99.9%', label: 'Uptime SLA', icon: BadgeCheck },
                        { value: '24/7', label: 'Technical Support', icon: MessageSquare }
                    ].map((stat, index) => (
                        <div key={index} className="bg-card rounded-xl p-6 text-center shadow-sm border border-border hover:shadow-md transition-all duration-300">
                            <div className="flex justify-center mb-3">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <stat.icon size={24} className="text-primary" />
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                            <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PartnershipHero;
