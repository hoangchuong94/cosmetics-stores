import React from 'react';
import Logo from '@/components/logo';
import { StaticImageData } from 'next/image';
import { Separator } from '@/components/ui/separator';
import logoImage from '@/public/static/logo-retina.png';

interface HeaderProps {
    label: string;
}

export default function HeaderAuth({ label }: HeaderProps) {
    return (
        <div>
            <Logo
                className="w-28"
                alt="logo auth"
                href="/"
                urlStatic={logoImage}
            />
            <div className="text-center text-5xl font-extrabold">
                <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                    {label}
                </span>
            </div>
            <Separator className="mt-5 bg-slate-500" />
        </div>
    );
}
