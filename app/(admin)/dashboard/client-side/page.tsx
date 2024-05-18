'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCurrentUser } from '@/hooks/use-current-user';
export default function Profile() {
    const useClient = useCurrentUser();
    return (
        <>
            {useClient ? (
                <div className="flex items-center gap-8">
                    <Image
                        src={useClient.image || ''}
                        alt={`profile photo of ${useClient.name}`}
                        width={90}
                        height={90}
                    />
                    <div className="mt-8">
                        <p className="mb-3">ID: {useClient.id}</p>
                        <p className="mb-3">Name: {useClient.name}</p>
                        <p className="mb-3">Email: {useClient.email}</p>
                    </div>
                </div>
            ) : (
                <h1>no session</h1>
            )}
        </>
    );
}
