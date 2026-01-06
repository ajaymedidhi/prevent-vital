import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart, Product } from '@/store/shopSlice';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SpecsTable from '../components/SpecsTable';
import VitalsIcons from '../components/VitalsIcons';
import RegionBadge from '../components/RegionBadge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from "@/components/ui/use-toast";
import { ChevronLeft, Truck, ShieldCheck, HeartPulse, Star, ShoppingCart, Share2 } from 'lucide-react';

const ProductDetailPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { toast } = useToast();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`/api/shop/products/${slug}`);
                setProduct(res.data.data.product);
                if (res.data.data.product.images?.length > 0) {
                    setSelectedImage(res.data.data.product.images[0]);
                } else {
                    setSelectedImage(res.data.data.product.image || '/placeholder.png');
                }
            } catch (err) {
                setError('Product not found');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [slug]);

    if (loading) return <div className="container py-20 px-4"><Skeleton className="h-[600px] w-full rounded-3xl" /></div>;
    if (error || !product) return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <p className="text-xl font-bold text-gray-800 mb-4">{error}</p>
            <Button onClick={() => navigate('/shop')}>Back to Shop</Button>
        </div>
    );

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumb / Back Navigation */}
            <div className="border-b border-gray-100 bg-white sticky top-0 z-20">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
                    >
                        <ChevronLeft size={20} />
                        Back to Catalog
                    </button>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-indigo-600">
                            <Share2 size={18} />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto py-10 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">

                    {/* LEFT COLUMN: IMAGES - STICKY */}
                    <div className="lg:sticky lg:top-24 self-start space-y-6">
                        <div className="aspect-[4/5] bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 shadow-sm relative group">
                            <img
                                src={selectedImage}
                                alt={product.name}
                                className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>

                        {/* Thumbnails */}
                        {product.images && product.images.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(img)}
                                        className={`w-24 h-24 rounded-2xl border-2 overflow-hidden flex-shrink-0 transition-all ${selectedImage === img
                                                ? 'border-indigo-600 ring-2 ring-indigo-100 ring-offset-2'
                                                : 'border-transparent bg-gray-50 hover:border-gray-300'
                                            }`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover p-2" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN: DETAILS */}
                    <div className="space-y-8 py-2">
                        {/* Header Info */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-3 py-1 text-xs uppercase tracking-wider font-semibold">
                                    {product.category.replace('_', ' ')}
                                </Badge>
                                <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium">
                                    <Star size={14} fill="currentColor" />
                                    <span>4.9 (128 Reviews)</span>
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-4">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                                    {product.mrp && product.mrp > product.price && (
                                        <span className="text-xl text-gray-400 line-through font-medium">₹{product.mrp.toLocaleString()}</span>
                                    )}
                                </div>
                                {product.stock > 0 ? (
                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">In Stock</span>
                                ) : (
                                    <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">Out of Stock</span>
                                )}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gray-100"></div>

                        {/* Description */}
                        <div className="prose prose-lg text-gray-600 leading-relaxed">
                            <p>
                                {product.description || "Experience the future of health monitoring with our clinical-grade device. Designed for precision and ease of use, it integrates seamlessly with the PreventVital ecosystem to give you actionable insights."}
                            </p>
                        </div>

                        {/* Vitals Support */}
                        {product.supportedVitals && product.supportedVitals.length > 0 && (
                            <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
                                <div className="flex items-center gap-2 mb-4 text-blue-900 font-bold">
                                    <HeartPulse size={20} />
                                    <h3>Compatible Vitals</h3>
                                </div>
                                <VitalsIcons vitals={product.supportedVitals} />
                            </div>
                        )}

                        {/* ACTION BUTTON */}
                        <div className="flex gap-4 items-stretch pt-4">
                            <Button
                                size="lg"
                                className="flex-1 h-14 text-lg font-bold bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5 rounded-xl"
                                disabled={product.stock <= 0}
                                onClick={() => {
                                    if (product) {
                                        dispatch(addToCart(product));
                                        toast({
                                            title: "Added to Cart",
                                            description: `${product.name} has been added.`,
                                        });
                                    }
                                }}
                            >
                                <ShoppingCart className="mr-2" />
                                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                            </Button>
                            {/* Wishlist Button? Optional */}
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50">
                                <Truck size={24} className="text-gray-900" />
                                <div>
                                    <span className="block font-bold text-gray-900">Free Shipping</span>
                                    <span className="text-xs">On orders over ₹999</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50">
                                <ShieldCheck size={24} className="text-gray-900" />
                                <div>
                                    <span className="block font-bold text-gray-900">2 Year Warranty</span>
                                    <span className="text-xs">Official Manufacturer</span>
                                </div>
                            </div>
                        </div>

                        {/* Specs */}
                        {product.specs && product.specs.length > 0 && (
                            <div className="pt-8">
                                <h3 className="text-xl font-bold mb-6 text-gray-900">Technical Specifications</h3>
                                <SpecsTable specs={product.specs} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
