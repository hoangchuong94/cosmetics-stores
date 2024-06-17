import VerificationSkeleton from '@/components/loading-and-stream/verification-skeleton';

export default function AuthenticationLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="bg-slate-300">
            <div className="mx-auto flex min-h-screen md:max-w-screen-sm">
                <div className="m-auto flex w-full p-4">
                    <div className="w-full rounded-xl border border-gray-900 ">
                        <div className="p-5">{children}</div>
                    </div>
                </div>
            </div>
        </main>
    );
}
