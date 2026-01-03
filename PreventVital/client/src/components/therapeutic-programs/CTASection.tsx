
import { Sparkles, Play, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CTASectionProps {
    onStartAssessment: () => void;
}

export default function CTASection({ onStartAssessment }: CTASectionProps) {
    return (
        <section className="bg-gradient-to-br from-amber-500 via-cyan-600 to-purple-600 py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                    <Sparkles size={20} className="text-white" />
                    <span className="text-sm font-medium text-white">Start Your Transformation Today</span>
                </div>

                <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
                    Ready to Transform Your Health with AI-Enhanced Wellness?
                </h2>

                <p className="text-lg lg:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                    Join 12,500+ members who have already discovered the power of combining ancient wisdom with cutting-edge technology for preventive healthcare.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={onStartAssessment}
                        className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 bg-white text-amber-600 rounded-lg hover:bg-white/90 transition-all duration-300 hover:scale-105 font-semibold shadow-lg"
                    >
                        <Play size={20} className="fill-current" />
                        <span>Start Free Assessment</span>
                    </button>

                    <Link
                        to="/disease-prevention-programs"
                        className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-lg hover:bg-white/20 transition-all duration-300 font-semibold"
                    >
                        <span>Explore Programs</span>
                        <ArrowRight size={20} />
                    </Link>
                </div>

                <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-2">500+</div>
                        <div className="text-sm text-white/80">Guided Sessions</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-2">50+</div>
                        <div className="text-sm text-white/80">Expert Instructors</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-2">4.9★</div>
                        <div className="text-sm text-white/80">Average Rating</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
