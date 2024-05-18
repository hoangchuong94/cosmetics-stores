import Image from "next/image";

import { Suspense } from "react";

import Loading from "./loading";
import logoImage from "@/public/static/logo-retina.png";

import bgRegisterPage from "@/public/static/bg-registration-form-1.jpg";
import Logo from "@/components/logo";

export default function AuthenticationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<Loading />}>
      <main className="relative flex min-h-screen items-center justify-center ">
        <div className="absolute inset-0 z-[-1]">
          <Image
            className="object-cover"
            src={bgRegisterPage}
            alt="bg-register-page"
            sizes="100vw"
            quality={100}
            priority
            fill
          />
        </div>
        <div className="min-h-full bg-white rounded-lg min-w-[90%] items-center p-4 sm:min-w-[60%] md:min-w-[50%] lg:min-w-[40%]">
          <div className="flex flex-col rounded-lg border border-stone-700 bg-slate-200 bg-transparent p-6">
            <div className="flex h-20 w-full items-end rounded-lg bg-transparent p-3">
              <div className="w-32 text-white md:w-36">
                <Logo
                  className="mr-4 w-24"
                  alt="logo auth"
                  href="/"
                  urlStatic={logoImage}
                />
              </div>
            </div>
            {children}
          </div>
        </div>
      </main>
    </Suspense>
  );
}
