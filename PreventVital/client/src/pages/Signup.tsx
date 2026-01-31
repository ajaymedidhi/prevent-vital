import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { setCredentials } from '../store';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { ArrowLeft, Activity, Heart, Smartphone, Watch, Thermometer } from 'lucide-react';
import { motion } from 'framer-motion';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post('/api/auth/signup', {
                name,
                email,
                password,
                passwordConfirm: confirmPassword
            });

            const { token } = response.data;
            const { user } = response.data.data;

            if (!token || !user) {
                throw new Error('Invalid response from server');
            }

            dispatch(setCredentials({ user, token }));
            navigate('/account');
        } catch (error: any) {
            console.error('Signup failed:', error);
            alert(error.response?.data?.message || 'Signup failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-white font-sans text-slate-900">
            {/* Left Side - Animated Graphic */}
            <div className="hidden lg:flex w-1/2 relative bg-slate-50 items-center justify-center overflow-hidden border-r border-slate-100">
                {/* Background Pattern */}
                <div className="absolute inset-0 z-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(15 23 42) 1px, transparent 0)`,
                        backgroundSize: '32px 32px'
                    }}
                />

                {/* Plus Signs Deco */}
                <div className="absolute top-12 left-12 text-slate-200">
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="currentColor">
                        <path d="M25 0H35V25H60V35H35V60H25V35H0V25H25V0Z" />
                    </svg>
                </div>
                <div className="absolute bottom-12 right-12 text-slate-200">
                    <svg width="40" height="40" viewBox="0 0 60 60" fill="currentColor">
                        <path d="M25 0H35V25H60V35H35V60H25V35H0V25H25V0Z" />
                    </svg>
                </div>

                <div className="relative z-10 scale-90 xl:scale-100">
                    {/* Central Phone */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative w-[280px] h-[560px] bg-white rounded-[3rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border-8 border-slate-900 overflow-hidden flex flex-col z-20"
                    >
                        {/* Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-30"></div>

                        {/* Screen Content */}
                        <div className="flex-1 bg-slate-50 pt-12 px-6 flex flex-col items-center">
                            <div className="w-20 h-20 bg-transparent flex items-center justify-center mb-4">
                                <img src="/images/logo-new.png" alt="Prevent Vital" className="w-full h-full object-contain" />
                            </div>
                            <h4 className="text-lg font-bold text-slate-900">Prevent Vital</h4>
                            <p className="text-xs text-slate-500 mb-8">Join the Health Revolution</p>

                            <div className="w-full space-y-3">
                                <div className="h-20 rounded-2xl bg-white shadow-sm border border-slate-100 p-3 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                                        <Activity size={18} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="h-2 w-12 bg-slate-100 rounded mb-2"></div>
                                        <div className="h-2 w-20 bg-slate-100 rounded"></div>
                                    </div>
                                    <div className="text-xs font-bold text-emerald-600">+12%</div>
                                </div>
                                <div className="h-20 rounded-2xl bg-white shadow-sm border border-slate-100 p-3 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-violet-50 flex items-center justify-center text-violet-500">
                                        <Watch size={18} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="h-2 w-12 bg-slate-100 rounded mb-2"></div>
                                        <div className="h-2 w-20 bg-slate-100 rounded"></div>
                                    </div>
                                </div>
                                <div className="h-20 rounded-2xl bg-white shadow-sm border border-slate-100 p-3 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                                        <Thermometer size={18} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="h-2 w-12 bg-slate-100 rounded mb-2"></div>
                                        <div className="h-2 w-20 bg-slate-100 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Orbit Ring 1 */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-dashed border-slate-300 rounded-full z-10 animate-[spin_60s_linear_infinite]" />
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] z-10"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg border border-slate-100">
                            <Activity className="w-6 h-6 text-slate-700" />
                        </div>
                    </motion.div>

                    {/* Orbit Ring 2 */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-dashed border-slate-200 rounded-full z-0 animate-[spin_80s_linear_infinite_reverse]" />
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] z-0"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                    >
                        <div className="absolute top-1/4 left-[85%] bg-white p-3 rounded-full shadow-lg border border-slate-100">
                            <Heart className="w-6 h-6 text-rose-500 fill-rose-500/20" />
                        </div>
                        <div className="absolute bottom-1/4 left-[15%] bg-white p-3 rounded-full shadow-lg border border-slate-100">
                            <Watch className="w-6 h-6 text-slate-700" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Form Section */}
            <div className="relative flex-1 flex flex-col items-center justify-center p-6 lg:p-20 bg-white">
                <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="absolute top-6 left-6 lg:top-12 lg:left-12">
                        <Link to="/" className="group flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-2 group-hover:bg-blue-50 transition-colors">
                                <ArrowLeft className="w-4 h-4" />
                            </div>
                            Back to Home
                        </Link>
                    </div>

                    <div className="text-center space-y-2 pt-12 lg:pt-0">
                        {/* Logo */}
                        <div className="flex flex-col items-center gap-2 mb-6">
                            <div className="relative w-16 h-16">
                                <img src="/images/logo-new.png" alt="Prevent Vital" className="w-full h-full object-contain" />
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                                Prevent vital
                            </span>
                        </div>

                        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Create an Account</h2>
                        <p className="text-slate-500 text-sm">Enter your details to get started with PreventVital.</p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-slate-700">Full Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="h-12 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-slate-700">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="h-12 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-slate-700">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={8}
                                    className="h-12 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-slate-700">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    minLength={8}
                                    className="h-12 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 text-base font-semibold bg-sky-500 hover:bg-sky-600 text-white shadow-lg shadow-sky-500/25 transition-all duration-300 rounded-lg"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </Button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-4 text-slate-400 font-medium">Or sign up with</span>
                        </div>
                    </div>

                    <div className="text-center text-sm text-slate-500">
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold text-sky-500 hover:text-sky-600 hover:underline transition-all">
                            Log in
                        </Link>
                    </div>
                </div>

                {/* Footer Copyright */}
                <div className="absolute bottom-6 text-xs text-slate-400">
                    &copy; {new Date().getFullYear()} PreventVital. All rights reserved.
                </div>
            </div>
        </div>
    );
};

export default Signup;
