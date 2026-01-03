import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const CorporateDashboard = () => {
    const { token } = useSelector((state: RootState) => state.auth);
    const [stats, setStats] = useState<any>({ employeeCount: 0, wellnessScore: 0 });

    useEffect(() => {
        axios.get('http://localhost:3000/api/corporate/dashboard', {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setStats(res.data.data))
            .catch(console.error);
    }, [token]);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Corporate Wellness Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Registered Employees</h3>
                    <p className="text-3xl font-bold text-blue-600 mt-2">{stats.employeeCount}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Avg. Wellness Score</h3>
                    <p className="text-3xl font-bold text-green-600 mt-2">{stats.wellnessScore}/100</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Engagement Rate</h3>
                    <p className="text-3xl font-bold text-purple-600 mt-2">76%</p>
                </div>
            </div>
        </div>
    );
};

export default CorporateDashboard;
