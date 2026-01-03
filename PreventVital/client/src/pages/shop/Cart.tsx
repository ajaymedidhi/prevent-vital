import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { removeFromCart } from '../../store/shopSlice';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, total } = useSelector((state: RootState) => state.shop);
    const dispatch = useDispatch();

    if (cart.length === 0) return <div className="p-8 text-center">Your cart is empty. <Link to="/shop" className="text-blue-600">Go Shopping</Link></div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
            <div className="bg-white rounded-xl shadow-sm border p-6">
                {cart.map(item => (
                    <div key={item._id} className="flex justify-between items-center border-b py-4 last:border-0">
                        <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="font-bold">₹{item.price * item.quantity}</span>
                            <button
                                onClick={() => dispatch(removeFromCart(item._id))}
                                className="text-red-500 text-sm hover:underline"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
                <div className="mt-6 flex justify-between items-center pt-4 border-t">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-2xl font-bold text-blue-600">₹{total}</span>
                </div>
                <div className="mt-8 flex justify-end">
                    <Link to="/checkout" className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 font-bold">
                        Proceed to Checkout
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
