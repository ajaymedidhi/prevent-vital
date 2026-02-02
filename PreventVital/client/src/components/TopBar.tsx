
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const TopBar = () => {
    return (
        <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite] text-white text-xs md:text-sm font-medium py-2 px-4 text-center relative z-50">
            <div className="container mx-auto flex items-center justify-center space-x-2">
                <span className="hidden md:inline">Transform your health with AI-powered prevention.</span>
                <Link to="/ai-health-assessment" className="inline-flex items-center hover:underline font-semibold group">
                    Start Free Assessment
                    <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
};

export default TopBar;
