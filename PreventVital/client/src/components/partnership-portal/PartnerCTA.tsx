
import { Hand, ArrowRight, Phone, Clock, ShieldCheck, MessageSquare } from 'lucide-react';

interface PartnerCTAProps {
    className?: string;
}

const PartnerCTA = ({ className = '' }: PartnerCTAProps) => {
    return (
        <section className={`py-16 lg:py-24 bg-gradient-to-br from-primary via-blue-600 to-indigo-600 ${className}`}>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-2xl mb-6">
                        <Hand size={40} className="text-white" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Ready to Transform Healthcare Together?
                    </h2>
                    <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                        Join our growing ecosystem of healthcare innovators and help us make preventive care accessible to millions across India
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                    <button className="w-full sm:w-auto px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center space-x-2">
                        <span>Start Partnership Application</span>
                        <ArrowRight size={20} />
                    </button>
                    <button className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white font-bold rounded-lg border-2 border-white hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2">
                        <Phone size={20} />
                        <span>Schedule a Call</span>
                    </button>
                </div>

                <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {[
                        { icon: Clock, text: 'Quick onboarding in 2-4 weeks' },
                        { icon: ShieldCheck, text: 'Enterprise-grade security' },
                        { icon: MessageSquare, text: '24/7 dedicated support' }
                    ].map((item, index) => (
                        <div key={index} className="flex items-center justify-center space-x-3 text-white">
                            <item.icon size={24} className="flex-shrink-0" />
                            <span className="text-sm font-medium">{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PartnerCTA;
