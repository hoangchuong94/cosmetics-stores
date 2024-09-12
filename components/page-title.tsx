import React from 'react';
import Link from 'next/link';
import { lusitana } from '@/lib/font';

interface PageTitleProps {
    label: string;
    href?: string;
    className?: string;
}

export default function PageTitle({ label, href, className }: PageTitleProps) {
    return (
        <div>
            {href ? (
                <Link
                    href={href}
                    className={`mb-2 p-5 text-center text-4xl text-zinc-800 ${lusitana.className}`}
                >
                    {label}
                </Link>
            ) : (
                <h1
                    className={`mb-2 p-5 text-center text-4xl text-zinc-800 ${lusitana.className}`}
                >
                    {label}
                </h1>
            )}
        </div>
    );
}
