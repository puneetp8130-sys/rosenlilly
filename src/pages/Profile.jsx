import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  // ==========================================
  // LOAD USER
  // ==========================================

  useEffect(() => {
    const savedUser = JSON.parse(
      localStorage.getItem("currentUser") || "null"
    );

    if (!savedUser) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    setUser(savedUser);

    setFormData({
      name: savedUser.name || "",
      email: savedUser.email || "",
      phone: savedUser.phone || "",
    });
  }, [navigate]);

  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================================
  // SAVE PROFILE
  // ==========================================

  const saveProfile = () => {
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }

  const updatedUser = {
    ...user,
    name: formData.name.trim(),
    email: formData.email.trim(),
    phone: formData.phone.trim(),
  };

    localStorage.setItem(
      "currentUser",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);
    setIsEditing(false);

    // Navbar ko update karne ke liye
    window.dispatchEvent(
      new Event("userChange")
    );

    toast.success("Profile updated successfully");
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    localStorage.removeItem("currentUser");

    window.dispatchEvent(
      new Event("authChange")
    );

    window.dispatchEvent(
      new Event("userChange")
    );

    //toast.success("Logged out successfully");

    navigate("/login",{
      replace: true,
    });
  };

  // ==========================================
  // COUNTS
  // ==========================================

  const userId = user?.id;

  const cart = userId
    ? JSON.parse(
        localStorage.getItem(`cart_${userId}`) || "[]"
      )
    : [];

  const wishlist = userId
    ? JSON.parse(
        localStorage.getItem(`wishlist_${userId}`) || "[]"
      )
    : [];

  const orders = userId
  ? (() => {
      try {
        const allOrders = JSON.parse(
          localStorage.getItem("orders") || "[]"
        );

        if (!Array.isArray(allOrders)) {
          return [];
        }

        return allOrders.filter(
          (order) =>
            String(order.userId) === String(userId)
        );
      } catch (error) {
        console.error("Failed to load orders:", error);
        return [];
      }
    })()
  : [];
  
  // ==========================================
  // LOADING
  // ==========================================

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FCFAFF]">

      {/* ==========================================
          HEADER
      ========================================== */}

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

          <p
            className="
              text-sm
              font-semibold
              text-[#9B5DE5]
            "
          >
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
            My Profile
          </h1>

          <p className="mt-2 text-[#756B82]">
            Manage your account and orders.
          </p>

        </div>
      </section>


      {/* ==========================================
          PROFILE
      ========================================== */}

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

          {/* ======================================
              PROFILE CARD
          ====================================== */}

          <div
            className="
              bg-white
              rounded-2xl
              border
              border-[#eee6f7]
              p-6
              h-fit
            "
          >

            {/* Avatar */}

            <div className="flex flex-col items-center">

              <div
                className="
                  w-24
                  h-24
                  rounded-full
                  bg-[#F7EEFF]
                  border-4
                  border-white
                  shadow-sm
                  flex
                  items-center
                  justify-center
                  text-4xl
                  font-bold
                  text-[#9B5DE5]
                "
              >
                {formData.name
                  ?.charAt(0)
                  ?.toUpperCase() || "U"}
              </div>

              <h2
                className="
                  mt-4
                  text-xl
                  font-bold
                  text-[#29213A]
                "
              >
                {formData.name || "User"}
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-[#756B82]
                "
              >
                {formData.email}
              </p>

            </div>


            {/* Navigation */}

            <div className="mt-7 space-y-2">

              <Link
                to="/orders"
                className="
                  flex
                  items-center
                  justify-between
                  px-4
                  py-3
                  rounded-xl
                  bg-[#FCFAFF]
                  hover:bg-[#F7EEFF]
                  transition
                "
              >
                <span className="flex items-center gap-3">
                  📦
                  <span className="font-semibold text-[#29213A]">
                    My Orders
                  </span>
                </span>

                <span className="text-sm text-[#9A91A4]">
                  {orders.length}
                </span>
              </Link>


              <Link
                to="/wishlist"
                className="
                  flex
                  items-center
                  justify-between
                  px-4
                  py-3
                  rounded-xl
                  bg-[#FCFAFF]
                  hover:bg-[#F7EEFF]
                  transition
                "
              >
                <span className="flex items-center gap-3">
                  ❤️
                  <span className="font-semibold text-[#29213A]">
                    Wishlist
                  </span>
                </span>

                <span className="text-sm text-[#9A91A4]">
                  {wishlist.length}
                </span>
              </Link>


              <Link
                to="/cart"
                className="
                  flex
                  items-center
                  justify-between
                  px-4
                  py-3
                  rounded-xl
                  bg-[#FCFAFF]
                  hover:bg-[#F7EEFF]
                  transition
                "
              >
                <span className="flex items-center gap-3">
                  🛒
                  <span className="font-semibold text-[#29213A]">
                    Cart
                  </span>
                </span>

                <span className="text-sm text-[#9A91A4]">
                  {cart.reduce(
                    (sum, item) =>
                      sum +
                      Number(item.quantity || 1),
                    0
                  )}
                </span>
              </Link>

            </div>


            {/* Logout */}

            <button
              onClick={handleLogout}
              className="
                mt-7
                w-full
                py-3
                rounded-xl
                border
                border-red-200
                text-red-500
                font-semibold
                hover:bg-red-50
                transition
              "
            >
              🚪 Logout
            </button>

          </div>


          {/* ======================================
              ACCOUNT INFORMATION
          ====================================== */}

          <div className="lg:col-span-2 space-y-6">

            <div
              className="
                bg-white
                rounded-2xl
                border
                border-[#eee6f7]
                p-6
                sm:p-7
              "
            >

              {/* Title */}

              <div
                className="
                  flex
                  flex-col
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  gap-4
                "
              >

                <div>

                  <h2
                    className="
                      text-xl
                      font-bold
                      text-[#29213A]
                    "
                  >
                    Personal Information
                  </h2>

                  <p
                    className="
                      mt-1
                      text-sm
                      text-[#756B82]
                    "
                  >
                    Update your account information.
                  </p>

                </div>


                {!isEditing && (
                  <button
                    onClick={() =>
                      setIsEditing(true)
                    }
                    className="
                      px-5
                      py-2.5
                      rounded-xl
                      bg-[#F7EEFF]
                      text-[#9B5DE5]
                      font-semibold
                      hover:bg-[#EEDFFF]
                      transition
                    "
                  >
                    ✏️ Edit Profile
                  </button>
                )}

              </div>


              {/* FORM */}

              <div className="mt-7 space-y-5">

                {/* Name */}

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
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="
                      w-full
                      px-4
                      py-3
                      rounded-xl
                      border
                      border-[#ddd3e8]
                      outline-none
                      text-[#29213A]
                      disabled:bg-[#FCFAFF]
                      disabled:text-[#756B82]
                      focus:border-[#9B5DE5]
                    "
                  />

                </div>


                {/* Email */}

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
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="
                      w-full
                      px-4
                      py-3
                      rounded-xl
                      border
                      border-[#ddd3e8]
                      outline-none
                      text-[#29213A]
                      disabled:bg-[#FCFAFF]
                      disabled:text-[#756B82]
                      focus:border-[#9B5DE5]
                    "
                  />

                </div>


                {/* Phone */}

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
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Enter phone number"
                    className="
                      w-full
                      px-4
                      py-3
                      rounded-xl
                      border
                      border-[#ddd3e8]
                      outline-none
                      text-[#29213A]
                      disabled:bg-[#FCFAFF]
                      disabled:text-[#756B82]
                      focus:border-[#9B5DE5]
                    "
                  />

                </div>


                {/* Buttons */}

                {isEditing && (
                  <div
                    className="
                      flex
                      flex-col
                      sm:flex-row
                      gap-3
                      pt-2
                    "
                  >

                    <button
                      onClick={saveProfile}
                      className="
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
                      Save Changes
                    </button>

                    <button
                      onClick={() => {
                        setIsEditing(false);

                        setFormData({
                          name: user.name || "",
                          email: user.email || "",
                          phone: user.phone || "",
                        });
                      }}
                      className="
                        px-6
                        py-3
                        rounded-xl
                        border
                        border-[#ddd3e8]
                        text-[#29213A]
                        font-semibold
                        hover:bg-[#FCFAFF]
                      "
                    >
                      Cancel
                    </button>

                  </div>
                )}

              </div>

            </div>


            {/* ====================================
                ACCOUNT OVERVIEW
            ==================================== */}

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-3
                gap-4
              "
            >

              {/* ORDERS */}

              <Link
                to="/orders"
                className="
                  bg-white
                  rounded-2xl
                  border
                  border-[#eee6f7]
                  p-5
                  hover:border-[#9B5DE5]
                  transition
                "
              >

                <div className="text-2xl">
                  📦
                </div>

                <p
                  className="
                    mt-4
                    text-2xl
                    font-bold
                    text-[#29213A]
                  "
                >
                  {orders.length}
                </p>

                <p className="text-sm text-[#756B82]">
                  Total Orders
                </p>

              </Link>


              {/* WISHLIST */}

              <Link
                to="/wishlist"
                className="
                  bg-white
                  rounded-2xl
                  border
                  border-[#eee6f7]
                  p-5
                  hover:border-[#9B5DE5]
                  transition
                "
              >

                <div className="text-2xl">
                  ❤️
                </div>

                <p
                  className="
                    mt-4
                    text-2xl
                    font-bold
                    text-[#29213A]
                  "
                >
                  {wishlist.length}
                </p>

                <p className="text-sm text-[#756B82]">
                  Wishlist Items
                </p>

              </Link>


              {/* CART */}

              <Link
                to="/cart"
                className="
                  bg-white
                  rounded-2xl
                  border
                  border-[#eee6f7]
                  p-5
                  hover:border-[#9B5DE5]
                  transition
                "
              >

                <div className="text-2xl">
                  🛒
                </div>

                <p
                  className="
                    mt-4
                    text-2xl
                    font-bold
                    text-[#29213A]
                  "
                >
                  {cart.reduce(
                    (sum, item) =>
                      sum +
                      Number(item.quantity || 1),
                    0
                  )}
                </p>

                <p className="text-sm text-[#756B82]">
                  Cart Items
                </p>

              </Link>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Profile;