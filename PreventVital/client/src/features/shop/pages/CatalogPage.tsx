import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Product } from '@/store/shopSlice';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CatalogPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [userRegion, setUserRegion] = useState<string>('IN');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

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

        if (searchTerm) {
            result = result.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        setFilteredProducts(result);
    }, [activeCategory, searchTerm, products]);

    const categories = ['All', 'Wearables', 'Test Kits', 'Supplements']; // Can be dynamic later

    if (error) {
        return <div className="text-red-500 text-center py-20 bg-red-50 rounded-lg mx-auto max-w-lg mt-10">
            <h3 className="font-bold text-lg mb-2">Oops!</h3>
            <p>{error}</p>
        </div>;
    }

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* HERO BANNER */}
            <div className="relative bg-[#020817] text-white py-20 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center opacity-20 filter blur-sm"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#020817] via-[#0b162e] to-transparent"></div>

                <div className="container relative mx-auto px-4 z-10">
                    <div className="max-w-2xl">
                        <span className="text-indigo-400 font-bold tracking-wider uppercase text-sm mb-2 block animate-in fade-in slide-in-from-left-4 duration-500">Official Store</span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
                            Premium Health Tech <br /><span className="text-indigo-400">For a Better You.</span>
                        </h1>
                        <p className="text-lg text-gray-300 mb-8 max-w-xl animate-in fade-in slide-in-from-bottom-5 duration-900">
                            Discover clinical-grade wearables, advanced supplements, and home testing kits curated by medical experts.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto py-10 px-4">
                {/* FILTERS & SEARCH BAR */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10 sticky top-[70px] z-30 bg-white/80 backdrop-blur-md p-4 rounded-xl border border-gray-100 shadow-sm">

                    {/* Category Tabs */}
                    <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${activeCategory === cat
                                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-[350px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                            type="text"
                            placeholder="Search products..."
                            className="pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors rounded-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* PRODUCT GRID */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="space-y-4">
                                <Skeleton className="h-[300px] w-full rounded-2xl bg-gray-200" />
                                <div className="space-y-2">
                                    <Skeleton className="h-5 w-3/4 bg-gray-200" />
                                    <Skeleton className="h-4 w-1/2 bg-gray-200" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <div key={product._id} className="animate-in fade-in zoom-in-95 duration-500">
                                        <ProductCard product={product} userRegion={userRegion} />
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full py-24 text-center">
                                    <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                                        <Search size={40} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                                    <p className="text-gray-500">Try adjusting your search or category filters.</p>
                                    <Button
                                        variant="link"
                                        className="mt-2 text-indigo-600"
                                        onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                                    >
                                        Clear all filters
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
