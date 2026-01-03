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
            const orderRes = await axios.post('http://localhost:3000/api/shop/orders', {
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
                        await axios.post('http://localhost:3000/api/shop/orders/verify', {
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
            <h2 className="text-2xl font-bold mb-6">Checkout</h2>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="font-semibold mb-4">Shipping Address</h3>
                <div className="space-y-4">
                    <input className="w-full border p-2 rounded" placeholder="Street Address" value={address.street} onChange={e => setAddress({ ...address, street: e.target.value })} />
                    <div className="grid grid-cols-2 gap-4">
                        <input className="w-full border p-2 rounded" placeholder="City" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} />
                        <input className="w-full border p-2 rounded" placeholder="State" value={address.state} onChange={e => setAddress({ ...address, state: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <input className="w-full border p-2 rounded" placeholder="Postal Code" value={address.postalCode} onChange={e => setAddress({ ...address, postalCode: e.target.value })} />
                        <input className="w-full border p-2 rounded" placeholder="Country" value={address.country} disabled />
                    </div>
                </div>

                <div className="mt-8 border-t pt-4">
                    <div className="flex justify-between items-center mb-6">
                        <span className="font-bold text-gray-600">Total Amount</span>
                        <span className="text-2xl font-bold">₹{total}</span>
                    </div>
                    <button onClick={handleCheckout} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">
                        Pay Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
