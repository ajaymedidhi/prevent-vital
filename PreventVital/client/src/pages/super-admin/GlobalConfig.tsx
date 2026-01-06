import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

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
        <div className="max-w-4xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Global Configuration</h2>
                <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Save Changes
                </button>
            </div>

            {message && <div className={`p-4 mb-4 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{message}</div>}

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">WHO Medical Thresholds</h3>
                <p className="text-sm text-gray-500 mb-6">Changing these values will update the risk analysis logic for all users across the platform.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Systolic */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-gray-700 border-b pb-2">Systolic BP</h4>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">High Threshold (mmHg)</label>
                            <input
                                type="number"
                                className="w-full border p-2 rounded"
                                value={thresholds.systolic.high}
                                onChange={(e) => handleChange('systolic', 'high', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Low Threshold (mmHg)</label>
                            <input
                                type="number"
                                className="w-full border p-2 rounded"
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
                                className="w-full border p-2 rounded"
                                value={thresholds.diastolic.high}
                                onChange={(e) => handleChange('diastolic', 'high', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Low Threshold (mmHg)</label>
                            <input
                                type="number"
                                className="w-full border p-2 rounded"
                                value={thresholds.diastolic.low}
                                onChange={(e) => handleChange('diastolic', 'low', e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Heart Rate */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-gray-700 border-b pb-2">Heart Rate</h4>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">High Threshold (bpm)</label>
                            <input
                                type="number"
                                className="w-full border p-2 rounded"
                                value={thresholds.heartRate.high}
                                onChange={(e) => handleChange('heartRate', 'high', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Low Threshold (bpm)</label>
                            <input
                                type="number"
                                className="w-full border p-2 rounded"
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
