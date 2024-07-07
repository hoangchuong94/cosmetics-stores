import Header from '@/components/user/header';
import Footer from '@/components/user/footer';

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
