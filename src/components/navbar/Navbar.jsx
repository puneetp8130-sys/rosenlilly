import React, { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  // =====================================================
  // LOAD NAVBAR DATA
  // =====================================================

  const loadNavbarData = () => {
    let user = null;

    try {
      user = JSON.parse(
        localStorage.getItem("currentUser") || "null"
      );
    } catch (error) {
      console.error(
        "Error reading currentUser:",
        error
      );
    }

    setCurrentUser(user);

    // -----------------------------------------------
    // NO USER = NO CART / NO WISHLIST COUNT
    // -----------------------------------------------

    if (!user?.id) {
      setCartCount(0);
      setWishlistCount(0);
      return;
    }

    // -----------------------------------------------
    // USER-SPECIFIC CART
    // -----------------------------------------------

    let cart = [];

    try {
      cart = JSON.parse(
        localStorage.getItem(
          `cart_${user.id}`
        ) || "[]"
      );
    } catch (error) {
      console.error(
        "Error reading cart:",
        error
      );

      cart = [];
    }

    const totalCartItems = cart.reduce(
      (total, item) =>
        total + Number(item.quantity || 1),
      0
    );

    setCartCount(totalCartItems);

    // -----------------------------------------------
    // USER-SPECIFIC WISHLIST
    // -----------------------------------------------

    let wishlist = [];

    try {
      wishlist = JSON.parse(
        localStorage.getItem(
          `wishlist_${user.id}`
        ) || "[]"
      );
    } catch (error) {
      console.error(
        "Error reading wishlist:",
        error
      );

      wishlist = [];
    }

    setWishlistCount(wishlist.length);
  };

  // =====================================================
  // INITIAL LOAD + EVENTS
  // =====================================================

  useEffect(() => {
    loadNavbarData();

    window.addEventListener(
      "cartChange",
      loadNavbarData
    );

    window.addEventListener(
      "wishlistChange",
      loadNavbarData
    );

    window.addEventListener(
      "authChange",
      loadNavbarData
    );

    window.addEventListener(
      "storage",
      loadNavbarData
    );

    return () => {
      window.removeEventListener(
        "cartChange",
        loadNavbarData
      );

      window.removeEventListener(
        "wishlistChange",
        loadNavbarData
      );

      window.removeEventListener(
        "authChange",
        loadNavbarData
      );

      window.removeEventListener(
        "storage",
        loadNavbarData
      );
    };
  }, []);

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    localStorage.removeItem("currentUser");

    setCurrentUser(null);
    setCartCount(0);
    setWishlistCount(0);

    window.dispatchEvent(
      new Event("authChange")
    );

    window.dispatchEvent(
      new Event("cartChange")
    );

    window.dispatchEvent(
      new Event("wishlistChange")
    );

    toast.success(
      "Logged out successfully"
    );

    setMobileMenu(false);

    navigate("/", {
      replace: true,
    });
  };

  // =====================================================
  // NAV LINK STYLE
  // =====================================================

  const navLinkClass = ({ isActive }) =>
    `transition ${
      isActive
        ? "text-[#9B5DE5] font-semibold"
        : "text-[#4F465A] hover:text-[#9B5DE5]"
    }`;

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <>
      {/* =================================================
          NAVBAR
      ================================================= */}

      <header
        className="
          sticky
          top-0
          z-50
          bg-white/95
          backdrop-blur-md
          border-b
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
              h-20
              flex
              items-center
              justify-between
            "
          >

            {/* =================================================
                LOGO
            ================================================= */}

            <Link
              to="/"
              className="flex items-center gap-2"
              onClick={() =>
                setMobileMenu(false)
              }
            >
              <div
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-[#F7EEFF]
                  flex
                  items-center
                  justify-center
                  text-xl
                "
              >
                🌸
              </div>

              <div>
                <h1
                  className="
                    text-xl
                    font-bold
                    text-[#29213A]
                    leading-none
                  "
                >
                  Rosenlilly
                </h1>

                <p
                  className="
                    text-[10px]
                    text-[#9B5DE5]
                    font-medium
                    mt-1
                  "
                >
                  Flowers & Happiness
                </p>
              </div>
            </Link>

            {/* =================================================
                DESKTOP NAVIGATION
            ================================================= */}

            <nav
              className="
                hidden
                md:flex
                items-center
                gap-8
              "
            >
              <NavLink
                to="/"
                className={navLinkClass}
              >
                Home
              </NavLink>

              <NavLink
                to="/flowers"
                className={navLinkClass}
              >
                Flowers
              </NavLink>

              <NavLink
                to="/category/birthday"
                className={navLinkClass}
              >
                Birthday
              </NavLink>

              <NavLink
                to="/category/anniversary"
                className={navLinkClass}
              >
                Anniversary
              </NavLink>

              <NavLink
                to="/category/roses"
                className={navLinkClass}
              >
                Roses
              </NavLink>
            </nav>

            {/* =================================================
                RIGHT ACTIONS
            ================================================= */}

            <div
              className="
                flex
                items-center
                gap-2
                sm:gap-3
              "
            >

              {/* SEARCH */}

              <Link
                to="/search"
                className="
                  w-10
                  h-10
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  text-[#4F465A]
                  hover:bg-[#F7EEFF]
                  hover:text-[#9B5DE5]
                  transition
                "
                title="Search"
              >
                🔍
              </Link>

              {/* =================================================
                  WISHLIST
              ================================================= */}

              <Link
                to="/wishlist"
                className="
                  relative
                  w-10
                  h-10
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  text-[#4F465A]
                  hover:bg-[#F7EEFF]
                  hover:text-[#9B5DE5]
                  transition
                "
                title="Wishlist"
              >
                ♡

                {wishlistCount > 0 && (
                  <span
                    className="
                      absolute
                      -top-1
                      -right-1
                      min-w-5
                      h-5
                      px-1
                      rounded-full
                      bg-[#9B5DE5]
                      text-white
                      text-[10px]
                      font-bold
                      flex
                      items-center
                      justify-center
                    "
                  >
                    {wishlistCount > 99
                      ? "99+"
                      : wishlistCount}
                  </span>
                )}
              </Link>

              {/* =================================================
                  CART
              ================================================= */}

              <Link
                to="/cart"
                className="
                  relative
                  w-10
                  h-10
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  text-[#4F465A]
                  hover:bg-[#F7EEFF]
                  hover:text-[#9B5DE5]
                  transition
                "
                title="Cart"
              >
                🛒

                {cartCount > 0 && (
                  <span
                    className="
                      absolute
                      -top-1
                      -right-1
                      min-w-5
                      h-5
                      px-1
                      rounded-full
                      bg-[#9B5DE5]
                      text-white
                      text-[10px]
                      font-bold
                      flex
                      items-center
                      justify-center
                    "
                  >
                    {cartCount > 99
                      ? "99+"
                      : cartCount}
                  </span>
                )}
              </Link>

              {/* =================================================
                  USER
              ================================================= */}

              {currentUser ? (
                <div
                  className="
                    hidden
                    sm:flex
                    items-center
                    gap-2
                  "
                >
                  <Link
                    to="/profile"
                    className="
                      flex
                      items-center
                      gap-2
                      px-3
                      py-2
                      rounded-xl
                      hover:bg-[#F7EEFF]
                      transition
                    "
                  >
                    <div
                      className="
                        w-9
                        h-9
                        rounded-full
                        bg-[#9B5DE5]
                        text-white
                        flex
                        items-center
                        justify-center
                        font-bold
                        text-sm
                      "
                    >
                      {(
                        currentUser.name ||
                        "U"
                      )
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <span
                      className="
                        hidden
                        lg:block
                        max-w-24
                        truncate
                        text-sm
                        font-semibold
                        text-[#29213A]
                      "
                    >
                      {currentUser.name ||
                        "Account"}
                    </span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="
                      px-4
                      py-2.5
                      rounded-xl
                      border
                      border-[#ddd3e8]
                      text-sm
                      font-semibold
                      text-[#7B3FB3]
                      hover:bg-[#F7EEFF]
                      transition
                    "
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="
                    hidden
                    sm:block
                    px-5
                    py-2.5
                    rounded-xl
                    bg-[#9B5DE5]
                    text-white
                    text-sm
                    font-semibold
                    hover:bg-[#7B3FB3]
                    transition
                  "
                >
                  Login
                </Link>
              )}

              {/* MOBILE MENU */}

              <button
                type="button"
                onClick={() =>
                  setMobileMenu(
                    (prev) => !prev
                  )
                }
                className="
                  md:hidden
                  w-10
                  h-10
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  text-xl
                  hover:bg-[#F7EEFF]
                "
              >
                {mobileMenu ? "✕" : "☰"}
              </button>
            </div>
          </div>
        </div>

        {/* =================================================
            MOBILE MENU
        ================================================= */}

        {mobileMenu && (
          <div
            className="
              md:hidden
              border-t
              border-[#eee6f7]
              bg-white
            "
          >
            <nav
              className="
                max-w-7xl
                mx-auto
                px-4
                py-5
                space-y-1
              "
            >
              <NavLink
                to="/"
                onClick={() =>
                  setMobileMenu(false)
                }
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl ${
                    isActive
                      ? "bg-[#F7EEFF] text-[#9B5DE5] font-semibold"
                      : "text-[#4F465A]"
                  }`
                }
              >
                🏠 Home
              </NavLink>

              <NavLink
                to="/flowers"
                onClick={() =>
                  setMobileMenu(false)
                }
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl ${
                    isActive
                      ? "bg-[#F7EEFF] text-[#9B5DE5] font-semibold"
                      : "text-[#4F465A]"
                  }`
                }
              >
                🌸 Flowers
              </NavLink>

              <NavLink
                to="/category/birthday"
                onClick={() =>
                  setMobileMenu(false)
                }
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl ${
                    isActive
                      ? "bg-[#F7EEFF] text-[#9B5DE5] font-semibold"
                      : "text-[#4F465A]"
                  }`
                }
              >
                🎂 Birthday
              </NavLink>

              <NavLink
                to="/category/anniversary"
                onClick={() =>
                  setMobileMenu(false)
                }
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl ${
                    isActive
                      ? "bg-[#F7EEFF] text-[#9B5DE5] font-semibold"
                      : "text-[#4F465A]"
                  }`
                }
              >
                💕 Anniversary
              </NavLink>

              <NavLink
                to="/category/roses"
                onClick={() =>
                  setMobileMenu(false)
                }
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl ${
                    isActive
                      ? "bg-[#F7EEFF] text-[#9B5DE5] font-semibold"
                      : "text-[#4F465A]"
                  }`
                }
              >
                🌹 Roses
              </NavLink>

              {currentUser && (
                <>
                  <NavLink
                    to="/orders"
                    onClick={() =>
                      setMobileMenu(false)
                    }
                    className="
                      block
                      px-4
                      py-3
                      rounded-xl
                      text-[#4F465A]
                    "
                  >
                    📦 My Orders
                  </NavLink>

                  <NavLink
                    to="/profile"
                    onClick={() =>
                      setMobileMenu(false)
                    }
                    className="
                      block
                      px-4
                      py-3
                      rounded-xl
                      text-[#4F465A]
                    "
                  >
                    👤 Profile
                  </NavLink>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="
                      w-full
                      text-left
                      px-4
                      py-3
                      rounded-xl
                      text-red-500
                    "
                  >
                    🚪 Logout
                  </button>
                </>
              )}

              {!currentUser && (
                <Link
                  to="/login"
                  onClick={() =>
                    setMobileMenu(false)
                  }
                  className="
                    block
                    mt-2
                    px-4
                    py-3
                    rounded-xl
                    bg-[#9B5DE5]
                    text-white
                    text-center
                    font-semibold
                  "
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;