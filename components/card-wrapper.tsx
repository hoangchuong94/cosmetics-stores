import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { StaticImageData } from 'next/image';
import Header from '@/components/auth/header';
import Footer from '@/components/auth/footer';

interface CardWrapperProps {
  headerLabel: string;
  footerLabel: string;
  footerHref: string;
  children: React.ReactNode;
  className: string;
}

export default function CardWrapper({
  headerLabel,
  footerLabel,
  footerHref,
  children,
  className,
}: CardWrapperProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <Footer href={footerHref} label={footerLabel} />
      </CardFooter>
    </Card>
  );
}
