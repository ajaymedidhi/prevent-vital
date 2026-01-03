import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Simple component to simulate region switching for demonstration/testing
// In a real app, this would be determined by IP and not switchable by user easily
const RegionBanner = () => {
    const [region, setRegion] = useState('US');

    useEffect(() => {
        // Set default header for axios for all subsequent requests
        axios.defaults.headers.common['x-user-region'] = region;
    }, [region]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRegion(e.target.value);
        window.location.reload(); // Reload to refresh data with new region
    };

    return (
        <div className="bg-slate-900 text-white text-xs py-2 px-4 flex justify-between items-center">
            <span>
                <span className="font-bold text-yellow-400 mr-2">DEMO MODE:</span>
                Simulating User Region: <span className="font-mono">{region}</span>
            </span>
            <div className="flex items-center space-x-2">
                <label>Switch Region:</label>
                <select
                    value={region}
                    onChange={handleChange}
                    className="bg-slate-800 border border-slate-700 rounded px-2 py-1 outline-none text-white"
                >
                    <option value="US">North America (US)</option>
                    <option value="IN">India (IN)</option>
                    <option value="EU">Europe (EU)</option>
                </select>
            </div>
        </div>
    );
};

export default RegionBanner;
