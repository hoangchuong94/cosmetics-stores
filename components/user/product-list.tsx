import React from 'react';
import Product from '@/components/user/product';
import { ProductType } from '@/types';

interface Props {
    products: ProductType[];
}

export default function ProductList({ products }: Props) {
    return (
        <div className="grid grid-cols-2 gap-4 py-6 md:grid md:grid-cols-3 lg:grid lg:grid-cols-4">
            {products.map((product: any) => (
                <Product product={product} key={product.id} />
            ))}
        </div>
    );
}
