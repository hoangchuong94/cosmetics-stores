import lgoImage from '@/public/static/logo-retina.png';
import Logo from '@/components/logo';
import Account from '@/components/account';
import { fetchCategories } from '@/data/fetch-categories';
import ShoppingCard from './shopping-cart';
import Navbar from './nav-bar';
import NavMobile from './nav-mobile';
import { auth } from '@/auth';
import Link from 'next/link';
import { User } from 'lucide-react';

export default async function Header() {
  const categories = await fetchCategories();
  const session = await auth();

  return (
    <header className="fixed z-50 min-w-full bg-white px-5 shadow-lg">
      <div className="flex h-20 items-center justify-between">
        <Logo
          alt="logo header"
          href="/"
          urlStatic={lgoImage}
          className="mr-3 h-auto w-24"
        />
        <Navbar categories={categories} />
        <div className="flex h-full items-center justify-between">
          <ShoppingCard />
          <div className="hidden md:block">
            {session?.user ? (
              <Account user={session.user} />
            ) : (
              <>
                <Link href={'/login'}>
                  <User />
                </Link>
              </>
            )}
          </div>
          <NavMobile categories={categories} user={session?.user} />
        </div>
      </div>
    </header>
  );
}
