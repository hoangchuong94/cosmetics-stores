import Header from '@/components/user/header';
import Footer from '@/components/user/footer';
import { Viewport } from 'next';

export const viewport: Viewport = {
    maximumScale: 1,
};
export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}
