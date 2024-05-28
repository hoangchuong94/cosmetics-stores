import lgoImage from "@/public/static/logo-retina.png";
import Logo from "@/components/logo";
import Account from "@/components/account";
import { fetchCategories } from "@/data/fetch-categories";
import ShoppingCard from "./shopping-cart";
import Navbar from "./nav-bar";
import NavMobile from "./nav-mobile";

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
          <ShoppingCard />
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
