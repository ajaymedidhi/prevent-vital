import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const CreatorDashboard = () => {
    const { token } = useSelector((state: RootState) => state.auth);
    const [earnings, setEarnings] = useState<any>({ total: 0, thisMonth: 0, pendingPayout: 0 });

    useEffect(() => {
        axios.get('http://localhost:3000/api/creator/earnings', {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setEarnings(res.data.data.earnings))
            .catch(console.error);
    }, [token]);

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Creator Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Total Earnings</h3>
                    <p className="text-3xl font-bold text-gray-800 mt-2">₹{earnings.total}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">This Month</h3>
                    <p className="text-3xl font-bold text-green-600 mt-2">₹{earnings.thisMonth}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Pending Payout</h3>
                    <p className="text-3xl font-bold text-amber-500 mt-2">₹{earnings.pendingPayout}</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
                <p className="text-gray-500">No recent activity to display.</p>
            </div>
        </div>
    );
};

export default CreatorDashboard;
