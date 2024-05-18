import Image from 'next/image';

import Logo from '@/components/logo';
import bgRegisterPage from '/public/static/bg-registration-form-1.jpg';

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="flex min-h-screen items-center justify-center ">
            {children}
        </main>
    );
}
