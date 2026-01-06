import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { setCredentials } from '../store';
import { User } from '../types/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', {
                email,
                password,
            });

            // Correctly extract data based on authController response structure
            const { token } = response.data;
            const { user } = response.data.data;

            if (!token || !user) {
                throw new Error('Invalid response from server');
            }

            dispatch(setCredentials({ user, token }));

            // Check for redirect param
            const queryParams = new URLSearchParams(window.location.search);
            const redirectUrl = queryParams.get('redirect');

            if (redirectUrl) {
                // If redirecting to checkout, ensure we go there
                navigate(`/${redirectUrl}`);
            } else {
                // Default based on role
                switch (user.role) {
                    case 'super_admin':
                        navigate('/super-admin/dashboard');
                        break;
                    case 'content_creator':
                        navigate('/creator/dashboard');
                        break;
                    case 'corporate_admin':
                        // Use corporateId as the tenantId in the URL
                        const cId = user.corporateId || user.tenantId;
                        if (cId) {
                            navigate(`/corporate/${cId}/dashboard`);
                        } else {
                            console.error('Missing corporateId/tenantId for corporate admin');
                        }
                        break;
                    case 'customer':
                        navigate('/account');
                        break;
                    case 'admin':
                        navigate('/admin/dashboard');
                        break;
                    default:
                        navigate('/');
                }
            }
        } catch (error: any) {
            console.error('Login failed:', error);
            alert(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="flex min-h-screen bg-background">
            {/* Left Side - Hero Image */}
            <div className="hidden lg:flex w-1/2 bg-black relative items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-10 bg-black/40" /> {/* Overlay */}
                <img
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80"
                    alt="Medical Technology"
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
                <div className="relative z-20 text-white p-12 max-w-lg">
                    <h2 className="text-4xl font-bold mb-6 leading-tight">Empowering Your Health Journey with AI Precision.</h2>
                    <p className="text-lg text-gray-200">"PreventVital has completely transformed how I track my health. The AI insights are game-changing."</p>
                    <div className="mt-4 flex items-center gap-4">
                        <div className="h-1 w-12 bg-primary rounded-full"></div>
                        <span className="text-sm font-semibold uppercase tracking-wider">Trusted by Professionals</span>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="relative flex-1 flex items-center justify-center p-8 lg:p-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="absolute top-4 left-4 lg:top-12 lg:left-12">
                        <Link to="/" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m15 18-6-6 6-6" /></svg>
                            Back to Home
                        </Link>
                    </div>

                    <div className="text-center mt-8 lg:mt-0">
                        <h2 className="text-3xl font-bold tracking-tight">Welcome Back</h2>
                        <p className="text-muted-foreground mt-2">Sign in to access your personalized health dashboard.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium leading-none" htmlFor="password">Password</label>
                                <a href="#" className="text-sm font-medium text-primary hover:underline">Forgot password?</a>
                            </div>
                            <input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full flex h-12 items-center justify-center rounded-md bg-primary text-primary-foreground shadow hover:bg-primary/90 transition-colors font-medium text-base"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>

                    <div className="mt-6 text-center text-sm">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-semibold text-primary hover:underline">
                            Create an account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
