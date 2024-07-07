import { SessionProvider } from 'next-auth/react';
import { EdgeStoreProvider } from '@/lib/edgestore';

import React from 'react';

const Providers = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <SessionProvider>
            <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </SessionProvider>
    );
};

export default Providers;
