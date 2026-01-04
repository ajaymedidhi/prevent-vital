import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    AlertCircle, Users, ShoppingCart, Activity, TrendingUp, Heart, Search,
    Filter, Download, Eye, Edit, Ban, CheckCircle, XCircle, Clock, Package,
    Bell, LogOut, Home, UserCog, FileText, Settings, ChevronRight, Calculator
} from 'lucide-react';
import { RootState, logout } from '../../store';

// Dashboard Stats Component
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

// Users List Component
const UsersList = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        role: '',
        status: '',
        page: 1,
        limit: 20
    });

    useEffect(() => {
        fetchUsers();
    }, [filters.page, filters.role, filters.status]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            // Build query string
            const params = new URLSearchParams();
            // Note: Backend currently might not support all filters, but passing them for future proofing
            if (filters.search) params.append('search', filters.search);

            const res = await axios.get('/api/admin/users'); // Backend route
            // Adapting response: backend returns { data: { users: [] } }
            setUsers(res.data.data.users || []);
        } catch (err) {
            console.error('Failed to fetch users:', err);
        } finally {
            setLoading(false);
        }
    };

    const getRiskBadgeColor = (score: number) => {
        if (score < 10) return 'bg-green-100 text-green-800';
        if (score < 15) return 'bg-yellow-100 text-yellow-800';
        if (score < 20) return 'bg-orange-100 text-orange-800';
        return 'bg-red-100 text-red-800';
    };

    const getStatusBadge = (status: string) => {
        const badges: any = {
            active: 'bg-green-100 text-green-800',
            suspended: 'bg-red-100 text-red-800',
            deleted: 'bg-gray-100 text-gray-800'
        };
        return badges[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">User Management</h2>
                {/* Simplified filters for now as backend support is basic */}
                <p className="text-sm text-muted-foreground mb-4">Displaying all registered users</p>
            </div>

            <div className="overflow-x-auto">
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                ) : users.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        No users found
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">User</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Age/Gender</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Risk Score</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                                <span className="text-indigo-600 font-semibold text-sm">
                                                    {user.name ? user.name.charAt(0) : (user.profile?.firstName?.charAt(0) || 'U')}
                                                </span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {user.name || user.profile?.firstName || 'Unknown User'}
                                                </div>
                                                <div className="text-sm text-gray-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {/* Mock logic for age if not calculated/stored */}
                                        <div className="text-sm text-gray-900">{user.profile?.age || '-'} years</div>
                                        <div className="text-sm text-gray-500 capitalize">{user.profile?.gender || '-'}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                                            {user.role?.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {/* Placeholder Logic for Risk Score display if not on user object yet */}
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getRiskBadgeColor(user.riskScore || 0)}`}>
                                            Score: {user.riskScore || 'N/A'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${getStatusBadge(user.status || 'active')}`}>
                                            {user.status || 'active'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

// Critical Alerts Component
const CriticalAlerts = () => {
    const [alerts, setAlerts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAlerts();
    }, []);

    const fetchAlerts = async () => {
        try {
            const res = await axios.get('/api/admin/alerts');
            setAlerts(res.data.data || []);
        } catch (err) {
            console.error('Failed to fetch alerts:', err);
        } finally {
            setLoading(false);
        }
    };

    const getAlertIcon = (vitalType: string) => {
        switch (vitalType) {
            case 'heart_rate':
                return <Activity className="w-5 h-5" />;
            case 'blood_pressure':
                return <Heart className="w-5 h-5" />;
            default:
                return <AlertCircle className="w-5 h-5" />;
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Critical Health Alerts</h2>
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                        {alerts.length} Active
                    </span>
                </div>
            </div>

            <div className="divide-y divide-gray-200">
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                ) : alerts.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
                        <p>No critical alerts at the moment</p>
                    </div>
                ) : (
                    alerts.slice(0, 5).map((alert) => (
                        <div key={alert.id || alert._id} className="p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1 text-red-600">
                                    {getAlertIcon(alert.type || 'general')}
                                </div>
                                <div className="ml-3 flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="text-sm font-semibold text-gray-900">{alert.userName}</p>
                                        <span className="text-xs text-gray-500">
                                            {new Date(alert.timestamp).toLocaleTimeString()}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-1">
                                        {alert.message}
                                    </p>
                                    <p className="text-xs font-medium text-red-600">
                                        Recommendation: {alert.aiPrediction}
                                    </p>
                                </div>
                                <button className="ml-4 px-3 py-1 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors">
                                    Review
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

// Main Admin Dashboard Component
const AdminDashboard = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [activeView, setActiveView] = useState('dashboard');
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

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'users', label: 'Users', icon: Users },
        { id: 'risk-calculator', label: 'Risk Calculator', icon: Calculator },
        { id: 'alerts', label: 'Critical Alerts', icon: AlertCircle },
        { id: 'orders', label: 'Orders', icon: ShoppingCart },
    ];

    // Handle Risk Calculator Navigation specially if we want it to be a separate page, 
    // OR render it inline. The original plan had it as /admin/risk-calculator.
    // The user's new UI supports views. 
    // If user clicks Risk Calculator, we can navigate or show component.
    // Let's navigate for now to keep the dedicated page we built.
    const handleMenuClick = (id: string) => {
        if (id === 'risk-calculator') {
            navigate('/admin/risk-calculator');
        } else {
            setActiveView(id);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-foreground">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10 w-full">
                <div className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center">
                        {/* <div className="flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-lg mr-3">
              <Heart className="w-6 h-6 text-white" />
            </div> */}
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">PreventVital Admin</h1>
                            <p className="text-xs text-gray-500">Dashboard</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        <div className="flex items-center gap-3">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-semibold text-gray-900">
                                    {user?.name || 'Admin User'}
                                </p>
                                <p className="text-xs text-gray-500 capitalize">{user?.role?.replace('_', ' ') || 'Admin'}</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="text-sm font-medium">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] p-4 hidden md:block">
                    <nav className="space-y-1">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleMenuClick(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeView === item.id
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                                {activeView === item.id && <ChevronRight className="w-4 h-4 ml-auto" />}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
                        </div>
                    ) : (
                        <>
                            {activeView === 'dashboard' && (
                                <>
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
                                        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
                                    </div>
                                    <DashboardStats stats={stats} />
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <CriticalAlerts />
                                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-gray-900">New user registered</p>
                                                        <p className="text-xs text-gray-500">2 minutes ago</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                        <Package className="w-5 h-5 text-blue-600" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-gray-900">Order shipped</p>
                                                        <p className="text-xs text-gray-500">15 minutes ago</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {activeView === 'users' && <UsersList />}

                            {activeView === 'alerts' && (
                                <div className="max-w-4xl">
                                    <div className="mb-6">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Critical Health Alerts</h2>
                                        <p className="text-gray-600">Monitor and respond to critical health events.</p>
                                    </div>
                                    <CriticalAlerts />
                                </div>
                            )}

                            {activeView === 'orders' && (
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                                    <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Orders Management</h3>
                                    <p className="text-gray-600">Order management interface coming soon...</p>
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
