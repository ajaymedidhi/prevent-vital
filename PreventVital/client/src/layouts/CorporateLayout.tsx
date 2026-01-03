import React from 'react';
import { Outlet } from 'react-router-dom';

const CorporateLayout = () => {
    return (
        <div className="flex h-screen bg-gray-50">
            <aside className="w-64 bg-white border-r border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-6">Corporate Portal</h2>
                <nav className="space-y-1">
                    <a className="block px-3 py-2 bg-blue-50 text-blue-700 rounded-md font-medium">Dashboard</a>
                    <a className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md">Employees</a>
                    <a className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md">Reports</a>
                </nav>
            </aside>
            <main className="flex-1 p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default CorporateLayout;
