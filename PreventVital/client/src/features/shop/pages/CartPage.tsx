import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store'; // Assuming RootState is exported from store/index.ts or similar
import { removeFromCart, clearCart } from '@/store/shopSlice';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const CartPage = () => {
    // @ts-ignore
    const { cart, total } = useSelector((state: any) => state.shop); // Temporary any until I check RootState location
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div className="container py-20 text-center">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <Button asChild>
                    <Link to="/products">Browse Shop</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="border rounded-lg overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product</TableHead>
                                    <TableHead className="text-center">Quantity</TableHead>
                                    <TableHead className="text-right">Price</TableHead>
                                    <TableHead className="w-[50px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cart.map((item: any) => (
                                    <TableRow key={item._id}>
                                        <TableCell className="flex items-center gap-4">
                                            <img src={item.images?.[0] || item.image || '/placeholder.png'} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                            <div>
                                                <p className="font-medium">{item.name}</p>
                                                <p className="text-sm text-muted-foreground capitalize">{item.category}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">{item.quantity}</TableCell>
                                        <TableCell className="text-right">₹{item.price * item.quantity}</TableCell>
                                        <TableCell>
                                            <Button variant="ghost" size="icon" onClick={() => dispatch(removeFromCart(item._id))}>
                                                <Trash2 size={18} className="text-red-500" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <Button variant="outline" onClick={() => dispatch(clearCart())}>Clear Cart</Button>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="border rounded-lg p-6 bg-muted/20">
                        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₹{total}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span className="text-green-600">Free</span>
                            </div>
                            <div className="pt-4 border-t flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>₹{total}</span>
                            </div>
                        </div>
                        <Button className="w-full" size="lg" onClick={() => navigate('/checkout')}>
                            Proceed to Checkout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
