"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Minus, Plus } from "lucide-react";
import product from "@/public/products/product-12-a.jpg";
import product1b from "@/public/products/product-12-b.jpg";
import product1c from "@/public/products/product-12-c.jpg";
import { Button } from "@/components/ui/button";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");
  return (
    <div className="px-16 py-28 border border-t-black/10">
      <div className="flex space-x-8">
        <div className="flex-1 relative h-[600px]">
          <Image
            className="object-cover"
            src={product}
            alt="image product"
            priority
            quality={100}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="flex-1 space-y-4">
          <p>Home / Skin Care / Product Name 14</p>
          <p>Hair Care, Skin Care</p>
          <h1>Product Name 14</h1>
          <p>$75.00 – $100.00 & Free Shipping</p>
          <p>
            Ut quis sollicitudin orci. Aliquam at libero non purus sodales
            sagittis eu ac neque. Nunc ipsum felis, vehicula eu aliquam sed,
            ultricies ac lacus. Vestibulum ante ipsum primis in faucibus orci
            luctus et ultrices posuere cubilia curae; Nam viverra commodo
            finibus. Morbi laoreet lacus quis lobortis tempor. Nam tincidunt,
            lectus a suscipit fringilla, mauris turpis dapibus dolor, eu
            venenatis diam nibh id massa. Nulla eget tortor ultrices, ultricies
            turpis a, accumsan turpis. Quisque dignissim semper leo ac accumsan.
            Quisque est nisl, bibendum ut elit quis, pellentesque vehicula
            tellus. Sed luctus mattis ante ac posuere.
          </p>
          <form>
            <p className="mb-4">Quantity</p>
            <Select onValueChange={(value) => setSelectedOption(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Default value" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Sort by popularity</SelectItem>
                <SelectItem value="dark">Sort by latest</SelectItem>
                <SelectItem value="system">
                  Sort by price: low to high
                </SelectItem>
              </SelectContent>
            </Select>

            <div className="border-t border-b border-t-black/10 border-b-black/10 mt-6">
              <div className="py-6 flex items-center">
                <div className="flex justify-center items-center border border-black/10">
                  <button
                    type="button"
                    onClick={() => {
                      setQuantity(quantity + 1);
                    }}
                  >
                    <Plus className="w-14 h-full p-5" />
                  </button>
                  <div className="w-14 h-full">
                    <span className="text-xl flex items-center justify-center h-full border-l border-r border-l-black/10 border-r-black/10">
                      {quantity}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (quantity >= 2) {
                        setQuantity(quantity - 1);
                      }
                    }}
                  >
                    <Minus className="w-14 h-full p-5" />
                  </button>
                </div>

                <Button
                  className="ml-6 uppercase"
                  size={"lg"}
                  disabled={!selectedOption}
                >
                  Add To Cad
                </Button>
              </div>
            </div>

            <p className="mt-4">SKU: N/A Categories: Hair Care, Skin Care</p>
          </form>
        </div>
      </div>
    </div>
  );
}
