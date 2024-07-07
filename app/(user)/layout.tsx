import Header from '@/components/user/header';
import Footer from '@/components/user/footer';
import { Viewport } from 'next';

export const viewport: Viewport = {
    maximumScale: 1,
    width: 'device-width',
};
export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {/* <Header />
      {children}
      <Footer /> */}
            {children}
        </>
    );
}
