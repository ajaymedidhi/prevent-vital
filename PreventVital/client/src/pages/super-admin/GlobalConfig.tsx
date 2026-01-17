import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { AlertCircle, Activity, Heart, DollarSign } from 'lucide-react';

interface Thresholds {
    systolic: { high: number; low: number };
    diastolic: { high: number; low: number };
    heartRate: { high: number; low: number };
}

const GlobalConfig = () => {
    const { token } = useSelector((state: RootState) => state.auth);
    const [thresholds, setThresholds] = useState<Thresholds>({
        systolic: { high: 140, low: 90 },
        diastolic: { high: 90, low: 60 },
        heartRate: { high: 100, low: 60 }
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchConfig();
    }, []);

    const fetchConfig = async () => {
        try {
            const res = await axios.get('/api/admin/config/who-thresholds', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.data.config.value) {
                setThresholds(res.data.data.config.value);
            }
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.post('/api/admin/config/who-thresholds', {
                value: thresholds
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage('Configuration updated successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setMessage('Error updating configuration.');
        }
    };

    // Helper to safely update nested state
    const handleChange = (category: keyof Thresholds, type: 'high' | 'low', val: string) => {
        setThresholds(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [type]: parseInt(val)
            }
        }));
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-8 max-w-5xl">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Platform Configuration</h2>
                    <p className="text-gray-500">Manage global thresholds and subscription models.</p>
                </div>
                <button onClick={handleUpdate} className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 shadow-md">
                    Save Changes
                </button>
            </div>

            {message && <div className={`p-4 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{message}</div>}

            {/* Subscription & Pricing Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    Subscription & Pricing
                </h2>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-6">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                            <p className="text-sm font-bold text-yellow-800">Critical Configuration</p>
                            <p className="text-xs text-yellow-700 mt-1">Changes to pricing affect all new subscriptions immediately. Existing recurring payments may need manual migration.</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {['Free', 'Silver', 'Gold', 'Platinum'].map(plan => (
                        <div key={plan} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow bg-white">
                            <div className="flex justify-between items-center mb-3">
                                <span className="font-bold text-lg text-gray-800">{plan}</span>
                                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">Active</span>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <label className="text-[10px] uppercase tracking-wide text-gray-500 font-bold block mb-1">Monthly Price (INR)</label>
                                    <div className="relative">
                                        <span className="absolute left-2 top-1.5 text-gray-400 text-xs">₹</span>
                                        <input type="number" className="w-full border border-gray-300 rounded-lg p-1.5 pl-5 text-sm font-medium" defaultValue={plan === 'Free' ? 0 : 999} />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase tracking-wide text-gray-500 font-bold block mb-1">Max Devices</label>
                                    <input type="number" className="w-full border border-gray-300 rounded-lg p-1.5 text-sm" defaultValue={5} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* WHO Thresholds Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-red-500" />
                    WHO Medical Thresholds
                </h3>
                <p className="text-sm text-gray-500 mb-6 pb-4 border-b">Global thresholds for generating automated health alerts.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Systolic */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-gray-700 border-b pb-2">Systolic BP</h4>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">High Threshold (mmHg)</label>
                            <input
                                type="number"
                                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                value={thresholds.systolic.high}
                                onChange={(e) => handleChange('systolic', 'high', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Low Threshold (mmHg)</label>
                            <input
                                type="number"
                                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                value={thresholds.systolic.low}
                                onChange={(e) => handleChange('systolic', 'low', e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Diastolic */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-gray-700 border-b pb-2">Diastolic BP</h4>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">High Threshold (mmHg)</label>
                            <input
                                type="number"
                                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                value={thresholds.diastolic.high}
                                onChange={(e) => handleChange('diastolic', 'high', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Low Threshold (mmHg)</label>
                            <input
                                type="number"
                                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                value={thresholds.diastolic.low}
                                onChange={(e) => handleChange('diastolic', 'low', e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Heart Rate */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-gray-700 border-b pb-2 flex items-center gap-2">
                            Heart Rate
                        </h4>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">High Threshold (bpm)</label>
                            <input
                                type="number"
                                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                value={thresholds.heartRate.high}
                                onChange={(e) => handleChange('heartRate', 'high', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Low Threshold (bpm)</label>
                            <input
                                type="number"
                                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                value={thresholds.heartRate.low}
                                onChange={(e) => handleChange('heartRate', 'low', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GlobalConfig;
