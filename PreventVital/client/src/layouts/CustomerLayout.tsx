import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store';
import { Layout, Clock, CreditCard, Building2, ShoppingBag, LogOut, Heart, User, Video, ShieldCheck } from 'lucide-react';
import { RootState } from '../store';

const CustomerLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useSelector((state: RootState) => state.auth);

    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    // Close sidebar on route change on mobile
    React.useEffect(() => {
        setSidebarOpen(false);
    }, [location.pathname]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const isActive = (path: string) => location.pathname.includes(path);

    const navItems = [
        { path: '/account/dashboard', label: 'Overview', icon: Layout },
        { path: '/account/history', label: 'Order History', icon: Clock },
        { path: '/account/billing', label: 'Membership & Billing', icon: CreditCard },
        { path: '/shop', label: 'Shop Store', icon: ShoppingBag },
    ];

    // Add Corporate link if user has corporate profile
    if ((user as any)?.corporateId) {
        navItems.splice(3, 0, { path: '/account/corporate', label: 'Corporate Program', icon: Building2 });
    }

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
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 p-0.5 shadow-lg shadow-teal-900/20">
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
                            <p className="text-[10px] text-teal-400 font-medium mt-1 tracking-wider uppercase flex items-center gap-1">
                                <Heart className="w-3 h-3" /> Member Portal
                            </p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive(item.path)
                                ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/40 font-medium'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <item.icon className={`w-5 h-5 transition-colors ${isActive(item.path) ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
                            <span className="text-sm">{item.label}</span>
                        </Link>
                    ))}

                    <div className="pt-4 mt-4 border-t border-gray-800">
                        <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Health Tools</p>
                        <Link
                            to="/ai-health-assessment"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all duration-200 group"
                        >
                            <ShieldCheck className="w-5 h-5 text-slate-500 group-hover:text-white" />
                            <span className="text-sm">AI Health Check</span>
                        </Link>
                    </div>
                </nav>

                <div className="p-4 border-t border-gray-800 bg-[#0b1120]">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <div className="w-8 h-8 rounded-full bg-teal-900/50 border border-teal-700/50 flex items-center justify-center text-teal-400 text-xs font-bold">
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{user?.name || 'User'}</p>
                            <p className="text-xs text-slate-500 truncate capitalize">{user?.subscription?.plan || 'Free'} Plan</p>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="flex items-center gap-2 text-slate-400 hover:text-red-400 w-full px-2 py-2 transition-colors">
                        <LogOut className="w-4 h-4" />
                        <span className="text-xs font-medium uppercase tracking-wide">Sign Out</span>
                    </button>
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
                            <div className="text-xs md:text-sm text-gray-500 mt-1 hidden md:block">
                                Your personal health dashboard
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4">
                        <div className="flex items-center gap-2 bg-teal-50 px-2 md:px-3 py-1.5 rounded-full border border-teal-100">
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-teal-500 rounded-full animate-pulse"></span>
                            <span className="text-[10px] md:text-xs font-bold text-teal-700 uppercase tracking-wide">{(user as any)?.gamification?.points || 0} XP</span>
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

export default CustomerLayout;
