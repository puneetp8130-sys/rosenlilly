import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  // ==========================================
  // CURRENT USER
  // ==========================================

  const getCurrentUser = () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("currentUser") || "null"
      );

      return user;
    } catch (error) {
      console.error("Failed to read currentUser:", error);
      return null;
    }
  };

  const [currentUser, setCurrentUser] = useState(
  getCurrentUser()
  );

  // ==========================================
  // USER-SPECIFIC CART KEY
  // ==========================================

  const cartKey = currentUser
    ? `cart_${currentUser.id}`
    : null;

  // ==========================================
  // LOAD CART
  // ==========================================

  const loadCart = () => {
    const user = getCurrentUser();

    if (!user || !user.id) {
      setCart([]);
      return;
    }

    const key = `cart_${user.id}`;

    try {
      const savedCart = JSON.parse(
        localStorage.getItem(key) || "[]"
      );

      setCart(
        Array.isArray(savedCart)
          ? savedCart
          : []
      );
    } catch (error) {
      console.error("Failed to load cart:", error);
      setCart([]);
    }
  };

  // ==========================================
  // LOAD WHEN USER / CART CHANGES
  // ==========================================

  useEffect(() => {
  const handleAuthChange = () => {
    const user = getCurrentUser();

    setCurrentUser(user);

    if (!user?.id) {
      setCart([]);
      return;
    }

    loadCart();
  };

  loadCart();

  window.addEventListener(
    "cartChange",
    loadCart
  );

  window.addEventListener(
    "authChange",
    handleAuthChange
  );

  window.addEventListener(
    "storage",
    handleAuthChange
  );

  return () => {
    window.removeEventListener(
      "cartChange",
      loadCart
    );

    window.removeEventListener(
      "authChange",
      handleAuthChange
    );

    window.removeEventListener(
      "storage",
      handleAuthChange
    );
  };
}, []);
  // ==========================================
  // SAVE CART
  // ==========================================

  const saveCart = (updatedCart) => {
    const user = getCurrentUser();

    if (!user || !user.id) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    const key = `cart_${user.id}`;

    localStorage.setItem(
      key,
      JSON.stringify(updatedCart)
    );

    setCart(updatedCart);

    window.dispatchEvent(
      new Event("cartChange")
    );
  };

  // ==========================================
  // UPDATE QUANTITY
  // ==========================================

  const updateQuantity = (id, change) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id !== id) {
          return item;
        }

        const newQuantity =
          Number(item.quantity || 1) + change;

        return {
          ...item,
          quantity: newQuantity,
        };
      })
      .filter(
        (item) =>
          Number(item.quantity || 0) > 0
      );

    saveCart(updatedCart);
  };

  // ==========================================
  // REMOVE ITEM
  // ==========================================

  const removeItem = (id) => {
    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    saveCart(updatedCart);

    toast.success("Item removed from cart");
  };

  // ==========================================
  // CLEAR CART
  // ==========================================

  const clearCart = () => {
    if (!currentUser?.id) {
      setCart([]);
      return;
    }

    localStorage.removeItem(
      `cart_${currentUser.id}`
    );

    setCart([]);

    window.dispatchEvent(
      new Event("cartChange")
    );

    toast.success("Cart cleared");
  };

  // ==========================================
  // SUBTOTAL
  // ==========================================

  const subtotal = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total +
        Number(item.price || 0) *
          Number(item.quantity || 1),
      0
    );
  }, [cart]);

  // ==========================================
  // DISCOUNT
  // ==========================================

  const discount = useMemo(() => {
    if (subtotal >= 2000) {
      return Math.round(subtotal * 0.1);
    }

    return 0;
  }, [subtotal]);

  // ==========================================
  // DELIVERY
  // ==========================================

  const deliveryCharge = useMemo(() => {
    if (subtotal === 0) {
      return 0;
    }

    if (subtotal >= 999) {
      return 0;
    }

    return 99;
  }, [subtotal]);

  // ==========================================
  // TOTAL
  // ==========================================

  const total =
    subtotal -
    discount +
    deliveryCharge;

  // ==========================================
  // TOTAL ITEMS
  // ==========================================

  const totalItems = cart.reduce(
    (total, item) =>
      total + Number(item.quantity || 1),
    0
  );

  // ==========================================
  // CHECKOUT
  // ==========================================

  const handleCheckout = () => {
  const user = getCurrentUser();

  if (!user?.id) {
    toast.error("Please login to continue");

    navigate("/login", {
      state: {
        from: {
          pathname: "/checkout",
        },
      },
    });

    return;
  }

  if (!cart.length) {
    toast.error("Your cart is empty");
    return;
  }

  navigate("/checkout");
};

  // ==========================================
  // EMPTY CART
  // ==========================================

  if (cart.length === 0) {
    return (
      <div className="min-h-[75vh] bg-[#FCFAFF]">

        <section className="bg-linear-to-r from-[#F7EEFF] to-[#FCE7F8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

            <p className="text-sm font-semibold text-[#9B5DE5]">
              ROSENLILLY
            </p>

            <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-[#29213A]">
              Shopping Cart
            </h1>

          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-20">

          <div className="max-w-md mx-auto text-center">

            <div className="mx-auto w-24 h-24 rounded-full bg-[#F7EEFF] flex items-center justify-center text-5xl">
              🛒
            </div>

            <h2 className="mt-6 text-2xl font-bold text-[#29213A]">
              Your cart is empty
            </h2>

            <p className="mt-2 text-[#756B82]">
              Looks like you haven't added any
              flowers to your cart yet.
            </p>

            <Link
              to="/flowers"
              className="
                inline-block
                mt-7
                px-7
                py-3
                rounded-xl
                bg-[#9B5DE5]
                text-white
                font-semibold
                hover:bg-[#7B3FB3]
                transition
              "
            >
              Explore Flowers 🌸
            </Link>

          </div>

        </div>

      </div>
    );
  }

  // ==========================================
  // CART UI
  // ==========================================

  return (
    <div className="min-h-screen bg-[#FCFAFF]">

      {/* HEADER */}

      <section className="bg-linear-to-r from-[#F7EEFF] to-[#FCE7F8]">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          <p className="text-sm font-semibold text-[#9B5DE5]">
            ROSENLILLY
          </p>

          <div className="mt-2 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">

            <div>

              <h1 className="text-3xl sm:text-4xl font-bold text-[#29213A]">
                Shopping Cart
              </h1>

              <p className="mt-2 text-[#756B82]">
                {totalItems}{" "}
                {totalItems === 1
                  ? "item"
                  : "items"}{" "}
                in your cart
              </p>

            </div>

            <button
              onClick={clearCart}
              className="
                text-sm
                font-semibold
                text-red-500
                hover:text-red-600
              "
            >
              Clear Cart
            </button>

          </div>

        </div>

      </section>

      {/* MAIN */}

      <section className="py-10">

        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            grid
            grid-cols-1
            lg:grid-cols-3
            gap-7
          "
        >

          {/* CART ITEMS */}

          <div className="lg:col-span-2 space-y-4">

            {cart.map((item) => (

              <div
                key={item.id}
                className="
                  bg-white
                  rounded-2xl
                  border
                  border-[#eee6f7]
                  p-4
                  sm:p-5
                "
              >

                <div className="flex gap-4">

                  {/* IMAGE */}

                  <Link
                    to={`/product/${item.id}`}
                    className="
                      w-24
                      h-24
                      sm:w-32
                      sm:h-32
                      shrink-0
                      rounded-xl
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
                      "
                    />

                  </Link>

                  {/* INFO */}

                  <div className="flex-1 min-w-0">

                    <div className="flex justify-between gap-3">

                      <div>

                        <Link
                          to={`/product/${item.id}`}
                          className="
                            font-bold
                            text-[#29213A]
                            hover:text-[#9B5DE5]
                          "
                        >
                          {item.name}
                        </Link>

                        <p className="mt-1 text-sm text-[#756B82]">
                          ₹
                          {Number(
                            item.price || 0
                          ).toLocaleString("en-IN")}
                        </p>

                      </div>

                      {/* REMOVE */}

                      <button
                        onClick={() =>
                          removeItem(item.id)
                        }
                        className="
                          text-xl
                          text-[#9A91A4]
                          hover:text-red-500
                        "
                        title="Remove"
                      >
                        ×
                      </button>

                    </div>

                    {/* QUANTITY */}

                    <div className="mt-5 flex items-center justify-between gap-3">

                      <div
                        className="
                          flex
                          items-center
                          border
                          border-[#ddd3e8]
                          rounded-xl
                          overflow-hidden
                        "
                      >

                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              -1
                            )
                          }
                          className="
                            w-9
                            h-9
                            flex
                            items-center
                            justify-center
                            text-[#29213A]
                            hover:bg-[#F7EEFF]
                          "
                        >
                          −
                        </button>

                        <span
                          className="
                            w-10
                            text-center
                            text-sm
                            font-semibold
                            text-[#29213A]
                          "
                        >
                          {item.quantity || 1}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              1
                            )
                          }
                          className="
                            w-9
                            h-9
                            flex
                            items-center
                            justify-center
                            text-[#29213A]
                            hover:bg-[#F7EEFF]
                          "
                        >
                          +
                        </button>

                      </div>

                      {/* ITEM TOTAL */}

                      <p className="font-bold text-[#9B5DE5]">
                        ₹
                        {(
                          Number(
                            item.price || 0
                          ) *
                          Number(
                            item.quantity || 1
                          )
                        ).toLocaleString("en-IN")}
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            ))}

            {/* CONTINUE SHOPPING */}

            <Link
              to="/flowers"
              className="
                inline-flex
                items-center
                gap-2
                text-sm
                font-semibold
                text-[#9B5DE5]
                hover:text-[#7B3FB3]
              "
            >
              ← Continue Shopping
            </Link>

          </div>

          {/* ORDER SUMMARY */}

          <div>

            <div
              className="
                bg-white
                rounded-2xl
                border
                border-[#eee6f7]
                p-6
                sticky
                top-24
              "
            >

              <h2 className="text-xl font-bold text-[#29213A]">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4">

                <div className="flex justify-between">

                  <span className="text-[#756B82]">
                    Subtotal
                  </span>

                  <span className="font-semibold text-[#29213A]">
                    ₹
                    {subtotal.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-[#756B82]">
                    Discount
                  </span>

                  <span className="font-semibold text-green-600">
                    - ₹
                    {discount.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-[#756B82]">
                    Delivery
                  </span>

                  <span className="font-semibold text-[#29213A]">
                    {deliveryCharge === 0
                      ? "FREE"
                      : `₹${deliveryCharge}`}
                  </span>

                </div>

              </div>

              {/* FREE DELIVERY */}

              {subtotal > 0 &&
                subtotal < 999 && (
                  <div
                    className="
                      mt-5
                      p-3
                      rounded-xl
                      bg-[#F7EEFF]
                      text-sm
                      text-[#756B82]
                    "
                  >
                    Add ₹
                    {(999 - subtotal).toLocaleString(
                      "en-IN"
                    )}{" "}
                    more for{" "}
                    <span className="font-semibold text-[#9B5DE5]">
                      FREE delivery
                    </span>{" "}
                    🚚
                  </div>
                )}

              <div className="my-6 border-t border-[#eee6f7]" />

              {/* TOTAL */}

              <div className="flex items-center justify-between">

                <span className="text-lg font-bold text-[#29213A]">
                  Total
                </span>

                <span className="text-2xl font-bold text-[#9B5DE5]">
                  ₹
                  {total.toLocaleString(
                    "en-IN"
                  )}
                </span>

              </div>

              {/* CHECKOUT */}

              <button
                onClick={handleCheckout}
                className="
                  mt-6
                  w-full
                  py-3.5
                  rounded-xl
                  bg-[#9B5DE5]
                  text-white
                  font-semibold
                  hover:bg-[#7B3FB3]
                  transition
                "
              >
                Proceed to Checkout →
              </button>

              {/* TRUST */}

              <div className="mt-5 space-y-2 text-xs text-[#756B82]">

                <p>🔒 Secure checkout</p>

                <p>🚚 Fast flower delivery</p>

                <p>🌸 Fresh flowers guaranteed</p>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Cart;