import lgoImage from "@/public/static/logo-retina.png";
import Logo from "@/components/logo";
import Account from "@/components/account";

export default async function Header() {
  return (
    <header className="min-w-full bg-white px-5 border-b-2 border-b-slate-300">
      <div className="flex h-20 items-center justify-between">
        <Logo
          alt="logo header"
          href="/"
          urlStatic={lgoImage}
          className="mr-3 h-auto w-24"
        />
        <div className="min-w-80">
          <form action="">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                className="w-full py-2 px-4 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-transparent focus:shadow-lg"
                placeholder="Search..."
              />
              <button className="absolute right-0 top-0 mt-2 mr-2">
                <svg
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </button>
            </div>
          </form>
        </div>
        <div className="flex h-full items-center justify-between">
          <Account
            className="hidden md:block"
            src="/customers/amy-burns.png"
            labelFallback="AV"
            alt="user avatar"
          />
        </div>
      </div>
    </header>
  );
}
