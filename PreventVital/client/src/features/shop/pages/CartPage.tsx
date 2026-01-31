import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { removeFromCart, clearCart, updateQuantity } from '@/store/shopSlice'; // Assuming updateQuantity exists or I just use +/- dummy
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, Minus, Plus, ShoppingBag, ShieldCheck } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const CartPage = () => {
    // @ts-ignore
    const { cart, total } = useSelector((state: any) => state.shop);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Empty State
    if (cart.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-200 mb-6">
                    <ShoppingBag size={48} className="text-indigo-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
                <p className="text-gray-500 mb-8 max-w-md text-center">
                    Looks like you haven't added anything to your cart yet. Browse our premium collection to find what you need.
                </p>
                <Button asChild size="lg" className="rounded-full px-8 bg-indigo-600 hover:bg-indigo-700">
                    <Link to="/products">Start Shopping <ArrowRight size={16} className="ml-2" /></Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-3">
                    Your Cart <span className="text-lg font-medium text-gray-500 bg-gray-200 px-3 py-1 rounded-full">{cart.length} items</span>
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* CART ITEMS LIST (Left Side - 8 Cols) */}
                    <div className="lg:col-span-8 space-y-6">
                        {cart.map((item: any) => (
                            <div key={item._id} className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6 items-start sm:items-center animate-in slide-in-from-bottom-2 duration-500">
                                {/* Image */}
                                <div className="w-full h-48 sm:w-32 sm:h-32 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                                    <img
                                        src={item.images?.[0] || item.image || '/placeholder.png'}
                                        alt={item.name}
                                        className="w-full h-full object-contain p-2"
                                    />
                                </div>

                                {/* Details */}
                                <div className="flex-1 space-y-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
                                                {item.category?.replace('_', ' ')}
                                            </p>
                                            <h3 className="font-bold text-lg text-gray-900 leading-tight mb-1">{item.name}</h3>
                                        </div>
                                        <p className="font-bold text-lg text-gray-900 sm:hidden">₹{(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                    <p className="text-sm text-gray-500">Unit Price: ₹{item.price.toLocaleString()}</p>
                                </div>

                                {/* Controls */}
                                <div className="flex items-center justify-between w-full sm:w-auto gap-8 sm:gap-6">
                                    {/* Qty Control (Mock logic or real if slice supports it) */}
                                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-200">
                                        <button
                                            className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-gray-600 shadow-sm hover:text-indigo-600 disabled:opacity-50"
                                            onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity - 1 }))}
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="font-semibold text-gray-900 w-4 text-center">{item.quantity}</span>
                                        <button
                                            className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-gray-600 shadow-sm hover:text-indigo-600 disabled:opacity-50"
                                            onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity + 1 }))}
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>

                                    <div className="text-right hidden sm:block min-w-[100px]">
                                        <p className="font-bold text-xl text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full"
                                        onClick={() => dispatch(removeFromCart(item._id))}
                                    >
                                        <Trash2 size={18} />
                                    </Button>
                                </div>
                            </div>
                        ))}

                        <div className="flex justify-end pt-4">
                            <Button variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => dispatch(clearCart())}>
                                Clear Cart
                            </Button>
                        </div>
                    </div>

                    {/* ORDER SUMMARY (Right Side - 4 Cols) */}
                    <div className="lg:col-span-4">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>₹{total.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping Estimate</span>
                                    <span className="text-green-600 font-medium">Free</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax Estimate</span>
                                    <span>Calculated at checkout</span>
                                </div>
                            </div>

                            <Separator className="my-6" />

                            <div className="flex justify-between items-center mb-8">
                                <span className="text-lg font-bold text-gray-900">Total</span>
                                <span className="text-2xl font-extrabold text-indigo-900">₹{total.toLocaleString()}</span>
                            </div>

                            <Button
                                className="w-full h-14 text-lg font-bold bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 rounded-xl transition-all hover:-translate-y-0.5"
                                onClick={() => navigate('/checkout')}
                            >
                                Checkout <ArrowRight className="ml-2" />
                            </Button>

                            <div className="mt-6 flex flex-col items-center gap-3 text-center">
                                <div className="flex gap-2 opacity-50 grayscale">
                                    {/* Mock Cards - Replace with SVGs/Images later if needed */}
                                    <div className="h-6 w-10 bg-blue-900 rounded"></div>
                                    <div className="h-6 w-10 bg-red-600 rounded"></div>
                                    <div className="h-6 w-10 bg-orange-500 rounded"></div>
                                </div>
                                <p className="text-xs text-gray-400 flex items-center gap-1">
                                    <ShieldCheck size={12} /> Secure Encrypted Payment
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CartPage;
