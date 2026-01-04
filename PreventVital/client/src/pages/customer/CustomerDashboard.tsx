import React, { useState } from 'react';
import axios from 'axios';
import PricingTable from '@/features/subscription/PricingTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Building2, HeartPulse, GraduationCap } from 'lucide-react';

const CustomerDashboard = () => {
    // Get real user from Redux
    const { user } = useSelector((state: RootState) => state.auth);

    // Mock subscription if not in user object (fallback)
    const subscription = (user as any)?.subscription || { plan: 'free', status: 'active' };
    const corporateData = (user as any)?.corporateProfile;

    const [activeTab, setActiveTab] = useState<'overview' | 'corporate' | 'billing' | 'history'>(
        (user as any)?.corporateId ? 'corporate' : 'overview'
    );

    return (
        <div className="container mx-auto py-10 px-4">
            <header className="mb-8">
                <h1 className="text-3xl font-bold">Welcome, {user?.name || (user as any)?.profile?.firstName || 'User'}</h1>
                <p className="text-gray-500">Manage your health journey and account.</p>
            </header>

            <div className="flex space-x-2 mb-8 border-b overflow-x-auto">
                <button
                    onClick={() => setActiveTab('overview')}
                    className={`pb-2 px-4 whitespace-nowrap ${activeTab === 'overview' ? 'border-b-2 border-indigo-600 font-bold text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Overview
                </button>
                {(user as any)?.corporateId && (
                    <button
                        onClick={() => setActiveTab('corporate')}
                        className={`pb-2 px-4 whitespace-nowrap ${activeTab === 'corporate' ? 'border-b-2 border-indigo-600 font-bold text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Corporate Center
                    </button>
                )}
                <button
                    onClick={() => setActiveTab('billing')}
                    className={`pb-2 px-4 whitespace-nowrap ${activeTab === 'billing' ? 'border-b-2 border-indigo-600 font-bold text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Membership
                </button>
                <button
                    onClick={() => setActiveTab('history')}
                    className={`pb-2 px-4 whitespace-nowrap ${activeTab === 'history' ? 'border-b-2 border-indigo-600 font-bold text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Order History
                </button>
            </div>

            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader><CardTitle>My Vitals</CardTitle></CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {(user as any)?.latestVitals ? (
                                    <>
                                        <div className="flex justify-between items-center pb-2 border-b">
                                            <span className="text-gray-600">Blood Pressure</span>
                                            <span className="font-bold">
                                                {(user as any).latestVitals.bloodPressure?.systolic}/{(user as any).latestVitals.bloodPressure?.diastolic} mmHg
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center pb-2 border-b">
                                            <span className="text-gray-600">Heart Rate</span>
                                            <span className="font-bold">{(user as any).latestVitals.heartRate} bpm</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-2 border-b">
                                            <span className="text-gray-600">SpO2</span>
                                            <span className="font-bold">{(user as any).latestVitals.spo2}%</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Glucose</span>
                                            <span className="font-bold">{(user as any).latestVitals.glucose} mg/dL</span>
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-gray-500">No recent vitals recorded.</p>
                                )}
                                <button className="mt-4 text-sm text-indigo-600 font-medium">Connect Device</button>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle>Daily Goals</CardTitle></CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-1"><span className="text-gray-600">Points</span><span className="font-bold">{(user as any)?.gamification?.points || 0}</span></div>
                                    <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${Math.min(((user as any)?.gamification?.points || 0) / 100, 100)}%` }}></div></div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1"><span className="text-gray-600">Level</span><span className="font-bold">{(user as any)?.gamification?.level || 1}</span></div>
                                </div>
                                <div className="p-3 bg-green-50 rounded-lg text-green-700 text-sm">
                                    Current Streak: <strong>{(user as any)?.gamification?.streaks?.current || 0} days</strong>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* CORPORATE CENTER TAB */}
            {activeTab === 'corporate' && (
                <div className="space-y-6">
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
                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="p-3 bg-red-50 text-red-600 rounded-full"><HeartPulse size={24} /></div>
                                <div>
                                    <h3 className="font-bold text-lg">Health Assessment</h3>
                                    <p className="text-sm text-gray-500">Complete your quarterly check</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-full"><GraduationCap size={24} /></div>
                                <div>
                                    <h3 className="font-bold text-lg">Wellness Educational Programs</h3>
                                    <p className="text-sm text-gray-500">2 courses available</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}

            {/* BILLING TAB */}
            {activeTab === 'billing' && (
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Current Plan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4">
                                <span className="text-2xl font-bold capitalize">{(user as any)?.subscription?.plan || 'Free'} Plan</span>
                                <Badge className={(user as any)?.subscription?.status === 'active' ? 'bg-green-500' : 'bg-red-500'}>
                                    {(user as any)?.subscription?.status || 'inactive'}
                                </Badge>
                            </div>
                            {(user as any)?.subscription?.plan === 'free' && (
                                <p className="text-muted-foreground mt-2">Upgrade to unlock advanced features.</p>
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
    );
};

const OrderHistoryTab = () => {
    const [orders, setOrders] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Determine API URL: Use proxy or relative path
                const res = await axios.get('/api/shop/orders/my', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` // Ensure token is sent
                    }
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

    if (loading) return <div className="p-8 text-center">Loading Data...</div>;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b text-left">
                                <th className="py-2 px-2">Order ID</th>
                                <th className="py-2 px-2">Date</th>
                                <th className="py-2 px-2">Items</th>
                                <th className="py-2 px-2">Total</th>
                                <th className="py-2 px-2">Status</th>
                                <th className="py-2 px-2">Invoice</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-8 text-center text-gray-500">No orders found.</td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order._id} className="border-b hover:bg-gray-50">
                                        <td className="py-4 px-2 font-medium">{order.orderId || order._id.substr(-6).toUpperCase()}</td>
                                        <td className="py-4 px-2 text-sm text-gray-500">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="py-4 px-2">
                                            {order.items.map((item: any, idx: number) => (
                                                <div key={idx} className="text-sm">
                                                    {item.quantity}x {item.productName || item.name || 'Product'}
                                                </div>
                                            ))}
                                        </td>
                                        <td className="py-4 px-2 font-medium">₹{(order.pricing?.total || order.totalAmount || 0).toLocaleString()}</td>
                                        <td className="py-4 px-2">
                                            <Badge variant={order.orderStatus === 'delivered' ? 'default' : 'secondary'} className="capitalize">
                                                {order.orderStatus || order.status}
                                            </Badge>
                                        </td>
                                        <td className="py-4 px-2">
                                            {order.invoiceUrl ? (
                                                <a href={order.invoiceUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline text-sm">
                                                    Download
                                                </a>
                                            ) : (
                                                <span className="text-gray-400 text-xs">-</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
};

export default CustomerDashboard;
