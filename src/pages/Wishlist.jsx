import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";


// =====================================================
// GET CURRENT USER
// =====================================================

const getCurrentUser = () => {
  try {
    return JSON.parse(
      localStorage.getItem("currentUser") || "null"
    );
  } catch {
    return null;
  }
};


// =====================================================
// USER SPECIFIC STORAGE KEYS
// =====================================================

const getWishlistKey = (userId) =>
  `wishlist_${userId}`;

const getCartKey = (userId) =>
  `cart_${userId}`;

const Wishlist = () => {

  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);


  // =====================================================
  // LOAD USER DATA
  // =====================================================

const loadData = () => {
  const currentUser = getCurrentUser();

  // User login nahi hai
  if (!currentUser?.id) {
    setWishlist([]);
    setCart([]);
    return;
  }

  const wishlistKey = getWishlistKey(
    currentUser.id
  );

  const cartKey = getCartKey(
    currentUser.id
  );

  let savedWishlist = [];
  let savedCart = [];

  try {
    savedWishlist = JSON.parse(
      localStorage.getItem(wishlistKey) || "[]"
    );

    savedCart = JSON.parse(
      localStorage.getItem(cartKey) || "[]"
    );

    if (!Array.isArray(savedWishlist)) {
      savedWishlist = [];
    }

    if (!Array.isArray(savedCart)) {
      savedCart = [];
    }
  } catch (error) {
    console.error(
      "Wishlist/Cart load error:",
      error
    );

    savedWishlist = [];
    savedCart = [];
  }

  setWishlist(savedWishlist);
  setCart(savedCart);
};

  // =====================================================
  // LISTEN FOR CHANGES
  // =====================================================
  
  useEffect(() => {

    loadData();

    window.addEventListener(
      "wishlistChange",
      loadData
    );

    window.addEventListener(
      "cartChange",
      loadData
    );

    window.addEventListener(
      "authChange",
      loadData
    );


    return () => {

      window.removeEventListener(
        "wishlistChange",
        loadData
      );

      window.removeEventListener(
        "cartChange",
        loadData
      );

      window.removeEventListener(
        "authChange",
        loadData
      );

    };

  }, []);

  // =====================================================
  // GET PRODUCT QUANTITY
  // =====================================================

  const getQuantity = (id) => {
    const item = cart.find(
      (product) => product.id === id
    );

    return item ? Number(item.quantity || 0) : 0;
  };

  // =====================================================
  // ADD TO CART
  // =====================================================

  const addToCart = (product) => {

  const currentUser = getCurrentUser();

  if (!currentUser?.id) {
    toast.error("Please login first");
    return;
  }


  const cartKey = getCartKey(
    currentUser.id
  );


  const currentCart = JSON.parse(
    localStorage.getItem(cartKey) || "[]"
  );


  const existingProduct = currentCart.find(
    (item) => item.id === product.id
  );


  let updatedCart;


  if (existingProduct) {

    updatedCart = currentCart.map((item) =>
      item.id === product.id
        ? {
            ...item,
            quantity:
              Number(item.quantity || 0) + 1,
          }
        : item
    );

  } else {

    updatedCart = [
      ...currentCart,
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


  setCart(updatedCart);


  window.dispatchEvent(
    new Event("cartChange")
  );


  toast.success("Added to cart 🛒");
};

  // =====================================================
  // INCREASE QUANTITY
  // =====================================================

  const increaseQuantity = (id) => {

  const currentUser = getCurrentUser();

  if (!currentUser?.id) {
    toast.error("Please login first");
    return;
  }


  const cartKey = getCartKey(
    currentUser.id
  );


  const currentCart = JSON.parse(
    localStorage.getItem(cartKey) || "[]"
  );


  const updatedCart = currentCart.map(
    (item) =>
      item.id === id
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


  setCart(updatedCart);


  window.dispatchEvent(
    new Event("cartChange")
  );
};

  // =====================================================
  // DECREASE QUANTITY
  // =====================================================

  const decreaseQuantity = (id) => {

  const currentUser = getCurrentUser();

  if (!currentUser?.id) {
    toast.error("Please login first");
    return;
  }


  const cartKey = getCartKey(
    currentUser.id
  );


  const currentCart = JSON.parse(
    localStorage.getItem(cartKey) || "[]"
  );


  const existingProduct = currentCart.find(
    (item) => item.id === id
  );


  if (!existingProduct) return;


  const currentQuantity = Number(
    existingProduct.quantity || 1
  );


  let updatedCart;


  if (currentQuantity <= 1) {

    updatedCart = currentCart.filter(
      (item) => item.id !== id
    );

  } else {

    updatedCart = currentCart.map(
      (item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                currentQuantity - 1,
            }
          : item
    );

  }


  localStorage.setItem(
    cartKey,
    JSON.stringify(updatedCart)
  );


  setCart(updatedCart);


  window.dispatchEvent(
    new Event("cartChange")
  );


  if (currentQuantity <= 1) {
    toast.success("Removed from cart");
  }
};

  // =====================================================
  // REMOVE FROM WISHLIST
  // =====================================================

  const removeFromWishlist = (id) => {

  const currentUser = getCurrentUser();

  if (!currentUser?.id) {
    toast.error("Please login first");
    return;
  }


  const wishlistKey = getWishlistKey(
    currentUser.id
  );


  const updatedWishlist = wishlist.filter(
    (item) => item.id !== id
  );


  localStorage.setItem(
    wishlistKey,
    JSON.stringify(updatedWishlist)
  );


  setWishlist(updatedWishlist);


  window.dispatchEvent(
    new Event("wishlistChange")
  );


  toast.success("Removed from wishlist");
};

  // =====================================================
  // EMPTY WISHLIST
  // =====================================================

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#FCFAFF] flex items-center justify-center px-4">

        <div className="text-center max-w-md">

          <div className="
            w-24
            h-24
            mx-auto
            rounded-full
            bg-[#F7EEFF]
            flex
            items-center
            justify-center
            text-5xl
          ">
            ♡
          </div>

          <h1 className="
            mt-6
            text-3xl
            font-bold
            text-[#29213A]
          ">
            Your Wishlist is Empty
          </h1>

          <p className="
            mt-3
            text-[#756B82]
          ">
            Save your favourite flowers here and
            buy them whenever you want.
          </p>

          <Link
            to="/flowers"
            className="
              inline-block
              mt-7
              px-7
              py-3.5
              rounded-xl
              bg-[#9B5DE5]
              text-white
              font-semibold
              hover:bg-[#7B3FB3]
              transition
            "
          >
            Explore Flowers
          </Link>

        </div>

      </div>
    );
  }

  // =====================================================
  // WISHLIST PAGE
  // =====================================================

  return (
    <div className="
      min-h-screen
      bg-[#FCFAFF]
      py-10
      px-4
    ">

      <div className="
        max-w-7xl
        mx-auto
      ">

        {/* HEADER */}

        <div className="
          mb-8
          flex
          flex-col
          sm:flex-row
          sm:items-end
          sm:justify-between
          gap-4
        ">

          <div>

            <p className="
              text-sm
              font-semibold
              text-[#9B5DE5]
            ">
              ROSENLILLY
            </p>

            <h1 className="
              mt-1
              text-3xl
              sm:text-4xl
              font-bold
              text-[#29213A]
            ">
              My Wishlist ♡
            </h1>

            <p className="
              mt-2
              text-[#756B82]
            ">
              Your favourite flowers in one place.
            </p>

          </div>

          <div className="
            text-sm
            font-semibold
            text-[#756B82]
          ">
            {wishlist.length}{" "}
            {wishlist.length === 1
              ? "item"
              : "items"}
          </div>

        </div>


        {/* PRODUCT GRID */}

        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-6
        ">

          {wishlist.map((product) => {

            const quantity =
              getQuantity(product.id);

            const price =
              Number(product.price || 0);

            const originalPrice =
              Number(
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

            return (
              <div
                key={product.id}
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

                <div className="
                  relative
                  h-64
                  bg-[#F7EEFF]
                  overflow-hidden
                ">

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
                          transition
                          duration-500
                        "
                      />

                    ) : (

                      <div className="
                        w-full
                        h-full
                        flex
                        items-center
                        justify-center
                        text-6xl
                      ">
                        🌸
                      </div>

                    )}

                  </Link>

                  {/* DISCOUNT */}

                  {discount > 0 && (
                    <span className="
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
                    ">
                      {discount}% OFF
                    </span>
                  )}

                  {/* REMOVE */}

                  <button
                    onClick={() =>
                      removeFromWishlist(
                        product.id
                      )
                    }
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
                      text-red-500
                      hover:bg-red-50
                      transition
                    "
                    title="Remove from wishlist"
                  >
                    ❤️
                  </button>

                </div>


                {/* DETAILS */}

                <div className="p-5">

                  <Link
                    to={`/product/${product.id}`}
                  >

                    <h2 className="
                      font-bold
                      text-[#29213A]
                      line-clamp-2
                      hover:text-[#9B5DE5]
                      transition
                    ">
                      {product.name ||
                        "Beautiful Flowers"}
                    </h2>

                  </Link>


                  {/* RATING */}

                  <div className="
                    flex
                    items-center
                    gap-2
                    mt-2
                  ">

                    <span className="text-sm">
                      ⭐
                    </span>

                    <span className="
                      text-sm
                      font-semibold
                      text-[#29213A]
                    ">
                      {product.rating || 4.5}
                    </span>

                    <span className="
                      text-xs
                      text-[#9A91A4]
                    ">
                      ({product.reviews || 0})
                    </span>

                  </div>


                  {/* PRICE */}

                  <div className="
                    flex
                    items-center
                    gap-2
                    mt-3
                  ">

                    <span className="
                      text-xl
                      font-bold
                      text-[#9B5DE5]
                    ">
                      ₹
                      {price.toLocaleString(
                        "en-IN"
                      )}
                    </span>

                    {originalPrice > price && (
                      <span className="
                        text-sm
                        text-[#9A91A4]
                        line-through
                      ">
                        ₹
                        {originalPrice.toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    )}

                  </div>


                  {/* ===================================
                      CART CONTROLS
                  =================================== */}

                  {quantity === 0 ? (

                    <button
                      onClick={() =>
                        addToCart(product)
                      }
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

                    <div className="
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
                    ">

                      {/* MINUS */}

                      <button
                        onClick={() =>
                          decreaseQuantity(
                            product.id
                          )
                        }
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

                      <span className="
                        flex-1
                        text-center
                        font-bold
                        text-[#29213A]
                      ">
                        {quantity}
                      </span>


                      {/* PLUS */}

                      <button
                        onClick={() =>
                          increaseQuantity(
                            product.id
                          )
                        }
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
          })}

        </div>

      </div>

    </div>
  );
};

export default Wishlist;