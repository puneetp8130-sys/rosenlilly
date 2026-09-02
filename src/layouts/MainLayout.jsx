import React from "react";
import { Outlet, Link } from "react-router-dom";

import Navbar from "../components/navbar/Navbar";

const MainLayout = () => {
  console.log("🔥 MAIN LAYOUT RENDERED");
  return (
    <div className="min-h-screen flex flex-col bg-[#FCFAFF] text-[#29213A]">

      {/* =====================================================
          TOP OFFER BAR
      ====================================================== */}
      <div className="bg-linear-to-r from-[#7B3FB3] via-[#9B5DE5] to-[#D916C7] text-white">
        <div className="max-w-7xl mx-auto px-4 h-9 flex items-center justify-center">
          <p className="text-xs sm:text-sm font-medium">
            🌸 Free Delivery on Orders Above ₹999
          </p>
        </div>
      </div>


      {/* =====================================================
          NAVBAR
      ====================================================== */}
      <Navbar />


      {/* =====================================================
          PAGE CONTENT
      ====================================================== */}
      <main className="flex-1">
        <Outlet />
      </main>


      {/* =====================================================
          FOOTER
      ====================================================== */}
      <footer className="mt-16 bg-[#29213A] text-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Main Footer */}
          <div className="py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">


            {/* Brand */}
            <div>

              <Link to="/" className="inline-block">
                <div className="text-3xl font-bold tracking-tight">
                  <span className="text-[#9B5DE5]">
                    rosen
                  </span>

                  <span className="text-[#D916C7]">
                    lilly
                  </span>
                </div>
              </Link>

              <p className="mt-4 text-gray-400 text-sm leading-6 max-w-xs">
                Beautiful flowers, thoughtful gifts and
                unforgettable moments — delivered with love.
              </p>

              {/* Social */}
              <div className="flex gap-3 mt-6">

                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#9B5DE5] cursor-pointer">
                  f
                </div>

                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D916C7] cursor-pointer">
                  ◎
                </div>

                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#12D96B] cursor-pointer">
                  𝕏
                </div>

              </div>

            </div>


            {/* Shop */}
            <div>

              <h3 className="font-semibold text-lg">
                Shop
              </h3>

              <div className="mt-5 space-y-3">

                <Link
                  to="/flowers"
                  className="block text-gray-400 hover:text-[#D916C7]"
                >
                  All Flowers
                </Link>

                <Link
                  to="/category/roses"
                  className="block text-gray-400 hover:text-[#D916C7]"
                >
                  Roses
                </Link>

                <Link
                  to="/category/bouquets"
                  className="block text-gray-400 hover:text-[#D916C7]"
                >
                  Bouquets
                </Link>

                <Link
                  to="/category/lilies"
                  className="block text-gray-400 hover:text-[#D916C7]"
                >
                  Lilies
                </Link>

                <Link
                  to="/category/sunflowers"
                  className="block text-gray-400 hover:text-[#D916C7]"
                >
                  Sunflowers
                </Link>

              </div>

            </div>


            {/* Customer */}
            <div>

              <h3 className="font-semibold text-lg">
                Customer
              </h3>

              <div className="mt-5 space-y-3">

                <Link
                  to="/profile"
                  className="block text-gray-400 hover:text-[#9B5DE5]"
                >
                  My Profile
                </Link>

                <Link
                  to="/orders"
                  className="block text-gray-400 hover:text-[#9B5DE5]"
                >
                  My Orders
                </Link>

                <Link
                  to="/wishlist"
                  className="block text-gray-400 hover:text-[#9B5DE5]"
                >
                  Wishlist
                </Link>

                <Link
                  to="/cart"
                  className="block text-gray-400 hover:text-[#9B5DE5]"
                >
                  Shopping Cart
                </Link>

              </div>

            </div>


            {/* Contact */}
            <div>

              <h3 className="font-semibold text-lg">
                Why Rosenlilly?
              </h3>

              <div className="mt-5 space-y-4">

                <div className="flex gap-3">
                  <span className="text-[#12D96B]">
                    🚚
                  </span>

                  <div>
                    <p className="font-medium">
                      Same Day Delivery
                    </p>

                    <p className="text-gray-400 text-sm">
                      Fast & reliable
                    </p>
                  </div>
                </div>


                <div className="flex gap-3">
                  <span className="text-[#12D96B]">
                    🌿
                  </span>

                  <div>
                    <p className="font-medium">
                      Fresh Flowers
                    </p>

                    <p className="text-gray-400 text-sm">
                      Handpicked quality
                    </p>
                  </div>
                </div>


                <div className="flex gap-3">
                  <span className="text-[#D916C7]">
                    🔒
                  </span>

                  <div>
                    <p className="font-medium">
                      Secure Payment
                    </p>

                    <p className="text-gray-400 text-sm">
                      100% protected
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>


          {/* Bottom */}
          <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">

            <p className="text-gray-500 text-sm">
              © 2026 Rosenlilly. All rights reserved.
            </p>

            <div className="flex gap-5 text-sm text-gray-500">
              <span className="hover:text-white cursor-pointer">
                Privacy Policy
              </span>

              <span className="hover:text-white cursor-pointer">
                Terms & Conditions
              </span>

              <span className="hover:text-white cursor-pointer">
                Help
              </span>
            </div>

          </div>

        </div>

      </footer>

    </div>
  );
};

export default MainLayout;