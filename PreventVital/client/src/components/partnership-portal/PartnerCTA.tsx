
import { ArrowRight, ShieldCheck, FileText } from 'lucide-react';

interface PartnerCTAProps {
    className?: string;
}

const PartnerCTA = ({ className = '' }: PartnerCTAProps) => {
    return (
        <section className={`py-20 lg:py-28 bg-[#0B1C3E] ${className}`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-6 backdrop-blur-sm">
                        <ShieldCheck size={32} className="text-white" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
                        Ready to Partner with Us?
                    </h2>
                    <p className="text-lg sm:text-xl text-blue-100/90 max-w-2xl mx-auto leading-relaxed">
                        Let's discuss how we can work together to transform preventive healthcare.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="w-full sm:w-auto px-8 py-4 bg-[#2DD4BF] text-teal-950 font-bold rounded-lg hover:bg-[#2DD4BF]/90 transition-all duration-300 shadow-lg hover:shadow-teal-500/20 hover:scale-105 flex items-center justify-center space-x-2">
                        <span>Schedule a Call</span>
                        <ArrowRight size={20} />
                    </button>
                    <button className="w-full sm:w-auto px-8 py-4 bg-transparent text-white font-bold rounded-lg border border-white/20 hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2">
                        <FileText size={20} />
                        <span>Download Partnership Guide</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PartnerCTA;
