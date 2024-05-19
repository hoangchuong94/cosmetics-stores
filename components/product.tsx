import React from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import Image from "next/image";
import { Product as ProductType } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function Product({
  id,
  name,
  image,
  price,
  star,
  sale,
}: ProductType) {
  return (
    <Card className="rounded-none border border-none shadow-none">
      <CardContent className="p-0">
        <Link href={`/products/${name}`}>
          <div className="relative">
            <Image src={image} alt={`image product ${name}`} priority />
            <div className="absolute left-2 top-2 rounded-2xl bg-white px-4 shadow-md">
              <span>Sale !</span>
            </div>
          </div>
        </Link>
      </CardContent>
      <CardFooter className="p-0">
        <div className="flex flex-col">
          <div className="mt-2 flex ">
            <Star className="h-4 w-4 stroke-1 sm:h-6 sm:w-6" />
            <Star className="h-4 w-4 stroke-1 sm:h-6 sm:w-6" />
            <Star className="h-4 w-4 stroke-1 sm:h-6 sm:w-6" />
            <Star className="h-4 w-4 stroke-1 sm:h-6 sm:w-6" />
            <Star className="h-4 w-4 stroke-1 sm:h-6 sm:w-6" />
          </div>
          <Link href={`/products/${name}`}>
            <p className="mt-2">{name}</p>
          </Link>
          <div className="mt-2 flex items-center justify-start font-bold ">
            <p className={`${sale && "text-gray-400 line-through"}`}>
              ${price}
            </p>
            {sale && <p className="ml-2 text-sm text-black">${sale}</p>}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
