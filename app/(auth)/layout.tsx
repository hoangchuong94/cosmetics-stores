import Image from 'next/image';
import bgAuth from '@/public/static/bg-auth.jpg';

export default function AuthenticationLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
