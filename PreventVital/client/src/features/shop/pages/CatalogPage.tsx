import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Product } from '@/store/shopSlice';
import { Skeleton } from '@/components/ui/skeleton';

const CatalogPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [userRegion, setUserRegion] = useState<string>('IN');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Assuming API URL, might need env variable import. 
                // Using relative path via Vite proxy if setup, or hardcoded for now.
                // Assuming vite.config.js proxies /api to backend. if not, need full URL.
                // Using relative path via Vite proxy
                const res = await axios.get('/api/shop/products');
                setProducts(res.data.data.products);
                setUserRegion(res.data.userRegion);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (error) {
        return <div className="text-red-500 text-center py-10">Error: {error}</div>;
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">Medical Devices & Supplements</h1>
            <p className="text-muted-foreground mb-8">
                Browse our collection of medical grade devices and supplements.
            </p>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="space-y-4">
                            <Skeleton className="h-[250px] w-full rounded-xl" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard key={product._id} product={product} userRegion={userRegion} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-muted-foreground">
                            No products found.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CatalogPage;
