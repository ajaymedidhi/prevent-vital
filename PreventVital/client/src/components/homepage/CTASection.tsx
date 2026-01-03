
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Users } from 'lucide-react';

const CTASection = () => {
    return (
        <section className="py-16 lg:py-24 bg-gradient-to-br from-primary via-blue-600 to-indigo-600 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full mb-6">
                        <Sparkles size={16} className="text-white" />
                        <span className="text-sm font-semibold text-white">Start Your Prevention Journey</span>
                    </div>

                    <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                        Take Control of Your Health Today
                    </h2>

                    <p className="text-lg lg:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Join 50,000+ users who have transformed their health with AI-powered preventive care. Get your personalized health assessment in just 5 minutes.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            to="/ai-health-assessment"
                            className="inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-xl"
                        >
                            Start Free Assessment
                            <ArrowRight size={20} className="ml-2" />
                        </Link>

                        <Link
                            to="/medical-professional-portal"
                            className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
                        >
                            For Healthcare Providers
                            <Users size={20} className="ml-2" />
                        </Link>
                    </div>

                    <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                        <div className="text-center">
                            <div className="text-3xl lg:text-4xl font-bold text-white mb-2">5 Min</div>
                            <div className="text-sm text-white/80">Quick Assessment</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl lg:text-4xl font-bold text-white mb-2">24/7</div>
                            <div className="text-sm text-white/80">Health Monitoring</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl lg:text-4xl font-bold text-white mb-2">95%</div>
                            <div className="text-sm text-white/80">Success Rate</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
