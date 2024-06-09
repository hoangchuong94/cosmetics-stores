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
    <Link className={`block ${className}`} href={href} prefetch={true}>
      <Image
        src={urlStatic}
        alt={alt}
        priority
        width={100}
        height={100}
        quality={100}
      />
    </Link>
  );
};

export default Logo;
