import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { clearCart } from '@/store/shopSlice';

const CheckoutPage = () => {
    // @ts-ignore
    const { cart, total } = useSelector((state: any) => state.shop);
    // @ts-ignore
    const { user, isAuthenticated } = useSelector((state: any) => state.auth); // Assuming auth slice exists

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [shippingAddress, setShippingAddress] = useState({
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'India' // Default
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login?redirect=checkout');
        }
    }, [isAuthenticated, navigate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
    };

    const handlePayment = async () => {
        setLoading(true);
        try {
            // 1. Create Order
            const { data: orderData } = await axios.post('http://localhost:3000/api/shop/create-order', {
                amount: total * 100 // Convert to paise
            });

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_placeholder", // Replace with env var
                amount: orderData.order.amount,
                currency: "INR",
                name: "PreventVital",
                description: "Medical Device Purchase",
                order_id: orderData.order.id,
                handler: async function (response: any) {
                    try {
                        // 2. Verify Payment
                        const verifyRes = await axios.post('http://localhost:3000/api/shop/verify-payment', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            items: cart.map((item: any) => ({
                                product: item._id,
                                name: item.name,
                                quantity: item.quantity,
                                price: item.price
                            })),
                            totalAmount: total,
                            shippingAddress
                        });

                        if (verifyRes.data.status === 'success') {
                            dispatch(clearCart());
                            navigate(`/order-confirmation/${verifyRes.data.order._id}?invoice=${encodeURIComponent(verifyRes.data.invoiceUrl)}`);
                        }
                    } catch (err) {
                        alert("Payment verification failed");
                        console.error(err);
                    }
                },
                prefill: {
                    name: user?.name,
                    email: user?.email,
                    contact: user?.phone
                },
                theme: {
                    color: "#3399cc"
                }
            };

            // @ts-ignore
            const rzp1 = new window.Razorpay(options);
            rzp1.open();

        } catch (err) {
            console.error("Payment initiation failed", err);
            alert("Something went wrong with payment initiation.");
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) return null; // Or loader

    return (
        <div className="container mx-auto py-10 max-w-2xl text-white">
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>

            <div className="space-y-6">
                <div className="bg-card p-6 rounded-lg border">
                    <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="street">Street Address</Label>
                            <Input id="street" name="street" value={shippingAddress.street} onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" name="city" value={shippingAddress.city} onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Input id="state" name="state" value={shippingAddress.state} onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="postalCode">Postal Code</Label>
                            <Input id="postalCode" name="postalCode" value={shippingAddress.postalCode} onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Input id="country" name="country" value={shippingAddress.country} onChange={handleInputChange} readOnly />
                        </div>
                    </div>
                </div>

                <div className="bg-card p-6 rounded-lg border">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    <div className="space-y-2 text-sm">
                        {cart.map((item: any) => (
                            <div key={item._id} className="flex justify-between">
                                <span>{item.name} x {item.quantity}</span>
                                <span>₹{item.price * item.quantity}</span>
                            </div>
                        ))}
                        <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>₹{total}</span>
                        </div>
                    </div>
                </div>

                <Button className="w-full" size="lg" onClick={handlePayment} disabled={loading || cart.length === 0}>
                    {loading ? 'Processing...' : `Pay ₹${total}`}
                </Button>
            </div>
        </div>
    );
};

export default CheckoutPage;
