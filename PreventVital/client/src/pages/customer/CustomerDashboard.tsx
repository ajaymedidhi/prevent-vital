import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HeartPulse, PlayCircle, ShieldCheck, ChevronRight, Activity, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../../store';
import axios from 'axios';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Plus } from 'lucide-react';

const CustomerDashboard = () => {
    // Get real user from Redux
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedVideo, setSelectedVideo] = useState<any>(null);

    const [isVitalsModalOpen, setIsVitalsModalOpen] = useState(false);
    const [vitalForm, setVitalForm] = useState({
        bloodPressureSys: '',
        bloodPressureDia: '',
        heartRate: '',
        glucose: '',
        spo2: '',
        weight: ''
    });

    const handleVitalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVitalForm({ ...vitalForm, [e.target.name]: e.target.value });
    };

    const handleVitalSubmit = async () => {
        try {
            const token = localStorage.getItem('token');
            const payload: any = {};
            if (vitalForm.bloodPressureSys && vitalForm.bloodPressureDia) {
                payload.bloodPressure = {
                    systolic: parseInt(vitalForm.bloodPressureSys),
                    diastolic: parseInt(vitalForm.bloodPressureDia)
                };
            }
            if (vitalForm.heartRate) payload.heartRate = parseInt(vitalForm.heartRate);
            if (vitalForm.glucose) payload.glucose = parseInt(vitalForm.glucose);
            if (vitalForm.spo2) payload.spo2 = parseInt(vitalForm.spo2);
            if (vitalForm.weight) payload.weight = parseFloat(vitalForm.weight);

            const res = await axios.post('/api/vitals', payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.data.status === 'success') {
                const updatedUser = res.data.data.user;
                if (res.data.data.vitalScore) {
                    (updatedUser as any).vitalScore = res.data.data.vitalScore;
                }
                dispatch(setCredentials({ user: updatedUser, token }));
                setIsVitalsModalOpen(false);
                setVitalForm({
                    bloodPressureSys: '',
                    bloodPressureDia: '',
                    heartRate: '',
                    glucose: '',
                    spo2: '',
                    weight: ''
                });
            }
        } catch (err) {
            console.error("Failed to log vitals", err);
        }
    };

    // Sync Profile on Mount
    React.useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;
                const res = await axios.get('/api/auth/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.data.data.user) {
                    const userData = res.data.data.user;
                    // Attach vitalScore to user object manually for Redux store
                    if (res.data.data.vitalScore) {
                        (userData as any).vitalScore = res.data.data.vitalScore;
                    }
                    dispatch(setCredentials({ user: userData, token }));
                }
            } catch (err) {
                console.error("Failed to sync profile", err);
            }
        };
        fetchProfile();
    }, [dispatch]);

    const sampleVideos = [
        {
            id: 1,
            title: "Morning Mobility Routine",
            duration: "10 min",
            category: "Yoga",
            thumbnail: "https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=2070&auto=format&fit=crop",
            type: 'youtube',
            videoId: "klmBssEYkdU" // Yoga with Adriene
        },
        {
            id: 2,
            title: "How the Heart Actually Pumps",
            duration: "5 min",
            category: "Education",
            thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
            type: 'youtube',
            videoId: "H04d3rJCLCE" // TED-Ed
        },
        {
            id: 3,
            title: "Stress Relief Meditation",
            duration: "15 min",
            category: "Mindfulness",
            thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1999&auto=format&fit=crop",
            type: 'youtube',
            videoId: "SlhBgt2deyk" // Wellness Channel
        },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Welcome Banner */}
            <div className="relative overflow-hidden bg-gradient-to-r from-teal-900 to-emerald-800 rounded-3xl p-8 md:p-10 shadow-2xl text-white">
                <div className="relative z-10 max-w-2xl">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Good Morning, {user?.name?.split(' ')[0] || 'Member'}!</h1>
                    <p className="text-teal-100 text-lg mb-8 opacity-90 leading-relaxed">
                        Your health journey is looking great today. You've maintained a <span className="font-bold text-white">{(user as any)?.gamification?.streaks?.current || 0}-day streak</span>!
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Button
                            onClick={() => navigate('/ai-health-assessment')}
                            className="bg-white text-teal-900 hover:bg-teal-50 font-bold border-0 shadow-lg"
                            size="lg"
                        >
                            <ShieldCheck className="mr-2 h-5 w-5" /> Start Health Check
                        </Button>
                        <Button
                            onClick={() => navigate('/shop')}
                            variant="outline"
                            className="border-teal-400 text-teal-100 hover:bg-teal-800 hover:text-white"
                            size="lg"
                        >
                            Visit Shop
                        </Button>
                    </div>
                </div>
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 right-20 w-80 h-80 bg-emerald-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
            </div>

            {/* Vitals & Progress Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Live Vitals Card */}
                <Card className="border-none shadow-md overflow-hidden bg-white group hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-red-50 text-red-500 rounded-xl group-hover:scale-110 transition-transform">
                                    <HeartPulse size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">Health Vitals</h3>
                                    <p className="text-xs text-gray-500">Last synced: Today, 9:00 AM</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" onClick={() => setIsVitalsModalOpen(true)} className="h-8">
                                    <Plus className="w-3 h-3 mr-1" /> Update
                                </Button>
                                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full animate-pulse">LIVE</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 bg-gray-50 rounded-xl flex justify-between items-center group-hover:bg-red-50/30 transition-colors">
                                <div>
                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Heart Rate</p>
                                    <p className="text-2xl font-bold text-gray-900">{(user as any)?.latestVitals?.heartRate || '--'}</p>
                                </div>
                                <Activity className="text-red-400 w-8 h-8 opacity-50" />
                            </div>
                            <div className="flex gap-4">
                                <div className="p-4 bg-gray-50 rounded-xl flex-1 group-hover:bg-blue-50/30 transition-colors">
                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">BP</p>
                                    <p className="text-xl font-bold text-gray-900">
                                        {(user as any)?.latestVitals?.bloodPressure?.systolic || '--'}/
                                        {(user as any)?.latestVitals?.bloodPressure?.diastolic || '--'}
                                    </p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-xl flex-1 group-hover:bg-blue-50/30 transition-colors">
                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">SpO2</p>
                                    <p className="text-xl font-bold text-gray-900">{(user as any)?.latestVitals?.spo2 || '--'}%</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Safety Score Card (Dedicated) */}
                <Card className="border-none shadow-md overflow-hidden bg-white group hover:shadow-lg transition-all duration-300 relative">
                    {/* Decorative gradient background for high scores */}
                    {(user as any)?.vitalScore?.status?.color === 'green' && (
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600"></div>
                    )}
                    <CardContent className="p-6 h-full flex flex-col">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-3">
                                <div className={`p-3 rounded-xl group-hover:scale-110 transition-transform 
                                     ${(user as any)?.vitalScore?.status?.color === 'green' ? 'bg-green-50 text-green-600' :
                                        (user as any)?.vitalScore?.status?.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                                            (user as any)?.vitalScore?.status?.color === 'yellow' ? 'bg-yellow-50 text-yellow-600' :
                                                'bg-red-50 text-red-600'}`}>
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">Safety Score</h3>
                                    <p className="text-xs text-gray-500">AI-Powered Risk Analysis</p>
                                </div>
                            </div>
                        </div>

                        {(user as any)?.vitalScore ? (
                            <div className="flex-1 flex flex-col justify-center">
                                <div className="flex items-end gap-3 mb-4">
                                    <span className={`text-5xl font-bold tracking-tight
                                    ${(user as any).vitalScore.status.color === 'green' ? 'text-green-600' :
                                            (user as any).vitalScore.status.color === 'blue' ? 'text-blue-600' :
                                                (user as any).vitalScore.status.color === 'yellow' ? 'text-yellow-600' :
                                                    'text-red-600'}`}>
                                        {(user as any).vitalScore.score}
                                    </span>
                                    <div className="mb-2">
                                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase
                                        ${(user as any).vitalScore.status.color === 'green' ? 'bg-green-100 text-green-700' :
                                                (user as any).vitalScore.status.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                                                    (user as any).vitalScore.status.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-red-100 text-red-700'}`}>
                                            {(user as any).vitalScore.status.label}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 
                                            ${(user as any).vitalScore.status.color === 'green' ? 'bg-gradient-to-r from-green-400 to-green-600' :
                                                    (user as any).vitalScore.status.color === 'blue' ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                                                        (user as any).vitalScore.status.color === 'yellow' ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                                                            'bg-gradient-to-r from-red-400 to-red-600'}`}
                                            style={{ width: `${(user as any).vitalScore.score}%` }}
                                        ></div>
                                    </div>
                                    {(user as any).vitalScore.recommendations?.[0] && (
                                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-xs text-gray-600 italic">
                                            "{(user as any).vitalScore.recommendations[0].message}"
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                                <ShieldCheck className="w-12 h-12 text-gray-200 mb-2" />
                                <p className="text-sm text-gray-500">Log your vitals to generate your personalized safety score.</p>
                                <Button size="sm" variant="outline" className="mt-4" onClick={() => navigate('/ai-health-assessment')}>Log Vitals</Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Progress & Wellness Card */}
                <Card className="border-none shadow-md overflow-hidden bg-white group hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-yellow-50 text-yellow-600 rounded-xl group-hover:scale-110 transition-transform">
                                    <TrendingUp size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">Wellness Journey</h3>
                                    <p className="text-xs text-gray-500">Level {(user as any)?.gamification?.level || 1} Achiever</p>
                                </div>
                            </div>
                            <span className="text-yellow-600 font-bold text-xl">{(user as any)?.gamification?.points || 0} XP</span>
                        </div>

                        <div className="space-y-6">


                            {/* Legacy Progress (Fallback) */}
                            {!((user as any)?.vitalScore) && (
                                <div>
                                    <div className="flex justify-between text-sm mb-2 font-medium">
                                        <span className="text-gray-600">Daily Goal</span>
                                        <span className="text-gray-900">75%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full shadow-sm" style={{ width: '75%' }}></div>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-3 border border-dashed border-gray-200 rounded-lg">
                                    <p className="text-2xl font-bold text-gray-900">{(user as any)?.gamification?.streaks?.current || 0}</p>
                                    <p className="text-xs text-gray-500">Day Streak</p>
                                </div>
                                <div className="text-center p-3 border border-dashed border-gray-200 rounded-lg">
                                    <p className="text-2xl font-bold text-gray-900">12</p>
                                    <p className="text-xs text-gray-500">Badges Earned</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Sample Videos Section */}
            <div>
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Recommended for You</h2>
                        <p className="text-sm text-gray-500">Curated wellness content based on your profile.</p>
                    </div>
                    <Button variant="ghost" className="text-teal-600 hover:text-teal-700">View All <ChevronRight className="w-4 h-4 ml-1" /></Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {sampleVideos.map((video) => (
                        <div
                            key={video.id}
                            onClick={() => setSelectedVideo(video)}
                            className="group relative rounded-xl overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-all"
                        >
                            <div className="aspect-video bg-gray-900 relative">
                                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <PlayCircle className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all shadow-xl" />
                                </div>
                                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] px-2 py-1 rounded font-medium">
                                    {video.duration}
                                </div>
                            </div>
                            <div className="bg-white p-4 border border-t-0 border-gray-100 rounded-b-xl">
                                <span className="text-[10px] uppercase font-bold text-teal-600 tracking-wider block mb-1">{video.category}</span>
                                <h3 className="font-bold text-gray-900 line-clamp-1 group-hover:text-teal-700 transition-colors">{video.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Vitals Input Modal */}
            <Dialog open={isVitalsModalOpen} onOpenChange={setIsVitalsModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Update Health Vitals</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="sys">Systolic BP</Label>
                                <Input id="sys" name="bloodPressureSys" placeholder="120" value={vitalForm.bloodPressureSys} onChange={handleVitalChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="dia">Diastolic BP</Label>
                                <Input id="dia" name="bloodPressureDia" placeholder="80" value={vitalForm.bloodPressureDia} onChange={handleVitalChange} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="hr">Heart Rate</Label>
                                <Input id="hr" name="heartRate" placeholder="72" value={vitalForm.heartRate} onChange={handleVitalChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="weight">Weight (kg)</Label>
                                <Input id="weight" name="weight" placeholder="70" value={vitalForm.weight} onChange={handleVitalChange} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="glucose">Glucose</Label>
                                <Input id="glucose" name="glucose" placeholder="100" value={vitalForm.glucose} onChange={handleVitalChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="spo2">SpO2 (%)</Label>
                                <Input id="spo2" name="spo2" placeholder="98" value={vitalForm.spo2} onChange={handleVitalChange} />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleVitalSubmit}>Save Vitals</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Video Player Modal */}
            <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
                <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-none">
                    <DialogHeader className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/80 to-transparent">
                        <div className="flex justify-between items-center text-white">
                            <DialogTitle className="text-lg font-medium">{selectedVideo?.title}</DialogTitle>
                        </div>
                    </DialogHeader>

                    {selectedVideo && (
                        <div className="aspect-video w-full bg-black flex items-center justify-center">
                            {selectedVideo.type === 'youtube' ? (
                                <iframe
                                    className="w-full h-full"
                                    src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                                    title={selectedVideo.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <video
                                    src={selectedVideo.videoUrl}
                                    controls
                                    autoPlay
                                    className="w-full h-full"
                                    controlsList="nodownload"
                                >
                                    Your browser does not support the video tag.
                                </video>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CustomerDashboard;
