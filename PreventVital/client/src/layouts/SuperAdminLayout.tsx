import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store';
import PermissionGuard from '../components/PermissionGuard';
import { PERMISSIONS } from '../config/rbacConfig';

const SuperAdminLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div className="flex min-h-screen bg-gray-100 font-sans text-gray-900">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col">
                <div className="p-6 border-b border-slate-800">
                    <h1 className="text-xl font-bold tracking-wider text-blue-400">PREVENT VITAL</h1>
                    <p className="text-xs text-slate-400 mt-1">Super Admin Console</p>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2">
                    <Link to="/super-admin/dashboard" className="block px-4 py-3 rounded-lg hover:bg-slate-800 transition">Dashboard</Link>

                    <PermissionGuard permission={PERMISSIONS.MANAGE_PROGRAMS}>
                        <Link to="/super-admin/start-program" className="block px-4 py-3 rounded-lg hover:bg-slate-800 transition">Start New Program</Link>
                    </PermissionGuard>

                    <PermissionGuard permission={PERMISSIONS.MANAGE_USERS}>
                        <Link to="/super-admin/users" className="block px-4 py-3 rounded-lg hover:bg-slate-800 transition">User Management</Link>
                    </PermissionGuard>

                    <PermissionGuard permission={PERMISSIONS.MANAGE_PLATFORM}>
                        <Link to="/super-admin/config" className="block px-4 py-3 rounded-lg hover:bg-slate-800 transition">Global Config</Link>
                    </PermissionGuard>

                    <PermissionGuard permission={PERMISSIONS.MANAGE_PROGRAMS}>
                        <Link to="/super-admin/approvals" className="block px-4 py-3 rounded-lg hover:bg-slate-800 transition">Approvals</Link>
                    </PermissionGuard>
                </nav>
                <div className="p-4 border-t border-slate-800">
                    <button onClick={handleLogout} className="w-full py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition">
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="bg-white shadow-sm p-6 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">Overview</h2>
                    <div className="text-sm text-gray-500">Welcome, Super Admin</div>
                </header>
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default SuperAdminLayout;
