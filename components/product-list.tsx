import { Product as ProductType } from '@/types';
import React from 'react';
import Product from './product';

type ProductListProps = {
    products: ProductType[];
};

export default function ProductList({ products }: ProductListProps) {
    return (
        <div className="grid grid-cols-2 gap-4 py-6 md:grid md:grid-cols-3 lg:grid lg:grid-cols-4">
            {products.map((product) => (
                <Product
                    key={product.id}
                    id={product.id}
                    image={product.image}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    star={product.star}
                    sale={product.sale}
                />
            ))}
        </div>
    );
}
