import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import products from "../data/products";

const ProductDetails = () => {
  const { id } = useParams();

  // ==========================================
  // FIND PRODUCT
  // ==========================================

  const product = products.find(
    (item) => String(item.id) === String(id)
  );

  // ==========================================
  // STATES
  // ==========================================

  const [quantity, setQuantity] = useState(1);

  const [selectedImage, setSelectedImage] =
    useState(product?.image || "");

  const [cartQuantity, setCartQuantity] =
    useState(0);

  const [isWishlisted, setIsWishlisted] =
    useState(false);

  // ==========================================
  // PRODUCT IMAGES
  // ==========================================

  const productImages = useMemo(() => {
    if (!product) return [];

    const images = [
      product.image,
      ...(product.images || []),
    ].filter(Boolean);

    return [...new Set(images)];
  }, [product]);

  // ==========================================
  // LOAD CART + WISHLIST
  // ==========================================

  const syncProductState = () => {
    if (!product) return;

    const cart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const wishlist = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );

    const cartProduct = cart.find(
      (item) =>
        String(item.id) === String(product.id)
    );

    setCartQuantity(
      cartProduct
        ? Number(cartProduct.quantity || 1)
        : 0
    );

    setIsWishlisted(
      wishlist.some(
        (item) =>
          String(item.id) ===
          String(product.id)
      )
    );
  };

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image || "");
      syncProductState();
    }
  }, [product]);

  useEffect(() => {
    window.addEventListener(
      "cartChange",
      syncProductState
    );

    window.addEventListener(
      "wishlistChange",
      syncProductState
    );

    return () => {
      window.removeEventListener(
        "cartChange",
        syncProductState
      );

      window.removeEventListener(
        "wishlistChange",
        syncProductState
      );
    };
  }, [product]);

  // ==========================================
  // CART
  // ==========================================

  const addToCart = () => {
    if (!product) return;

    const cart = JSON.parse(
      localStorage.getItem("cart") || "[]"
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
                Number(item.quantity || 0) +
                quantity,
            }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          quantity,
        },
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    setCartQuantity((prev) => prev + quantity);

    setQuantity(1);

    window.dispatchEvent(
      new Event("cartChange")
    );

    toast.success("Added to cart 🛒");
  };

  // ==========================================
  // UPDATE CART QUANTITY
  // ==========================================

  const updateCartQuantity = (newQuantity) => {
    if (!product) return;

    const cart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    let updatedCart;

    if (newQuantity <= 0) {
      updatedCart = cart.filter(
        (item) =>
          String(item.id) !==
          String(product.id)
      );

      setCartQuantity(0);

      toast.success("Removed from cart");
    } else {
      updatedCart = cart.map((item) =>
        String(item.id) === String(product.id)
          ? {
              ...item,
              quantity: newQuantity,
            }
          : item
      );

      setCartQuantity(newQuantity);
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(
      new Event("cartChange")
    );
  };

  // ==========================================
  // WISHLIST
  // ==========================================

  const toggleWishlist = () => {
    if (!product) return;

    const wishlist = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );

    const alreadyExists = wishlist.some(
      (item) =>
        String(item.id) ===
        String(product.id)
    );

    let updatedWishlist;

    if (alreadyExists) {
      updatedWishlist = wishlist.filter(
        (item) =>
          String(item.id) !==
          String(product.id)
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
      "wishlist",
      JSON.stringify(updatedWishlist)
    );

    window.dispatchEvent(
      new Event("wishlistChange")
    );
  };

  // ==========================================
  // PRODUCT NOT FOUND
  // ==========================================

  if (!product) {
    return (
      <div
        className="
          min-h-[70vh]
          flex
          items-center
          justify-center
          bg-[#FCFAFF]
          px-4
        "
      >
        <div className="text-center">

          <div className="text-6xl">
            🌸
          </div>

          <h1
            className="
              mt-5
              text-3xl
              font-bold
              text-[#29213A]
            "
          >
            Product Not Found
          </h1>

          <p
            className="
              mt-2
              text-[#756B82]
            "
          >
            This flower may have bloomed away.
          </p>

          <Link
            to="/flowers"
            className="
              inline-block
              mt-6
              px-7
              py-3
              rounded-xl
              bg-[#9B5DE5]
              text-white
              font-semibold
              hover:bg-[#7B3FB3]
            "
          >
            Browse Flowers
          </Link>

        </div>
      </div>
    );
  }

  // ==========================================
  // RELATED PRODUCTS
  // ==========================================

  const relatedProducts = products
    .filter(
      (item) =>
        item.category === product.category &&
        String(item.id) !== String(product.id)
    )
    .slice(0, 4);

  // ==========================================
  // PRICE
  // ==========================================

  const originalPrice =
    product.originalPrice ||
    product.oldPrice ||
    product.price;

  const discount =
    originalPrice > product.price
      ? Math.round(
          ((originalPrice - product.price) /
            originalPrice) *
            100
        )
      : 0;

  return (
    <div className="bg-[#FCFAFF] min-h-screen">

      {/* ========================================
          BREADCRUMB
      ======================================== */}

      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          pt-7
        "
      >
        <div
          className="
            flex
            flex-wrap
            items-center
            gap-2
            text-sm
            text-[#9A91A4]
          "
        >
          <Link
            to="/"
            className="hover:text-[#9B5DE5]"
          >
            Home
          </Link>

          <span>/</span>

          <Link
            to="/flowers"
            className="hover:text-[#9B5DE5]"
          >
            Flowers
          </Link>

          <span>/</span>

          <span className="text-[#29213A]">
            {product.name}
          </span>
        </div>
      </div>


      {/* ========================================
          PRODUCT SECTION
      ======================================== */}

      <section className="py-8 sm:py-12">

        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-10
            lg:gap-16
          "
        >

          {/* ====================================
              IMAGE GALLERY
          ==================================== */}

          <div>

            <div
              className="
                relative
                aspect-square
                rounded-3xl
                overflow-hidden
                bg-[#F7EEFF]
              "
            >

              <img
                src={selectedImage}
                alt={product.name}
                className="
                  w-full
                  h-full
                  object-cover
                "
              />

              {/* DISCOUNT */}

              {discount > 0 && (
                <span
                  className="
                    absolute
                    top-4
                    left-4
                    px-3
                    py-1.5
                    rounded-full
                    bg-[#9B5DE5]
                    text-white
                    text-sm
                    font-bold
                  "
                >
                  {discount}% OFF
                </span>
              )}

              {/* WISHLIST */}

              <button
                onClick={toggleWishlist}
                className="
                  absolute
                  top-4
                  right-4
                  w-11
                  h-11
                  rounded-full
                  bg-white/95
                  shadow-sm
                  flex
                  items-center
                  justify-center
                  text-xl
                  hover:scale-105
                  transition
                "
                aria-label="Wishlist"
              >
                {isWishlisted ? "❤️" : "♡"}
              </button>

            </div>


            {/* THUMBNAILS */}

            {productImages.length > 1 && (
              <div
                className="
                  mt-4
                  flex
                  gap-3
                  overflow-x-auto
                  pb-1
                "
              >

                {productImages.map(
                  (image, index) => (
                    <button
                      key={`${image}-${index}`}
                      onClick={() =>
                        setSelectedImage(image)
                      }
                      className={`
                        w-20
                        h-20
                        shrink-0
                        rounded-xl
                        overflow-hidden
                        border-2
                        transition
                        ${
                          selectedImage === image
                            ? "border-[#9B5DE5]"
                            : "border-transparent"
                        }
                      `}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="
                          w-full
                          h-full
                          object-cover
                        "
                      />
                    </button>
                  )
                )}

              </div>
            )}

          </div>


          {/* ====================================
              PRODUCT INFO
          ==================================== */}

          <div>

            {/* CATEGORY */}

            <p
              className="
                text-sm
                font-semibold
                uppercase
                tracking-wide
                text-[#9B5DE5]
              "
            >
              {product.category}
            </p>


            {/* TITLE */}

            <h1
              className="
                mt-2
                text-3xl
                sm:text-4xl
                font-bold
                text-[#29213A]
              "
            >
              {product.name}
            </h1>


            {/* RATING */}

            <div
              className="
                mt-4
                flex
                flex-wrap
                items-center
                gap-3
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-1
                  px-3
                  py-1.5
                  rounded-lg
                  bg-green-50
                  text-green-700
                  font-semibold
                  text-sm
                "
              >
                ⭐ {product.rating || "4.5"}
              </div>

              <span
                className="
                  text-sm
                  text-[#756B82]
                "
              >
                {product.reviews
                  ? `${product.reviews} reviews`
                  : "Customer reviews"}
              </span>

            </div>


            {/* PRICE */}

            <div className="mt-6">

              <div
                className="
                  flex
                  items-center
                  flex-wrap
                  gap-3
                "
              >

                <span
                  className="
                    text-3xl
                    font-bold
                    text-[#29213A]
                  "
                >
                  ₹
                  {Number(
                    product.price
                  ).toLocaleString("en-IN")}
                </span>

                {originalPrice >
                  product.price && (
                  <span
                    className="
                      text-lg
                      text-[#9A91A4]
                      line-through
                    "
                  >
                    ₹
                    {Number(
                      originalPrice
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </span>
                )}

              </div>

              {discount > 0 && (
                <p
                  className="
                    mt-1
                    text-sm
                    text-green-600
                    font-semibold
                  "
                >
                  You save{" "}
                  {discount}% on this product
                </p>
              )}

            </div>


            {/* DESCRIPTION */}

            <div
              className="
                mt-7
                border-t
                border-[#eee6f7]
                pt-7
              "
            >

              <h2
                className="
                  font-bold
                  text-[#29213A]
                "
              >
                About this product
              </h2>

              <p
                className="
                  mt-3
                  leading-7
                  text-[#756B82]
                "
              >
                {product.description ||
                  "Beautifully arranged fresh flowers, carefully selected and prepared to make your special moments even more memorable."}
              </p>

            </div>


            {/* ==================================
                CART CONTROLS
            ================================== */}

            <div className="mt-7">

              {cartQuantity > 0 ? (
                <div>

                  <p
                    className="
                      mb-3
                      text-sm
                      font-semibold
                      text-[#29213A]
                    "
                  >
                    Quantity in cart
                  </p>

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        border
                        border-[#ddd3e8]
                        rounded-xl
                        overflow-hidden
                        bg-white
                      "
                    >

                      <button
                        onClick={() =>
                          updateCartQuantity(
                            cartQuantity - 1
                          )
                        }
                        className="
                          w-11
                          h-11
                          text-lg
                          text-[#29213A]
                          hover:bg-[#F7EEFF]
                        "
                      >
                        −
                      </button>

                      <span
                        className="
                          w-12
                          text-center
                          font-bold
                          text-[#29213A]
                        "
                      >
                        {cartQuantity}
                      </span>

                      <button
                        onClick={() =>
                          updateCartQuantity(
                            cartQuantity + 1
                          )
                        }
                        className="
                          w-11
                          h-11
                          text-lg
                          text-[#29213A]
                          hover:bg-[#F7EEFF]
                        "
                      >
                        +
                      </button>

                    </div>


                    <Link
                      to="/cart"
                      className="
                        flex-1
                        text-center
                        py-3
                        rounded-xl
                        bg-[#9B5DE5]
                        text-white
                        font-semibold
                        hover:bg-[#7B3FB3]
                        transition
                      "
                    >
                      View Cart 🛒
                    </Link>

                  </div>

                </div>
              ) : (
                <div>

                  {/* SELECT QUANTITY */}

                  <div
                    className="
                      flex
                      items-center
                      gap-4
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        border
                        border-[#ddd3e8]
                        rounded-xl
                        overflow-hidden
                        bg-white
                      "
                    >

                      <button
                        onClick={() =>
                          setQuantity(
                            Math.max(
                              1,
                              quantity - 1
                            )
                          )
                        }
                        className="
                          w-11
                          h-11
                          text-lg
                          hover:bg-[#F7EEFF]
                        "
                      >
                        −
                      </button>

                      <span
                        className="
                          w-12
                          text-center
                          font-bold
                          text-[#29213A]
                        "
                      >
                        {quantity}
                      </span>

                      <button
                        onClick={() =>
                          setQuantity(
                            quantity + 1
                          )
                        }
                        className="
                          w-11
                          h-11
                          text-lg
                          hover:bg-[#F7EEFF]
                        "
                      >
                        +
                      </button>

                    </div>


                    <span
                      className="
                        text-sm
                        text-[#756B82]
                      "
                    >
                      Select quantity
                    </span>

                  </div>


                  {/* ADD CART */}

                  <button
                    onClick={addToCart}
                    className="
                      w-full
                      mt-4
                      py-3.5
                      rounded-xl
                      bg-[#9B5DE5]
                      text-white
                      font-bold
                      hover:bg-[#7B3FB3]
                      transition
                    "
                  >
                    Add {quantity} to Cart 🛒
                  </button>

                </div>
              )}

            </div>


            {/* ==================================
                BENEFITS
            ================================== */}

            <div
              className="
                mt-7
                grid
                grid-cols-1
                sm:grid-cols-3
                gap-3
              "
            >

              <div
                className="
                  p-4
                  rounded-xl
                  bg-[#FAF7FC]
                  border
                  border-[#eee6f7]
                "
              >
                <p className="text-xl">
                  🚚
                </p>

                <p
                  className="
                    mt-2
                    text-sm
                    font-semibold
                    text-[#29213A]
                  "
                >
                  Fast Delivery
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    text-[#756B82]
                  "
                >
                  Fresh flowers delivered
                </p>
              </div>


              <div
                className="
                  p-4
                  rounded-xl
                  bg-[#FAF7FC]
                  border
                  border-[#eee6f7]
                "
              >
                <p className="text-xl">
                  🌸
                </p>

                <p
                  className="
                    mt-2
                    text-sm
                    font-semibold
                    text-[#29213A]
                  "
                >
                  Fresh Flowers
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    text-[#756B82]
                  "
                >
                  Carefully selected
                </p>
              </div>


              <div
                className="
                  p-4
                  rounded-xl
                  bg-[#FAF7FC]
                  border
                  border-[#eee6f7]
                "
              >
                <p className="text-xl">
                  🔒
                </p>

                <p
                  className="
                    mt-2
                    text-sm
                    font-semibold
                    text-[#29213A]
                  "
                >
                  Secure Checkout
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    text-[#756B82]
                  "
                >
                  Safe & secure payment
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ========================================
          RELATED PRODUCTS
      ======================================== */}

      {relatedProducts.length > 0 && (
        <section
          className="
            py-12
            border-t
            border-[#eee6f7]
          "
        >

          <div
            className="
              max-w-7xl
              mx-auto
              px-4
              sm:px-6
              lg:px-8
            "
          >

            <div
              className="
                flex
                items-end
                justify-between
                gap-4
                mb-7
              "
            >

              <div>

                <p
                  className="
                    text-sm
                    font-semibold
                    text-[#9B5DE5]
                  "
                >
                  YOU MAY ALSO LIKE
                </p>

                <h2
                  className="
                    mt-1
                    text-2xl
                    sm:text-3xl
                    font-bold
                    text-[#29213A]
                  "
                >
                  Related Flowers
                </h2>

              </div>


              <Link
                to="/flowers"
                className="
                  hidden
                  sm:block
                  text-sm
                  font-semibold
                  text-[#9B5DE5]
                "
              >
                View All →
              </Link>

            </div>


            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-4
                gap-5
              "
            >

              {relatedProducts.map(
                (item) => (
                  <Link
                    key={item.id}
                    to={`/product/${item.id}`}
                    className="
                      group
                      bg-white
                      rounded-2xl
                      border
                      border-[#eee6f7]
                      overflow-hidden
                      hover:-translate-y-1
                      hover:shadow-lg
                      transition
                    "
                  >

                    <div
                      className="
                        aspect-square
                        overflow-hidden
                        bg-[#F7EEFF]
                      "
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                        className="
                          w-full
                          h-full
                          object-cover
                          group-hover:scale-105
                          transition
                          duration-500
                        "
                      />

                    </div>


                    <div className="p-4">

                      <h3
                        className="
                          font-semibold
                          text-[#29213A]
                          truncate
                        "
                      >
                        {item.name}
                      </h3>

                      <div
                        className="
                          mt-2
                          flex
                          items-center
                          justify-between
                        "
                      >

                        <span
                          className="
                            font-bold
                            text-[#9B5DE5]
                          "
                        >
                          ₹
                          {Number(
                            item.price
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </span>

                        <span
                          className="
                            text-xs
                            text-green-600
                            font-semibold
                          "
                        >
                          ⭐ {item.rating || "4.5"}
                        </span>

                      </div>

                    </div>

                  </Link>
                )
              )}

            </div>

          </div>

        </section>
      )}

    </div>
  );
};

export default ProductDetails;