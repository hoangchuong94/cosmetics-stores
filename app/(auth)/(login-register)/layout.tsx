import Image from 'next/image';
import bgAuth from '@/public/static/bg-auth.jpg';

export default function AuthenticationLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
            <div className="mx-auto flex min-h-screen md:max-w-screen-lg">
                <div className="m-auto flex w-full p-4">
                    <div className="hidden h-[inherit] w-6/12 md:block">
                        <Image
                            className="h-full w-full rounded-l-3xl object-cover"
                            src={bgAuth}
                            alt="background auth"
                            quality={100}
                            priority
                        />
                    </div>
                    <div className="min-h-[651px] w-full md:w-6/12">
                        {children}
                    </div>
                </div>
            </div>
        </main>
    );
}
