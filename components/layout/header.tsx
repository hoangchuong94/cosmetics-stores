import lgoImage from "@/public/static/logo-retina.png";
import Logo from "@/components/logo";
import Account from "@/components/account";
import ShoppingCardIcon from "@/components/layout/shopping-cart";
import NavMobile from "@/components/layout/nav-mobile";
import Navbar from "@/components/layout/nav-bar";
import { fetchCategories } from "@/data/fetch-categories";

export default async function Header() {
  const categories = await fetchCategories();
  return (
    <header className="min-w-full bg-white px-5 fixed z-50 shadow-lg">
      <div className="flex h-20 items-center justify-between">
        <Logo
          alt="logo header"
          href="/"
          urlStatic={lgoImage}
          className="mr-3 h-auto w-24"
        />
        <Navbar categories={categories} />
        <div className="flex h-full items-center justify-between">
          <ShoppingCardIcon />
          <Account
            className="hidden md:block"
            src="/customers/amy-burns.png"
            labelFallback="AV"
            alt="user avatar"
          />
          <NavMobile categories={categories} />
        </div>
      </div>
    </header>
  );
}
