import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

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
        "Error loading current user:",
        error
      );

      return null;
    }
  };

  const currentUser = getCurrentUser();

  // ==================================================
  // LOGIN REQUIRED
  // ==================================================

  if (!currentUser?.id) {
    return (
      <div className="min-h-screen bg-[#FCFAFF] flex items-center justify-center px-4">
        <div className="text-center">

          <div className="text-6xl">
            🔐
          </div>

          <h1 className="mt-5 text-2xl font-bold text-[#29213A]">
            Login Required
          </h1>

          <p className="mt-2 text-[#756B82]">
            Please login to view your order details.
          </p>

          <button
            onClick={() =>
              navigate("/login", {
                state: {
                  from: {
                    pathname: `/orders/${orderId}`,
                  },
                },
              })
            }
            className="
              inline-block
              mt-6
              px-6
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
  // LOAD ALL ORDERS
  // ==================================================

  let orders = [];

  try {
    const savedOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    orders = Array.isArray(savedOrders)
      ? savedOrders
      : [];
  } catch (error) {
    console.error(
      "Error loading orders:",
      error
    );

    orders = [];
  }

  // ==================================================
  // FIND CURRENT USER ORDER
  // ==================================================

  const order = orders.find(
    (item) =>
      (
        String(item.id) === String(orderId) ||
        String(item.orderId) === String(orderId)
      ) &&
      String(item.userId) ===
        String(currentUser.id)
  );

  // ==================================================
  // ORDER NOT FOUND
  // ==================================================

  if (!order) {
    return (
      <div className="min-h-screen bg-[#FCFAFF] flex items-center justify-center px-4">
        <div className="text-center">

          <div className="text-6xl">
            📦
          </div>

          <h1 className="mt-5 text-2xl font-bold text-[#29213A]">
            Order not found
          </h1>

          <p className="mt-2 text-[#756B82]">
            This order does not exist or does not
            belong to your account.
          </p>

          <Link
            to="/orders"
            className="
              inline-block
              mt-6
              px-6
              py-3
              rounded-xl
              bg-[#9B5DE5]
              text-white
              font-semibold
              hover:bg-[#7B3FB3]
              transition
            "
          >
            ← Back to Orders
          </Link>

        </div>
      </div>
    );
  }

  // ==================================================
  // ORDER ITEMS
  // ==================================================

  const items =
    Array.isArray(order.items)
      ? order.items
      : Array.isArray(order.products)
      ? order.products
      : [];

  // ==================================================
  // ORDER ID
  // ==================================================

  const displayOrderId =
    order.id ||
    order.orderId ||
    orderId;

  // ==================================================
  // DATE
  // ==================================================

  const orderDate = order.createdAt
    ? new Date(order.createdAt)
    : null;

  const validDate =
    orderDate &&
    !Number.isNaN(
      orderDate.getTime()
    );

  // ==================================================
  // SUBTOTAL
  // IMPORTANT:
  // subtotal already contains selling prices.
  // ==================================================

  const calculatedSubtotal =
    items.reduce(
      (total, item) => {
        const price =
          Number(item.price) || 0;

        const quantity =
          Number(item.quantity) || 1;

        return (
          total +
          price * quantity
        );
      },
      0
    );

  const subtotal =
    order.subtotal !== undefined
      ? Number(order.subtotal) || 0
      : calculatedSubtotal;

  // ==================================================
  // DISCOUNT
  // ==================================================

  const discount =
    Number(order.discount) || 0;

  // ==================================================
  // DELIVERY
  // ==================================================

  const delivery =
    Number(order.deliveryCharge) || 0;

  // ==================================================
  // TOTAL
  //
  // IMPORTANT:
  // Checkout already calculates:
  //
  // total = subtotal + delivery
  //
  // So DO NOT subtract discount again.
  // ==================================================

  const calculatedTotal =
    subtotal +
    delivery;

  const total =
    order.total !== undefined
      ? Number(order.total) || 0
      : calculatedTotal;

  // ==================================================
  // CUSTOMER / ADDRESS
  // ==================================================

  const address =
    order.customer ||
    order.address ||
    {};

  // ==================================================
  // CUSTOMER NAME
  // ==================================================

  const customerName =
    `${address.firstName || ""} ${
      address.lastName || ""
    }`.trim() ||
    address.name ||
    order.userName ||
    currentUser.name ||
    "Customer";

  // ==================================================
  // CUSTOMER PHONE
  // ==================================================

  const customerPhone =
    address.phone ||
    order.phone ||
    currentUser.phone ||
    "";

  // ==================================================
  // CUSTOMER EMAIL
  // ==================================================

  const customerEmail =
    address.email ||
    order.userEmail ||
    currentUser.email ||
    "";

  // ==================================================
  // PAYMENT METHOD
  // ==================================================

  const paymentMethod =
    order.paymentMethod ||
    (
      order.payment === "cod"
        ? "Cash on Delivery"
        : order.payment === "card"
        ? "Credit / Debit Card"
        : order.payment === "upi"
        ? "UPI"
        : order.payment
    ) ||
    "Cash on Delivery";

  // ==================================================
  // DELIVERY METHOD
  // ==================================================

  const deliveryMethod =
    order.deliveryMethod ||
    (
      order.delivery === "express"
        ? "Express Delivery"
        : "Standard Delivery"
    );

  // ==================================================
  // STATUS
  // ==================================================

  const status =
    order.status || "Placed";

  // ==================================================
  // STATUS STEP
  // ==================================================

  const statusMap = {
    Placed: 1,
    Processing: 2,
    Shipped: 3,
    Delivered: 4,
  };

  const currentStep =
    statusMap[status] || 1;

  // ==================================================
  // FORMAT PRICE
  // ==================================================

  const formatPrice = (amount) => {
    return Number(amount || 0).toLocaleString(
      "en-IN"
    );
  };

  // ==================================================
  // UI
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

          <Link
            to="/orders"
            className="
              text-sm
              font-semibold
              text-[#9B5DE5]
              hover:text-[#7B3FB3]
            "
          >
            ← Back to Orders
          </Link>

          <div
            className="
              mt-5
              flex
              flex-col
              sm:flex-row
              sm:items-end
              sm:justify-between
              gap-4
            "
          >

            {/* ORDER INFORMATION */}

            <div>

              <p className="text-sm text-[#756B82]">
                Order Details
              </p>

              <h1
                className="
                  mt-1
                  text-3xl
                  sm:text-4xl
                  font-bold
                  text-[#29213A]
                "
              >
                #{displayOrderId}
              </h1>

              {validDate && (
                <p className="mt-2 text-sm text-[#756B82]">
                  Placed on{" "}
                  {orderDate.toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </p>
              )}

            </div>

            {/* STATUS */}

            <span
              className={`
                inline-flex
                w-fit
                px-4
                py-2
                rounded-full
                text-sm
                font-semibold

                ${
                  status === "Cancelled"
                    ? "bg-red-50 text-red-600"
                    : "bg-[#F0E5FF] text-[#7B3FB3]"
                }
              `}
            >
              {status}
            </span>

          </div>

        </div>
      </section>

      {/* ==================================================
          CONTENT
      ================================================== */}

      <section className="py-10">

        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
          "
        >

          {/* ==================================================
              ORDER STATUS
          ================================================== */}

          {status !== "Cancelled" && (
            <div
              className="
                mb-6
                bg-white
                rounded-2xl
                border
                border-[#eee6f7]
                p-6
              "
            >

              <h2 className="text-xl font-bold text-[#29213A]">
                Order Status
              </h2>

              <div
                className="
                  mt-8
                  grid
                  grid-cols-4
                  gap-2
                "
              >

                {/* PLACED */}

                <div className="text-center">

                  <div
                    className={`
                      mx-auto
                      w-10
                      h-10
                      rounded-full
                      flex
                      items-center
                      justify-center
                      font-bold

                      ${
                        currentStep >= 1
                          ? "bg-[#9B5DE5] text-white"
                          : "bg-[#eee6f7] text-[#756B82]"
                      }
                    `}
                  >
                    {currentStep >= 1
                      ? "✓"
                      : "1"}
                  </div>

                  <p className="mt-2 text-xs sm:text-sm font-semibold text-[#29213A]">
                    Placed
                  </p>

                </div>

                {/* PROCESSING */}

                <div className="text-center">

                  <div
                    className={`
                      mx-auto
                      w-10
                      h-10
                      rounded-full
                      flex
                      items-center
                      justify-center
                      font-bold

                      ${
                        currentStep >= 2
                          ? "bg-[#9B5DE5] text-white"
                          : "bg-[#eee6f7] text-[#756B82]"
                      }
                    `}
                  >
                    {currentStep >= 2
                      ? "✓"
                      : "2"}
                  </div>

                  <p className="mt-2 text-xs sm:text-sm font-semibold text-[#29213A]">
                    Processing
                  </p>

                </div>

                {/* SHIPPED */}

                <div className="text-center">

                  <div
                    className={`
                      mx-auto
                      w-10
                      h-10
                      rounded-full
                      flex
                      items-center
                      justify-center
                      font-bold

                      ${
                        currentStep >= 3
                          ? "bg-[#9B5DE5] text-white"
                          : "bg-[#eee6f7] text-[#756B82]"
                      }
                    `}
                  >
                    {currentStep >= 3
                      ? "✓"
                      : "3"}
                  </div>

                  <p className="mt-2 text-xs sm:text-sm font-semibold text-[#29213A]">
                    Shipped
                  </p>

                </div>

                {/* DELIVERED */}

                <div className="text-center">

                  <div
                    className={`
                      mx-auto
                      w-10
                      h-10
                      rounded-full
                      flex
                      items-center
                      justify-center
                      font-bold

                      ${
                        currentStep >= 4
                          ? "bg-[#9B5DE5] text-white"
                          : "bg-[#eee6f7] text-[#756B82]"
                      }
                    `}
                  >
                    {currentStep >= 4
                      ? "✓"
                      : "4"}
                  </div>

                  <p className="mt-2 text-xs sm:text-sm font-semibold text-[#29213A]">
                    Delivered
                  </p>

                </div>

              </div>

            </div>
          )}

          {/* ==================================================
              MAIN GRID
          ================================================== */}

          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-3
              gap-6
            "
          >

            {/* ==================================================
                LEFT SIDE
            ================================================== */}

            <div className="lg:col-span-2">

              {/* ==================================================
                  ORDERED ITEMS
              ================================================== */}

              <div
                className="
                  bg-white
                  rounded-2xl
                  border
                  border-[#eee6f7]
                  overflow-hidden
                "
              >

                <div
                  className="
                    p-6
                    border-b
                    border-[#eee6f7]
                  "
                >

                  <h2 className="text-xl font-bold text-[#29213A]">
                    Ordered Items
                  </h2>

                  <p className="mt-1 text-sm text-[#756B82]">
                    {items.length}{" "}
                    {items.length === 1
                      ? "item"
                      : "items"}{" "}
                    in this order
                  </p>

                </div>

                <div className="divide-y divide-[#eee6f7]">

                  {items.length > 0 ? (
                    items.map(
                      (item, index) => {

                        const price =
                          Number(
                            item.price
                          ) || 0;

                        const quantity =
                          Number(
                            item.quantity
                          ) || 1;

                        const itemTotal =
                          price *
                          quantity;

                        return (
                          <div
                            key={
                              item.id ||
                              index
                            }
                            className="
                              p-5
                              flex
                              gap-4
                              items-center
                            "
                          >

                            {/* IMAGE */}

                            <div
                              className="
                                w-20
                                h-20
                                rounded-xl
                                overflow-hidden
                                bg-[#F7EEFF]
                                shrink-0
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
                                    text-3xl
                                  "
                                >
                                  🌸
                                </div>
                              )}

                            </div>

                            {/* PRODUCT INFO */}

                            <div
                              className="
                                flex-1
                                min-w-0
                              "
                            >

                              <h3
                                className="
                                  font-semibold
                                  text-[#29213A]
                                "
                              >
                                {item.name ||
                                  "Flower"}
                              </h3>

                              <p className="mt-1 text-sm text-[#756B82]">
                                Quantity:{" "}
                                {quantity}
                              </p>

                              <p className="mt-1 text-sm text-[#756B82]">
                                ₹
                                {formatPrice(
                                  price
                                )}{" "}
                                each
                              </p>

                            </div>

                            {/* ITEM TOTAL */}

                            <div className="text-right">

                              <p className="font-bold text-[#29213A]">
                                ₹
                                {formatPrice(
                                  itemTotal
                                )}
                              </p>

                            </div>

                          </div>
                        );
                      }
                    )
                  ) : (
                    <div className="p-8 text-center">

                      <div className="text-4xl">
                        🌸
                      </div>

                      <p className="mt-3 text-sm text-[#756B82]">
                        No items found in this order.
                      </p>

                    </div>
                  )}

                </div>

              </div>

              {/* ==================================================
                  DELIVERY ADDRESS
              ================================================== */}

              <div
                className="
                  mt-6
                  bg-white
                  rounded-2xl
                  border
                  border-[#eee6f7]
                  p-6
                "
              >

                <h2 className="text-xl font-bold text-[#29213A]">
                  Delivery Address
                </h2>

                <div
                  className="
                    mt-5
                    text-sm
                    text-[#756B82]
                    leading-7
                  "
                >

                  <p className="font-semibold text-[#29213A]">
                    {customerName}
                  </p>

                  {address.address && (
                    <p>
                      {address.address}
                    </p>
                  )}

                  {(address.city ||
                    address.state) && (
                    <p>
                      {address.city || ""}

                      {address.city &&
                      address.state
                        ? ", "
                        : ""}

                      {address.state || ""}
                    </p>
                  )}

                  {address.pincode && (
                    <p>
                      PIN:{" "}
                      {address.pincode}
                    </p>
                  )}

                  {customerPhone && (
                    <p>
                      Phone:{" "}
                      {customerPhone}
                    </p>
                  )}

                  {customerEmail && (
                    <p>
                      Email:{" "}
                      {customerEmail}
                    </p>
                  )}

                </div>

              </div>

            </div>

            {/* ==================================================
                RIGHT SIDE
            ================================================== */}

            <div>

              <div
                className="
                  bg-white
                  rounded-2xl
                  border
                  border-[#eee6f7]
                  p-6
                  lg:sticky
                  lg:top-24
                "
              >

                <h2 className="text-xl font-bold text-[#29213A]">
                  Order Summary
                </h2>

                <div className="mt-6 space-y-4">

                  {/* SUBTOTAL */}

                  <div className="flex justify-between text-sm">

                    <span className="text-[#756B82]">
                      Subtotal
                    </span>

                    <span className="font-semibold text-[#29213A]">
                      ₹
                      {formatPrice(
                        subtotal
                      )}
                    </span>

                  </div>

                  {/* DISCOUNT */}

                  <div className="flex justify-between text-sm">

                    <span className="text-[#756B82]">
                      Discount
                    </span>

                    <span className="font-semibold text-green-600">
                      {discount > 0
                        ? `- ₹${formatPrice(
                            discount
                          )}`
                        : "₹0"}
                    </span>

                  </div>

                  {/* DELIVERY */}

                  <div className="flex justify-between text-sm">

                    <span className="text-[#756B82]">
                      Delivery
                    </span>

                    <span className="font-semibold text-[#29213A]">
                      {delivery === 0
                        ? "FREE"
                        : `₹${formatPrice(
                            delivery
                          )}`}
                    </span>

                  </div>

                </div>

                <div
                  className="
                    my-6
                    border-t
                    border-[#eee6f7]
                  "
                />

                {/* TOTAL */}

                <div
                  className="
                    flex
                    justify-between
                    items-center
                  "
                >

                  <span className="font-bold text-[#29213A]">
                    Total
                  </span>

                  <span
                    className="
                      text-2xl
                      font-bold
                      text-[#9B5DE5]
                    "
                  >
                    ₹
                    {formatPrice(total)}
                  </span>

                </div>

                {/* PAYMENT */}

                <div
                  className="
                    mt-6
                    p-4
                    rounded-xl
                    bg-[#F7EEFF]
                  "
                >

                  <p className="text-xs text-[#756B82]">
                    Payment Method
                  </p>

                  <p className="mt-1 font-semibold text-[#29213A]">
                    {paymentMethod}
                  </p>

                </div>

                {/* DELIVERY METHOD */}

                <div
                  className="
                    mt-4
                    p-4
                    rounded-xl
                    bg-[#FCFAFF]
                    border
                    border-[#eee6f7]
                  "
                >

                  <p className="text-xs text-[#756B82]">
                    Delivery Method
                  </p>

                  <p className="mt-1 font-semibold text-[#29213A]">
                    {deliveryMethod}
                  </p>

                </div>

                {/* STATUS */}

                <div
                  className="
                    mt-4
                    p-4
                    rounded-xl
                    bg-[#FCFAFF]
                    border
                    border-[#eee6f7]
                  "
                >

                  <p className="text-xs text-[#756B82]">
                    Order Status
                  </p>

                  <p className="mt-1 font-semibold text-[#29213A]">
                    {status}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default OrderDetails;