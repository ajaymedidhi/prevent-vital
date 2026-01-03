import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const EmployeeManagement = () => {
    const { token } = useSelector((state: RootState) => state.auth);
    const [csvText, setCsvText] = useState('');
    const [result, setResult] = useState<any>(null);

    const handleUpload = async () => {
        // Parse CSV simple logic
        const lines = csvText.trim().split('\n');
        const employees = lines.map(line => {
            const [name, email] = line.split(',');
            return { name: name?.trim(), email: email?.trim() };
        }).filter(e => e.email); // Basic filter

        try {
            const res = await axios.post('http://localhost:3000/api/corporate/employees', {
                employees
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setResult(res.data.data);
            setCsvText('');
        } catch (err: any) {
            alert('Upload failed: ' + err.response?.data?.message);
        }
    };

    return (
        <div className="mt-8 max-w-3xl">
            <h2 className="text-xl font-bold mb-4">Manage Employees</h2>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="text-lg font-semibold mb-2">Bulk Upload</h3>
                <p className="text-sm text-gray-500 mb-4">Paste CSV content (Name, Email) to bulk register employees.</p>
                <textarea
                    className="w-full border p-2 rounded h-32 font-mono text-sm"
                    placeholder="John Doe, john@company.com&#10;Jane Smith, jane@company.com"
                    value={csvText}
                    onChange={e => setCsvText(e.target.value)}
                />
                <button
                    onClick={handleUpload}
                    className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                    Upload & Register
                </button>

                {result && (
                    <div className="mt-6 p-4 bg-green-50 text-green-700 rounded-lg">
                        <p className="font-bold">Result:</p>
                        <p>Successfully created: {result.created}</p>
                        {result.errors.length > 0 && (
                            <div className="mt-2 text-red-600 text-sm">
                                <p className="font-semibold">Errors:</p>
                                <ul className="list-disc pl-5">
                                    {result.errors.map((e: string, i: number) => <li key={i}>{e}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeeManagement;
