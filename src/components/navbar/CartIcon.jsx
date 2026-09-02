import React from "react";
import { Link } from "react-router-dom";

const CartIcon = () => {
  const cart = JSON.parse(
    localStorage.getItem("cart") || "[]"
  );

  const count = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  return (
    <Link
      to="/cart"
      className="relative
                 w-10 h-10
                 flex items-center justify-center
                 rounded-full
                 text-[#7B3FB3]
                 hover:bg-[#F7EEFF]
                 hover:text-[#9B5DE5]"
      title="Cart"
    >

      <span className="text-xl">
        🛒
      </span>

      {count > 0 && (
        <span
          className="absolute
                     -top-1
                     -right-1
                     min-w-[<18px>]
                     h-[<18px>]
                     px-1
                     rounded-full
                     bg-[#D916C7]
                     text-white
                     text-[10px]
                     font-bold
                     flex items-center justify-center"
        >
          {count}
        </span>
      )}

    </Link>
  );
};

export default CartIcon;