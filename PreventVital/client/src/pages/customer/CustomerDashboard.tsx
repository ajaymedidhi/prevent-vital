import React, { useState } from 'react';
import axios from 'axios';
import PricingTable from '@/features/subscription/PricingTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { Building2, HeartPulse, GraduationCap, LogOut } from 'lucide-react';
import { logout } from '../../store';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../../store'; // Direct import

const CustomerDashboard = () => {
    // Get real user from Redux
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const [activeTab, setActiveTab] = useState<'overview' | 'corporate' | 'billing' | 'history'>(
        (user as any)?.corporateId ? 'corporate' : 'overview'
    );

    // Sync Profile on Mount (Fix for stale subscription)
    React.useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const res = await axios.get('/api/auth/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (res.data.data.user) {
                    dispatch(setCredentials({ user: res.data.data.user, token }));
                }
            } catch (err) {
                console.error("Failed to sync profile", err);
            }
        };
        fetchProfile();
    }, [dispatch]);

    return (
        <div className="container mx-auto py-10 px-4">
            {/* HEADER & QUICK ACTIONS */}
            <div className="bg-gradient-to-r from-indigo-900 to-indigo-700 text-white rounded-2xl p-8 mb-8 shadow-xl">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name?.split(' ')[0] || 'Member'}!</h1>
                        <p className="text-indigo-100 opacity-90">Your health journey is on track. You have <span className="font-bold text-white">{(user as any)?.gamification?.points || 0} Points</span> available.</p>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => navigate('/shop')} className="bg-white text-indigo-900 px-6 py-2.5 rounded-lg font-bold hover:bg-indigo-50 transition-colors shadow-sm">
                            Shop Store
                        </button>
                        <button onClick={() => navigate('/')} className="bg-white text-indigo-900 px-6 py-2.5 rounded-lg font-bold hover:bg-indigo-50 transition-colors shadow-sm">
                            Back into Website
                        </button>
                        <button onClick={() => navigate('/ai-health-assessment')} className="bg-indigo-600 bg-opacity-30 border border-indigo-400 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-opacity-40 transition-all backdrop-blur-sm">
                            Health Check
                        </button>
                    </div>
                </div>
            </div>

            {/* TABS NAVIGATION */}
            <div className="flex space-x-1 mb-6 border-b border-gray-200 overflow-x-auto">
                {['overview', 'history', 'billing'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`pb-3 px-6 text-sm font-medium transition-all relative ${activeTab === tab
                            ? 'text-indigo-600'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        {activeTab === tab && (
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-t-full" />
                        )}
                    </button>
                ))}
                {(user as any)?.corporateId && (
                    <button
                        onClick={() => setActiveTab('corporate')}
                        className={`pb-3 px-6 text-sm font-medium transition-all relative ${activeTab === 'corporate' ? 'text-indigo-600' : 'text-gray-500'}`}
                    >
                        Corporate
                        {activeTab === 'corporate' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-t-full" />}
                    </button>
                )}
            </div>

            {/* DASHBOARD CONTENT AREA */}
            <div className="min-h-[400px]">
                {/* OVERVIEW TAB */}
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
                        <Card className="border-none shadow-md overflow-hidden">
                            <CardHeader className="bg-blue-50 border-b border-blue-100 pb-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <HeartPulse className="text-blue-600" size={20} />
                                        <CardTitle className="text-blue-900">Health Vitals</CardTitle>
                                    </div>
                                    <span className="text-xs font-medium bg-white text-blue-600 px-2 py-1 rounded-full border border-blue-200">Live</span>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-5">
                                    {(user as any)?.latestVitals ? (
                                        <>
                                            <div className="flex justify-between items-center">
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-gray-500">Blood Pressure</span>
                                                    <span className="text-xl font-bold text-gray-800">{(user as any).latestVitals.bloodPressure?.systolic}/{(user as any).latestVitals.bloodPressure?.diastolic} <span className="text-sm font-normal text-gray-400">mmHg</span></span>
                                                </div>
                                                <div className={`h-2 w-2 rounded-full ${(user as any).latestVitals.bloodPressure?.systolic < 120 ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-gray-500">Heart Rate</span>
                                                    <span className="text-xl font-bold text-gray-800">{(user as any).latestVitals.heartRate} <span className="text-sm font-normal text-gray-400">bpm</span></span>
                                                </div>
                                                <HeartPulse size={16} className="text-red-500 animate-pulse" />
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-gray-500">SpO2</span>
                                                    <span className="text-xl font-bold text-gray-800">{(user as any).latestVitals.spo2}%</span>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center py-8">
                                            <p className="text-gray-400 mb-4">No vital data synced yet.</p>
                                            <Button variant="outline" size="sm">Connect Wearable</Button>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-md">
                            <CardHeader className="bg-yellow-50 border-b border-yellow-100 pb-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Badge className="bg-yellow-500 hover:bg-yellow-600"><span className="text-xs">Level {(user as any)?.gamification?.level || 1}</span></Badge>
                                        <CardTitle className="text-yellow-900">Your Progress</CardTitle>
                                    </div>
                                    <span className="text-yellow-700 font-bold">{(user as any)?.gamification?.points || 0} XP</span>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between text-sm mb-2 text-gray-600">
                                            <span>Daily Goal</span>
                                            <span>75%</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-3">
                                            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full shadow-sm" style={{ width: '75%' }}></div>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-xl p-4 flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-500">Current Streak</p>
                                            <p className="text-2xl font-bold text-gray-800">{(user as any)?.gamification?.streaks?.current || 0} <span className="text-sm font-normal text-gray-400">Days</span></p>
                                        </div>
                                        <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                                            🔥
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* CORPORATE CENTER TAB */}
                {activeTab === 'corporate' && (
                    <div className="space-y-6 animate-in fade-in">
                        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 flex items-start gap-4">
                            <div className="p-3 bg-indigo-100 rounded-lg text-indigo-700">
                                <Building2 size={24} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-indigo-900">Corporate Wellness Program</h2>
                                <p className="text-indigo-700 text-sm mt-1">
                                    You are enrolled via <strong>{(user as any)?.corporateProfile?.department || 'Your Company'}</strong>.
                                    Employee ID: {(user as any)?.corporateProfile?.employeeId}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-red-500">
                                <CardContent className="p-6 flex items-center gap-4">
                                    <div className="p-3 bg-red-50 text-red-600 rounded-full"><HeartPulse size={24} /></div>
                                    <div>
                                        <h3 className="font-bold text-lg">Health Assessment</h3>
                                        <p className="text-sm text-gray-500">Complete your quarterly check</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-blue-500">
                                <CardContent className="p-6 flex items-center gap-4">
                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-full"><GraduationCap size={24} /></div>
                                    <div>
                                        <h3 className="font-bold text-lg">Wellness Programs</h3>
                                        <p className="text-sm text-gray-500">2 courses available</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}

                {/* BILLING TAB */}
                {activeTab === 'billing' && (
                    <div className="space-y-8 animate-in fade-in">
                        <Card>
                            <CardHeader>
                                <CardTitle>Membership Status</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-4">
                                    <span className="text-2xl font-bold capitalize">{(user as any)?.subscription?.plan || 'Free'} Plan</span>
                                    <Badge className={(user as any)?.subscription?.status === 'active' ? 'bg-green-500' : 'bg-red-500'}>
                                        {(user as any)?.subscription?.status || 'inactive'}
                                    </Badge>
                                </div>
                                {(user as any)?.subscription?.plan === 'free' && (
                                    <p className="text-muted-foreground mt-2">Upgrade to PreventVital Premium for advanced AI insights.</p>
                                )}
                            </CardContent>
                        </Card>

                        <div>
                            <h2 className="text-xl font-bold mb-4">Available Plans</h2>
                            <PricingTable />
                        </div>
                    </div>
                )}

                {/* HISTORY TAB */}
                {activeTab === 'history' && (
                    <OrderHistoryTab />
                )}
            </div>
        </div>
    );
};

// ... OrderHistoryTab component stays mostly same but styling can be cleaner ...
const OrderHistoryTab = () => {
    const [orders, setOrders] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('/api/shop/orders/my', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setOrders(res.data.data.orders);
            } catch (err) {
                console.error("Failed to fetch orders", err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-12 space-y-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <p className="text-gray-500">Loading your history...</p>
        </div>
    );

    return (
        <Card className="border-none shadow-md">
            <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
                {orders.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500 mb-2">No orders found.</p>
                        <p className="text-sm text-gray-400">Visit our shop to start your health journey.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b text-left text-xs uppercase text-gray-500 font-semibold tracking-wider">
                                    <th className="py-3 px-4">Order ID</th>
                                    <th className="py-3 px-4">Date</th>
                                    <th className="py-3 px-4">Items</th>
                                    <th className="py-3 px-4 text-right">Total</th>
                                    <th className="py-3 px-4 text-center">Status</th>
                                    <th className="py-3 px-4 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {orders.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-4 font-medium text-indigo-900 border-l-4 border-transparent hover:border-indigo-500 transition-all">
                                            {order.orderId || order._id.substr(-6).toUpperCase()}
                                        </td>
                                        <td className="py-4 px-4 text-sm text-gray-500">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="space-y-1">
                                                {order.items.map((item: any, idx: number) => (
                                                    <div key={idx} className="text-sm font-medium text-gray-700">
                                                        {item.quantity}x {item.productName || item.name || 'Product'}
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-right font-bold text-gray-900">₹{(order.pricing?.total || order.totalAmount || 0).toLocaleString()}</td>
                                        <td className="py-4 px-4 text-center">
                                            <Badge variant={order.orderStatus === 'delivered' ? 'default' : 'secondary'} className={`capitalize px-3 py-1 ${order.orderStatus === 'placed' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : ''}`}>
                                                {order.orderStatus || order.status}
                                            </Badge>
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            {order.invoiceUrl ? (
                                                <a href={order.invoiceUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-medium text-sm underline decoration-indigo-200 hover:decoration-indigo-800 transition-all">
                                                    Invoice
                                                </a>
                                            ) : (
                                                <span className="text-gray-300 text-xs">Processing</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default CustomerDashboard;
