import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { clearCart } from '@/store/shopSlice';
import { ShieldCheck, Lock, Truck, CreditCard, User, MapPin, Phone } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const CheckoutPage = () => {
    // @ts-ignore
    const { cart, total } = useSelector((state: any) => state.shop);
    // @ts-ignore
    const { user, isAuthenticated } = useSelector((state: any) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [shippingAddress, setShippingAddress] = useState({
        fullName: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'India'
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login?redirect=checkout');
        } else if (user) {
            setShippingAddress(prev => ({
                ...prev,
                fullName: user.name || '',
                phone: user.phone || ''
            }));
        }
    }, [isAuthenticated, user, navigate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!shippingAddress.fullName.trim()) newErrors.fullName = 'Full Name is required';
        if (!shippingAddress.phone.trim()) {
            newErrors.phone = 'Phone Number is required';
        } else if (!/^\d{10}$/.test(shippingAddress.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Enter a valid 10-digit phone number';
        }
        if (!shippingAddress.street.trim()) newErrors.street = 'Street Address is required';
        if (!shippingAddress.city.trim()) newErrors.city = 'City is required';
        if (!shippingAddress.state.trim()) newErrors.state = 'State is required';
        if (!shippingAddress.postalCode.trim()) newErrors.postalCode = 'Postal Code is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePayment = async () => {
        if (!validateForm()) return;
        setLoading(true);
        try {
            const { data: orderData } = await axios.post('/api/shop/create-order', {
                amount: total * 100
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            const orderInfo = orderData.order || orderData.data?.razorpayOrder;
            const razorpayOrderId = orderInfo?.id;

            if (!razorpayOrderId) {
                alert("Order creation failed. Please try again.");
                setLoading(false);
                return;
            }

            const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_placeholder";

            if (keyId === 'rzp_test_placeholder' || keyId === '') {
                // Mock logic for dev
                const verifyRes = await axios.post('/api/shop/verify-payment', {
                    razorpay_order_id: razorpayOrderId,
                    razorpay_payment_id: `pay_mock_${Date.now()}`,
                    razorpay_signature: 'bypass',
                    items: cart.map((item: any) => ({
                        product: item._id, name: item.name, quantity: item.quantity, price: item.price
                    })),
                    totalAmount: total,
                    shippingAddress
                }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });

                if (verifyRes.data.status === 'success') {
                    dispatch(clearCart());
                    navigate(`/order-confirmation/${verifyRes.data.order._id}?invoice=${encodeURIComponent(verifyRes.data.invoiceUrl)}`);
                    return;
                }
            }

            const options = {
                key: keyId,
                amount: orderInfo.amount,
                currency: "INR",
                name: "PreventVital",
                description: "Medical Device Purchase",
                order_id: razorpayOrderId,
                handler: async function (response: any) {
                    try {
                        const verifyRes = await axios.post('/api/shop/verify-payment', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            items: cart.map((item: any) => ({
                                product: item._id, name: item.name, quantity: item.quantity, price: item.price
                            })),
                            totalAmount: total,
                            shippingAddress
                        }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });

                        if (verifyRes.data.status === 'success') {
                            dispatch(clearCart());
                            navigate(`/order-confirmation/${verifyRes.data.order._id}?invoice=${encodeURIComponent(verifyRes.data.invoiceUrl)}`);
                        }
                    } catch (err) {
                        alert("Payment verification failed");
                    }
                },
                prefill: {
                    name: user?.name,
                    email: user?.email,
                    contact: user?.phone
                },
                theme: {
                    color: "#4f46e5"
                }
            };

            // @ts-ignore
            const rzp1 = new window.Razorpay(options);
            rzp1.open();

        } catch (err) {
            console.error("Payment initiation failed", err);
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) return null;

    return (
        <div className="min-h-screen bg-gray-50/50 py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900">Secure Checkout</h1>
                    <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                        <Lock size={14} />
                        <span className="font-semibold">256-bit SSL Encrypted</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* LEFT COLUMN: FORM */}
                    <div className="lg:col-span-7 space-y-6">

                        {/* Section 1: Contact Info */}
                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-gray-900">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 text-sm font-bold">1</span>
                                Contact Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <Label htmlFor="fullName" className="text-gray-700 font-medium ml-1">Full Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 text-gray-400" size={18} />
                                        <Input
                                            id="fullName" name="fullName" value={shippingAddress.fullName} onChange={handleInputChange}
                                            className={`pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-indigo-500 rounded-xl transition-all ${errors.fullName ? 'border-red-500' : ''}`}
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    {errors.fullName && <p className="text-red-500 text-xs ml-1">{errors.fullName}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-gray-700 font-medium ml-1">Phone Number</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                                        <Input
                                            id="phone" name="phone" value={shippingAddress.phone} onChange={handleInputChange}
                                            className={`pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-indigo-500 rounded-xl transition-all ${errors.phone ? 'border-red-500' : ''}`}
                                            placeholder="+91 99999 99999"
                                        />
                                    </div>
                                    {errors.phone && <p className="text-red-500 text-xs ml-1">{errors.phone}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Shipping Address */}
                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-gray-900">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 text-sm font-bold">2</span>
                                Shipping Address
                            </h2>
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="street" className="text-gray-700 font-medium ml-1">Street Address</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                                        <Input
                                            id="street" name="street" value={shippingAddress.street} onChange={handleInputChange}
                                            className={`pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-indigo-500 rounded-xl transition-all ${errors.street ? 'border-red-500' : ''}`}
                                            placeholder="123 Wellness Blvd"
                                        />
                                    </div>
                                    {errors.street && <p className="text-red-500 text-xs ml-1">{errors.street}</p>}
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <Label htmlFor="city" className="text-gray-700 font-medium ml-1">City</Label>
                                        <Input
                                            id="city" name="city" value={shippingAddress.city} onChange={handleInputChange}
                                            className={`h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-indigo-500 rounded-xl transition-all ${errors.city ? 'border-red-500' : ''}`}
                                            placeholder="Mumbai"
                                        />
                                        {errors.city && <p className="text-red-500 text-xs ml-1">{errors.city}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="state" className="text-gray-700 font-medium ml-1">State</Label>
                                        <Input
                                            id="state" name="state" value={shippingAddress.state} onChange={handleInputChange}
                                            className={`h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-indigo-500 rounded-xl transition-all ${errors.state ? 'border-red-500' : ''}`}
                                            placeholder="Maharashtra"
                                        />
                                        {errors.state && <p className="text-red-500 text-xs ml-1">{errors.state}</p>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <Label htmlFor="postalCode" className="text-gray-700 font-medium ml-1">Pincode</Label>
                                        <Input
                                            id="postalCode" name="postalCode" value={shippingAddress.postalCode} onChange={handleInputChange}
                                            className={`h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-indigo-500 rounded-xl transition-all ${errors.postalCode ? 'border-red-500' : ''}`}
                                            placeholder="400001"
                                        />
                                        {errors.postalCode && <p className="text-red-500 text-xs ml-1">{errors.postalCode}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="country" className="text-gray-700 font-medium ml-1">Country</Label>
                                        <Input
                                            id="country" name="country" value={shippingAddress.country} readOnly
                                            className="h-12 bg-gray-100 border-gray-200 text-gray-500 rounded-xl cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: SUMMARY */}
                    <div className="lg:col-span-5 relative">
                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 md:sticky md:top-24">
                            <h2 className="text-xl font-bold mb-6 text-gray-900">Order Summary</h2>
                            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {cart.map((item: any) => (
                                    <div key={item._id} className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
                                                <img src={item.images?.[0] || item.image || '/placeholder.png'} className="w-full h-full object-contain p-1" alt="" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-gray-800 text-sm line-clamp-1">{item.name}</span>
                                                <span className="text-gray-400 text-xs">Qty: {item.quantity}</span>
                                            </div>
                                        </div>
                                        <span className="font-bold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>

                            <Separator className="my-6" />

                            <div className="space-y-3 text-sm text-gray-600 mb-6">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>₹{total.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-semibold">Free</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl mb-8">
                                <span className="font-bold text-gray-900">Total Amount</span>
                                <span className="text-2xl font-extrabold text-indigo-900">₹{total.toLocaleString()}</span>
                            </div>

                            <Button
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-14 text-lg shadow-lg shadow-indigo-200 rounded-xl transition-all hover:-translate-y-0.5"
                                onClick={handlePayment}
                                disabled={loading || cart.length === 0}
                            >
                                <CreditCard className="mr-2" size={20} />
                                {loading ? 'Processing...' : 'Pay Now'}
                            </Button>

                            <div className="flex justify-center items-center gap-2 mt-4 text-xs text-gray-400">
                                <Lock size={10} /> Payments processed securely via Razorpay
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
