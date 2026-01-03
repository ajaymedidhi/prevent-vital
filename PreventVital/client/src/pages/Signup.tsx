import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { setCredentials } from '../store';
import { User } from '../types/auth';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/auth/signup', {
                name,
                email,
                password,
                passwordConfirm: confirmPassword
            });

            // Type assertion here or better response handling
            const { user, token } = response.data.data as { user: User, token: string };

            dispatch(setCredentials({ user, token }));

            // Redirect Logic - Default to Customer Account for new signups
            navigate('/account');
        } catch (error: any) {
            console.error('Signup failed:', error);
            alert(error.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <div className="flex min-h-screen bg-background">
            {/* Left Side - Hero Image */}
            <div className="hidden lg:flex w-1/2 bg-black relative items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-10 bg-black/50" /> {/* Overlay */}
                <img
                    src="https://images.unsplash.com/photo-1576091160550-2187ccdf2d94?auto=format&fit=crop&q=80"
                    alt="Medical Research"
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
                <div className="relative z-20 text-white p-12 max-w-lg">
                    <h2 className="text-4xl font-bold mb-6 leading-tight">Join the Future of Personalized Healthcare.</h2>
                    <p className="text-lg text-gray-200">"Create an account to access premium health tracking, AI assessments, and expert consultations."</p>
                    <div className="mt-8 grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <span className="text-3xl font-bold">10k+</span>
                            <span className="text-sm text-gray-300">Active Users</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-3xl font-bold">98%</span>
                            <span className="text-sm text-gray-300">Satisfaction Rate</span>
                        </div>
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
                        <h2 className="text-3xl font-bold tracking-tight">Create an Account</h2>
                        <p className="text-muted-foreground mt-2">Enter your details to get started with PreventVital.</p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="name">Full Name</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

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
                            <label className="text-sm font-medium leading-none" htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={8}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                minLength={8}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full flex h-12 items-center justify-center rounded-md bg-primary text-primary-foreground shadow hover:bg-primary/90 transition-colors font-medium text-base"
                        >
                            Create Account
                        </button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or sign up with</span>
                        </div>
                    </div>

                    <div className="mt-6 text-center text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold text-primary hover:underline">
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
