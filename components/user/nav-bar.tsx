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
import { Category } from '@/types';
import Link from 'next/link';

interface NavbarProps {
    categories: Category[];
}

const components: { title: string; href: string; description: string }[] = [
    {
        title: 'Alert Dialog',
        href: '/docs/primitives/alert-dialog',
        description:
            'A modal dialog that interrupts the user with important content and expects a response.',
    },
    {
        title: 'Hover Card',
        href: '/docs/primitives/hover-card',
        description:
            'For sighted users to preview content available behind a link.',
    },
    {
        title: 'Progress',
        href: '/docs/primitives/progress',
        description:
            'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
    },
    {
        title: 'Scroll-area',
        href: '/docs/primitives/scroll-area',
        description: 'Visually or semantically separates content.',
    },
    {
        title: 'Tabs',
        href: '/docs/primitives/tabs',
        description:
            'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
    },
    {
        title: 'Tooltip',
        href: '/docs/primitives/tooltip',
        description:
            'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
    },
];

export default function Navbar({ categories }: NavbarProps) {
    return (
        <NavigationMenu className="z-20 hidden font-sans md:block">
            <NavigationMenuList>
                {categories.map((category) => (
                    <NavigationMenuItem key={category.id}>
                        <NavigationMenuTrigger className="max-[800]:px2 font-normal uppercase transition-all hover:bg-slate-100">
                            {category.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 bg-white p-4 uppercase md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                {category.subCategories.map((subcategory) => (
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
                                ))}
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
