import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { User } from '../../types/auth'; // Importing shared User type

const UserManagement = () => {
    const { token } = useSelector((state: RootState) => state.auth);
    // Extend User type to allow for potential extra fields from API not in auth slice User type if needed, but usually redundant
    const [users, setUsers] = useState<(User & { _id: string, createdAt: string })[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get('/api/admin/users', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(res.data.data.users);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleSuspend = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
        if (!window.confirm(`Are you sure you want to change status to ${newStatus}?`)) return;

        try {
            await axios.patch(`/api/admin/users/${id}/suspend`, { status: newStatus }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchUsers();
        } catch (err) {
            alert('Error updating user status');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-800">User Management</h2>
                <button className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-lg font-medium hover:bg-blue-100">+ Add User</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-gray-800 font-medium">
                        <tr>
                            <th className="px-6 py-3">User</th>
                            <th className="px-6 py-3">Role</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Joined</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map(user => (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900">{user.name || 'N/A'}</div>
                                    <div className="text-xs text-gray-500">{user.email}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-medium 
                                        ${user.role === 'super_admin' ? 'bg-purple-100 text-purple-700' :
                                            user.role === 'admin' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs 
                                        ${user.status === 'suspended' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                        {user.status || 'active'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-xs">{new Date(user.createdAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleSuspend(user._id, user.status)}
                                        className={`text-xs px-2 py-1 rounded font-medium border ${user.status === 'suspended' ? 'border-green-600 text-green-600 hover:bg-green-50' : 'border-red-400 text-red-500 hover:bg-red-50'}`}
                                    >
                                        {user.status === 'suspended' ? 'Activate' : 'Suspend'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;
