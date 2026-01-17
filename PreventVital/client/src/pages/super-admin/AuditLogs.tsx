import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Database, Search, Filter, Clock, User, Shield } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const AuditLogs = () => {
    const { token } = useSelector((state: RootState) => state.auth);
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchLogs();
    }, [page]);

    const fetchLogs = async () => {
        try {
            const res = await axios.get(`/api/super-admin/audit-logs?page=${page}&limit=20`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setLogs(res.data.data.logs);
            setTotalPages(res.data.totalPages);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    if (loading) return <div>Loading logs...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">System Audit Logs</h2>
                    <p className="text-gray-500">Track all administrative actions and security events.</p>
                </div>
                {/* <button className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
                    <Filter className="w-4 h-4" /> Filter
                </button> */}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-700 font-medium border-b">
                        <tr>
                            <th className="p-4">Timestamp</th>
                            <th className="p-4">User</th>
                            <th className="p-4">Action</th>
                            <th className="p-4">Resource</th>
                            <th className="p-4">Details</th>
                            <th className="p-4">IP Address</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {logs.map(log => (
                            <tr key={log._id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 text-gray-500 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-3 h-3" />
                                        {new Date(log.timestamp).toLocaleString()}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="font-medium text-gray-900 flex items-center gap-2">
                                        <User className="w-3 h-3 text-gray-400" />
                                        {log.user?.email || 'System'}
                                    </div>
                                    <div className="text-xs text-gray-500 ml-5">{log.user?.role}</div>
                                </td>
                                <td className="p-4">
                                    <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">
                                        {log.action}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-600">{log.resource}</td>
                                <td className="p-4 text-gray-500 font-mono text-xs max-w-xs truncate">
                                    {JSON.stringify(log.details)}
                                </td>
                                <td className="p-4 text-gray-500 text-xs">{log.ip}</td>
                            </tr>
                        ))}
                        {logs.length === 0 && (
                            <tr><td colSpan={6} className="p-8 text-center text-gray-500">No audit logs found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Page {page} of {totalPages}</span>
                <div className="flex gap-2">
                    <button
                        disabled={page <= 1}
                        onClick={() => setPage(p => p - 1)}
                        className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button
                        disabled={page >= totalPages}
                        onClick={() => setPage(p => p + 1)}
                        className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuditLogs;
