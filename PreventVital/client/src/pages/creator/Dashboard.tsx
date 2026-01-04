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

    if (loading) return <div className="p-8">Loading dashboard...</div>;

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
            <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Creator Studio</h1>
                    <p className="text-gray-500 mt-2">Manage your content and track performance.</p>
                </div>
                <Button className="flex items-center gap-2">
                    <Plus size={16} /> New Content
                </Button>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Total Views</p>
                        <h3 className="text-3xl font-bold text-gray-900">{analytics.totalViews || 0}</h3>
                    </div>
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                        <Eye size={24} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Total Likes</p>
                        <h3 className="text-3xl font-bold text-gray-900">{analytics.totalLikes || 0}</h3>
                    </div>
                    <div className="p-3 bg-pink-50 text-pink-600 rounded-full">
                        <ThumbsUp size={24} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Content Pieces</p>
                        <h3 className="text-3xl font-bold text-gray-900">{analytics.totalContent || 0}</h3>
                    </div>
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-full">
                        <FileText size={24} />
                    </div>
                </div>
            </div>

            {/* Content List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900">Your Content</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Title</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Type</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Engagement</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {content.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{item.title}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 lowercase">
                                            {item.type === 'video' ? <Video size={14} className="text-blue-500" /> : <FileText size={14} className="text-gray-500" />}
                                            {item.type}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${item.status === 'published' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {item.engagement?.views || 0} views • {item.engagement?.likes || 0} likes
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                            {content.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                                        No content yet. Create your first piece!
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
