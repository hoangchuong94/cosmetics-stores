import React from 'react';

import ProductList from '@/components/user/product-list';
import product1 from '/public/products/product-1.jpg';
import product2 from '/public/products/product-2.jpg';
import product3 from '/public/products/product-3.jpg';
import product4 from '/public/products/product-4.jpg';
const products = [
    {
        id: '1',
        name: 'Sample Product',
        description: 'This is a sample product.',
        type: 'Electronics',
        image: product1,
        price: 99.99,
        sale: 20,
        star: 5,
        quantity: 10,
    },
    {
        id: '2',
        name: 'Sample Product',
        description: 'This is a sample product.',
        type: 'Electronics',
        image: product2,
        price: 99.99,
        sale: 20,
        star: 5,
        quantity: 10,
    },
    {
        id: '3',
        name: 'Sample Product',
        description: 'This is a sample product.',
        type: 'Electronics',
        image: product3,
        price: 99.99,
        sale: 20,
        star: 5,
        quantity: 10,
    },
    {
        id: '4',
        name: 'Sample Product',
        description: 'This is a sample product.',
        type: 'Electronics',
        image: product4,
        price: 99.99,
        sale: 20,
        star: 5,
        quantity: 10,
    },
];

export default function BestSaleProducts() {
    return (
        <div className="mb-40 mt-10">
            <div className="flex flex-col items-center py-10 capitalize">
                <h6 className="text-[#5d5b5b]">shop</h6>
                <h2 className="text-3xl">best selling</h2>
            </div>
            {/* <ProductList products={products} /> */}
        </div>
    );
}
