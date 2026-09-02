import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {

  if (!products || products.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500 text-lg">
          No products found.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductGrid;