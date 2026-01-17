import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import PricingTable from '@/features/subscription/PricingTable';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

const CustomerBilling = () => {
    const { user } = useSelector((state: RootState) => state.auth);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold text-gray-900">Membership & Billing</h2>
                <p className="text-gray-500">Manage your subscription plan and payment methods.</p>
            </div>

            <Card className="border shadow-sm overflow-hidden">
                <CardHeader className="bg-gray-50 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>Current Plan</CardTitle>
                            <CardDescription>Your active subscription details</CardDescription>
                        </div>
                        <Badge className={`text-base px-4 py-1.5 capitalize ${(user as any)?.subscription?.status === 'active' ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500'}`}>
                            {(user as any)?.subscription?.status || 'Active'}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                        <div className="text-center md:text-left">
                            <p className="text-sm text-gray-500 font-medium uppercase tracking-wide mb-1">Current Tier</p>
                            <h3 className="text-4xl font-extrabold text-gray-900 capitalize">{(user as any)?.subscription?.plan || 'Free'} Plan</h3>
                            {(user as any)?.subscription?.plan === 'free' && (
                                <p className="text-teal-600 font-medium mt-2">Upgrade for advanced features</p>
                            )}
                        </div>

                        <div className="h-12 w-px bg-gray-200 hidden md:block"></div>

                        <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>Access to AI Health Assessment</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>Basic Vitals Tracking</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>Community Access</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 px-1">Available Plans</h3>
                <PricingTable />
            </div>
        </div>
    );
};

export default CustomerBilling;
