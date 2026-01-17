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

    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    // Close sidebar on route change on mobile
    React.useEffect(() => {
        setSidebarOpen(false);
    }, [location.pathname]);

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                w-64 bg-[#0F172A] text-white flex flex-col fixed h-full z-30 shadow-xl transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
            `}>
                <div className="p-6 border-b border-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-blue-900/20">
                            <div className="w-full h-full bg-[#0F172A] rounded-[10px] flex items-center justify-center overflow-hidden">
                                <img
                                    src="/images/logo-new.png"
                                    alt="PreventVital Logo"
                                    className="w-8 h-8 object-contain"
                                />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold tracking-tight text-white leading-none">
                                PREVENT VITAL
                            </h1>
                            <p className="text-[10px] text-blue-400 font-medium mt-1 tracking-wider uppercase">Super Admin</p>
                        </div>
                    </div>
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
            <main className="flex-1 md:ml-64 overflow-y-auto min-h-screen flex flex-col">
                {/* Top Header */}
                <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 md:py-5 flex justify-between items-center sticky top-0 z-10 shadow-sm">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleSidebar}
                            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                                {navItems.find(i => isActive(i.path))?.label || 'Overview'}
                            </h2>
                            <div className="text-sm text-gray-500 mt-1 hidden md:block">Welcome back, Super Admin</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4">
                        <div className="flex items-center gap-2 bg-green-50 px-2 md:px-3 py-1.5 rounded-full border border-green-100">
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-[10px] md:text-xs font-bold text-green-700 uppercase tracking-wide">System Healthy</span>
                        </div>
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-100 rounded-full border border-gray-200 shadow-inner flex items-center justify-center font-bold text-slate-600 text-sm md:text-base">
                            SA
                        </div>
                    </div>
                </header>
                <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default SuperAdminLayout;
