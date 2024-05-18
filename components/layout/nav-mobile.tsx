'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import AccordionWrapped from '@/components/accordion-wrapper';
import { listCategory } from '@/data/placeholder';
import Link from 'next/link';

export default function NavMobile() {
    const [showMenuMobile, setShowMenuMobile] = useState(false);

    return (
        <>
            <Toggle
                className="p-0 md:hidden hover:bg-red-200 hover:text-white data-[state=on]:bg-red-200 data-[state=on]:bg-text-white"
                onClick={() => setShowMenuMobile(!showMenuMobile)}
            >
                {!showMenuMobile ? (
                    <Menu className="h-8 w-8 text-red-200 hover:text-white" />
                ) : (
                    <X className="h-8 w-8 text-red-200 hover:text-white" />
                )}
            </Toggle>
            {showMenuMobile && (
                <div className="md:hidden absolute z-50 right-0 top-20 flex w-full flex-col bg-white border border-t-[#e5e7eb] shadow-md">
                    {listCategory.map((category) => (
                        <AccordionWrapped
                            trigger={category.name}
                            value={category.id}
                            key={category.id}
                            className="bg-red-100/50"
                        >
                            {category.subcategories.map((subcategory) => (
                                <AccordionWrapped
                                    trigger={subcategory.name}
                                    value={subcategory.id}
                                    key={subcategory.id}
                                    className="bg-slate-100 mx-[-20px] border-yellow-50 border"
                                >
                                    <ul>
                                        {subcategory.products.map((product) => (
                                            <li
                                                key={product.id}
                                                className="py-5 px-5 border hover:bg-orange-200/20 hover:underline hover:underline-offset-1 transition-all border-y-slate-200 border-x-0  mx-[-20px]"
                                            >
                                                <Link
                                                    href={product.href}
                                                    className="block"
                                                >
                                                    {product.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </AccordionWrapped>
                            ))}
                        </AccordionWrapped>
                    ))}
                </div>
            )}
        </>
    );
}
