import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Users, Activity, TrendingUp, AlertCircle } from 'lucide-react';

const CorporateDashboard = () => {
    const { token } = useSelector((state: RootState) => state.auth);
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get('/api/corporate/dashboard', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setStats(res.data.data);
            } catch (err) {
                console.error("Failed to fetch corporate stats", err);
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchStats();
    }, [token]);

    if (loading) return <div className="p-8">Loading dashboard...</div>;
    if (!stats) return <div className="p-8">Unable to load dashboard data.</div>;

    return (
        <div className="p-6 md:p-10 space-y-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Corporate Wellness Dashboard</h1>
                <p className="text-gray-500 mt-2">Overview of your organization's health and engagement.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Total Employees</p>
                        <h3 className="text-2xl font-bold text-gray-900">{stats.totalEmployees}</h3>
                    </div>
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <Users size={20} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Avg Risk Score</p>
                        <h3 className="text-2xl font-bold text-gray-900">{stats.averageRiskScore}%</h3>
                    </div>
                    <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                        <Activity size={20} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Engagement</p>
                        <h3 className="text-2xl font-bold text-gray-900">{stats.engagementRate}</h3>
                    </div>
                    <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                        <TrendingUp size={20} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Active Programs</p>
                        <h3 className="text-2xl font-bold text-gray-900">{stats.activePrograms}</h3>
                    </div>
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                        <AlertCircle size={20} />
                    </div>
                </div>
            </div>

            {/* Risk Distribution & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Health Risk Distribution</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium text-gray-700">Low Risk</span>
                                <span className="text-gray-500">{stats.riskDistribution?.low || 0} Employees</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2.5">
                                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${(stats.riskDistribution?.low / stats.totalEmployees) * 100}%` }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium text-gray-700">Moderate Risk</span>
                                <span className="text-gray-500">{stats.riskDistribution?.moderate || 0} Employees</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2.5">
                                <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: `${(stats.riskDistribution?.moderate / stats.totalEmployees) * 100}%` }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium text-gray-700">High Risk</span>
                                <span className="text-gray-500">{stats.riskDistribution?.high || 0} Employees</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2.5">
                                <div className="bg-red-500 h-2.5 rounded-full" style={{ width: `${(stats.riskDistribution?.high / stats.totalEmployees) * 100}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Key Metrics</h3>
                    <ul className="space-y-4">
                        <li className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Enrolled This Month</span>
                            <span className="font-semibold text-gray-900">{stats.enrolledThisMonth}</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Pending Invoices</span>
                            <span className="font-semibold text-gray-900">0</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Next Report</span>
                            <span className="text-sm text-blue-600 cursor-pointer hover:underline">Generate Now</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CorporateDashboard;
