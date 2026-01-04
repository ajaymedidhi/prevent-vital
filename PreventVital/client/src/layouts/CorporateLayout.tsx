import React from 'react';
import { Outlet, Link, useParams, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, FileBarChart, LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '../store';
import { useNavigate } from 'react-router-dom';

const CorporateLayout = () => {
    const { tenantId } = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isActive = (path: string) => location.pathname.includes(path);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center gap-2 text-blue-600 mb-1">
                        <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">PV</div>
                        <span className="font-bold text-lg">Corporate</span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <Link
                        to={`/corporate/${tenantId}/dashboard`}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-colors ${isActive('dashboard') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <LayoutDashboard size={18} />
                        Dashboard
                    </Link>
                    <Link
                        to={`/corporate/${tenantId}/employees`}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-colors ${isActive('employees') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Users size={18} />
                        Employees
                    </Link>
                    <Link
                        to={`/corporate/${tenantId}/reports`}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-colors ${isActive('reports') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <FileBarChart size={18} />
                        Reports
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md w-full transition-colors"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>
            <main className="flex-1 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default CorporateLayout;
