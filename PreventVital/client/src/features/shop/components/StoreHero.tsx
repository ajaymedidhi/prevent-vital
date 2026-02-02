import React from 'react';
import { Truck, ShieldCheck, Award } from 'lucide-react';

const StoreHero = () => {
    return (
        <div className="w-full bg-gradient-to-b from-blue-50/50 to-white pt-20 pb-12">
            <div className="container mx-auto px-4 text-center">
                <div className="inline-block mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold uppercase tracking-wider">
                        Official Store
                    </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                    Premium Health Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500">For a Better You</span>
                </h1>

                <p className="text-gray-500 max-w-2xl mx-auto mb-12 text-lg">
                    Discover clinical-grade wearables, advanced supplements, and home testing kits curated by medical experts.
                </p>

                {/* Features Bar */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto border-t border-gray-100 pt-8">
                    <div className="flex items-center justify-center space-x-3 text-gray-700">
                        <Truck className="text-blue-500" size={20} />
                        <div className="text-left">
                            <h3 className="font-semibold text-sm">Free Shipping</h3>
                            <p className="text-xs text-gray-400">On orders over ₹1,999</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center space-x-3 text-gray-700">
                        <ShieldCheck className="text-blue-500" size={20} />
                        <div className="text-left">
                            <h3 className="font-semibold text-sm">Secure Payment</h3>
                            <p className="text-xs text-gray-400">100% protected</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center space-x-3 text-gray-700">
                        <Award className="text-blue-500" size={20} />
                        <div className="text-left">
                            <h3 className="font-semibold text-sm">Quality Assured</h3>
                            <p className="text-xs text-gray-400">Medical-grade products</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoreHero;
