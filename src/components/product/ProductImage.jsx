import React from "react";
import { Link } from "react-router-dom";

const ProductImage = ({ product }) => {
  return (
    <div className="relative overflow-hidden bg-gray-100">

      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-72 object-cover
                     group-hover:scale-105
                     transition duration-500"
        />
      </Link>

      {/* Discount */}
      {product.discount && (
        <span className="absolute top-3 left-3 bg-pink-600 text-white
                         text-xs font-semibold px-3 py-1 rounded-full">
          {product.discount}% OFF
        </span>
      )}

      {/* Wishlist */}
      <button
        type="button"
        className="absolute top-3 right-3 w-10 h-10
                   bg-white rounded-full shadow-sm
                   flex items-center justify-center
                   text-xl text-gray-600
                   hover:text-pink-600
                   hover:scale-105 transition"
      >
        ♡
      </button>

    </div>
  );
};

export default ProductImage;