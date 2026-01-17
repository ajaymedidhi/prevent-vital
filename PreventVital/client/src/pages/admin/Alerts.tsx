import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AlertCircle, Activity, Heart, CheckCircle } from 'lucide-react';

const AdminAlerts = () => {
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
            case 'heart_rate': return <Activity className="w-5 h-5" />;
            case 'blood_pressure': return <Heart className="w-5 h-5" />;
            default: return <AlertCircle className="w-5 h-5" />;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Critical Health Alerts</h2>
                    <p className="text-gray-500">Real-time monitoring of patient vitals anomalies.</p>
                </div>
                <div className="bg-red-50 text-red-700 px-4 py-2 rounded-lg font-bold border border-red-100 flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
                    {alerts.length} Active Alerts
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-gray-500">Loading alerts...</div>
                ) : alerts.length === 0 ? (
                    <div className="p-12 text-center">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-gray-900">All Clear</h3>
                        <p className="text-gray-500">No critical alerts detected in the system.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {alerts.map((alert) => (
                            <div key={alert.id || alert._id} className="p-6 hover:bg-red-50/30 transition-colors flex items-start gap-4">
                                <div className="p-3 bg-red-100 text-red-600 rounded-full flex-shrink-0">
                                    {getAlertIcon(alert.type)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-lg">{alert.userName}</h3>
                                            <p className="text-sm text-gray-500">{new Date(alert.timestamp).toLocaleString()}</p>
                                        </div>
                                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                            {alert.severity}
                                        </span>
                                    </div>
                                    <div className="mt-3 p-3 bg-white border border-red-100 rounded-lg shadow-sm">
                                        <p className="font-medium text-gray-800">{alert.message}</p>
                                        <div className="mt-2 flex items-center gap-2 text-sm text-red-600 font-medium">
                                            <Activity className="w-4 h-4" /> AI Insight: {alert.aiPrediction}
                                        </div>
                                    </div>
                                </div>
                                <button className="self-center px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 shadow-md">
                                    Open Case
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminAlerts;
