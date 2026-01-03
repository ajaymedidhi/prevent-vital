import React, { useState } from 'react';
import PricingTable from '@/features/subscription/PricingTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const CustomerDashboard = () => {
    // Mock user subscription data - assume fetched from context/API
    const user = {
        name: 'John Doe',
        subscription: {
            planId: 'free',
            status: 'active',
            currentPeriodEnd: null
        }
    };

    const [activeTab, setActiveTab] = useState<'billing' | 'history'>('billing');

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8">My Account</h1>

            <div className="flex space-x-4 mb-8 border-b">
                <button
                    onClick={() => setActiveTab('billing')}
                    className={`pb-2 px-4 ${activeTab === 'billing' ? 'border-b-2 border-primary font-bold' : 'text-muted-foreground'}`}
                >
                    Manage Billing
                </button>
                <button
                    onClick={() => setActiveTab('history')}
                    className={`pb-2 px-4 ${activeTab === 'history' ? 'border-b-2 border-primary font-bold' : 'text-muted-foreground'}`}
                >
                    Order History
                </button>
            </div>

            {activeTab === 'billing' && (
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Current Plan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4">
                                <span className="text-2xl font-bold capitalize">{user.subscription.planId} Plan</span>
                                <Badge className={user.subscription.status === 'active' ? 'bg-green-500' : 'bg-red-500'}>
                                    {user.subscription.status}
                                </Badge>
                            </div>
                            {user.subscription.planId === 'free' && (
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

            {activeTab === 'history' && (
                <Card>
                    <CardHeader>
                        <CardTitle>Order History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Mock Order History Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b text-left">
                                        <th className="py-2">Order ID</th>
                                        <th className="py-2">Date</th>
                                        <th className="py-2">Items</th>
                                        <th className="py-2">Total</th>
                                        <th className="py-2">Status</th>
                                        <th className="py-2">Invoice</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b">
                                        <td className="py-4">#ORD-123456</td>
                                        <td>2024-05-15</td>
                                        <td>Heart Rate Monitor Pro</td>
                                        <td>₹4,999</td>
                                        <td><Badge variant="outline" className="text-green-600 border-green-600">Delivered</Badge></td>
                                        <td><a href="#" className="text-blue-600 hover:underline">Download</a></td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-4">#ORD-789012</td>
                                        <td>2024-04-10</td>
                                        <td>VitalWatch Series 5</td>
                                        <td>₹29,999</td>
                                        <td><Badge variant="outline" className="text-green-600 border-green-600">Delivered</Badge></td>
                                        <td><a href="#" className="text-blue-600 hover:underline">Download</a></td>
                                    </tr>
                                </tbody>
                            </table>
                            {/* In a real app, map through fetched orders */}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default CustomerDashboard;
