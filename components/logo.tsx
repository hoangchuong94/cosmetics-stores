import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React from 'react';

export interface LogoProps {
    alt: string;
    href: string;
    urlStatic: StaticImageData;
    className?: string;
}

const Logo = ({ alt, href, urlStatic, className }: LogoProps) => {
    return (
        <Link href={href}>
            <Image src={urlStatic} alt={alt} className={className} priority />
        </Link>
    );
};

export default Logo;
