import React from 'react';
import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button';

const SettingsPage = async () => {
    const session = await auth();
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-slate-600 px-20">
            <div className=" rounded-lg bg-zinc-100 p-6">
                {session && JSON.stringify(session)}
            </div>
            <form
                className="p-16"
                action={async () => {
                    'use server';
                    await signOut();
                }}
            >
                <Button className="mt-6" type="submit">
                    Logout
                </Button>
            </form>
        </div>
    );
};

export default SettingsPage;
