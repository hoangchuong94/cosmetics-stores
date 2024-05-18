import Link from 'next/link';
import React from 'react';

export default function page() {
    return (
        <div className="flex items-center justify-center">
            <h1 className="">Something wrong .</h1>
            <p>
                Click{' '}
                <Link href={'/'} className="border border-b-blue-400">
                    here
                </Link>{' '}
                back to home
            </p>
        </div>
    );
}
