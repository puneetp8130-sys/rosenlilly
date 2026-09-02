import React, {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

// ==================================================
// ORDERS
// ==================================================

const Orders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==================================================
  // GET CURRENT USER
  // ==================================================

  const getCurrentUser = () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("currentUser") || "null"
      );

      return user;
    } catch (error) {
      console.error(
        "Error reading current user:",
        error
      );

      return null;
    }
  };

  // ==================================================
  // LOAD CURRENT USER ORDERS
  // ==================================================

  const loadOrders = () => {
    try {
      const currentUser =
        getCurrentUser();

      // ----------------------------------------------
      // LOGIN CHECK
      // ----------------------------------------------

      if (!currentUser?.id) {
        setOrders([]);
        setLoading(false);
        return;
      }

      // ----------------------------------------------
      // LOAD ALL ORDERS
      // ----------------------------------------------

      const savedOrders =
        JSON.parse(
          localStorage.getItem(
            "orders"
          ) || "[]"
        );

      if (
        !Array.isArray(savedOrders)
      ) {
        setOrders([]);
        setLoading(false);
        return;
      }

      // ----------------------------------------------
      // CURRENT USER ORDERS ONLY
      // ----------------------------------------------

      const userOrders =
        savedOrders.filter(
          (order) =>
            String(order.userId) ===
            String(currentUser.id)
        );

      setOrders(userOrders);
    } catch (error) {
      console.error(
        "Error loading orders:",
        error
      );

      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // ==================================================
  // LOAD + LISTEN
  // ==================================================

  useEffect(() => {
    loadOrders();

    window.addEventListener(
      "ordersChange",
      loadOrders
    );

    window.addEventListener(
      "storage",
      loadOrders
    );

    return () => {
      window.removeEventListener(
        "ordersChange",
        loadOrders
      );

      window.removeEventListener(
        "storage",
        loadOrders
      );
    };
  }, []);

  // ==================================================
  // CURRENT USER
  // ==================================================

  const currentUser =
    getCurrentUser();

  // ==================================================
  // LOGIN CHECK
  // ==================================================

  if (
    !loading &&
    !currentUser?.id
  ) {
    return (
      <div
        className="
          min-h-screen
          bg-[#FCFAFF]
          flex
          items-center
          justify-center
          px-4
        "
      >

        <div className="text-center">

          <div className="text-6xl">
            🔐
          </div>

          <h1
            className="
              mt-5
              text-3xl
              font-bold
              text-[#29213A]
            "
          >
            Login Required
          </h1>

          <p className="mt-2 text-[#756B82]">
            Please login to view your orders.
          </p>

          <button
            onClick={() =>
              navigate("/login", {
                state: {
                  from: {
                    pathname:
                      "/orders",
                  },
                },
              })
            }
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
              transition
            "
          >
            Login
          </button>

        </div>

      </div>
    );
  }

  // ==================================================
  // LOADING
  // ==================================================

  if (loading) {
    return (
      <div
        className="
          min-h-screen
          bg-[#FCFAFF]
          flex
          items-center
          justify-center
        "
      >

        <div className="text-center">

          <div className="text-5xl">
            📦
          </div>

          <p className="mt-4 text-[#756B82]">
            Loading your orders...
          </p>

        </div>

      </div>
    );
  }

  // ==================================================
  // EMPTY ORDERS
  // ==================================================

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-[#FCFAFF]">

        {/* HEADER */}

        <section
          className="
            bg-linear-to-r
            from-[#F7EEFF]
            to-[#FCE7F8]
          "
        >

          <div
            className="
              max-w-7xl
              mx-auto
              px-4
              sm:px-6
              lg:px-8
              py-10
            "
          >

            <p className="text-sm font-semibold text-[#9B5DE5]">
              ROSENLILLY
            </p>

            <h1
              className="
                mt-2
                text-3xl
                sm:text-4xl
                font-bold
                text-[#29213A]
              "
            >
              My Orders
            </h1>

            <p className="mt-2 text-[#756B82]">
              Track and view your previous orders.
            </p>

          </div>

        </section>

        {/* EMPTY */}

        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            py-16
            text-center
          "
        >

          <div className="text-6xl">
            📦
          </div>

          <h2
            className="
              mt-5
              text-2xl
              font-bold
              text-[#29213A]
            "
          >
            No Orders Yet
          </h2>

          <p className="mt-2 text-[#756B82]">
            Your placed orders will appear here.
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
              transition
            "
          >
            Start Shopping 🌸
          </Link>

        </div>

      </div>
    );
  }

  // ==================================================
  // ORDERS PAGE
  // ==================================================

  return (
    <div className="min-h-screen bg-[#FCFAFF]">

      {/* ==================================================
          HEADER
      ================================================== */}

      <section
        className="
          bg-linear-to-r
          from-[#F7EEFF]
          to-[#FCE7F8]
        "
      >

        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            py-10
          "
        >

          <p className="text-sm font-semibold text-[#9B5DE5]">
            ROSENLILLY
          </p>

          <h1
            className="
              mt-2
              text-3xl
              sm:text-4xl
              font-bold
              text-[#29213A]
            "
          >
            My Orders
          </h1>

          <p className="mt-2 text-[#756B82]">
            Track and view your previous orders.
          </p>

        </div>

      </section>

      {/* ==================================================
          ORDERS
      ================================================== */}

      <section className="py-10">

        <div
          className="
            max-w-5xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            space-y-5
          "
        >

          {orders.map(
            (order, index) => {

              // ------------------------------------------
              // ORDER ID
              // ------------------------------------------

              const orderId =
                order.id ||
                order.orderId ||
                `ORDER-${index + 1}`;

              // ------------------------------------------
              // ITEMS
              // ------------------------------------------

              const items =
                Array.isArray(
                  order.items
                )
                  ? order.items
                  : Array.isArray(
                      order.products
                    )
                  ? order.products
                  : [];

              // ------------------------------------------
              // DATE
              // ------------------------------------------

              const orderDate =
                order.createdAt
                  ? new Date(
                      order.createdAt
                    )
                  : null;

              const validDate =
                orderDate &&
                !Number.isNaN(
                  orderDate.getTime()
                );

              // ------------------------------------------
              // CALCULATED SUBTOTAL
              // ------------------------------------------

              const calculatedSubtotal =
                items.reduce(
                  (
                    sum,
                    item
                  ) => {
                    const price =
                      Number(
                        item.price
                      ) || 0;

                    const quantity =
                      Number(
                        item.quantity
                      ) || 1;

                    return (
                      sum +
                      price *
                        quantity
                    );
                  },
                  0
                );

              // ------------------------------------------
              // SUBTOTAL
              // ------------------------------------------

              const subtotal =
                order.subtotal !==
                undefined
                  ? Number(
                      order.subtotal
                    )
                  : calculatedSubtotal;

              // ------------------------------------------
              // DISCOUNT
              // ------------------------------------------

              const discount =
                Number(
                  order.discount
                ) || 0;

              // ------------------------------------------
              // ORIGINAL SUBTOTAL
              //
              // New orders have originalSubtotal.
              // Old orders can fallback to:
              // subtotal + discount
              // ------------------------------------------

              const originalSubtotal =
                order.originalSubtotal !==
                undefined
                  ? Number(
                      order.originalSubtotal
                    )
                  : subtotal +
                    discount;

              // ------------------------------------------
              // DELIVERY
              // ------------------------------------------

              const delivery =
                Number(
                  order.deliveryCharge ??
                    0
                );

              // ------------------------------------------
              // TOTAL
              //
              // IMPORTANT:
              // Do NOT subtract discount again.
              // ------------------------------------------

              const calculatedTotal =
                subtotal +
                delivery;

              const total =
                order.total !==
                undefined
                  ? Number(
                      order.total
                    )
                  : calculatedTotal;

              // ------------------------------------------
              // PAYMENT
              // ------------------------------------------

              const paymentMethod =
                order.paymentMethod ||
                (
                  order.payment ===
                  "cod"
                    ? "Cash on Delivery"
                    : order.payment ===
                      "card"
                    ? "Credit / Debit Card"
                    : order.payment ===
                      "upi"
                    ? "UPI"
                    : "Cash on Delivery"
                );

              return (
                <div
                  key={`${orderId}-${index}`}
                  className="
                    bg-white
                    rounded-2xl
                    border
                    border-[#eee6f7]
                    overflow-hidden
                  "
                >

                  {/* ==================================================
                      ORDER HEADER
                  ================================================== */}

                  <div
                    className="
                      p-5
                      border-b
                      border-[#eee6f7]
                      flex
                      flex-col
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                      gap-4
                    "
                  >

                    {/* ORDER ID */}

                    <div>

                      <p className="text-xs text-[#9A91A4]">
                        Order ID
                      </p>

                      <p className="font-bold text-[#29213A]">
                        #{orderId}
                      </p>

                    </div>

                    {/* DATE */}

                    <div>

                      <p className="text-xs text-[#9A91A4]">
                        Order Date
                      </p>

                      <p className="text-sm font-semibold text-[#29213A]">
                        {validDate
                          ? orderDate.toLocaleDateString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : "Date unavailable"}
                      </p>

                    </div>

                    {/* STATUS */}

                    <div>

                      <span
                        className={`
                          inline-flex
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-semibold

                          ${
                            order.status ===
                            "Cancelled"
                              ? "bg-red-50 text-red-600"
                              : "bg-green-50 text-green-600"
                          }
                        `}
                      >
                        {order.status ||
                          "Placed"}
                      </span>

                    </div>

                  </div>

                  {/* ==================================================
                      PRODUCTS
                  ================================================== */}

                  <div className="p-5 space-y-4">

                    {items.length >
                    0 ? (
                      items.map(
                        (
                          item,
                          itemIndex
                        ) => {

                          const quantity =
                            Number(
                              item.quantity
                            ) || 1;

                          const price =
                            Number(
                              item.price
                            ) || 0;

                          const itemTotal =
                            price *
                            quantity;

                          return (
                            <div
                              key={
                                item.id ||
                                itemIndex
                              }
                              className="
                                flex
                                items-center
                                gap-4
                              "
                            >

                              {/* IMAGE */}

                              <div
                                className="
                                  w-16
                                  h-16
                                  shrink-0
                                  rounded-xl
                                  overflow-hidden
                                  bg-[#F7EEFF]
                                "
                              >

                                {item.image ? (
                                  <img
                                    src={
                                      item.image
                                    }
                                    alt={
                                      item.name ||
                                      "Product"
                                    }
                                    className="
                                      w-full
                                      h-full
                                      object-cover
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
                                      text-2xl
                                    "
                                  >
                                    🌸
                                  </div>
                                )}

                              </div>

                              {/* INFO */}

                              <div className="flex-1 min-w-0">

                                <p
                                  className="
                                    font-semibold
                                    text-[#29213A]
                                    truncate
                                  "
                                >
                                  {item.name ||
                                    "Flower"}
                                </p>

                                <p className="mt-1 text-xs text-[#9A91A4]">
                                  Quantity:{" "}
                                  {quantity}
                                </p>

                                <p className="mt-1 text-xs text-[#9A91A4]">
                                  ₹
                                  {price.toLocaleString(
                                    "en-IN"
                                  )}{" "}
                                  each
                                </p>

                              </div>

                              {/* PRICE */}

                              <p
                                className="
                                  font-semibold
                                  text-[#29213A]
                                "
                              >
                                ₹
                                {itemTotal.toLocaleString(
                                  "en-IN"
                                )}
                              </p>

                            </div>
                          );
                        }
                      )
                    ) : (
                      <p className="text-sm text-[#756B82]">
                        No product information
                        available.
                      </p>
                    )}

                  </div>

                  {/* ==================================================
                      ORDER SUMMARY
                  ================================================== */}

                  <div
                    className="
                      px-5
                      py-4
                      bg-[#FCFAFF]
                      border-t
                      border-[#eee6f7]
                    "
                  >

                    <div className="flex justify-end">

                      <div className="w-full sm:w-72 space-y-2">

                        {/* ORIGINAL PRICE */}

                        {discount >
                          0 && (
                          <div
                            className="
                              flex
                              justify-between
                              text-sm
                            "
                          >

                            <span className="text-[#756B82]">
                              Original Price
                            </span>

                            <span className="font-semibold text-[#29213A]">
                              ₹
                              {originalSubtotal.toLocaleString(
                                "en-IN"
                              )}
                            </span>

                          </div>
                        )}

                        {/* DISCOUNT */}

                        {discount >
                          0 && (
                          <div
                            className="
                              flex
                              justify-between
                              text-sm
                            "
                          >

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
                        )}

                        {/* SUBTOTAL */}

                        <div
                          className="
                            flex
                            justify-between
                            text-sm
                          "
                        >

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

                        {/* DELIVERY */}

                        <div
                          className="
                            flex
                            justify-between
                            text-sm
                          "
                        >

                          <span className="text-[#756B82]">
                            Delivery
                          </span>

                          <span className="font-semibold text-[#29213A]">
                            {delivery ===
                            0
                              ? "FREE"
                              : `₹${delivery.toLocaleString(
                                  "en-IN"
                                )}`}
                          </span>

                        </div>

                      </div>

                    </div>

                  </div>

                  {/* ==================================================
                      FOOTER
                  ================================================== */}

                  <div
                    className="
                      px-5
                      py-4
                      bg-white
                      border-t
                      border-[#eee6f7]
                      flex
                      flex-col
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                      gap-4
                    "
                  >

                    {/* PAYMENT */}

                    <div>

                      <span className="text-sm text-[#756B82]">
                        Payment:{" "}
                      </span>

                      <span className="text-sm font-semibold text-[#29213A]">
                        {paymentMethod}
                      </span>

                    </div>

                    {/* TOTAL + VIEW */}

                    <div
                      className="
                        flex
                        items-center
                        gap-4
                      "
                    >

                      <div>

                        <span className="text-sm text-[#756B82]">
                          Total{" "}
                        </span>

                        <span className="text-lg font-bold text-[#9B5DE5]">
                          ₹
                          {total.toLocaleString(
                            "en-IN"
                          )}
                        </span>

                      </div>

                      <Link
                        to={`/orders/${orderId}`}
                        className="
                          px-4
                          py-2
                          rounded-xl
                          bg-[#F7EEFF]
                          text-[#9B5DE5]
                          text-sm
                          font-semibold
                          hover:bg-[#EFE0FF]
                          transition
                        "
                      >
                        View Details
                      </Link>

                    </div>

                  </div>

                </div>
              );
            }
          )}

        </div>

      </section>

    </div>
  );
};

export default Orders;