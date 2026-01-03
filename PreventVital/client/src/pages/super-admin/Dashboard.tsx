import React from 'react';

const Dashboard = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
                <p className="text-3xl font-bold text-gray-800 mt-2">1,245</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-gray-500 text-sm font-medium">Active Subscriptions</h3>
                <p className="text-3xl font-bold text-green-600 mt-2">850</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-gray-500 text-sm font-medium">Pending Approvals</h3>
                <p className="text-3xl font-bold text-amber-500 mt-2">12</p>
            </div>

            {/* Recent Activity or Graphs could go here */}
            <div className="col-span-full bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">System Status</h3>
                <div className="flex space-x-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">API: Operational</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">DB: Connected</span>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
