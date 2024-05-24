import ProductList from "@/components/product-list";
import product1 from "/public/products/product-1.jpg";
import product2 from "/public/products/product-2.jpg";
import product3 from "/public/products/product-3.jpg";
import product4 from "/public/products/product-4.jpg";
const products = [
  {
    id: "1",
    name: "product name 1",
    description: "product description",
    image: product1,
    price: 59.0,
    sale: 10,
    star: 4,
  },
  {
    id: "2",
    name: "product name 1",
    description: "product description",
    image: product2,
    price: 59.0,
    sale: 10,
    star: 4,
  },
  {
    id: "3",
    name: "product name 1",
    description: "product description",
    image: product3,
    price: 59.0,
    sale: 10,
    star: 4,
  },
  {
    id: "4",
    name: "product name 1",
    description: "product description",
    image: product4,
    price: 59.0,
    sale: 10,
    star: 4,
  },
];

export default function TrendingProducts() {
  return (
    <div className="mt-28">
      <div className="flex flex-col items-center py-10 capitalize">
        <h6 className="text-[#5d5b5b]">popular products</h6>
        <h2 className="text-3xl">trending now</h2>
      </div>
      <ProductList products={products} />
    </div>
  );
}
