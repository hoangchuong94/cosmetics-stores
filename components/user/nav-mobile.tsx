'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { LogOut, Menu, X } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import AccordionWrapped from '@/components/accordion-wrapper';
import { CategoryWithDetails } from '@/types';
import { signOut } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CustomTypeUser } from '@/types';
import { Button } from '@/components/ui/button';

interface NavbarProps {
    categories: CategoryWithDetails[];
    user: CustomTypeUser | undefined;
}

export default function NavMobile({ categories, user }: NavbarProps) {
    const [showMenuMobile, setShowMenuMobile] = useState(false);
    let nameFallback = '';
    if (user && user.name) {
        nameFallback = user.name.charAt(0);
    }

    return (
        <>
            <Toggle
                className="data-[state=on]:bg-text-white p-0 hover:bg-red-200 hover:text-white data-[state=on]:bg-red-200 md:hidden"
                onClick={() => setShowMenuMobile(!showMenuMobile)}
            >
                {!showMenuMobile ? (
                    <Menu className="h-8 w-8 text-red-200 hover:text-white" />
                ) : (
                    <X className="h-8 w-8 text-white hover:text-white" />
                )}
            </Toggle>
            {showMenuMobile && (
                <div className="absolute right-0 top-20 z-50 flex max-h-screen w-full flex-col overflow-y-auto border border-t-[#e5e7eb] bg-white shadow-md md:hidden">
                    {categories.length > 0 &&
                        categories.map((category) => (
                            <AccordionWrapped
                                trigger={category.name}
                                value={category.id}
                                key={category.id}
                                className="bg-red-100/50"
                            >
                                {category.subCategories.map((subcategory) => (
                                    <AccordionWrapped
                                        trigger={subcategory.name}
                                        value={subcategory.id}
                                        key={subcategory.id}
                                        className="mx-[-20px] border border-yellow-50 bg-slate-100"
                                    >
                                        <ul>
                                            {subcategory.detailCategories.map(
                                                (detailCategory) => (
                                                    <li
                                                        key={detailCategory.id}
                                                        className="mx-[-20px] border border-x-0 border-y-slate-200 px-5 py-5 transition-all hover:bg-orange-200/20 hover:underline hover:underline-offset-1"
                                                    >
                                                        <Link
                                                            href={'/'}
                                                            className="block"
                                                        >
                                                            {
                                                                detailCategory.name
                                                            }
                                                        </Link>
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </AccordionWrapped>
                                ))}
                            </AccordionWrapped>
                        ))}
                    {user ? (
                        <>
                            <AccordionWrapped
                                trigger={
                                    <div className="mx-[-8px] flex items-center justify-center">
                                        <Avatar className="mr-3">
                                            <AvatarImage
                                                src={user.image || ''}
                                                alt={user.name || ''}
                                            />
                                            <AvatarFallback>
                                                {nameFallback}
                                            </AvatarFallback>
                                        </Avatar>
                                        <p>{user.name}</p>
                                    </div>
                                }
                                value={user.name || ''}
                            >
                                <ul>
                                    <li className="mx-[-20px] border border-x-0 border-y-slate-200 px-5 py-5 transition-all hover:bg-orange-200/20 hover:underline hover:underline-offset-1">
                                        <div className="flex flex-row">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <Button onClick={() => signOut()}>
                                                Sign out
                                            </Button>
                                        </div>
                                    </li>
                                </ul>
                            </AccordionWrapped>
                        </>
                    ) : (
                        <div className="flex justify-center px-5 py-10">
                            <Link
                                href={'/login'}
                                className="uppercase hover:underline hover:underline-offset-4"
                            >
                                sign in
                            </Link>
                            <span className="mx-5">|</span>
                            <Link
                                href={'/register'}
                                className="uppercase hover:underline hover:underline-offset-4"
                            >
                                sign up
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
