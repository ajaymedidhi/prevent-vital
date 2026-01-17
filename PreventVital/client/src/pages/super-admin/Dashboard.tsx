import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Users, Activity, DollarSign, AlertCircle,
    RefreshCw, Brain, AlertTriangle, TrendingDown
} from 'lucide-react';

const SuperAdminDashboard = () => {
    const [stats, setStats] = useState<any>(null);
    const [alerts, setAlerts] = useState<any[]>([]);
    const [realtimeMetrics, setRealtimeMetrics] = useState<any>(null);
    const [autoRefresh, setAutoRefresh] = useState(true);

    useEffect(() => {
        // Mock data or fetch
        // In real app, fetch from /api/admin/stats
        setStats({
            users: { total: 12, growth: 12.5, active: 4 },
            revenue: { month: 40000, arr: 5000000, growth: 8.5 },
            health: { programsActive: 12, criticalAlerts: 1 }
        });
        setRealtimeMetrics({
            activeUsers: 4, activeSessions: 3, vitalsPerMinute: 20, apiResponseTime: 47, systemHealth: 99.9, databaseConnections: 5
        });
        setAlerts([
            { id: 1, userName: "Ramesh Kumar", message: "blood_pressure is warning", value: "145/90 mmHg", severity: "warning", timestamp: new Date() }
        ]);
    }, []);

    return (
        <div className="space-y-8 animate-in fade-in duration-500 font-sans">
            {/* Real-time System Status Bar (Vibrant) */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse absolute"></div>
                            <div className="w-3 h-3 bg-green-400 rounded-full opacity-50 animate-ping"></div>
                        </div>
                        <span className="font-bold text-lg tracking-wide">System Status: Operational</span>
                    </div>
                    <button
                        onClick={() => setAutoRefresh(!autoRefresh)}
                        className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors backdrop-blur-sm"
                    >
                        <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
                        <span className="text-sm font-medium">{autoRefresh ? 'Auto-refresh ON' : 'Paused'}</span>
                    </button>
                </div>

                {realtimeMetrics && (
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                        {[
                            { label: "Active Users", value: realtimeMetrics.activeUsers },
                            { label: "Active Sessions", value: realtimeMetrics.activeSessions },
                            { label: "Vitals/Min", value: realtimeMetrics.vitalsPerMinute },
                            { label: "API Latency", value: `${realtimeMetrics.apiResponseTime}ms` },
                            { label: "System Health", value: `${realtimeMetrics.systemHealth}%` },
                            { label: "DB Connections", value: realtimeMetrics.databaseConnections },
                        ].map((metric, idx) => (
                            <div key={idx} className="bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/10">
                                <div className="text-xs text-blue-100 font-medium uppercase tracking-wider mb-1 opacity-80">{metric.label}</div>
                                <div className="text-xl font-bold">{metric.value ?? '-'}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between mb-4">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-full"><Users className="w-6 h-6" /></div>
                        <span className="text-green-600 font-bold text-sm bg-green-50 px-2 py-1 rounded-full">+12.5%</span>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
                    <div className="mt-1">
                        <p className="text-3xl font-bold text-gray-900">{stats?.users?.total || 0}</p>
                        <p className="text-xs text-gray-400 mt-1">{stats?.users?.active || 0} active now</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between mb-4">
                        <div className="p-3 bg-green-100 text-green-600 rounded-full"><DollarSign className="w-6 h-6" /></div>
                        <span className="text-green-600 font-bold text-sm bg-green-50 px-2 py-1 rounded-full">+8.5%</span>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium">Monthly Revenue</h3>
                    <div className="mt-1">
                        <p className="text-3xl font-bold text-gray-900">₹{((stats?.revenue?.month || 0) / 100000).toFixed(1)}L</p>
                        <p className="text-xs text-gray-400 mt-1">ARR: ₹{((stats?.revenue?.arr || 0) / 10000000).toFixed(2)}Cr</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between mb-4">
                        <div className="p-3 bg-purple-100 text-purple-600 rounded-full"><Activity className="w-6 h-6" /></div>
                        <span className="text-green-600 font-bold text-sm bg-green-50 px-2 py-1 rounded-full">+8.2%</span>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium">Active Programs</h3>
                    <div className="mt-1">
                        <p className="text-3xl font-bold text-gray-900">{stats?.health?.programsActive || 0}</p>
                        <p className="text-xs text-gray-400 mt-1">0 consultations</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500 hover:shadow-md transition-shadow">
                    <div className="flex justify-between mb-4">
                        <div className="p-3 bg-red-100 text-red-600 rounded-full"><AlertCircle className="w-6 h-6" /></div>
                        <span className="text-red-600 font-bold text-sm bg-red-50 px-2 py-1 rounded-full">ACTION REQ</span>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium">Critical Alerts</h3>
                    <div className="mt-1">
                        <p className="text-3xl font-bold text-gray-900">{stats?.health?.criticalAlerts || 0}</p>
                        <p className="text-xs text-gray-400 mt-1">Requires immediate attention</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        Critical Health Alerts
                        <span className="ml-auto bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">3 Active</span>
                    </h3>
                    <div className="space-y-4">
                        {alerts.map((alert: any, i: number) => (
                            <div key={i} className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                                <div>
                                    <p className="font-bold text-gray-900">{alert.userName}</p>
                                    <p className="text-sm text-gray-600">{alert.message}</p>
                                    <p className="text-xs text-gray-500 mt-1">{alert.value}</p>
                                </div>
                                <div className="text-right">
                                    <span className="bg-yellow-200 text-yellow-800 text-[10px] uppercase font-bold px-2 py-1 rounded">WARNING</span>
                                    <button className="block mt-2 bg-blue-600 text-white text-xs px-3 py-1.5 rounded hover:bg-blue-700 transition">Take Action</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Brain className="w-5 h-5 text-purple-500" />
                        AI Risk Predictions
                        <span className="ml-auto bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">10 High Risk</span>
                    </h3>
                    <div className="space-y-4">
                        {/* Mock Item */}
                        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100/50">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <p className="font-bold text-gray-900">Unknown</p>
                                    <p className="text-sm text-gray-600">Test Risk</p>
                                </div>
                                <span className="text-2xl font-bold text-purple-600">99%</span>
                            </div>
                            <div className="text-xs text-gray-500">Risk Factors: High BP, irregular heart rate...</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;
