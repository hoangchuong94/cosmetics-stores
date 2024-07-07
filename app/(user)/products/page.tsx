import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
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

export default function ProductPage() {
    return (
        <div className="border border-t-black/10 px-5 py-20">
            <p>Home / Skin Care</p>
            <h1 className="my-6 text-5xl">Skin Care</h1>
            <div className="flex items-center justify-between">
                <p className="font-serif ">
                    Showing 1–8 of 13 results Default sorting
                </p>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Default value" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">
                            Sort by popularity
                        </SelectItem>
                        <SelectItem value="dark">Sort by latest</SelectItem>
                        <SelectItem value="system">
                            Sort by price: low to high
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
