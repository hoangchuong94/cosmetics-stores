import logo from '@/public/static/logo-retina.png';
import Logo from '@/components/logo';
import Account from '@/components/account';
import ShoppingCard from '@/components/user/shopping-cart';
import { User as IconUser } from 'lucide-react';
import { auth } from '@/auth';

import Link from 'next/link';
import Navbar from '@/components/user/nav-bar';
import NavMobile from '@/components/user/nav-mobile';
import { fetchCategories } from '@/data/fetch-data';
import { CustomTypeUser } from '@/types';

export default async function Header() {
    const categories = await fetchCategories();
    const session = await auth();
    const user: CustomTypeUser | undefined = session?.user;

    return (
        <header className="fixed z-50 flex w-full items-center justify-between bg-white p-5 shadow-lg">
            <Logo
                alt="logo header"
                href="/"
                urlStatic={logo}
                className="mr-3 h-auto w-24"
            />
            {/* <Navbar categories={categories} /> */}
            <div className="flex h-full items-center justify-between">
                <ShoppingCard />
                <div className="hidden md:block">
                    {session?.user ? (
                        <Account user={session.user} />
                    ) : (
                        <>
                            <Link href={'/login'}>
                                <IconUser />
                            </Link>
                        </>
                    )}
                </div>
                {/* <NavMobile categories={categories} user={user} /> */}
            </div>
        </header>
    );
}
