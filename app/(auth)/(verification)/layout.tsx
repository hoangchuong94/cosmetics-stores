import Image from 'next/image';
import bgAuth from '@/public/static/bg-auth.jpg';

export default function AuthenticationLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="bg-slate-300">
            <div className="mx-auto flex min-h-screen md:max-w-screen-sm">
                <div className="m-auto flex w-full p-4">
                    <div className="w-full rounded-xl border border-gray-900 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 hover:transition-colors hover:delay-1000 hover:duration-1000 hover:ease-in-out">
                        <div className="p-5">{children}</div>
                    </div>
                </div>
            </div>
        </main>
    );
}
