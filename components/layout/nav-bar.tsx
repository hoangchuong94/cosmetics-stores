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
import { listCategory } from '@/data/placeholder';

export default function NavigationMenuWrapper() {
    return (
        <NavigationMenu className="z-20 hidden font-sans md:block">
            <NavigationMenuList>
                {listCategory.map((category) => (
                    <NavigationMenuItem key={category.id}>
                        <NavigationMenuTrigger className="max-[800]:px2 font-normal uppercase transition-all hover:bg-slate-100 hover:text-rose-300">
                            {category.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 bg-white p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                {category.subcategories.map((subcategory) => (
                                    <div key={subcategory.id}>
                                        <h3 className="text-zinc-700">
                                            {subcategory.name}
                                        </h3>
                                        {subcategory.products.map((product) => (
                                            <ListItem
                                                key={product.id}
                                                href={product.href}
                                            >
                                                {product.name}
                                            </ListItem>
                                        ))}
                                    </div>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                ))}
                {/* <NavigationMenuItem className="rounded-md uppercase hover:bg-slate-100 hover:text-red-300 hover:underline hover:underline-offset-8">
                    <Link href="/contact" legacyBehavior passHref>
                        <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                        >
                            contact
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="rounded-md uppercase hover:bg-slate-100 hover:text-red-300 hover:underline hover:underline-offset-8">
                    <Link href="/about" legacyBehavior passHref>
                        <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                        >
                            about
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem> */}
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
