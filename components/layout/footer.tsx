import React from "react";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { listCategory } from "@/data/placeholder";
import lgoImage from "@/public/static/logo-retina.png";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <div className="p-5">
      <div className="flex flex-col border border-b-slate-300 bg-[#d4a6b6]/70 p-5 md:flex-row md:justify-between">
        <h3 className="text-center text-xl uppercase text-black">
          Subscribe to our newsletter
        </h3>
        <div className="flex flex-col md:flex md:flex-row md:items-center md:justify-center">
          <input
            className="my-10 border-none p-2 outline-none md:my-2"
            type="text"
            placeholder="you enter email address ..."
          />
          <Button
            className="rounded-sm bg-black uppercase text-white md:ml-2"
            size={"lg"}
            type="submit"
          >
            subscribe
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center border border-red-100 bg-[#d4a6b6]/70 p-5 md:flex-row md:justify-between">
        <Logo
          alt="logo header"
          href="/"
          urlStatic={lgoImage}
          className="h-auto w-24"
        />
        <div className="mt-8 cursor-pointer uppercase flex flex-col justify-center items-center">
          {listCategory.map((category) => (
            <div className="hover:text-white" key={category.id}>
              {category.name}
            </div>
          ))}
        </div>

        <div className="mt-8">
          <ul className="flex cursor-pointer flex-col items-center justify-center">
            <li className="hover:text-white">Refund Policy</li>
            <li className="hover:text-white">Terms & Conditions</li>
            <li className="hover:text-white">FAQ</li>
            <li className="hover:text-white">Privacy Policy</li>
          </ul>
        </div>

        <div className="my-8">
          <ul className="flex">
            <li className="mx-4">
              <Facebook />
            </li>
            <li className="mx-4">
              <Instagram />
            </li>
            <li className="mx-4">
              <Twitter />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
