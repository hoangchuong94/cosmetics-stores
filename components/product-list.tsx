import React from "react";
import Product from "@/components/product";

export default function ProductList(products: any) {
  return (
    <div className="grid grid-cols-2 gap-4 py-6 md:grid md:grid-cols-3 lg:grid lg:grid-cols-4">
      {products.map((product: any) => (
        <div key={product.id}>
          <Product
            id={product.id}
            name={product.name}
            description={product.description}
            type={product.type}
            image={product.image}
            price={product.price}
            quantity={product.quantity}
          />
        </div>
      ))}
    </div>
  );
}
