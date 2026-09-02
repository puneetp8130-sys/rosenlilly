import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // =====================================================
  // CURRENT USER
  // =====================================================

  const getCurrentUser = () => {
    try {
      return JSON.parse(
        localStorage.getItem("currentUser") || "null"
      );
    } catch (error) {
      console.error("Error reading currentUser:", error);
      return null;
    }
  };

  // =====================================================
  // LOAD PRODUCT STATE
  // =====================================================

  useEffect(() => {
    const loadState = () => {
      const currentUser = getCurrentUser();

      // Not logged in
      if (!currentUser?.id) {
        setQuantity(0);
        setIsWishlisted(false);
        return;
      }

      // USER-SPECIFIC CART
      const cartKey = `cart_${currentUser.id}`;

      const cart = JSON.parse(
        localStorage.getItem(cartKey) || "[]"
      );

      // USER-SPECIFIC WISHLIST
      const wishlistKey = `wishlist_${currentUser.id}`;

      const wishlist = JSON.parse(
        localStorage.getItem(wishlistKey) || "[]"
      );

      const cartProduct = cart.find(
        (item) => String(item.id) === String(product.id)
      );

      setQuantity(
        cartProduct
          ? Number(cartProduct.quantity || 1)
          : 0
      );

      setIsWishlisted(
        wishlist.some(
          (item) =>
            String(item.id) === String(product.id)
        )
      );
    };

    loadState();

    window.addEventListener(
      "cartChange",
      loadState
    );

    window.addEventListener(
      "wishlistChange",
      loadState
    );

    window.addEventListener(
      "authChange",
      loadState
    );

    return () => {
      window.removeEventListener(
        "cartChange",
        loadState
      );

      window.removeEventListener(
        "wishlistChange",
        loadState
      );

      window.removeEventListener(
        "authChange",
        loadState
      );
    };
  }, [product.id]);

  // =====================================================
  // LOGIN CHECK
  // =====================================================

  const requireLogin = () => {
    const currentUser = getCurrentUser();

    if (!currentUser?.id) {
      toast.error("Please login first");

      navigate("/login", {
        state: {
          from: window.location.pathname,
        },
      });

      return false;
    }

    return true;
  };

  // =====================================================
  // ADD TO CART
  // =====================================================

  const addToCart = () => {
    if (!requireLogin()) {
      return;
    }

    const currentUser = getCurrentUser();

    const cartKey = `cart_${currentUser.id}`;

    const cart = JSON.parse(
      localStorage.getItem(cartKey) || "[]"
    );

    const existingProduct = cart.find(
      (item) =>
        String(item.id) === String(product.id)
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = cart.map((item) =>
        String(item.id) === String(product.id)
          ? {
              ...item,
              quantity:
                Number(item.quantity || 0) + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem(
      cartKey,
      JSON.stringify(updatedCart)
    );

    const updatedProduct = updatedCart.find(
      (item) =>
        String(item.id) === String(product.id)
    );

    setQuantity(
      Number(updatedProduct.quantity)
    );

    window.dispatchEvent(
      new Event("cartChange")
    );

    toast.success("Added to cart 🛒");
  };

  // =====================================================
  // INCREASE QUANTITY
  // =====================================================

  const increaseQuantity = () => {
    if (!requireLogin()) {
      return;
    }

    const currentUser = getCurrentUser();

    const cartKey = `cart_${currentUser.id}`;

    const cart = JSON.parse(
      localStorage.getItem(cartKey) || "[]"
    );

    const updatedCart = cart.map((item) =>
      String(item.id) === String(product.id)
        ? {
            ...item,
            quantity:
              Number(item.quantity || 0) + 1,
          }
        : item
    );

    localStorage.setItem(
      cartKey,
      JSON.stringify(updatedCart)
    );

    const updatedProduct = updatedCart.find(
      (item) =>
        String(item.id) === String(product.id)
    );

    if (updatedProduct) {
      setQuantity(
        Number(updatedProduct.quantity)
      );
    }

    window.dispatchEvent(
      new Event("cartChange")
    );
  };

  // =====================================================
  // DECREASE QUANTITY
  // =====================================================

  const decreaseQuantity = () => {
    if (!requireLogin()) {
      return;
    }

    const currentUser = getCurrentUser();

    const cartKey = `cart_${currentUser.id}`;

    const cart = JSON.parse(
      localStorage.getItem(cartKey) || "[]"
    );

    const currentProduct = cart.find(
      (item) =>
        String(item.id) === String(product.id)
    );

    if (!currentProduct) {
      setQuantity(0);
      return;
    }

    const currentQuantity = Number(
      currentProduct.quantity || 1
    );

    // Quantity 1 → Remove
    if (currentQuantity <= 1) {
      const updatedCart = cart.filter(
        (item) =>
          String(item.id) !== String(product.id)
      );

      localStorage.setItem(
        cartKey,
        JSON.stringify(updatedCart)
      );

      setQuantity(0);

      window.dispatchEvent(
        new Event("cartChange")
      );

      toast.success("Removed from cart");

      return;
    }

    // Decrease quantity
    const updatedCart = cart.map((item) =>
      String(item.id) === String(product.id)
        ? {
            ...item,
            quantity: currentQuantity - 1,
          }
        : item
    );

    localStorage.setItem(
      cartKey,
      JSON.stringify(updatedCart)
    );

    setQuantity(currentQuantity - 1);

    window.dispatchEvent(
      new Event("cartChange")
    );
  };

  // =====================================================
  // WISHLIST
  // =====================================================

  const toggleWishlist = () => {
    if (!requireLogin()) {
      return;
    }

    const currentUser = getCurrentUser();

    const wishlistKey =
      `wishlist_${currentUser.id}`;

    const wishlist = JSON.parse(
      localStorage.getItem(wishlistKey) || "[]"
    );

    const alreadyExists = wishlist.some(
      (item) =>
        String(item.id) === String(product.id)
    );

    let updatedWishlist;

    if (alreadyExists) {
      updatedWishlist = wishlist.filter(
        (item) =>
          String(item.id) !== String(product.id)
      );

      setIsWishlisted(false);

      toast.success(
        "Removed from wishlist"
      );
    } else {
      updatedWishlist = [
        ...wishlist,
        product,
      ];

      setIsWishlisted(true);

      toast.success(
        "Added to wishlist ❤️"
      );
    }

    localStorage.setItem(
      wishlistKey,
      JSON.stringify(updatedWishlist)
    );

    window.dispatchEvent(
      new Event("wishlistChange")
    );
  };

  // =====================================================
  // PRICE
  // =====================================================

  const price = Number(
    product.price || 0
  );

  const originalPrice = Number(
    product.originalPrice ||
      product.oldPrice ||
      0
  );

  const discount =
    originalPrice > price
      ? Math.round(
          ((originalPrice - price) /
            originalPrice) *
            100
        )
      : 0;

  // =====================================================
  // UI
  // =====================================================

  return (
    <div
      className="
        group
        bg-white
        rounded-2xl
        overflow-hidden
        border
        border-[#eee6f7]
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
      "
    >

      {/* IMAGE */}

      <div
        className="
          relative
          h-64
          bg-[#F7EEFF]
          overflow-hidden
        "
      >

        <Link
          to={`/product/${product.id}`}
        >

          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="
                w-full
                h-full
                object-cover
                group-hover:scale-105
                transition-transform
                duration-500
              "
            />
          ) : (
            <div
              className="
                w-full
                h-full
                flex
                items-center
                justify-center
                text-6xl
              "
            >
              🌸
            </div>
          )}

        </Link>

        {/* DISCOUNT */}

        {discount > 0 && (
          <span
            className="
              absolute
              top-3
              left-3
              px-2.5
              py-1
              rounded-lg
              bg-[#9B5DE5]
              text-white
              text-xs
              font-bold
            "
          >
            {discount}% OFF
          </span>
        )}

        {/* WISHLIST */}

        <button
          type="button"
          onClick={toggleWishlist}
          className="
            absolute
            top-3
            right-3
            w-10
            h-10
            rounded-full
            bg-white
            shadow-md
            flex
            items-center
            justify-center
            text-xl
            transition
            hover:scale-110
          "
          aria-label="Wishlist"
        >
          {isWishlisted ? "❤️" : "♡"}
        </button>

      </div>

      {/* DETAILS */}

      <div className="p-5">

        <Link
          to={`/product/${product.id}`}
        >

          <h3
            className="
              font-bold
              text-[#29213A]
              line-clamp-2
              hover:text-[#9B5DE5]
              transition
            "
          >
            {product.name}
          </h3>

        </Link>

        {/* RATING */}

        <div
          className="
            flex
            items-center
            gap-2
            mt-2
          "
        >

          <span className="text-sm">
            ⭐
          </span>

          <span
            className="
              text-sm
              font-semibold
              text-[#29213A]
            "
          >
            {product.rating || 4.5}
          </span>

          <span
            className="
              text-xs
              text-[#9A91A4]
            "
          >
            ({product.reviews || 0})
          </span>

        </div>

        {/* PRICE */}

        <div
          className="
            flex
            items-center
            gap-2
            mt-3
          "
        >

          <span
            className="
              text-xl
              font-bold
              text-[#9B5DE5]
            "
          >
            ₹
            {price.toLocaleString("en-IN")}
          </span>

          {originalPrice > price && (
            <span
              className="
                text-sm
                text-[#9A91A4]
                line-through
              "
            >
              ₹
              {originalPrice.toLocaleString(
                "en-IN"
              )}
            </span>
          )}

        </div>

        {/* CART CONTROLS */}

        {quantity === 0 ? (

          <button
            type="button"
            onClick={addToCart}
            className="
              w-full
              mt-5
              py-3
              rounded-xl
              bg-[#9B5DE5]
              text-white
              font-semibold
              hover:bg-[#7B3FB3]
              active:scale-[0.98]
              transition
            "
          >
            🛒 Add to Cart
          </button>

        ) : (

          <div
            className="
              mt-5
              w-full
              flex
              items-center
              justify-between
              rounded-xl
              border
              border-[#9B5DE5]
              overflow-hidden
              bg-[#F7EEFF]
            "
          >

            {/* MINUS */}

            <button
              type="button"
              onClick={decreaseQuantity}
              className="
                w-12
                h-12
                flex
                items-center
                justify-center
                text-xl
                font-bold
                text-[#7B3FB3]
                hover:bg-[#eadbfa]
                transition
              "
            >
              −
            </button>

            {/* QUANTITY */}

            <span
              className="
                flex-1
                text-center
                font-bold
                text-[#29213A]
              "
            >
              {quantity}
            </span>

            {/* PLUS */}

            <button
              type="button"
              onClick={increaseQuantity}
              className="
                w-12
                h-12
                flex
                items-center
                justify-center
                text-xl
                font-bold
                text-[#7B3FB3]
                hover:bg-[#eadbfa]
                transition
              "
            >
              +
            </button>

          </div>

        )}

      </div>

    </div>
  );
};

export default ProductCard;