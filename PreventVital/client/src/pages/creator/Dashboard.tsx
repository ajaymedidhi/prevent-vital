import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Video, ThumbsUp, Eye, FileText, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CreatorDashboard = () => {
    const { token } = useSelector((state: RootState) => state.auth);
    const [analytics, setAnalytics] = useState<any>({});
    const [content, setContent] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            console.log("Fetching creator dashboard data...");
            try {
                // Add explicit timeout to prevent hanging
                const [analyticsRes, contentRes] = await Promise.all([
                    axios.get('/api/content/analytics', { headers: { Authorization: `Bearer ${token}` }, timeout: 5000 }),
                    axios.get('/api/content/my', { headers: { Authorization: `Bearer ${token}` }, timeout: 5000 })
                ]);

                console.log("Analytics Data:", analyticsRes.data);
                console.log("Content Data:", contentRes.data);

                setAnalytics(analyticsRes.data.data || {});
                setContent(contentRes.data.data || []);
            } catch (err) {
                console.error("Failed to fetch creator data", err);
                // Optionally set mock data or error state here
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchData();
        } else {
            console.warn("No token found in CreatorDashboard, stopping load.");
            setLoading(false);
        }
    }, [token]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Quick Actions Row */}
            <div className="flex justify-end">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md shadow-purple-900/20 border-0">
                    <Plus size={18} className="mr-2" /> CREATE NEW CONTENT
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between mb-4">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-full"><Eye className="w-6 h-6" /></div>
                        <span className="text-green-600 font-bold text-sm bg-green-50 px-2 py-1 rounded-full">+12%</span>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium">Total Views</h3>
                    <div className="mt-1">
                        <p className="text-3xl font-bold text-gray-900">{analytics.totalViews || 0}</p>
                        <p className="text-xs text-gray-400 mt-1">Across all content</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between mb-4">
                        <div className="p-3 bg-pink-100 text-pink-600 rounded-full"><ThumbsUp className="w-6 h-6" /></div>
                        <span className="text-green-600 font-bold text-sm bg-green-50 px-2 py-1 rounded-full">+5%</span>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium">Total Likes</h3>
                    <div className="mt-1">
                        <p className="text-3xl font-bold text-gray-900">{analytics.totalLikes || 0}</p>
                        <p className="text-xs text-gray-400 mt-1">Community engagement</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between mb-4">
                        <div className="p-3 bg-purple-100 text-purple-600 rounded-full"><FileText className="w-6 h-6" /></div>
                        <span className="text-purple-600 font-bold text-sm bg-purple-50 px-2 py-1 rounded-full">ACTIVE</span>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium">Content Pieces</h3>
                    <div className="mt-1">
                        <p className="text-3xl font-bold text-gray-900">{analytics.totalContent || 0}</p>
                        <p className="text-xs text-gray-400 mt-1">Published programs</p>
                    </div>
                </div>
            </div>

            {/* Content List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900 text-lg">Your Content Library</h3>
                    <div className="text-sm text-gray-500">Manage your published works</div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Engagement</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {content.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-gray-900">{item.title}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 capitalize border border-gray-200">
                                            {item.type === 'video' ? <Video size={12} className="text-blue-500" /> : <FileText size={12} className="text-purple-500" />}
                                            {item.type}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 text-xs font-bold rounded-full uppercase tracking-wide ${item.status === 'published'
                                                ? 'bg-green-100 text-green-700 border border-green-200'
                                                : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-4">
                                            <span className="flex items-center gap-1"><Eye size={14} className="text-gray-400" /> {item.engagement?.views || 0}</span>
                                            <span className="flex items-center gap-1"><ThumbsUp size={14} className="text-gray-400" /> {item.engagement?.likes || 0}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 font-mono text-xs">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-blue-600 hover:text-blue-800 text-xs font-bold hover:underline">Edit</button>
                                    </td>
                                </tr>
                            ))}
                            {content.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                                                <FileText className="text-gray-400" />
                                            </div>
                                            <p className="font-medium">No content found</p>
                                            <p className="text-sm mt-1 mb-4">Start by creating your first program or article.</p>
                                            <Button variant="outline" size="sm">Create Now</Button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CreatorDashboard;
