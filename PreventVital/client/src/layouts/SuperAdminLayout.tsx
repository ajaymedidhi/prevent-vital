import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store';
import PermissionGuard from '../components/PermissionGuard';
import { PERMISSIONS } from '../config/rbacConfig';
import { Layout, Building, FileText, Settings, Users, LogOut, CheckCircle } from 'lucide-react';

const SuperAdminLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const isActive = (path: string) => location.pathname.includes(path);

    const navItems = [
        { path: '/super-admin/dashboard', label: 'Dashboard', icon: Layout },
        { path: '/super-admin/tenants', label: 'Tenants & Corps', icon: Building, permission: null }, // Global access for SA
        { path: '/super-admin/users', label: 'User Management', icon: Users, permission: PERMISSIONS.MANAGE_USERS },
        { path: '/super-admin/start-program', label: 'Medical Programs', icon: FileText, permission: PERMISSIONS.MANAGE_PROGRAMS }, // Remapped from Start New Program
        { path: '/super-admin/approvals', label: 'Approvals', icon: CheckCircle, permission: PERMISSIONS.MANAGE_PROGRAMS },
        { path: '/super-admin/config', label: 'Platform Settings', icon: Settings, permission: PERMISSIONS.MANAGE_PLATFORM },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
            {/* Sidebar */}
            <aside className="w-64 bg-[#0F172A] text-white flex flex-col fixed h-full z-20 shadow-xl">
                <div className="p-6 border-b border-gray-800">
                    <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                        PREVENT VITAL
                    </h1>
                    <p className="text-xs text-slate-400 mt-2 font-medium">Super Admin Console</p>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const link = (
                            <Link
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive(item.path)
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40 font-medium'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 transition-colors ${isActive(item.path) ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
                                <span className="text-sm">{item.label}</span>
                            </Link>
                        );

                        return item.permission ? (
                            <PermissionGuard key={item.path} permission={item.permission}>
                                {link}
                            </PermissionGuard>
                        ) : (
                            <div key={item.path}>{link}</div>
                        );
                    })}
                </nav>
                <div className="p-4 border-t border-gray-800 bg-[#0b1120]">
                    <button onClick={handleLogout} className="flex items-center gap-2 text-slate-400 hover:text-red-400 w-full px-4 py-2 transition-colors">
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm font-medium">Logout System</span>
                    </button>
                    <p className="text-[10px] text-center text-slate-600 mt-4">v2.1.0-PV</p>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 overflow-y-auto">
                {/* Top Header */}
                <header className="bg-white border-b border-gray-200 px-8 py-5 flex justify-between items-center sticky top-0 z-10 shadow-sm">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                            {navItems.find(i => isActive(i.path))?.label || 'Overview'}
                        </h2>
                        <div className="text-sm text-gray-500 mt-1">Welcome back, Super Admin</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-xs font-bold text-green-700 uppercase tracking-wide">System Healthy</span>
                        </div>
                        <div className="w-10 h-10 bg-slate-100 rounded-full border border-gray-200 shadow-inner flex items-center justify-center font-bold text-slate-600">
                            SA
                        </div>
                    </div>
                </header>
                <div className="p-8 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default SuperAdminLayout;
