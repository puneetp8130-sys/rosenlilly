import React, {
  useMemo,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

// ==================================================
// INPUT FIELD
// ==================================================

const InputField = ({
  name,
  label,
  type = "text",
  placeholder,
  value,
  error,
  onChange,
  inputMode,
  maxLength,
}) => {
  return (
    <div>
      <label
        className="
          block
          mb-2
          text-sm
          font-semibold
          text-[#29213A]
        "
      >
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        inputMode={inputMode}
        maxLength={maxLength}
        autoComplete="off"
        className={`
          w-full
          px-4
          py-3
          rounded-xl
          bg-white
          border
          outline-none
          text-[#29213A]
          placeholder:text-[#aaa1b3]
          transition
          ${
            error
              ? "border-red-400 focus:border-red-500"
              : "border-[#ddd3e8] focus:border-[#9B5DE5]"
          }
        `}
      />

      {error && (
        <p className="mt-1.5 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

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
// CHECKOUT
// ==================================================

const Checkout = () => {
  const navigate = useNavigate();

  const currentUser = getCurrentUser();

  // ==================================================
  // USER ID
  // ==================================================

  const userId = currentUser?.id || null;

  // ==================================================
  // USER CART KEY
  // ==================================================

  const cartKey = userId
    ? `cart_${userId}`
    : null;

  // ==================================================
  // LOAD USER CART
  // ==================================================

  const loadCart = () => {
    if (!userId) {
      return [];
    }

    try {
      const savedCart = JSON.parse(
        localStorage.getItem(cartKey) || "[]"
      );

      return Array.isArray(savedCart)
        ? savedCart
        : [];
    } catch (error) {
      console.error(
        "Checkout cart error:",
        error
      );

      return [];
    }
  };

  // ==================================================
  // CART STATE
  // ==================================================

  const [cart, setCart] = useState(
    loadCart
  );

  // ==================================================
  // FORM STATE
  // ==================================================

  const [formData, setFormData] =
    useState({
      firstName:
        currentUser?.name
          ? currentUser.name
              .split(" ")[0]
          : "",

      lastName:
        currentUser?.name
          ? currentUser.name
              .split(" ")
              .slice(1)
              .join(" ")
          : "",

      phone:
        currentUser?.phone || "",

      email:
        currentUser?.email || "",

      address: "",

      city: "",

      state: "",

      pincode: "",
    });

  // ==================================================
  // DELIVERY
  // ==================================================

  const [delivery, setDelivery] =
    useState("standard");

  // ==================================================
  // PAYMENT
  // ==================================================

  const [payment, setPayment] =
    useState("cod");

  // ==================================================
  // ERRORS
  // ==================================================

  const [errors, setErrors] =
    useState({});

  // ==================================================
  // ORDER LOADING
  // ==================================================

  const [placingOrder, setPlacingOrder] =
    useState(false);

  // ==================================================
  // SUBTOTAL
  //
  // Uses CURRENT SELLING PRICE
  // ==================================================

  const subtotal = useMemo(() => {
    return cart.reduce(
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
  }, [cart]);

  // ==================================================
  // DISCOUNT
  //
  // SAME LOGIC AS CART
  //
  // ₹2000 or more = 10% discount
  // Below ₹2000 = no discount
  // ==================================================

  const discount = useMemo(() => {
    if (subtotal >= 2000) {
      return Math.round(
        subtotal * 0.1
      );
    }

    return 0;
  }, [subtotal]);

  // ==================================================
  // DELIVERY CHARGE
  //
  // Standard:
  // ₹0 if subtotal >= ₹999
  // otherwise ₹49
  //
  // Express:
  // ₹99
  // ==================================================

  const deliveryCharge =
    delivery === "express"
      ? 99
      : subtotal >= 999
      ? 0
      : 49;

  // ==================================================
  // TOTAL
  //
  // DISCOUNT IS SUBTRACTED HERE
  // ==================================================

  const total =
    subtotal -
    discount +
    deliveryCharge;

  // ==================================================
  // HANDLE INPUT
  // ==================================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    // ----------------------------------------------
    // PHONE
    // ----------------------------------------------

    if (name === "phone") {
      const numbersOnly =
        value.replace(/\D/g, "");

      if (
        numbersOnly.length > 10
      ) {
        return;
      }

      setFormData((prev) => ({
        ...prev,
        phone: numbersOnly,
      }));

      setErrors((prev) => ({
        ...prev,
        phone: "",
      }));

      return;
    }

    // ----------------------------------------------
    // PINCODE
    // ----------------------------------------------

    if (name === "pincode") {
      const numbersOnly =
        value.replace(/\D/g, "");

      if (
        numbersOnly.length > 6
      ) {
        return;
      }

      setFormData((prev) => ({
        ...prev,
        pincode: numbersOnly,
      }));

      setErrors((prev) => ({
        ...prev,
        pincode: "",
      }));

      return;
    }

    // ----------------------------------------------
    // OTHER FIELDS
    // ----------------------------------------------

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // ==================================================
  // VALIDATE FORM
  // ==================================================

  const validateForm = () => {
    const newErrors = {};

    // First Name
    if (
      !formData.firstName.trim()
    ) {
      newErrors.firstName =
        "First name is required";
    }

    // Last Name
    if (
      !formData.lastName.trim()
    ) {
      newErrors.lastName =
        "Last name is required";
    }

    // Phone
    const phone =
      formData.phone.trim();

    if (!phone) {
      newErrors.phone =
        "Phone number is required";
    } else if (
      !/^[6-9]\d{9}$/.test(phone)
    ) {
      newErrors.phone =
        "Enter a valid 10-digit phone number";
    }

    // Email
    const email =
      formData.email.trim();

    if (!email) {
      newErrors.email =
        "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      )
    ) {
      newErrors.email =
        "Enter a valid email address";
    }

    // Address
    if (
      !formData.address.trim()
    ) {
      newErrors.address =
        "Address is required";
    }

    // City
    if (!formData.city.trim()) {
      newErrors.city =
        "City is required";
    }

    // State
    if (!formData.state.trim()) {
      newErrors.state =
        "State is required";
    }

    // Pincode
    const pincode =
      formData.pincode.trim();

    if (!pincode) {
      newErrors.pincode =
        "Pincode is required";
    } else if (
      !/^\d{6}$/.test(pincode)
    ) {
      newErrors.pincode =
        "Pincode must be exactly 6 digits";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
  };

  // ==================================================
  // PLACE ORDER
  // ==================================================

  const placeOrder = (e) => {
    e.preventDefault();

    if (placingOrder) {
      return;
    }

    // ==================================================
    // AUTH CHECK
    // ==================================================

    const user = getCurrentUser();

    if (!user?.id) {
      toast.error(
        "Please login to place your order"
      );

      navigate("/login", {
        state: {
          from: {
            pathname: "/checkout",
          },
        },
      });

      return;
    }

    // ==================================================
    // CART CHECK
    // ==================================================

    if (
      !Array.isArray(cart) ||
      cart.length === 0
    ) {
      toast.error(
        "Your cart is empty"
      );

      navigate("/cart");

      return;
    }

    // ==================================================
    // FORM VALIDATION
    // ==================================================

    if (!validateForm()) {
      toast.error(
        "Please fill all required fields correctly"
      );

      return;
    }

    // ==================================================
    // START ORDER
    // ==================================================

    setPlacingOrder(true);

    try {
      // ==================================================
      // ORDER ID
      // ==================================================

      const orderId =
        "RL" +
        Date.now()
          .toString()
          .slice(-8);

      // ==================================================
      // PAYMENT NAME
      // ==================================================

      let paymentMethod =
        "Cash on Delivery";

      if (payment === "card") {
        paymentMethod =
          "Credit / Debit Card";
      }

      if (payment === "upi") {
        paymentMethod =
          "UPI";
      }

      // ==================================================
      // FINAL PRICE CALCULATION
      //
      // Recalculate once before saving
      // to make sure order data is correct.
      // ==================================================

      const finalSubtotal =
        cart.reduce(
          (sum, item) => {
            const price =
              Number(item.price) || 0;

            const quantity =
              Number(item.quantity) || 1;

            return (
              sum +
              price * quantity
            );
          },
          0
        );

      const finalDiscount =
        finalSubtotal >= 2000
          ? Math.round(
              finalSubtotal * 0.1
            )
          : 0;

      const finalDeliveryCharge =
        delivery === "express"
          ? 99
          : finalSubtotal >= 999
          ? 0
          : 49;

      const finalTotal =
        finalSubtotal -
        finalDiscount +
        finalDeliveryCharge;

      // ==================================================
      // ORDER OBJECT
      // ==================================================

      const order = {
        // ----------------------------------------------
        // ORDER ID
        // ----------------------------------------------

        id: orderId,

        orderId: orderId,

        // ----------------------------------------------
        // USER
        // ----------------------------------------------

        userId: user.id,

        userEmail:
          user.email || "",

        userName:
          user.name || "",

        // ----------------------------------------------
        // PRODUCTS
        // ----------------------------------------------

        items: cart.map(
          (item) => ({
            ...item,
          })
        ),

        products: cart.map(
          (item) => ({
            ...item,
          })
        ),

        // ----------------------------------------------
        // CUSTOMER
        // ----------------------------------------------

        customer: {
          ...formData,
        },

        // ----------------------------------------------
        // DELIVERY
        // ----------------------------------------------

        delivery,

        deliveryMethod:
          delivery,

        deliveryCharge:
          finalDeliveryCharge,

        // ----------------------------------------------
        // PAYMENT
        // ----------------------------------------------

        payment,

        paymentMethod,

        // ----------------------------------------------
        // PRICE
        // ----------------------------------------------

        subtotal:
          finalSubtotal,

        discount:
          finalDiscount,

        total:
          finalTotal,

        // ----------------------------------------------
        // ORDER STATUS
        // ----------------------------------------------

        status: "Placed",

        // ----------------------------------------------
        // DATE
        // ----------------------------------------------

        createdAt:
          new Date().toISOString(),
      };

      // ==================================================
      // LOAD ALL ORDERS
      // ==================================================

      let orders = [];

      try {
        const savedOrders =
          JSON.parse(
            localStorage.getItem(
              "orders"
            ) || "[]"
          );

        if (
          Array.isArray(savedOrders)
        ) {
          orders = savedOrders;
        }
      } catch (error) {
        console.error(
          "Error loading orders:",
          error
        );

        orders = [];
      }

      // ==================================================
      // ADD NEW ORDER
      // ==================================================

      orders.unshift(order);

      // ==================================================
      // SAVE ORDERS
      // ==================================================

      localStorage.setItem(
        "orders",
        JSON.stringify(orders)
      );

      // ==================================================
      // ORDER EVENT
      // ==================================================

      window.dispatchEvent(
        new Event("ordersChange")
      );

      // ==================================================
      // CLEAR CURRENT USER CART ONLY
      // ==================================================

      localStorage.removeItem(
        `cart_${user.id}`
      );

      setCart([]);

      // ==================================================
      // CART EVENT
      // ==================================================

      window.dispatchEvent(
        new Event("cartChange")
      );

      // ==================================================
      // SUCCESS
      // ==================================================

      toast.success(
        "Order placed successfully! 🎉"
      );

      // ==================================================
      // GO SUCCESS PAGE
      // ==================================================

      navigate(
        `/order-success?orderId=${orderId}`,
        {
          replace: true,
        }
      );
    } catch (error) {
      console.error(
        "Place order error:",
        error
      );

      toast.error(
        "Unable to place order. Please try again."
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  // ==================================================
  // LOGIN REQUIRED
  // ==================================================

  if (!userId) {
    return (
      <div
        className="
          min-h-[75vh]
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

          <p
            className="
              mt-2
              text-[#756B82]
            "
          >
            Please login before checkout.
          </p>

          <button
            onClick={() =>
              navigate("/login", {
                state: {
                  from: {
                    pathname:
                      "/checkout",
                  },
                },
              })
            }
            className="
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
  // EMPTY CART
  // ==================================================

  if (cart.length === 0) {
    return (
      <div
        className="
          min-h-[75vh]
          bg-[#FCFAFF]
          flex
          items-center
          justify-center
          px-4
        "
      >
        <div className="text-center">

          <div className="text-6xl">
            🛒
          </div>

          <h1
            className="
              mt-5
              text-3xl
              font-bold
              text-[#29213A]
            "
          >
            Your Cart is Empty
          </h1>

          <p
            className="
              mt-2
              text-[#756B82]
            "
          >
            Add some beautiful flowers
            before checking out.
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
            Browse Flowers 🌸
          </Link>

        </div>
      </div>
    );
  }

  // ==================================================
  // MAIN UI
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
            to="/cart"
            className="
              text-sm
              font-semibold
              text-[#9B5DE5]
            "
          >
            ← Back to Cart
          </Link>

          <h1
            className="
              mt-4
              text-3xl
              sm:text-4xl
              font-bold
              text-[#29213A]
            "
          >
            Checkout
          </h1>

          <p
            className="
              mt-2
              text-[#756B82]
            "
          >
            Complete your details to
            place your order.
          </p>
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

          <form onSubmit={placeOrder}>

            <div
              className="
                grid
                grid-cols-1
                lg:grid-cols-3
                gap-6
                items-start
              "
            >

              {/* ==================================================
                  LEFT SIDE
              ================================================== */}

              <div className="lg:col-span-2">

                {/* DELIVERY INFORMATION */}

                <div
                  className="
                    bg-white
                    rounded-2xl
                    border
                    border-[#eee6f7]
                    p-6
                    sm:p-8
                  "
                >

                  <h2
                    className="
                      text-xl
                      font-bold
                      text-[#29213A]
                    "
                  >
                    Delivery Information
                  </h2>

                  <p
                    className="
                      mt-1
                      text-sm
                      text-[#756B82]
                    "
                  >
                    Enter your delivery details.
                  </p>

                  <div
                    className="
                      mt-6
                      grid
                      grid-cols-1
                      sm:grid-cols-2
                      gap-5
                    "
                  >

                    <InputField
                      name="firstName"
                      label="First Name"
                      value={
                        formData.firstName
                      }
                      error={
                        errors.firstName
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Enter first name"
                    />

                    <InputField
                      name="lastName"
                      label="Last Name"
                      value={
                        formData.lastName
                      }
                      error={
                        errors.lastName
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Enter last name"
                    />

                  </div>

                  <div
                    className="
                      mt-5
                      grid
                      grid-cols-1
                      sm:grid-cols-2
                      gap-5
                    "
                  >

                    <InputField
                      name="phone"
                      label="Phone Number"
                      value={
                        formData.phone
                      }
                      error={
                        errors.phone
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="10-digit phone number"
                      inputMode="numeric"
                      maxLength={10}
                    />

                    <InputField
                      name="email"
                      label="Email Address"
                      type="email"
                      value={
                        formData.email
                      }
                      error={
                        errors.email
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="you@example.com"
                    />

                  </div>

                  <div className="mt-5">

                    <InputField
                      name="address"
                      label="Address"
                      value={
                        formData.address
                      }
                      error={
                        errors.address
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="House no, street, area"
                    />

                  </div>

                  <div
                    className="
                      mt-5
                      grid
                      grid-cols-1
                      sm:grid-cols-2
                      gap-5
                    "
                  >

                    <InputField
                      name="city"
                      label="City"
                      value={
                        formData.city
                      }
                      error={
                        errors.city
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Enter city"
                    />

                    <InputField
                      name="state"
                      label="State"
                      value={
                        formData.state
                      }
                      error={
                        errors.state
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Enter state"
                    />

                  </div>

                  <div className="mt-5">

                    <InputField
                      name="pincode"
                      label="Pincode"
                      value={
                        formData.pincode
                      }
                      error={
                        errors.pincode
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Enter 6-digit pincode"
                      inputMode="numeric"
                      maxLength={6}
                    />

                  </div>

                </div>

                {/* ==================================================
                    DELIVERY METHOD
                ================================================== */}

                <div
                  className="
                    mt-6
                    bg-white
                    rounded-2xl
                    border
                    border-[#eee6f7]
                    p-6
                    sm:p-8
                  "
                >

                  <h2
                    className="
                      text-xl
                      font-bold
                      text-[#29213A]
                    "
                  >
                    Delivery Method
                  </h2>

                  <div
                    className="
                      mt-5
                      grid
                      grid-cols-1
                      sm:grid-cols-2
                      gap-4
                    "
                  >

                    {/* STANDARD */}

                    <label
                      className={`
                        cursor-pointer
                        rounded-xl
                        border
                        p-4
                        transition
                        ${
                          delivery ===
                          "standard"
                            ? "border-[#9B5DE5] bg-[#F7EEFF]"
                            : "border-[#eee6f7]"
                        }
                      `}
                    >

                      <div className="flex items-center gap-3">

                        <input
                          type="radio"
                          name="delivery"
                          value="standard"
                          checked={
                            delivery ===
                            "standard"
                          }
                          onChange={(e) =>
                            setDelivery(
                              e.target.value
                            )
                          }
                        />

                        <div>

                          <p className="font-semibold text-[#29213A]">
                            🚚 Standard Delivery
                          </p>

                          <p className="mt-1 text-sm text-[#756B82]">
                            {subtotal >= 999
                              ? "FREE"
                              : "₹49"}
                          </p>

                        </div>

                      </div>

                    </label>

                    {/* EXPRESS */}

                    <label
                      className={`
                        cursor-pointer
                        rounded-xl
                        border
                        p-4
                        transition
                        ${
                          delivery ===
                          "express"
                            ? "border-[#9B5DE5] bg-[#F7EEFF]"
                            : "border-[#eee6f7]"
                        }
                      `}
                    >

                      <div className="flex items-center gap-3">

                        <input
                          type="radio"
                          name="delivery"
                          value="express"
                          checked={
                            delivery ===
                            "express"
                          }
                          onChange={(e) =>
                            setDelivery(
                              e.target.value
                            )
                          }
                        />

                        <div>

                          <p className="font-semibold text-[#29213A]">
                            ⚡ Express Delivery
                          </p>

                          <p className="mt-1 text-sm text-[#756B82]">
                            ₹99
                          </p>

                        </div>

                      </div>

                    </label>

                  </div>

                </div>

                {/* ==================================================
                    PAYMENT METHOD
                ================================================== */}

                <div
                  className="
                    mt-6
                    bg-white
                    rounded-2xl
                    border
                    border-[#eee6f7]
                    p-6
                    sm:p-8
                  "
                >

                  <h2
                    className="
                      text-xl
                      font-bold
                      text-[#29213A]
                    "
                  >
                    Payment Method
                  </h2>

                  <p className="mt-1 text-sm text-[#756B82]">
                    Choose how you want to pay.
                  </p>

                  <div className="mt-5 space-y-3">

                    {/* COD */}

                    <label
                      className={`
                        block
                        cursor-pointer
                        rounded-xl
                        border
                        p-4
                        transition
                        ${
                          payment ===
                          "cod"
                            ? "border-[#9B5DE5] bg-[#F7EEFF]"
                            : "border-[#eee6f7] hover:border-[#d8c9e8]"
                        }
                      `}
                    >

                      <div className="flex items-center gap-3">

                        <input
                          type="radio"
                          name="payment"
                          value="cod"
                          checked={
                            payment ===
                            "cod"
                          }
                          onChange={(e) =>
                            setPayment(
                              e.target.value
                            )
                          }
                        />

                        <div>

                          <p className="font-semibold text-[#29213A]">
                            💵 Cash on Delivery
                          </p>

                          <p className="mt-1 text-sm text-[#756B82]">
                            Pay when your order arrives.
                          </p>

                        </div>

                      </div>

                    </label>

                    {/* CARD */}

                    <label
                      className={`
                        block
                        cursor-pointer
                        rounded-xl
                        border
                        p-4
                        transition
                        ${
                          payment ===
                          "card"
                            ? "border-[#9B5DE5] bg-[#F7EEFF]"
                            : "border-[#eee6f7] hover:border-[#d8c9e8]"
                        }
                      `}
                    >

                      <div className="flex items-center gap-3">

                        <input
                          type="radio"
                          name="payment"
                          value="card"
                          checked={
                            payment ===
                            "card"
                          }
                          onChange={(e) =>
                            setPayment(
                              e.target.value
                            )
                          }
                        />

                        <div>

                          <p className="font-semibold text-[#29213A]">
                            💳 Credit / Debit Card
                          </p>

                          <p className="mt-1 text-sm text-[#756B82]">
                            Pay securely using your card.
                          </p>

                        </div>

                      </div>

                    </label>

                    {/* UPI */}

                    <label
                      className={`
                        block
                        cursor-pointer
                        rounded-xl
                        border
                        p-4
                        transition
                        ${
                          payment ===
                          "upi"
                            ? "border-[#9B5DE5] bg-[#F7EEFF]"
                            : "border-[#eee6f7] hover:border-[#d8c9e8]"
                        }
                      `}
                    >

                      <div className="flex items-center gap-3">

                        <input
                          type="radio"
                          name="payment"
                          value="upi"
                          checked={
                            payment ===
                            "upi"
                          }
                          onChange={(e) =>
                            setPayment(
                              e.target.value
                            )
                          }
                        />

                        <div>

                          <p className="font-semibold text-[#29213A]">
                            📱 UPI
                          </p>

                          <p className="mt-1 text-sm text-[#756B82]">
                            Pay using your UPI ID.
                          </p>

                        </div>

                      </div>

                    </label>

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

                  <h2
                    className="
                      text-xl
                      font-bold
                      text-[#29213A]
                    "
                  >
                    Order Summary
                  </h2>

                  {/* ITEMS */}

                  <div className="mt-5 space-y-4">

                    {cart.map(
                      (item, index) => {
                        const quantity =
                          Number(
                            item.quantity
                          ) || 1;

                        const price =
                          Number(
                            item.price
                          ) || 0;

                        return (
                          <div
                            key={
                              item.id ||
                              index
                            }
                            className="
                              flex
                              gap-3
                            "
                          >

                            <div
                              className="
                                w-16
                                h-16
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
                                    "Flower"
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

                            <div className="flex-1 min-w-0">

                              <p
                                className="
                                  text-sm
                                  font-semibold
                                  text-[#29213A]
                                  truncate
                                "
                              >
                                {item.name ||
                                  "Flower"}
                              </p>

                              <p
                                className="
                                  mt-1
                                  text-xs
                                  text-[#756B82]
                                "
                              >
                                Qty:{" "}
                                {quantity}
                              </p>

                              <p
                                className="
                                  mt-1
                                  text-sm
                                  font-semibold
                                  text-[#9B5DE5]
                                "
                              >
                                ₹
                                {(
                                  price *
                                  quantity
                                ).toLocaleString(
                                  "en-IN"
                                )}
                              </p>

                            </div>

                          </div>
                        );
                      }
                    )}

                  </div>

                  <div
                    className="
                      my-6
                      border-t
                      border-[#eee6f7]
                    "
                  />

                  {/* ==================================================
                      DISCOUNT
                  ================================================== */}

                  {discount > 0 && (
                    <>
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

                      <div
                        className="
                          mt-4
                          flex
                          justify-between
                          text-sm
                        "
                      >

                        <span className="text-[#756B82]">
                          You Save
                        </span>

                        <span className="font-semibold text-green-600">
                          - ₹
                          {discount.toLocaleString(
                            "en-IN"
                          )}
                        </span>

                      </div>
                    </>
                  )}

                  {/* SUBTOTAL WHEN NO DISCOUNT */}

                  {discount === 0 && (
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
                  )}

                  {/* ==================================================
                      DELIVERY
                  ================================================== */}

                  <div
                    className="
                      mt-4
                      flex
                      justify-between
                      text-sm
                    "
                  >

                    <span className="text-[#756B82]">
                      Delivery
                    </span>

                    <span className="font-semibold text-[#29213A]">
                      {deliveryCharge ===
                      0
                        ? "FREE"
                        : `₹${deliveryCharge.toLocaleString(
                            "en-IN"
                          )}`}
                    </span>

                  </div>

                  <div
                    className="
                      my-6
                      border-t
                      border-[#eee6f7]
                    "
                  />

                  {/* ==================================================
                      TOTAL
                  ================================================== */}

                  <div
                    className="
                      flex
                      justify-between
                      items-center
                    "
                  >

                    <span
                      className="
                        font-bold
                        text-[#29213A]
                      "
                    >
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
                      {total.toLocaleString(
                        "en-IN"
                      )}
                    </span>

                  </div>

                  {/* PAYMENT DISPLAY */}

                  <div
                    className="
                      mt-4
                      p-3
                      rounded-xl
                      bg-[#FCFAFF]
                      text-sm
                    "
                  >

                    <span className="text-[#756B82]">
                      Payment:
                    </span>{" "}

                    <span className="font-semibold text-[#29213A]">
                      {payment ===
                      "cod"
                        ? "Cash on Delivery"
                        : payment ===
                          "card"
                        ? "Credit / Debit Card"
                        : "UPI"}
                    </span>

                  </div>

                  {/* PLACE ORDER */}

                  <button
                    type="submit"
                    disabled={
                      placingOrder
                    }
                    className="
                      w-full
                      mt-6
                      py-3.5
                      rounded-xl
                      bg-[#9B5DE5]
                      text-white
                      font-bold
                      hover:bg-[#7B3FB3]
                      disabled:opacity-60
                      disabled:cursor-not-allowed
                      transition
                    "
                  >
                    {placingOrder
                      ? "Placing Order..."
                      : `Place Order • ₹${total.toLocaleString(
                          "en-IN"
                        )}`}
                  </button>

                  <p
                    className="
                      mt-3
                      text-center
                      text-xs
                      text-[#756B82]
                    "
                  >
                    Your order is secure
                    and protected.
                  </p>

                </div>

              </div>

            </div>

          </form>

        </div>

      </section>

    </div>
  );
};

export default Checkout;