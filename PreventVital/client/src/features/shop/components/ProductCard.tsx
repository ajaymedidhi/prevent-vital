import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';
import RegionBadge from './RegionBadge';
import { Product } from '@/store/shopSlice';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/shopSlice';
import { useToast } from "@/components/ui/use-toast";

interface ProductCardProps {
    product: Product;
    userRegion: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, userRegion }) => {
    const dispatch = useDispatch();
    const { toast } = useToast();
    const mainImage = product.images?.[0] || product.image || '/placeholder.png'; // Fallback

    // Logic to determine if user can buy (double check even if filter hides it)
    // But strictly `CatalogPage` hides it. `RegionBadge` is for info.

    return (
        <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative aspect-square">
                <img
                    src={mainImage}
                    alt={product.name}
                    className="object-cover w-full h-full"
                />
                {product.stock <= 0 && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                        <Badge variant="destructive" className="text-lg">Out of Stock</Badge>
                    </div>
                )}
            </div>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <CardTitle className="line-clamp-1 text-lg" title={product.name}>{product.name}</CardTitle>
                        <CardDescription className="capitalize">{product.category.replace('_', ' ')}</CardDescription>
                    </div>
                    <RegionBadge allowedRegions={product.allowedRegions} userRegion={userRegion} />
                </div>
            </CardHeader>
            <CardContent className="flex-1">
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">₹{product.price}</span>
                    {product.mrp && product.mrp > product.price && (
                        <span className="text-sm text-muted-foreground line-through">₹{product.mrp}</span>
                    )}
                </div>
            </CardContent>
            <CardFooter className="gap-2">
                <Button asChild variant="outline" className="flex-1">
                    <Link to={`/products/${product.slug}`}>Details</Link>
                </Button>
                <Button
                    className="flex-1"
                    disabled={product.stock <= 0}
                    onClick={() => {
                        dispatch(addToCart(product));
                        toast({
                            title: "Added to Cart",
                            description: `${product.name} has been added to your cart.`,
                        });
                    }}
                >
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;
