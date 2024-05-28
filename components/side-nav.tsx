import React from "react";
import Link from "next/link";
import Logo from "@/components/logo";
import logoImage from "@/public/static/logo-retina.png";
import { Home, Users, BarChart2, Settings } from "lucide-react";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: <Home className="w-5" /> },
  { name: "Users", href: "/dashboard", icon: <Users className="w-5" /> },
  {
    name: "Analytics",
    href: "/dashboard",
    icon: <BarChart2 className="w-5" />,
  },
  { name: "Settings", href: "/dashboard", icon: <Settings className="w-5" /> },
];
const SideNav = () => {
  return (
    <div className="h-full">
      <ul>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="p-5 hover:bg-slate-300 hover:text-white hover:cursor-pointer"
          >
            <Link href={item.href}>
              <div className="flex flex-row">
                <span className="mr-3">{item.icon}</span>
                <h3 className="md:block hidden">{item.name}</h3>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideNav;
