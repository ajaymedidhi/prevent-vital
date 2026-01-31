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
import { ShoppingCart, Eye } from 'lucide-react';

interface ProductCardProps {
    product: Product;
    userRegion: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, userRegion }) => {
    const dispatch = useDispatch();
    const mainImage = product.images?.[0] || product.image || '/placeholder.png';

    return (
        <Card className="group relative border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white rounded-2xl overflow-hidden flex flex-col h-full">
            {/* Image Container with Quick Actions */}
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
                <div className="absolute top-3 left-3 z-10">
                    <RegionBadge allowedRegions={product.allowedRegions} userRegion={userRegion} />
                </div>
                {product.mrp && product.mrp > product.price && (
                    <Badge className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white border-none px-2.5 py-1 z-10 shadow-sm">
                        {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                    </Badge>
                )}

                <img
                    src={mainImage}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay Quick Actions */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                    <Button
                        asChild
                        variant="secondary"
                        size="icon"
                        className="rounded-full h-10 w-10 bg-white hover:bg-white text-gray-900 shadow-lg hover:scale-110 transition-transform"
                    >
                        <Link to={`/products/${product.slug || product._id}`} title="View Details">
                            <Eye size={18} />
                        </Link>
                    </Button>
                    <Button
                        size="icon"
                        className="rounded-full h-10 w-10 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:scale-110 transition-transform"
                        disabled={product.stock <= 0}
                        onClick={(e) => {
                            e.preventDefault();
                            dispatch(addToCart(product));
                            toast.success("Added to Cart", {
                                description: `${product.name} is now in your cart.`,
                                duration: 2000,
                            });
                        }}
                        title="Add to Cart"
                    >
                        <ShoppingCart size={18} />
                    </Button>
                </div>

                {product.stock <= 0 && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-20">
                        <Badge variant="outline" className="text-gray-500 border-gray-400 bg-white/50 px-4 py-1.5 text-sm uppercase tracking-wider font-semibold">
                            Out of Stock
                        </Badge>
                    </div>
                )}
            </div>

            {/* Content Info */}
            <CardContent className="p-5 flex-1 flex flex-col justify-between">
                <div>
                    <div className="text-xs font-semibold tracking-wider text-indigo-600 uppercase mb-1">
                        {product.category.replace('_', ' ')}
                    </div>
                    <Link to={`/products/${product.slug || product._id}`} className="block">
                        <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2 group-hover:text-indigo-700 transition-colors line-clamp-2 min-h-[3.5rem]">
                            {product.name}
                        </h3>
                    </Link>
                </div>

                <div className="mt-4 flex items-baseline justify-between">
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-gray-900 tracking-tight">₹{product.price.toLocaleString()}</span>
                        {product.mrp && product.mrp > product.price && (
                            <span className="text-sm text-gray-400 line-through font-medium">MRP: ₹{product.mrp.toLocaleString()}</span>
                        )}
                    </div>
                    {/* Add rating mock or real if available later */}
                    <div className="text-xs text-yellow-500 font-medium flex items-center gap-1">
                        ★ 4.8
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
