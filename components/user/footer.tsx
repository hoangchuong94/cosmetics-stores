import React from 'react';
import Link from 'next/link';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';

import lgoImage from '@/public/static/logo-retina.png';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="p-5">
            <section className="flex flex-col border border-b-slate-300 bg-[#d4a6b6]/70 p-5 md:flex-row md:items-center md:justify-between">
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
                        size={'lg'}
                        type="submit"
                    >
                        subscribe
                    </Button>
                </div>
            </section>

            <section className="flex flex-col items-center justify-center space-y-8 border border-red-100 bg-[#d4a6b6]/70 p-5 md:flex-row md:justify-between">
                <Logo
                    alt="logo header"
                    href="/"
                    urlStatic={lgoImage}
                    className="h-auto w-24"
                />

                <div className="flex cursor-pointer flex-col items-center justify-center uppercase md:flex md:items-start">
                    {/* {listCategory.map((category) => (
            <div className="hover:text-white" key={category.id}>
              {category.name}
            </div>
          ))} */}
                </div>

                <ul className="flex cursor-pointer flex-col items-center justify-center md:items-start">
                    <li className="hover:text-white">Refund Policy</li>
                    <li className="hover:text-white">Terms & Conditions</li>
                    <li className="hover:text-white">FAQ</li>
                    <li className="hover:text-white">
                        <Link href={'/contact'}>Contact</Link>
                    </li>
                    <li className="hover:text-white">
                        <Link href={'/about'}>About</Link>
                    </li>
                </ul>

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
            </section>
        </footer>
    );
}
