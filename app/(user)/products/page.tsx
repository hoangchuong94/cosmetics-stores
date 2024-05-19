import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductList from "@/components/product-list";
import product1 from "/public/products/product-1.jpg";
import product2 from "/public/products/product-2.jpg";
import product3 from "/public/products/product-3.jpg";
import product4 from "/public/products/product-4.jpg";

const products = [
  {
    id: "1",
    image: product1,
    name: "product name 1",
    description: "product description",
    price: 59.0,
    sale: 10,
    star: 4,
  },
  {
    id: "2",
    image: product2,
    name: "product name 1",
    description: "product description",
    price: 59.0,
    sale: 10,
    star: 4,
  },
  {
    id: "3",
    image: product3,
    name: "product name 1",
    description: "product description",
    price: 59.0,
    sale: 10,
    star: 4,
  },
  {
    id: "4",
    image: product4,
    name: "product name 1",
    description: "product description",
    price: 59.0,
    sale: 10,
    star: 4,
  },
];

export default function ProductPage() {
  return (
    <div className="py-20 px-5 border border-t-black/10">
      <p>Home / Skin Care</p>
      <h1 className="text-5xl my-6">Skin Care</h1>
      <div className="flex items-center justify-between">
        <p className="font-serif ">Showing 1–8 of 13 results Default sorting</p>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Default value" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Sort by popularity</SelectItem>
            <SelectItem value="dark">Sort by latest</SelectItem>
            <SelectItem value="system">Sort by price: low to high</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ProductList products={products} />
    </div>
  );
}
