import { marcellus } from '@/lib/font';
import Providers from './Providers';
import { cn } from '@/lib/utils';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={cn(`${marcellus.className} antialiased`, {
                    'debug-screens': process.env.NODE_ENV === 'development',
                })}
            >
                <Providers>{children}</Providers>
                <Toaster />
            </body>
        </html>
    );
}
