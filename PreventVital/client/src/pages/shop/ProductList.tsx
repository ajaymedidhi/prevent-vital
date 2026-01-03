import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/shopSlice';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('http://localhost:3000/api/shop/products')
            .then(res => {
                console.log("Products Fetched:", res.data);
                setProducts(res.data.data.products);
            })
            .catch(err => {
                console.error("Fetch Error:", err);
                setError(err.message || "Failed to load products");
            });
    }, []);

    if (error) {
        return <div className="text-center text-red-500 p-10">Error: {error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-8">Medical Devices & Programs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {products.map((product: any) => (
                    <div key={product._id} className="bg-white rounded-xl shadow-sm border p-4 flex flex-col">
                        <img src={product.image} alt={product.name} className="h-48 w-full object-cover rounded-md mb-4" />
                        <h3 className="text-xl font-semibold">{product.name}</h3>
                        <p className="text-gray-500 text-sm mb-4">{product.description}</p>
                        <div className="mt-auto flex justify-between items-center">
                            <span className="text-lg font-bold">₹{product.price}</span>
                            <button
                                onClick={() => dispatch(addToCart(product))}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8 text-center">
                <Link to="/cart" className="text-blue-600 hover:underline">View Cart</Link>
            </div>
        </div>
    );
};

export default ProductList;
