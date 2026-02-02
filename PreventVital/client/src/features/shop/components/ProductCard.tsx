import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';
import RegionBadge from './RegionBadge';
import { Product } from '@/store/shopSlice';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/shopSlice';
import { toast } from "sonner";
import { ShoppingCart, Eye, Heart, Star } from 'lucide-react';

interface ProductCardProps {
    product: Product;
    userRegion: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, userRegion }) => {
    const dispatch = useDispatch();
    const mainImage = product.images?.[0] || product.image || '/placeholder.png';

    // Determine badge type based on product tags or logic (Mock logic for now)
    const getBadge = () => {
        if (product.stock <= 5 && product.stock > 0) return { label: 'Limited', color: 'bg-orange-500' };
        if (product.category === 'wearables') return { label: 'Best Seller', color: 'bg-blue-500' }; // Mock
        if (product.category === 'test_kits') return { label: 'Premium', color: 'bg-purple-500' }; // Mock
        return null;
    };

    const badge = getBadge();

    return (
        <Card className="group relative border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 bg-white rounded-xl overflow-hidden flex flex-col h-full">
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-gray-50">
                {/* Badges */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                    {badge && (
                        <Badge className={`${badge.color} hover:${badge.color} text-white border-none px-2.5 py-0.5 text-xs font-medium rounded-full shadow-sm`}>
                            {badge.label}
                        </Badge>
                    )}
                    {product.mrp && product.mrp > product.price && (
                        <Badge className="bg-red-500 hover:bg-red-600 text-white border-none px-2.5 py-0.5 text-xs font-medium rounded-full shadow-sm">
                            {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                        </Badge>
                    )}
                </div>

                {/* Wishlist Button (Placeholder) */}
                <button className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 hover:bg-white transition-colors shadow-sm">
                    <Heart size={16} />
                </button>

                <Link to={`/products/${product.slug || product._id}`} className="block w-full h-full">
                    <img
                        src={mainImage}
                        alt={product.name}
                        className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105 mix-blend-multiply"
                    />
                </Link>

                {/* Out of Stock Overlay */}
                {product.stock <= 0 && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-20">
                        <Badge variant="outline" className="text-gray-500 border-gray-300 bg-white/80 px-3 py-1 text-xs uppercase tracking-wider font-bold">
                            Out of Stock
                        </Badge>
                    </div>
                )}
            </div>

            {/* Content Info */}
            <CardContent className="p-4 flex-1 flex flex-col pt-4">
                <div className="mb-1">
                    <div className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
                        {product.category.replace('_', ' ')}
                    </div>
                </div>

                <Link to={`/products/${product.slug || product._id}`} className="block mb-3">
                    <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 hover:text-indigo-600 transition-colors">
                        {product.name}
                    </h3>
                </Link>

                <div className="flex items-center gap-1 mb-4">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-medium text-gray-600">4.8</span>
                </div>

                <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                    </div>

                    <Button
                        size="sm"
                        className="h-8 px-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-md rounded-md text-xs font-medium transition-all hover:shadow-lg"
                        disabled={product.stock <= 0}
                        onClick={(e) => {
                            e.preventDefault();
                            dispatch(addToCart(product));
                            toast.success("Added to Cart", {
                                description: `${product.name} is now in your cart.`,
                                duration: 2000,
                            });
                        }}
                    >
                        <ShoppingCart size={14} className="mr-1.5" /> Add
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
