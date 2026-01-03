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
                const res = await axios.get(`http://localhost:3000/api/shop/products/${slug}`);
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

    if (loading) return <div className="container py-10"><Skeleton className="h-[400px] w-full" /></div>;
    if (error || !product) return <div className="container py-10 text-center text-red-500">{error}</div>;

    return (
        <div className="container mx-auto py-10 px-4">
            <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
                &larr; Back to Shop
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Images Section */}
                <div className="space-y-4">
                    <div className="aspect-square bg-muted rounded-xl overflow-hidden border">
                        <img src={selectedImage} alt={product.name} className="w-full h-full object-contain" />
                    </div>
                    {product.images && product.images.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(img)}
                                    className={`w-20 h-20 rounded-md border overflow-hidden flex-shrink-0 ${selectedImage === img ? 'ring-2 ring-primary' : ''}`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Details Section */}
                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between items-start">
                            <h1 className="text-3xl font-bold">{product.name}</h1>
                            <RegionBadge allowedRegions={product.allowedRegions} userRegion="IN" /> {/* TODO: pass Actual User Region from Context or similar */}
                        </div>
                        <Badge variant="secondary" className="mt-2 capitalize">{product.category.replace('_', ' ')}</Badge>
                    </div>

                    <div className="flex items-baseline gap-4">
                        <span className="text-4xl font-bold">₹{product.price}</span>
                        {product.mrp && product.mrp > product.price && (
                            <span className="text-xl text-muted-foreground line-through">₹{product.mrp}</span>
                        )}
                    </div>

                    <div className="prose max-w-none text-muted-foreground">
                        <p>{/* product.description or mock for now as schema has it but I didn't check if it's populated */}</p>
                        {/* Schema had description: String. Assuming it exists. */}
                    </div>

                    {product.supportedVitals && product.supportedVitals.length > 0 && (
                        <div>
                            <h3 className="text-sm font-semibold mb-2">Supported Vitals</h3>
                            <VitalsIcons vitals={product.supportedVitals} />
                        </div>
                    )}

                    <Button
                        size="lg"
                        className="w-full md:w-auto"
                        disabled={product.stock <= 0}
                        onClick={() => {
                            if (product) {
                                dispatch(addToCart(product));
                                toast({
                                    title: "Added to Cart",
                                    description: `${product.name} has been added to your cart.`,
                                });
                            }
                        }}
                    >
                        {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </Button>

                    {product.specs && product.specs.length > 0 && (
                        <div className="pt-4">
                            <h3 className="text-lg font-semibold mb-3">Device Specifications</h3>
                            <SpecsTable specs={product.specs} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
