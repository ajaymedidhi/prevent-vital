import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; // No dispatch/logout needed here, handled by Layout
import axios from 'axios';
import { Users, ShoppingCart, TrendingUp, AlertCircle, CheckCircle, Package } from 'lucide-react';
import { RootState } from '../../store';

const DashboardStats = ({ stats }: { stats: any }) => {
    const statCards = [
        {
            title: 'Total Users',
            value: stats?.users?.total || 0,
            change: `+${stats?.users?.growth || 0}%`,
            icon: Users,
            color: 'bg-blue-500',
            trend: 'up'
        },
        {
            title: 'Active Orders',
            value: stats?.orders?.pending || 0,
            subtitle: `${stats?.orders?.processing || 0} processing`,
            icon: ShoppingCart,
            color: 'bg-green-500',
            trend: 'up'
        },
        {
            title: 'Critical Alerts',
            value: stats?.health?.criticalAlerts || 0,
            subtitle: 'Last 24 hours',
            icon: AlertCircle,
            color: 'bg-red-500',
            trend: 'neutral'
        },
        {
            title: 'Today Revenue',
            value: `₹${(stats?.revenue?.today || 0).toLocaleString()}`,
            change: `+${stats?.revenue?.growth || 0}%`,
            icon: TrendingUp,
            color: 'bg-purple-500',
            trend: 'up'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className={`${stat.color} p-3 rounded-lg`}>
                            <stat.icon className="w-6 h-6 text-white" />
                        </div>
                        {stat.change && (
                            <span className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-green-600' : 'text-gray-600'}`}>
                                {stat.change}
                            </span>
                        )}
                    </div>
                    <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
                    <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                    {stat.subtitle && (
                        <p className="text-xs text-gray-500">{stat.subtitle}</p>
                    )}
                </div>
            ))}
        </div>
    );
};

const AdminDashboard = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            const res = await axios.get('/api/admin/stats');
            setStats(res.data.data);
        } catch (err) {
            console.error('Failed to fetch dashboard stats:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
                <p className="text-gray-500">Here's what's happening today across the platform.</p>
            </div>

            <DashboardStats stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quick Activity Feed */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Recent System Activity</h3>
                    <div className="space-y-4">
                        {[
                            { icon: CheckCircle, color: "text-green-600", bg: "bg-green-100", title: "New user registered", time: "2 minutes ago" },
                            { icon: Package, color: "text-blue-600", bg: "bg-blue-100", title: "Order #4029 shipped", time: "15 minutes ago" },
                            { icon: AlertCircle, color: "text-red-600", bg: "bg-red-100", title: "High BP Alert: John Doe", time: "1 hour ago" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                <div className={`w-10 h-10 ${item.bg} rounded-full flex items-center justify-center`}>
                                    <item.icon className={`w-5 h-5 ${item.color}`} />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{item.title}</p>
                                    <p className="text-xs text-gray-500">{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Links / Status */}
                <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-xl shadow-lg p-6 text-white">
                    <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="bg-white/10 hover:bg-white/20 p-4 rounded-lg text-left transition-colors">
                            <Users className="w-6 h-6 mb-2 text-blue-400" />
                            <div className="font-medium text-sm">Add New User</div>
                        </button>
                        <button className="bg-white/10 hover:bg-white/20 p-4 rounded-lg text-left transition-colors">
                            <ShoppingCart className="w-6 h-6 mb-2 text-green-400" />
                            <div className="font-medium text-sm">Process Orders</div>
                        </button>
                        <button className="bg-white/10 hover:bg-white/20 p-4 rounded-lg text-left transition-colors">
                            <AlertCircle className="w-6 h-6 mb-2 text-red-400" />
                            <div className="font-medium text-sm">Review Alerts</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
