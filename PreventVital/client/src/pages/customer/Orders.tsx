import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const CustomerOrders = () => {
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
            <p className="text-gray-500">Loading your history...</p>
        </div>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
            </div>
            <Card className="border-none shadow-sm border border-gray-100">
                <CardContent className="p-0">
                    {orders.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50/50">
                            <p className="text-gray-500 mb-2">No orders found.</p>
                            <p className="text-sm text-gray-400">Visit our shop to start your health journey.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50/50">
                                    <tr className="border-b border-gray-100 text-left text-xs uppercase text-gray-500 font-semibold tracking-wider">
                                        <th className="py-4 px-6">Order ID</th>
                                        <th className="py-4 px-6">Date</th>
                                        <th className="py-4 px-6">Items</th>
                                        <th className="py-4 px-6 text-right">Total</th>
                                        <th className="py-4 px-6 text-center">Status</th>
                                        <th className="py-4 px-6 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {orders.map((order) => (
                                        <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="py-4 px-6 font-medium text-teal-900">
                                                {order.orderId || order._id.substr(-6).toUpperCase()}
                                            </td>
                                            <td className="py-4 px-6 text-sm text-gray-500">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="space-y-1">
                                                    {order.items.map((item: any, idx: number) => (
                                                        <div key={idx} className="text-sm font-medium text-gray-700">
                                                            {item.quantity}x {item.productName || item.name || 'Product'}
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-right font-bold text-gray-900">₹{(order.pricing?.total || order.totalAmount || 0).toLocaleString()}</td>
                                            <td className="py-4 px-6 text-center">
                                                <Badge variant="outline" className={`capitalize px-3 py-1 border-0 ${order.orderStatus === 'delivered' ? 'bg-green-100 text-green-700' :
                                                        order.orderStatus === 'shipped' ? 'bg-blue-100 text-blue-700' :
                                                            'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {order.orderStatus || order.status || 'Processing'}
                                                </Badge>
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                {order.invoiceUrl ? (
                                                    <a href={order.invoiceUrl} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-800 font-medium text-sm hover:underline">
                                                        View Invoice
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
        </div>
    );
};

export default CustomerOrders;
