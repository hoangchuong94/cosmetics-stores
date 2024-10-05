'use client';
import React from 'react';
import { Slash } from 'lucide-react';
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { usePathname } from 'next/navigation';

export default function LinkHierarchy() {
    const router = usePathname();
    const segments = router.split('/').filter((segment) => segment !== '');
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {segments.map((segment, index) => (
                    <React.Fragment key={index}>
                        {index !== 0 && (
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>
                        )}
                        <BreadcrumbItem className="text-[12px]">
                            {index !== segments.length - 1 ? (
                                <BreadcrumbLink
                                    href={`/${segments.slice(0, index + 1).join('/')}`}
                                >
                                    <p className="uppercase text-stone-950 hover:underline hover:underline-offset-4">
                                        {segment}
                                    </p>
                                </BreadcrumbLink>
                            ) : (
                                <p className="cursor-default uppercase text-red-300">
                                    {segment}
                                </p>
                            )}
                        </BreadcrumbItem>
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
