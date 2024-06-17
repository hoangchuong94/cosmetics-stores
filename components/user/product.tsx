import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ProductType } from "@/types";

interface Props {
  product: ProductType;
}

export default function Product({ product }: Props) {
  return (
    <Card className="rounded-none border border-none shadow-none">
      <CardContent className="p-0">
        <Link href={`/products/${product.name}`}>
          <div className="relative">
            <Image
              src={product.image}
              alt={`image product ${product.name}`}
              priority
            />
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
          <Link href={`/products/${product.name}`}>
            <p className="mt-2">{product.name}</p>
          </Link>
          <div className="mt-2 flex items-center justify-start font-bold ">
            {/* <p className={`${product.sale && "text-gray-400 line-through"}`}>
              ${product.price}
            </p> */}
            {/* {sale && <p className="ml-2 text-sm text-black">${sale}</p>} */}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
