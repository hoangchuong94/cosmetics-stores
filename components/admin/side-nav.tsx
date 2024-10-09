import React from 'react';
import logoImage from '@/public/static/logo-retina.png';
import Logo from '@/components/logo';
import AccordionWrapped from '@/components/accordion-wrapper';
import Link from 'next/link';
import { auth } from '@/auth';
import Account from '@/components/account';

const menuItems = [
    {
        id: '1',
        name: 'Dashboard',
        subMenu: [
            {
                id: '1',
                name: 'product',
                href: '/dashboard/product',
            },
        ],
    },
    {
        id: '2',
        name: 'Users',
        subMenu: [
            {
                id: '1',
                name: 'user',
                href: '/user',
            },
        ],
    },
    {
        id: '3',
        name: 'Analytics',
        subMenu: [
            {
                id: '1',
                name: 'Dashboard',
                href: '/dashboard',
            },
            { id: '1', name: 'Dashboard', href: '/dashboard' },
        ],
    },
    {
        id: '4',
        name: 'Settings',
        subMenu: [
            {
                id: '1',
                name: 'Dashboard',
                href: '/dashboard',
            },
            {
                id: '2',
                name: 'Dashboard',
                href: '/dashboard',
            },
            {
                id: '3',
                name: 'Dashboard',
                href: '/dashboard',
            },
            {
                id: '4',
                name: 'Dashboard',
                href: '/dashboard',
            },
            {
                id: '5',
                name: 'Dashboard',
                href: '/dashboard',
            },
        ],
    },
];
const SideNav = async () => {
    const session = await auth();
    return (
        <div className="custom-scrollbar flex h-full w-full flex-wrap overflow-y-auto overflow-x-hidden bg-slate-500/50 p-3">
            <div className="flex max-w-72 flex-1 flex-col items-center justify-between rounded-3xl bg-gradient-to-r from-indigo-300 to-red-50">
                <div className="w-full">
                    <div className="flex w-full items-center justify-center py-4">
                        <Logo
                            alt="logo header"
                            href="/"
                            urlStatic={logoImage}
                            className="light-logo h-auto max-w-24"
                        />
                    </div>
                    <div className="flex h-auto flex-col text-cyan-950 mix-blend-multiply">
                        {menuItems.map((item) => (
                            <AccordionWrapped
                                trigger={item.name}
                                value={item.id}
                                key={item.id}
                                className="bg-red-100/50"
                            >
                                <ul className="cursor-pointer">
                                    {item.subMenu.map((subMenu) => (
                                        <li
                                            key={subMenu.id}
                                            className="mx-[-20px] border border-x-0 border-y-slate-200 bg-gray-100/50 px-5 py-5 hover:bg-blue-100/60 hover:underline hover:underline-offset-4"
                                        >
                                            <Link
                                                href={subMenu.href}
                                                className="block"
                                            >
                                                {subMenu.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </AccordionWrapped>
                        ))}
                    </div>
                </div>
                <div className="flex w-full items-center justify-center border-t border-t-slate-300 px-2 py-4">
                    {session?.user && <Account user={session.user} />}
                </div>
            </div>
        </div>
    );
};

export default SideNav;
