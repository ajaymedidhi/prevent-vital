
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
                        <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-pink-500">Partnership Ecosystem</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
                        Build the Future of <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-pink-500">Preventive Healthcare</span> Together
                    </h1>

                    <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
                        Join India's pioneering integrated wellness-technology platform. Partner with PreventVital to transform healthcare delivery through AI-powered prevention.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center space-x-2">
                            <span>Become a Partner</span>
                            <ArrowRight size={20} />
                        </button>
                        <button className="w-full sm:w-auto px-8 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-200 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center space-x-2 shadow-sm">
                            <span className="font-medium">View API Docs</span>
                        </button>
                    </div>
                </div>

                <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 animate-fade-in-up delay-100">
                    {[
                        { value: '500+', label: 'Healthcare Partners' },
                        { value: '50+', label: 'Device Integrations' },
                        { value: '99.9%', label: 'Uptime SLA' },
                        { value: '24/7', label: 'Technical Support' }
                    ].map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-4xl lg:text-5xl font-bold text-slate-700 mb-2">{stat.value}</div>
                            <div className="text-sm text-gray-500 uppercase tracking-wide font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PartnershipHero;
