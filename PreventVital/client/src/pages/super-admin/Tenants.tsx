import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Search, Building } from 'lucide-react';

const TenantsPage = () => {
    const [tenants, setTenants] = useState<any[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [formData, setFormData] = useState({ name: '', adminEmail: '', domain: '', plan: 'standard' });

    useEffect(() => {
        fetchTenants();
    }, []);

    const fetchTenants = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('/api/super-admin/tenants', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTenants(res.data.data.tenants || []);
        } catch (error) {
            console.error('Fetch tenants error:', error);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('/api/super-admin/tenants', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setIsCreating(false);
            setFormData({ name: '', adminEmail: '', domain: '', plan: 'standard' });
            fetchTenants();
        } catch (error: any) {
            alert('Failed to create tenant: ' + error.message);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Corporate Tenants</h2>
                    <p className="text-gray-500">Manage white-label clients and their subscriptions.</p>
                </div>
                <button
                    onClick={() => setIsCreating(true)}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition shadow-md"
                >
                    <Plus className="w-4 h-4" />
                    New Tenant
                </button>
            </div>

            {isCreating && (
                <div className="mb-8 bg-white p-6 rounded-lg border border-indigo-100 shadow-sm animate-in fade-in slide-in-from-top-4">
                    <h3 className="font-bold mb-4 text-indigo-900">Onboard New Tenant</h3>
                    <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <input
                            placeholder="Company Name"
                            className="p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                        <input
                            placeholder="Admin Email"
                            type="email"
                            className="p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={formData.adminEmail}
                            onChange={e => setFormData({ ...formData, adminEmail: e.target.value })}
                            required
                        />
                        <input
                            placeholder="Domain (e.g. corp.com)"
                            className="p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={formData.domain}
                            onChange={e => setFormData({ ...formData, domain: e.target.value })}
                        />
                        <select
                            className="p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={formData.plan}
                            onChange={e => setFormData({ ...formData, plan: e.target.value })}
                        >
                            <option value="standard">Standard Plan</option>
                            <option value="premium">Premium Plan</option>
                            <option value="enterprise">Enterprise Plan</option>
                        </select>
                        <div className="col-span-full flex justify-end gap-2 mt-2">
                            <button type="button" onClick={() => setIsCreating(false)} className="text-gray-500 px-4 hover:text-gray-700">Cancel</button>
                            <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">Create Tenant</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="p-4">Company</th>
                            <th className="p-4">Admin</th>
                            <th className="p-4">Plan</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {tenants.map(t => (
                            <tr key={t._id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4">
                                    <div className="font-medium text-gray-900">{t.name}</div>
                                    <div className="text-xs text-gray-500">{t.domain}</div>
                                </td>
                                <td className="p-4 text-sm text-gray-600">{t.adminEmail}</td>
                                <td className="p-4"><span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full uppercase font-bold">{t.subscriptionPlan}</span></td>
                                <td className="p-4"><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full uppercase font-bold">{t.status}</span></td>
                                <td className="p-4 text-right">
                                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Manage</button>
                                </td>
                            </tr>
                        ))}
                        {tenants.length === 0 && (
                            <tr><td colSpan={5} className="p-8 text-center text-gray-500">No active tenants found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TenantsPage;
