
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Users } from 'lucide-react';

const CTASection = () => {
    return (
        <section className="py-24 relative overflow-hidden bg-primary">
            {/* Background Gradients */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[100px] pointer-events-none" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full mb-8">
                        <Sparkles size={16} className="text-accent" />
                        <span className="text-sm font-semibold text-white tracking-wide">Start Your Prevention Journey</span>
                    </div>

                    <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight tracking-tight">
                        Take Control of Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
                            Health Future Today
                        </span>
                    </h2>

                    <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Join 50,000+ users who have transformed their health with AI-powered preventive care.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                        <Link
                            to="/ai-health-assessment"
                            className="group inline-flex items-center px-10 py-5 bg-white text-primary font-bold rounded-xl hover:bg-white/90 transition-all duration-300 hover:scale-[1.02] shadow-2xl shadow-black/20"
                        >
                            Start Free Assessment
                            <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                            to="/medical-professional-portal"
                            className="inline-flex items-center px-10 py-5 bg-transparent border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                        >
                            For Healthcare Providers
                            <Users size={20} className="ml-2" />
                        </Link>
                    </div>

                    <div className="mt-16 pt-16 border-t border-white/10 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
                        <div className="text-center">
                            <div className="text-4xl lg:text-5xl font-bold text-white mb-2">5<span className="text-accent text-2xl">min</span></div>
                            <div className="text-sm font-medium text-white/60 uppercase tracking-widest">Assessment</div>
                        </div>
                        <div className="text-center border-l border-white/10">
                            <div className="text-4xl lg:text-5xl font-bold text-white mb-2">24<span className="text-accent text-2xl">/7</span></div>
                            <div className="text-sm font-medium text-white/60 uppercase tracking-widest">Monitoring</div>
                        </div>
                        <div className="text-center border-l border-white/10">
                            <div className="text-4xl lg:text-5xl font-bold text-white mb-2">95<span className="text-accent text-2xl">%</span></div>
                            <div className="text-sm font-medium text-white/60 uppercase tracking-widest">Success Rate</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
