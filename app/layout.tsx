import { marcellus } from '@/lib/font';
import Providers from './Providers';
import { cn } from '@/lib/utils';
import './globals.css';

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
            </body>
        </html>
    );
}
