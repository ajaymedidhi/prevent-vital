import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';

const ProgramBuilder = () => {
    const { token } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [modules, setModules] = useState<{ title: string, content: string }[]>([]);

    const addModule = () => {
        setModules([...modules, { title: 'New Module', content: '' }]);
    };

    const updateModule = (index: number, field: string, value: string) => {
        const newModules: any = [...modules];
        newModules[index][field] = value;
        setModules(newModules);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('/api/creator/programs', {
                title,
                price: parseFloat(price),
                description,
                modules
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Program created successfully!');
            navigate('/creator/programs');
        } catch (err) {
            alert('Error creating program');
        }
    };

    return (
        <div className="p-8 max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">Create New Program</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 className="text-lg font-semibold mb-4">Basic Info</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <input className="w-full border p-2 rounded" value={title} onChange={e => setTitle(e.target.value)} required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Price (₹)</label>
                            <input type="number" className="w-full border p-2 rounded" value={price} onChange={e => setPrice(e.target.value)} required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea className="w-full border p-2 rounded h-24" value={description} onChange={e => setDescription(e.target.value)} required />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Course Modules</h3>
                        <button type="button" onClick={addModule} className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded">+ Add Module</button>
                    </div>

                    {modules.map((mod, idx) => (
                        <div key={idx} className="border p-4 rounded-lg mb-4 bg-gray-50">
                            <input
                                className="w-full border p-2 rounded mb-2 font-medium"
                                placeholder="Module Title"
                                value={mod.title}
                                onChange={e => updateModule(idx, 'title', e.target.value)}
                            />
                            <textarea
                                className="w-full border p-2 rounded"
                                placeholder="Content / Video URL"
                                value={mod.content}
                                onChange={e => updateModule(idx, 'content', e.target.value)}
                            />
                        </div>
                    ))}
                </div>

                <button type="submit" className="bg-purple-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-purple-700 w-full">
                    Publish Program
                </button>
            </form>
        </div>
    );
};

export default ProgramBuilder;
