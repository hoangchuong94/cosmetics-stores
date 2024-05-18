import React from 'react';

import ProductList from '@/components/product-list';
import product1 from '/public/products/product-1.jpg';
import product2 from '/public/products/product-2.jpg';
import product3 from '/public/products/product-3.jpg';
import product4 from '/public/products/product-4.jpg';
const products = [
    {
        id: '1',
        image: product1,
        name: 'product name 1',
        description: 'product description',
        price: 59.0,
        sale: 10,
        star: 4,
    },
    {
        id: '2',
        image: product2,
        name: 'product name 1',
        description: 'product description',
        price: 59.0,
        sale: 10,
        star: 4,
    },
    {
        id: '3',
        image: product3,
        name: 'product name 1',
        description: 'product description',
        price: 59.0,
        sale: 10,
        star: 4,
    },
    {
        id: '4',
        image: product4,
        name: 'product name 1',
        description: 'product description',
        price: 59.0,
        sale: 10,
        star: 4,
    },
];

export default function BestSaleProducts() {
    return (
        <div className="mb-40 mt-10">
            <div className="flex flex-col items-center py-10 capitalize">
                <h6 className="text-[#5d5b5b]">shop</h6>
                <h2 className="text-3xl">best selling</h2>
            </div>
            <ProductList products={products} />
        </div>
    );
}
