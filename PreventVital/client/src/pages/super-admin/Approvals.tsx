import React from 'react';

const Approvals = () => {
    return (
        <div className="max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">Pending Approvals</h2>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center py-12">
                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🎉</div>
                <h3 className="text-gray-900 font-medium">All Caught Up!</h3>
                <p className="text-gray-500 mt-1">There are no pending payout requests or program submissions.</p>
            </div>
        </div>
    );
};

export default Approvals;
