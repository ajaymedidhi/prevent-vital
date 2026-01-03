import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store';

const CreatorLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
            {/* Sidebar */}
            <aside className="w-64 bg-purple-900 text-white flex flex-col">
                <div className="p-6 border-b border-purple-800">
                    <h1 className="text-xl font-bold tracking-wider text-purple-200">CREATOR STUDIO</h1>
                    <p className="text-xs text-purple-300 mt-1">PreventVital Partner</p>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2">
                    <Link to="/creator/dashboard" className="block px-4 py-3 rounded-lg hover:bg-purple-800 transition">Dashboard</Link>
                    <Link to="/creator/programs" className="block px-4 py-3 rounded-lg hover:bg-purple-800 transition">My Programs</Link>
                    <Link to="/creator/programs/new" className="block px-4 py-3 rounded-lg hover:bg-purple-800 transition">Create Program</Link>
                    <Link to="/creator/earnings" className="block px-4 py-3 rounded-lg hover:bg-purple-800 transition">Earnings</Link>
                </nav>
                <div className="p-4 border-t border-purple-800">
                    <button onClick={handleLogout} className="w-full py-2 bg-red-500 hover:bg-red-600 rounded-lg text-sm font-medium transition">
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto w-full">
                <Outlet />
            </main>
        </div>
    );
};

export default CreatorLayout;
