import Image from 'next/image';
import { Suspense } from 'react';
import Loading from './loading';
import bgAuth from '@/public/static/bg-auth.jpg';

export default function AuthenticationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-screen">
      <div className="flex h-full w-full bg-red-300 p-4">
        <div className="relative hidden w-6/12 md:block">
          <Image
            className="rounded-l-3xl object-cover"
            src={bgAuth}
            alt="background auth"
            fill
            priority
            quality={100}
            sizes="100vw"
          />
        </div>
        <div className="w-full md:w-6/12">{children}</div>
      </div>
    </main>
  );
}
