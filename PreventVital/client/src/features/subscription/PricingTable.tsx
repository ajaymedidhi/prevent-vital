import React, { useState } from 'react';
import { PLANS } from '@/constants/plans';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/AppIcon';
import axios from 'axios';
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store';

const PricingTable = () => {
    const [isAnnual, setIsAnnual] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubscribe = async (plan: any) => {
        try {
            // Check auth (assuming localStorage token or similar context check)
            const token = localStorage.getItem('token'); // Simplistic check, ideally use Auth Context
            if (!token) {
                toast({ title: "Login Required", description: "Please login to subscribe.", variant: "destructive" });
                navigate('/login');
                return;
            }

            if (plan.monthlyPrice === 0) {
                toast({ title: "Free Plan", description: "You are already on the free tier." });
                return;
            }

            console.log("Subscribing with Token:", token); // DEBUG
            const res = await axios.post('/api/subscriptions/create', {
                planId: plan.id,
                interval: isAnnual ? 'annual' : 'monthly'
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Initialize Razorpay
            const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder';

            // BYPASS FOR DEV/DEMO: If key is placeholder, simulate success immediately
            if (keyId === 'rzp_test_placeholder' || keyId === '') {
                console.log("Dev Mode: Bypassing Razorpay Payment...");
                await axios.post('/api/subscriptions/verify', {
                    razorpay_payment_id: `pay_${Date.now()}_mock`,
                    razorpay_subscription_id: res.data.subscription.id,
                    razorpay_signature: 'mock_signature', // backend allows bypass if sub_id has _mock
                    planId: plan.id
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                toast({ title: "Subscription Active (Dev Mode)", description: `You are now on the ${plan.name} plan!` });
                navigate('/account');
                return;
            }

            const options = {
                key: keyId,
                subscription_id: res.data.subscription.id,
                name: "PreventVital",
                description: `${plan.name} Subscription`,
                handler: async function (response: any) {
                    try {
                        await axios.post('/api/subscriptions/verify', {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_subscription_id: response.razorpay_subscription_id,
                            razorpay_signature: response.razorpay_signature,
                            planId: plan.id
                        }, {
                            headers: { Authorization: `Bearer ${token}` }
                        });

                        toast({ title: "Subscription Active", description: `You are now on the ${plan.name} plan!` });
                        navigate('/account');
                    } catch (err) {
                        toast({ title: "Verification Failed", description: "Payment verification failed.", variant: "destructive" });
                    }
                },
                theme: { color: "#3399cc" }
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();

        } catch (err: any) {
            console.error(err);
            if (err.response && err.response.status === 401) {
                // Auto-logout on 401
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                toast({ title: "Session Expired", description: "Please login again to continue.", variant: "destructive" });
                navigate('/login');
                return;
            }
            toast({ title: "Error", description: err.message || "Failed to initiate subscription.", variant: "destructive" });
        }
    };

    return (
        <div className="py-12">
            <div className="flex justify-center mb-8 gap-4 items-center">
                <span className={`text-sm ${!isAnnual ? 'font-bold' : ''}`}>Monthly</span>
                <button
                    onClick={() => setIsAnnual(!isAnnual)}
                    className={`w-14 h-7 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out ${isAnnual ? 'bg-primary' : ''}`}
                >
                    <div className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out ${isAnnual ? 'translate-x-7' : ''}`}></div>
                </button>
                <span className={`text-sm ${isAnnual ? 'font-bold' : ''}`}>Annual (Save ~17%)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {PLANS.map((plan) => (
                    <Card key={plan.id} className={`relative flex flex-col ${plan.id === 'gold' ? 'border-primary border-2 shadow-xl scale-105 z-10' : ''}`}>
                        {plan.isPopular && (
                            <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                                <Badge className="bg-yellow-500 text-black px-3 py-1">Best Value</Badge>
                            </div>
                        )}
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                            <CardDescription className="text-3xl font-bold text-primary mt-2">
                                ₹{isAnnual ? plan.annualPrice : plan.monthlyPrice}
                                <span className="text-sm font-normal text-muted-foreground">/{isAnnual ? 'yr' : 'mo'}</span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <ul className="space-y-3">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-sm">
                                        <Icon name="CheckCircle" className="text-green-500 w-4 h-4" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className={`w-full ${plan.id === 'gold' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black' : ''}`}
                                onClick={() => handleSubscribe(plan)}
                            >
                                {plan.monthlyPrice === 0 ? 'Current Plan' : 'Upgrade Now'}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default PricingTable;
