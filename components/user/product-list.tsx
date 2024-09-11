import React from 'react';
import Product from '@/components/user/product';
import type { ProductWithDetails } from '@/types';

interface ProductListProps {
    products: ProductWithDetails[];
}

export default async function ProductList({ products }: ProductListProps) {
    return (
        <div className="grid grid-cols-2 gap-4 py-6 md:grid md:grid-cols-3 lg:grid lg:grid-cols-4">
            {products.length > 0 &&
                products.map((product) => (
                    <Product product={product} key={product.id} />
                ))}
        </div>
    );
}
