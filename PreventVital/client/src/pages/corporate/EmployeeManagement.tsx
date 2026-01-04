import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Plus, Trash2, Search, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

const EmployeeManagement = () => {
    const { token } = useSelector((state: RootState) => state.auth);
    const [employees, setEmployees] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Invite Form State
    const [inviteOpen, setInviteOpen] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', department: '', employeeId: '', designation: ''
    });

    const fetchEmployees = async () => {
        try {
            const res = await axios.get('/api/corporate/employees', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEmployees(res.data.data);
        } catch (err) {
            console.error("Failed to fetch employees", err);
            toast.error("Failed to load employees");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchEmployees();
    }, [token]);

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('/api/corporate/employees/invite', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Employee invited successfully");
            setInviteOpen(false);
            setFormData({ firstName: '', lastName: '', email: '', department: '', employeeId: '', designation: '' });
            fetchEmployees(); // Refresh list
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to invite employee");
        }
    };

    const handleRemove = async (id: string) => {
        if (!confirm("Are you sure you want to remove this employee?")) return;
        try {
            await axios.delete(`/api/corporate/employees/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Employee removed");
            fetchEmployees();
        } catch (err) {
            toast.error("Failed to remove employee");
        }
    };

    return (
        <div className="p-6 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Employee Management</h1>
                    <p className="text-gray-500">Manage access and view employee status.</p>
                </div>

                <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
                    <DialogTrigger asChild>
                        <Button className="flex items-center gap-2">
                            <UserPlus size={16} /> Invite Employee
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Invite New Employee</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleInvite} className="space-y-4 mt-4">
                            <div className="grid grid-cols-2 gap-4">
                                <Input placeholder="First Name" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} required />
                                <Input placeholder="Last Name" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} required />
                            </div>
                            <Input placeholder="Email Address" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                            <div className="grid grid-cols-2 gap-4">
                                <Input placeholder="Employee ID" value={formData.employeeId} onChange={e => setFormData({ ...formData, employeeId: e.target.value })} required />
                                <Input placeholder="Department" value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} required />
                            </div>
                            <Input placeholder="Designation" value={formData.designation} onChange={e => setFormData({ ...formData, designation: e.target.value })} required />
                            <div className="flex justify-end pt-4">
                                <Button type="submit">Send Invite</Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center">Loading...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Employee</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Dept / ID</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Risk Data</th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {employees.map((emp) => (
                                    <tr key={emp._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{emp.profile?.firstName} {emp.profile?.lastName}</div>
                                            <div className="text-xs text-gray-500">{emp.email}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900">{emp.corporateProfile?.department || '-'}</div>
                                            <div className="text-xs text-gray-500">{emp.corporateProfile?.employeeId || '-'}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${emp.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                                {emp.status || 'Active'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {/* Privacy Masking if needed, or simple status */}
                                            <span className="text-sm text-gray-500">
                                                {emp.healthProfile?.totalCholesterol ? 'Available' : 'Pending'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleRemove(emp._id)}
                                                className="text-gray-400 hover:text-red-600 transition-colors p-1"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {employees.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                            No employees found. Invite your first employee above.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeeManagement;
