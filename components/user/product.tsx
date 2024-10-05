import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingBag } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ProductWithDetails } from '@/types';

interface ProductProps {
    product: ProductWithDetails;
}

export default function Product({ product }: ProductProps) {
    return (
        <Card className="rounded-none border border-none shadow-none">
            <CardContent className="p-0">
                <Link href={`/products/${product.name}`}>
                    <div className="relative min-h-96">
                        <Image
                            alt={`image product ${product.name}`}
                            src={product.thumbnail}
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw"
                            fill
                            priority
                            style={{ objectFit: 'cover' }}
                        />
                        <div className="group absolute inset-0">
                            <div className="flex h-24 flex-row items-start justify-between p-6">
                                <div className="flex h-8 w-16 items-center justify-center rounded-2xl bg-white text-sm shadow-2xl ">
                                    <span>Sale !</span>
                                </div>
                                <div className="hidden rounded-full bg-white p-2 shadow-2xl group-hover:flex">
                                    <ShoppingBag />
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </CardContent>
            <CardFooter className="p-0">
                <div className="flex flex-col">
                    <div className="mt-2 flex ">
                        <Star className="h-4 w-4 stroke-1 sm:h-6 sm:w-6" />
                        <Star className="h-4 w-4 stroke-1 sm:h-6 sm:w-6" />
                        <Star className="h-4 w-4 stroke-1 sm:h-6 sm:w-6" />
                        <Star className="h-4 w-4 stroke-1 sm:h-6 sm:w-6" />
                        <Star className="h-4 w-4 stroke-1 sm:h-6 sm:w-6" />
                    </div>
                    <Link href={`/products/${product.name}`}>
                        <p className="mt-2 font-serif">{product.name}</p>
                    </Link>
                    <div className="mt-2 flex items-center justify-start font-sans font-semibold">
                        <p
                            className={`${product.promotions.length > 0 && 'text-gray-400 line-through'}`}
                        >
                            ${product.price}
                        </p>
                        {/* {sale && <p className="ml-2 text-sm text-black">${sale}</p>} */}
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
