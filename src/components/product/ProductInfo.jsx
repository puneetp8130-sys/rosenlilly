import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const ProductInfo = ({ product }) => {
  return (
    <div className="p-4">

      {/* Product Name */}
      <Link to={`/product/${product.id}`}>
        <h3 className="text-base font-semibold text-gray-800
                       hover:text-pink-600 transition
                       line-clamp-1">
          {product.name}
        </h3>
      </Link>

      {/* Rating */}
      <Rating
        rating={product.rating}
        reviews={product.reviews}
      />

      {/* Price */}
      <div className="flex items-center gap-2 mt-2">

        <span className="text-xl font-bold text-gray-800">
          ₹{product.price}
        </span>

        {product.oldPrice && (
          <span className="text-sm text-gray-400 line-through">
            ₹{product.oldPrice}
          </span>
        )}

      </div>

      {/* Delivery */}
      <p className="text-xs text-gray-500 mt-2">
        🚚 Same day delivery available
      </p>

      {/* Add To Cart */}
      <button
        type="button"
        className="w-full mt-4 py-2.5 rounded-full
                   border border-pink-600
                   text-pink-600 font-semibold
                   hover:bg-pink-600
                   hover:text-white
                   transition"
      >
        Add to Cart
      </button>

    </div>
  );
};

export default ProductInfo;