import React from "react";
import { Link } from "react-router-dom";

const Offers = () => {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Offer Card */}
        <div className="relative overflow-hidden rounded-[<32px>] bg-linear-to-r from-[#7B3FB3] via-[#9B5DE5] to-[#D916C7]">

          {/* Decorative circles */}
          <div className="absolute -top-24 -right-20 w-72 h-72 rounded-full bg-white/10" />
          <div className="absolute -bottom-32 left-1/3 w-80 h-80 rounded-full bg-white/5" />

          <div className="relative grid lg:grid-cols-2 items-center">

            {/* =================================================
                LEFT CONTENT
            ================================================== */}

            <div className="p-8 sm:p-12 lg:p-14 text-white">

              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 text-white text-sm font-semibold">
                ✨ LIMITED TIME OFFER
              </span>

              <h2 className="mt-5 text-4xl sm:text-5xl font-bold leading-tight">
                Bloom More,
                <span className="block text-[#E7FAEF]">
                  Spend Less
                </span>
              </h2>

              <p className="mt-4 max-w-lg text-white/80 text-base sm:text-lg leading-7">
                Make someone's day extra special with beautiful
                flowers. Enjoy amazing discounts on our most-loved
                collections.
              </p>

              {/* Offer */}
              <div className="mt-7 flex items-center gap-4">

                <div className="bg-white rounded-2xl px-5 py-3 text-center">
                  <p className="text-3xl font-bold text-[#7B3FB3]">
                    30%
                  </p>

                  <p className="text-xs font-semibold text-[#756B82]">
                    OFF
                  </p>
                </div>

                <div>
                  <p className="font-semibold">
                    On selected flowers
                  </p>

                  <p className="text-sm text-white/70 mt-1">
                    Use code:{" "}
                    <span className="font-bold text-white">
                      BLOOM30
                    </span>
                  </p>
                </div>

              </div>

              {/* CTA */}
              <Link
                to="/category/offers"
                className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 rounded-full bg-white text-[#7B3FB3] font-bold hover:bg-[#E7FAEF] hover:-translate-y-0.5"
              >
                Shop The Offer
                <span>→</span>
              </Link>

            </div>


            {/* =================================================
                RIGHT VISUAL
            ================================================== */}

            <div className="relative h-[<320px>] lg:h-[<390px>]">

              <img
                src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1000&q=85"
                alt="Beautiful flowers"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Image overlay */}
              <div className="absolute inset-0 bg-linear-to-r from-[#7B3FB3] via-[#7B3FB3]/20 to-transparent" />

              {/* Floating card */}
              <div className="absolute bottom-6 right-6 bg-white rounded-2xl p-4 shadow-xl">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-[#E7FAEF] flex items-center justify-center text-xl">
                    🌿
                  </div>

                  <div>
                    <p className="text-xs text-[#756B82]">
                      Fresh & Handpicked
                    </p>

                    <p className="font-bold text-[#29213A]">
                      Delivered With Love
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>


        {/* =====================================================
            BENEFITS
        ====================================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

          {/* Same Day */}
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#F7EEFF]">
            <div className="w-12 h-12 shrink-0 rounded-xl bg-white flex items-center justify-center text-2xl">
              🚚
            </div>

            <div>
              <h3 className="font-bold text-[#29213A]">
                Same Day Delivery
              </h3>

              <p className="text-xs text-[#756B82] mt-1">
                Selected cities
              </p>
            </div>
          </div>


          {/* Fresh */}
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#E7FAEF]">
            <div className="w-12 h-12 shrink-0 rounded-xl bg-white flex items-center justify-center text-2xl">
              🌿
            </div>

            <div>
              <h3 className="font-bold text-[#29213A]">
                Fresh Flowers
              </h3>

              <p className="text-xs text-[#756B82] mt-1">
                Handpicked daily
              </p>
            </div>
          </div>


          {/* Secure */}
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#FCE7F8]">
            <div className="w-12 h-12 shrink-0 rounded-xl bg-white flex items-center justify-center text-2xl">
              🔒
            </div>

            <div>
              <h3 className="font-bold text-[#29213A]">
                Secure Payment
              </h3>

              <p className="text-xs text-[#756B82] mt-1">
                100% secure checkout
              </p>
            </div>
          </div>


          {/* Support */}
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#FFF5FD]">
            <div className="w-12 h-12 shrink-0 rounded-xl bg-white flex items-center justify-center text-2xl">
              💜
            </div>

            <div>
              <h3 className="font-bold text-[#29213A]">
                Dedicated Support
              </h3>

              <p className="text-xs text-[#756B82] mt-1">
                We're here for you
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Offers;