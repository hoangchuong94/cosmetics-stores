import React from 'react';
import Product from '@/components/user/product';
import type { ProductWithDetails } from '@/types';

interface ProductListProps {
    products: ProductWithDetails[] | null;
}

export default function ProductList({ products }: ProductListProps) {
    return (
        <div>
            {products && products.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 py-6 md:grid md:grid-cols-3 lg:grid lg:grid-cols-4">
                    {products.map((product) => (
                        <Product product={product} key={product.id} />
                    ))}
                </div>
            ) : (
                <div className="flex min-h-96 items-center justify-center bg-slate-300 font-sans text-xl text-red-400">
                    <p>
                        No products have been added yet. Please log in with
                        admin rights for more details.
                    </p>
                </div>
            )}
        </div>
    );
}
