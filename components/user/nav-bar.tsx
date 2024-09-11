'use client';

import React from 'react';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { CategoryWithDetails } from '@/types';

interface NavbarProps {
    categories: CategoryWithDetails[];
}

export default function Navbar({ categories }: NavbarProps) {
    return (
        <NavigationMenu className="z-20 hidden font-sans md:block">
            <NavigationMenuList>
                {categories.length > 0 &&
                    categories.map((category) => (
                        <NavigationMenuItem key={category.id}>
                            <NavigationMenuTrigger className="max-[800]:px2 font-normal uppercase transition-all hover:bg-slate-100">
                                {category.name}
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-3 bg-white p-4 uppercase md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                    {category.subCategories.map(
                                        (subcategory) => (
                                            <div key={subcategory.id}>
                                                <h3 className="select-none text-red-300">
                                                    {subcategory.name}
                                                </h3>
                                                {subcategory.detailCategories.map(
                                                    (product) => (
                                                        <div
                                                            key={product.id}
                                                            className="my-3"
                                                        >
                                                            <ListItem className="p-0 uppercase hover:cursor-pointer hover:underline hover:underline-offset-1">
                                                                {product.name}
                                                            </ListItem>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        ),
                                    )}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<'a'>,
    React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors',
                        className,
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">
                        {title}
                    </div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = 'ListItem';
