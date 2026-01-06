import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { clearCart } from '../../store/shopSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cart, total } = useSelector((state: RootState) => state.shop);
    const { token, user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'India'
    });

    const handleCheckout = async () => {
        if (!token) {
            alert("Please login to checkout");
            navigate('/login');
            return;
        }

        try {
            // 1. Create Order
            const orderRes = await axios.post('/api/shop/orders', {
                items: cart.map(i => ({ product: i._id, quantity: i.quantity })),
                shippingAddress: address
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const { order, razorpayOrder } = orderRes.data.data;

            // 2. Open Razorpay
            const options = {
                key: 'rzp_test_placeholder', // Should come from env in real app
                amount: razorpayOrder.amount,
                currency: "INR",
                name: "PreventVital",
                description: "Medical Supplies",
                order_id: razorpayOrder.id,
                handler: async function (response: any) {
                    // 3. Verify Payment
                    try {
                        await axios.post('/api/shop/orders/verify', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        }, {
                            headers: { Authorization: `Bearer ${token}` }
                        });

                        alert("Payment Successful!");
                        dispatch(clearCart());
                        navigate('/account/orders'); // Redirect to orders page (stub)
                    } catch (err) {
                        alert("Payment verification failed");
                    }
                },
                prefill: {
                    name: user?.name,
                    email: user?.email,
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const rzp1 = new (window as any).Razorpay(options);
            rzp1.open();

        } catch (err) {
            console.error(err);
            alert("Checkout failed");
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Checkout</h2>

            {/* Order Summary */}
            <div className="bg-white p-6 rounded-xl shadow-sm border mb-6 text-gray-900">
                <h3 className="font-semibold mb-4 text-lg">Order Summary</h3>
                <div className="space-y-3 mb-4">
                    {cart.map((item: any) => (
                        <div key={item._id} className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2">
                                <span className="font-medium">{item.quantity}x</span>
                                <div>
                                    <p className="font-medium text-gray-900">{item.name}</p>
                                    <p className="text-gray-500 text-xs text-left">₹{item.price}</p>
                                </div>
                            </div>
                            <span className="font-semibold text-gray-900">₹{item.price * item.quantity}</span>
                        </div>
                    ))}
                </div>
                <div className="border-t pt-3 flex justify-between items-center">
                    <span className="font-bold text-gray-700">Total</span>
                    <span className="text-xl font-bold text-gray-900">₹{total}</span>
                </div>
            </div>

            {/* Shipping Form */}
            <div className="bg-white p-6 rounded-xl shadow-sm border text-gray-900 border-gray-200">
                <h3 className="font-semibold mb-4 text-lg">Shipping Address</h3>
                <div className="space-y-4">
                    <input
                        className="w-full border-2 border-gray-300 p-3 rounded-lg text-gray-900 placeholder:text-gray-500 bg-gray-50 focus:bg-white focus:border-indigo-500 transition-colors"
                        placeholder="Street Address"
                        value={address.street}
                        onChange={e => setAddress({ ...address, street: e.target.value })}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            className="w-full border-2 border-gray-300 p-3 rounded-lg text-gray-900 placeholder:text-gray-500 bg-gray-50 focus:bg-white focus:border-indigo-500 transition-colors"
                            placeholder="City"
                            value={address.city}
                            onChange={e => setAddress({ ...address, city: e.target.value })}
                        />
                        <input
                            className="w-full border-2 border-gray-300 p-3 rounded-lg text-gray-900 placeholder:text-gray-500 bg-gray-50 focus:bg-white focus:border-indigo-500 transition-colors"
                            placeholder="State"
                            value={address.state}
                            onChange={e => setAddress({ ...address, state: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            className="w-full border-2 border-gray-300 p-3 rounded-lg text-gray-900 placeholder:text-gray-500 bg-gray-50 focus:bg-white focus:border-indigo-500 transition-colors"
                            placeholder="Postal Code"
                            value={address.postalCode}
                            onChange={e => setAddress({ ...address, postalCode: e.target.value })}
                        />
                        <input
                            className="w-full border-2 border-gray-300 p-3 rounded-lg bg-gray-200 text-gray-600 font-medium cursor-not-allowed"
                            placeholder="Country"
                            value={address.country}
                            disabled
                        />
                    </div>
                </div>

                <div className="mt-8 border-t pt-6">
                    <button onClick={handleCheckout} className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
                        Pay ₹{total} (Pre-Book)
                    </button>
                    <p className="text-center text-xs text-gray-400 mt-3">
                        *Dev Mode: No payment required for testing.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
