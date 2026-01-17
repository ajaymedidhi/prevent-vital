import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Plus, Brain, ArrowRight } from 'lucide-react';

const MedicalPrograms = () => {
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Medical Program Governance</h2>
                    <p className="text-gray-500">Create, review, and manage clinical care plans.</p>
                </div>
                <button
                    onClick={() => navigate('/creator/dashboard')}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 shadow-lg transition-transform hover:-translate-y-0.5"
                >
                    <Plus className="w-5 h-5" />
                    Open Creator Studio
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Active Programs Mock */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-500" />
                        Standard Care Plans
                    </h3>
                    <div className="space-y-4">
                        {[
                            { name: "Hypertension Management", patients: 1240, status: "Active" },
                            { name: "Type 2 Diabetes Prevention", patients: 850, status: "Active" },
                            { name: "Post-Cardiac Rehab", patients: 320, status: "Review" },
                        ].map((prog, i) => (
                            <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100 cursor-pointer group">
                                <div>
                                    <p className="font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">{prog.name}</p>
                                    <p className="text-xs text-gray-500">{prog.patients} active patients</p>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full font-bold uppercase ${prog.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {prog.status}
                                </span>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-4 text-sm text-gray-500 hover:text-indigo-600 font-medium flex items-center justify-center gap-1 py-2">
                        View All Programs <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                {/* AI & Analytics Mock */}
                <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Brain className="w-32 h-32" />
                    </div>
                    <h3 className="font-bold text-xl mb-2 relative z-10">AI Effectiveness Analysis</h3>
                    <p className="text-indigo-200 text-sm mb-6 relative z-10 max-w-xs">
                        PreventVital AI analyzes patient outcomes across all active programs to suggest protocol optimizations.
                    </p>

                    <div className="relative z-10 space-y-4">
                        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                            <div className="flex justify-between items-end mb-1">
                                <span className="text-indigo-100 text-sm font-medium">Protocol Efficiency</span>
                                <span className="text-2xl font-bold">94%</span>
                            </div>
                            <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-green-400 h-full w-[94%]"></div>
                            </div>
                        </div>
                        <button className="bg-white text-indigo-900 px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-gray-100 transition-colors">
                            View AI Insights
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MedicalPrograms;
