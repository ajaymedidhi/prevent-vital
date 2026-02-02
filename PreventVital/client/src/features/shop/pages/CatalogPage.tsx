import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import StoreHero from '../components/StoreHero';
import { Product } from '@/store/shopSlice';
import { Skeleton } from '@/components/ui/skeleton';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CatalogPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [userRegion, setUserRegion] = useState<string>('IN');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('/api/shop/products');
                setProducts(res.data.data.products);
                setFilteredProducts(res.data.data.products);
                setUserRegion(res.data.userRegion);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Effect to filter products
    useEffect(() => {
        let result = products;

        if (activeCategory !== 'All') {
            result = result.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase().replace(/ /g, '_'));
        }

        setFilteredProducts(result);
    }, [activeCategory, products]);

    const categories = ['All', 'Wearables', 'Test Kits', 'Supplements'];

    if (error) {
        return <div className="text-red-500 text-center py-20 bg-red-50 rounded-lg mx-auto max-w-lg mt-10">
            <h3 className="font-bold text-lg mb-2">Oops!</h3>
            <p>{error}</p>
        </div>;
    }

    return (
        <div className="min-h-screen bg-white">
            {/* HERO SECTION */}
            <StoreHero />

            <div className="container mx-auto pb-20 px-4 md:px-6">
                {/* FILTER BAR */}
                <div className="flex items-center gap-4 mb-8 mt-8 overflow-x-auto no-scrollbar pb-2">
                    <div className="text-gray-400">
                        <Filter size={20} />
                    </div>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-sm border ${activeCategory === cat
                                ? 'bg-indigo-600 text-white border-indigo-600'
                                : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* PRODUCT GRID */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="space-y-4">
                                <Skeleton className="h-[300px] w-full rounded-2xl bg-gray-100" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <div key={product._id} className="animate-in fade-in zoom-in-95 duration-500 h-full">
                                        <ProductCard product={product} userRegion={userRegion} />
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full py-24 text-center">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                                    <Button
                                        variant="link"
                                        className="mt-2 text-indigo-600"
                                        onClick={() => setActiveCategory('All')}
                                    >
                                        Clear filters
                                    </Button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CatalogPage;
