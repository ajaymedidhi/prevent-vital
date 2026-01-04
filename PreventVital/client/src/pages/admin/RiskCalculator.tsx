import React, { useState } from 'react';
import axios from 'axios';
import { ArrowLeft, Calculator, AlertCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const RiskCalculator = () => {
    const [formData, setFormData] = useState({
        dob: '',
        gender: 'male',
        smoker: false,
        diabetes: false,
        systolic: '',
        diastolic: '',
        cholesterol: ''
    });

    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const calculateAge = (dob: string) => {
        const birthDate = new Date(dob);
        const ageDifMs = Date.now() - birthDate.getTime();
        const ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult(null);

        const age = calculateAge(formData.dob);
        if (age < 40 || age > 80) {
            // Note: WHO charts are strictly 40-74 usually, but our backend handles it.
            // Just a frontend warning could be shown, but letting backend handle it.
        }

        try {
            // Construct patient object structure expected by backend
            const payload = {
                patient: {
                    profile: {
                        dateOfBirth: formData.dob,
                        gender: formData.gender
                    },
                    healthProfile: {
                        smoker: formData.smoker,
                        primaryConditions: formData.diabetes ? ['diabetes'] : [],
                        totalCholesterol: formData.cholesterol ? parseInt(formData.cholesterol) : undefined
                    },
                    latestVitals: {
                        bloodPressure: {
                            systolic: parseInt(formData.systolic),
                            diastolic: parseInt(formData.diastolic)
                        }
                    }
                }
            };

            const token = localStorage.getItem('token');
            const res = await axios.post('/api/admin/calculate-risk', payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setResult(res.data.data);
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'Calculation failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <Link to="/admin/dashboard" className="flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Input Form */}
                <div className="md:col-span-1 space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <Calculator className="h-6 w-6 text-primary" />
                            Risk Calculator
                        </h1>
                        <p className="text-muted-foreground text-sm mt-2">WHO India (SEAR-D) Cardiovascular Risk Assessment</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Date of Birth</label>
                            <input
                                type="date"
                                required
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                value={formData.dob}
                                onChange={e => setFormData({ ...formData, dob: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Gender</label>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                value={formData.gender}
                                onChange={e => setFormData({ ...formData, gender: e.target.value })}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2 border p-3 rounded-md">
                                <input
                                    type="checkbox"
                                    id="smoker"
                                    checked={formData.smoker}
                                    onChange={e => setFormData({ ...formData, smoker: e.target.checked })}
                                />
                                <label htmlFor="smoker" className="text-sm font-medium cursor-pointer">Smoker</label>
                            </div>
                            <div className="flex items-center space-x-2 border p-3 rounded-md">
                                <input
                                    type="checkbox"
                                    id="diabetes"
                                    checked={formData.diabetes}
                                    onChange={e => setFormData({ ...formData, diabetes: e.target.checked })}
                                />
                                <label htmlFor="diabetes" className="text-sm font-medium cursor-pointer">Diabetes</label>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Systolic BP</label>
                                <input
                                    type="number"
                                    placeholder="120"
                                    required
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    value={formData.systolic}
                                    onChange={e => setFormData({ ...formData, systolic: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Diastolic BP</label>
                                <input
                                    type="number"
                                    placeholder="80"
                                    required
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    value={formData.diastolic}
                                    onChange={e => setFormData({ ...formData, diastolic: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Total Cholesterol (mg/dL)</label>
                            <input
                                type="number"
                                placeholder="Optional"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                value={formData.cholesterol}
                                onChange={e => setFormData({ ...formData, cholesterol: e.target.value })}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-primary-foreground h-10 rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Calculating...' : 'Calculate Risk'}
                        </button>
                    </form>

                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-md text-sm flex items-start gap-2">
                            <AlertCircle className="h-5 w-5 shrink-0" />
                            <p>{error}</p>
                        </div>
                    )}
                </div>

                {/* Results Section */}
                <div className="md:col-span-2 space-y-6">
                    {!result && !loading && !error && (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-12 border-2 border-dashed rounded-xl bg-gray-50/50">
                            <Calculator className="h-12 w-12 mb-4 opacity-20" />
                            <p>Enter patient details to see risk assessment</p>
                        </div>
                    )}

                    {result && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Score Card */}
                            <div className={`p-6 rounded-xl border-l-4 shadow-sm ${result.category === 'very_high' ? 'bg-red-50 border-red-500' :
                                    result.category === 'high' ? 'bg-orange-50 border-orange-500' :
                                        result.category === 'moderate' ? 'bg-yellow-50 border-yellow-500' :
                                            'bg-green-50 border-green-500'
                                }`}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-semibold uppercase tracking-wider text-gray-700">10-Year CVD Risk</h3>
                                        <div className="mt-2 flex items-baseline gap-2">
                                            <span className={`text-4xl font-bold ${result.category === 'very_high' ? 'text-red-700' :
                                                    result.category === 'high' ? 'text-orange-700' :
                                                        result.category === 'moderate' ? 'text-yellow-700' :
                                                            'text-green-700'
                                                }`}>
                                                {result.tenYearRisk}
                                            </span>
                                            <span className="text-muted-foreground">probability</span>
                                        </div>
                                        <p className="mt-2 font-medium">Category: <span className="uppercase">{result.category.replace('_', ' ')}</span></p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-bold text-gray-800">{result.score}/30</div>
                                        <div className="text-xs text-muted-foreground">Risk Score</div>
                                    </div>
                                </div>
                            </div>

                            {/* Warnings */}
                            {result.warnings.length > 0 && (
                                <div className="space-y-3">
                                    <h4 className="font-medium flex items-center gap-2">
                                        <AlertCircle className="h-4 w-4 text-orange-500" />
                                        Important Alerts
                                    </h4>
                                    <ul className="space-y-2">
                                        {result.warnings.map((warn: string, idx: number) => (
                                            <li key={idx} className="text-sm bg-orange-50 text-orange-800 p-3 rounded-md border border-orange-100">
                                                {warn}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Recommendations */}
                            <div className="space-y-4">
                                <h4 className="font-medium flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    Clinical Recommendations
                                </h4>
                                <div className="grid gap-4">
                                    {result.recommendations.map((rec: any, idx: number) => (
                                        <div key={idx} className="bg-white border rounded-lg p-4 shadow-sm">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${rec.priority === 'CRITICAL' ? 'bg-red-100 text-red-700' :
                                                        rec.priority === 'URGENT' ? 'bg-red-100 text-red-700' :
                                                            rec.priority === 'HIGH' ? 'bg-orange-100 text-orange-700' :
                                                                'bg-blue-100 text-blue-700'
                                                    }`}>{rec.priority}</span>
                                                <span className="text-xs text-muted-foreground">{rec.category}</span>
                                            </div>
                                            <p className="font-medium text-gray-900">{rec.action}</p>
                                            <p className="text-sm text-gray-500 mt-1">{rec.rationale}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Disclaimer */}
                            <div className="text-xs text-gray-400 p-4 border-t mt-4">
                                <p className="font-semibold mb-1">MEDICAL DISCLAIMER:</p>
                                <p>{result.disclaimer.primary}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RiskCalculator;
