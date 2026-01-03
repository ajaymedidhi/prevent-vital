import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Users, Activity, DollarSign, AlertCircle,
    RefreshCw, Brain, AlertTriangle, TrendingDown,
    Plus, Search
} from 'lucide-react';
// Assuming UI components exist or using generic HTML for now to match snippet logic
// If specific UI components like Card, Button are used in codebase, I should use them.
// For now, I will use Tailwind classes as provided in the snippet.

// MetricCard Component (Internal or separate file, putting here for now)
const MetricCard = ({ title, value, change, icon: Icon, color, subtitle, urgent }: any) => {
    const colorClasses: any = {
        blue: 'bg-blue-100 text-blue-600',
        green: 'bg-green-100 text-green-600',
        purple: 'bg-purple-100 text-purple-600',
        red: 'bg-red-100 text-red-600',
        gray: 'bg-gray-100 text-gray-600'
    };

    return (
        <div className={`bg-white rounded-lg shadow-md p-6 ${urgent ? 'border-l-4 border-red-500' : ''}`}>
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-full ${colorClasses[color]}`}>
                    <Icon className="w-6 h-6" />
                </div>
                {change && (
                    <span className={`text-sm font-medium ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {change}
                    </span>
                )}
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
            <div className="flex items-end justify-between mt-1">
                <div className="text-2xl font-bold text-gray-900">{value}</div>
            </div>
            {subtitle && <p className="text-xs text-gray-500 mt-2">{subtitle}</p>}
        </div>
    );
};

const SubscriptionCard = ({ plan, count, color, percentage }: any) => (
    <div className={`bg-white p-4 rounded-lg border border-gray-100 shadow-sm`}>
        <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">{plan}</span>
            <span className={`text-xs px-2 py-1 rounded-full bg-${color}-100 text-${color}-800`}>
                {percentage}%
            </span>
        </div>
        <div className="text-2xl font-bold mb-1">{count}</div>
        <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div
                className={`bg-${color}-500 h-1.5 rounded-full`}
                style={{ width: `${percentage}%` }}
            />
        </div>
    </div>
);

const SuperAdminDashboard = () => {
    const [stats, setStats] = useState<any>(null);
    const [alerts, setAlerts] = useState<any[]>([]);
    const [realtimeMetrics, setRealtimeMetrics] = useState<any>(null);
    const [aiPredictions, setAiPredictions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [autoRefresh, setAutoRefresh] = useState(true);

    // Initial data load
    useEffect(() => {
        loadInitialData();
    }, []);

    // Real-time updates every 5 seconds
    useEffect(() => {
        if (!autoRefresh) return;

        const interval = setInterval(() => {
            loadRealtimeData();
        }, 5000);

        return () => clearInterval(interval);
    }, [autoRefresh]);

    const loadInitialData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            const [dashStats, alertsData, usersData, predictions] = await Promise.all([
                axios.get('/api/admin/stats', config),
                axios.get('/api/admin/alerts', config),
                axios.get('/api/admin/users', config),
                axios.get('/api/admin/predictions', config)
            ]);

            setStats(dashStats.data.data);
            setAlerts(alertsData.data.data);
            setUsers(usersData.data.data.users);
            setAiPredictions(predictions.data.data);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadRealtimeData = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            const [metrics, latestAlerts] = await Promise.all([
                axios.get('/api/admin/realtime', config),
                axios.get('/api/admin/alerts', config)
            ]);

            setRealtimeMetrics(metrics.data.data);
            setAlerts(latestAlerts.data.data);
        } catch (error) {
            console.error('Error loading realtime data:', error);
        }
    };

    const formatTimestamp = (timestamp: string | number | Date) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diff < 60) return `${diff} seconds ago`;
        if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
        return date.toLocaleDateString();
    };

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading Dashboard...</div>;
    }

    return (
        <div className="space-y-6 p-6">
            <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>

            {/* Real-time System Status Bar */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="font-bold text-lg">System Status: Operational</span>
                    </div>
                    <button
                        onClick={() => setAutoRefresh(!autoRefresh)}
                        className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
                    >
                        <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
                        <span className="text-sm">{autoRefresh ? 'Auto-refresh ON' : 'Auto-refresh OFF'}</span>
                    </button>
                </div>

                {realtimeMetrics && (
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                        <div className="bg-white/10 rounded-lg p-3">
                            <div className="text-sm opacity-90">Active Users</div>
                            <div className="text-2xl font-bold">{realtimeMetrics.activeUsers}</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3">
                            <div className="text-sm opacity-90">Active Sessions</div>
                            <div className="text-2xl font-bold">{realtimeMetrics.activeSessions}</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3">
                            <div className="text-sm opacity-90">Vitals/Min</div>
                            <div className="text-2xl font-bold">{realtimeMetrics.vitalsPerMinute}</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3">
                            <div className="text-sm opacity-90">API Latency</div>
                            <div className="text-2xl font-bold">{realtimeMetrics.apiResponseTime}ms</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3">
                            <div className="text-sm opacity-90">System Health</div>
                            <div className="text-2xl font-bold">{realtimeMetrics.systemHealth}%</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3">
                            <div className="text-sm opacity-90">DB Connections</div>
                            <div className="text-2xl font-bold">{realtimeMetrics.databaseConnections}</div>
                        </div>
                    </div>
                )}
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    title="Total Users"
                    value={stats?.users.total.toLocaleString()}
                    change={`+${stats?.users.growth}%`}
                    icon={Users}
                    color="blue"
                    subtitle={`${stats?.users.active.toLocaleString()} active`}
                />
                <MetricCard
                    title="Monthly Revenue"
                    value={`₹${(stats?.revenue.month / 100000).toFixed(1)}L`}
                    change={`+${stats?.revenue.growth}%`}
                    icon={DollarSign}
                    color="green"
                    subtitle={`ARR: ₹${(stats?.revenue.arr / 10000000).toFixed(1)}Cr`}
                />
                <MetricCard
                    title="Active Programs"
                    value={stats?.health.programsActive}
                    change="+8.2%"
                    icon={Activity}
                    color="purple"
                    subtitle={`${stats?.health.consultations} consultations`}
                />
                <MetricCard
                    title="Critical Alerts"
                    value={stats?.health.criticalAlerts}
                    change="↓ 2 from yesterday"
                    icon={AlertCircle}
                    color="red"
                    urgent
                    subtitle="Requires immediate attention"
                />
            </div>

            {/* AI/ML Metrics and Alerts Components would go here (omitted for brevity, can include if needed) */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Critical Alerts */}
                <div className="bg-white rounded-lg shadow-md">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                                <AlertTriangle className="w-5 h-5 text-red-600" />
                                <span>Critical Health Alerts</span>
                            </h3>
                            <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
                                {alerts.length} Active
                            </span>
                        </div>
                    </div>
                    <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                        {alerts.map((alert: any) => (
                            <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${alert.severity === 'critical'
                                    ? 'bg-red-50 border-red-500'
                                    : 'bg-yellow-50 border-yellow-500'
                                }`}>
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <p className="font-bold text-gray-900">{alert.userName}</p>
                                        <p className="text-sm text-gray-600">{alert.message}</p>
                                    </div>
                                    <span className={`text-xs font-medium px-2 py-1 rounded ${alert.severity === 'critical'
                                            ? 'bg-red-200 text-red-800'
                                            : 'bg-yellow-200 text-yellow-800'
                                        }`}>
                                        {alert.severity.toUpperCase()}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">{alert.value}</p>
                                        <p className="text-xs text-gray-500">{formatTimestamp(alert.timestamp)}</p>
                                    </div>
                                    {!alert.actionTaken && (
                                        <button className="bg-blue-600 text-white text-sm px-4 py-1 rounded hover:bg-blue-700 transition-colors">
                                            Take Action
                                        </button>
                                    )}
                                </div>
                                <div className="mt-2 p-2 bg-purple-50 rounded text-xs">
                                    <div className="flex items-center space-x-1 text-purple-700">
                                        <Brain className="w-3 h-3" />
                                        <span className="font-medium">AI Prediction:</span>
                                    </div>
                                    <p className="text-purple-600 mt-1">{alert.aiPrediction}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI Predictions */}
                <div className="bg-white rounded-lg shadow-md">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                                <Brain className="w-5 h-5 text-purple-600" />
                                <span>AI Risk Predictions</span>
                            </h3>
                            <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                                {aiPredictions.length} High Risk
                            </span>
                        </div>
                    </div>
                    <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                        {aiPredictions.map((pred: any, idx: number) => (
                            <div key={idx} className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <p className="font-bold text-gray-900">{pred.userName}</p>
                                        <p className="text-sm text-gray-600">{pred.prediction}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-purple-600">{pred.probability}%</div>
                                        <div className="text-xs text-gray-500">{pred.timeframe}</div>
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <p className="text-xs font-medium text-gray-700 mb-1">Risk Factors:</p>
                                    <div className="flex flex-wrap gap-1">
                                        {pred.factors.map((factor: any, i: number) => (
                                            <span key={i} className="text-xs bg-white px-2 py-1 rounded border border-purple-200">
                                                {factor}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-2 border-t border-purple-200">
                                    <p className="text-xs text-gray-600">
                                        <span className="font-medium">Recommended:</span> {pred.recommended}
                                    </p>
                                    <button className="text-xs bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition-colors">
                                        Assign
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Subscription Distribution */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Subscription Distribution</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <SubscriptionCard
                        plan="Free"
                        count={stats?.subscriptions.free}
                        color="gray"
                        percentage={stats?.users.total ? (stats.subscriptions.free / stats.users.total * 100).toFixed(1) : 0}
                    />
                    <SubscriptionCard
                        plan="Silver"
                        count={stats?.subscriptions.silver}
                        color="blue"
                        percentage={stats?.users.total ? (stats.subscriptions.silver / stats.users.total * 100).toFixed(1) : 0}
                    />
                    <SubscriptionCard
                        plan="Gold"
                        count={stats?.subscriptions.gold}
                        color="yellow"
                        percentage={stats?.users.total ? (stats.subscriptions.gold / stats.users.total * 100).toFixed(1) : 0}
                    />
                    <SubscriptionCard
                        plan="Platinum"
                        count={stats?.subscriptions.platinum}
                        color="purple"
                        percentage={stats?.users.total ? (stats.subscriptions.platinum / stats.users.total * 100).toFixed(1) : 0}
                    />
                </div>
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center space-x-2">
                        <TrendingDown className="w-4 h-4 text-yellow-700" />
                        <span className="text-sm font-medium text-yellow-800">
                            Churn Rate: {stats?.subscriptions.churnRate}% (Target: &lt;2%)
                        </span>
                    </div>
                </div>
            </div>

            {/* User Management Component (Simplified for Dashboard view, full view is in UserManagement.tsx) */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Recent Users</h2>
                    <button className="text-blue-600 text-sm hover:underline">View All</button>
                </div>
                {/* Table omitted for brevity in this initial pass, assuming UserManagement page handles full list */}
                <p className="text-gray-500">Showing {users.length} recent users...</p>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;
