import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#FCFAFF]">

      {/* Decorative background circles */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#F7EEFF] blur-3xl opacity-70" />

      <div className="absolute bottom-0 -left-24 w-72 h-72 rounded-full bg-[#FCE7F8] blur-3xl opacity-70" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="min-h-[<560px>] lg:min-h-[<620px>] grid lg:grid-cols-2 gap-10 items-center py-12 lg:py-16">

          {/* ==================================================
              LEFT CONTENT
          ================================================== */}

          <div className="relative z-10">

            {/* Small badge */}
            <div
              className="inline-flex items-center gap-2
                         px-4 py-2
                         rounded-full
                         bg-[#E7FAEF]
                         text-[#0BA957]
                         text-sm
                         font-semibold"
            >
              <span>🌿</span>
              Fresh Flowers • Fresh Feelings
            </div>


            {/* Heading */}
            <h1
              className="mt-6
                         text-5xl
                         sm:text-6xl
                         lg:text-[64px]
                         leading-[1.05]
                         font-bold
                         tracking-tight
                         text-[#29213A]"
            >
              Make Every
              <span className="block">
                Moment
              </span>

              <span
                className="block
                           bg-linear-to-r
                           from-[#9B5DE5]
                           to-[#D916C7]
                           bg-clip-text
                           text-transparent"
              >
                Bloom Beautifully
              </span>
            </h1>


            {/* Description */}
            <p
              className="mt-6
                         max-w-xl
                         text-[#756B82]
                         text-base
                         sm:text-lg
                         leading-7"
            >
              Discover beautiful fresh flowers, elegant bouquets
              and thoughtful gifts — crafted to make every special
              moment unforgettable.
            </p>


            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 mt-8">

              <Link
                to="/flowers"
                className="group
                           inline-flex
                           items-center
                           gap-2
                           px-7
                           py-3.5
                           rounded-full
                           bg-linear-to-r
                           from-[#9B5DE5]
                           to-[#D916C7]
                           text-white
                           font-semibold
                           shadow-lg
                           shadow-[#9B5DE5]/20
                           hover:-translate-y-0.5
                           hover:shadow-xl
                           hover:shadow-[#9B5DE5]/25"
              >
                Shop Flowers

                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>


              <Link
                to="/category/roses"
                className="inline-flex
                           items-center
                           gap-2
                           px-7
                           py-3.5
                           rounded-full
                           border-2
                           border-[#9B5DE5]
                           text-[#7B3FB3]
                           font-semibold
                           hover:bg-[#9B5DE5]
                           hover:text-white"
              >
                Explore Roses
              </Link>

            </div>


            {/* Trust points */}
            <div className="flex flex-wrap gap-6 mt-10">

              <div className="flex items-center gap-2">
                <span
                  className="w-9 h-9
                             rounded-full
                             bg-[#E7FAEF]
                             flex items-center justify-center"
                >
                  🌿
                </span>

                <div>
                  <p className="text-sm font-semibold">
                    100% Fresh
                  </p>

                  <p className="text-xs text-[#756B82]">
                    Handpicked flowers
                  </p>
                </div>
              </div>


              <div className="flex items-center gap-2">
                <span
                  className="w-9 h-9
                             rounded-full
                             bg-[#F7EEFF]
                             flex items-center justify-center"
                >
                  🚚
                </span>

                <div>
                  <p className="text-sm font-semibold">
                    Same Day
                  </p>

                  <p className="text-xs text-[#756B82]">
                    Fast delivery
                  </p>
                </div>
              </div>


              <div className="flex items-center gap-2">
                <span
                  className="w-9 h-9
                             rounded-full
                             bg-[#FCE7F8]
                             flex items-center justify-center"
                >
                  💜
                </span>

                <div>
                  <p className="text-sm font-semibold">
                    Made With Love
                  </p>

                  <p className="text-xs text-[#756B82]">
                    Beautifully crafted
                  </p>
                </div>
              </div>

            </div>

          </div>


          {/* ==================================================
              RIGHT IMAGE
          ================================================== */}

          <div className="relative flex justify-center lg:justify-end">

            {/* Main image container */}
            <div
              className="relative
                         w-full
                         max-w-[<520px>]
                         aspect-[<4/5>]
                         rounded-[40px]
                         overflow-hidden
                         shadow-2xl
                         shadow-[#7B3FB3]/15"
            >

              <img
                src="https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=1000&q=85"
                alt="Beautiful flower bouquet"
                className="w-full h-full object-cover"
              />


              {/* Image gradient */}
              <div
                className="absolute inset-0
                           bg-linear-to-t
                           from-[#29213A]/50
                           via-transparent
                           to-transparent"
              />


              {/* Image bottom text */}
              <div
                className="absolute
                           bottom-0
                           left-0
                           right-0
                           p-7
                           text-white"
              >
                <p className="text-sm text-white/80">
                  Handcrafted with love
                </p>

                <h3 className="text-2xl font-bold mt-1">
                  Beautifully Yours 🌸
                </h3>
              </div>

            </div>


            {/* =================================================
                FLOATING OFFER CARD
            ================================================== */}

            <div
              className="absolute
                         -left-4
                         sm:-left-8
                         bottom-10
                         bg-white
                         rounded-2xl
                         p-4
                         shadow-xl
                         shadow-[#7B3FB3]/10
                         border
                         border-[#eee6f7]"
            >

              <div className="flex items-center gap-3">

                <div
                  className="w-12
                             h-12
                             rounded-xl
                             bg-[#FCE7F8]
                             flex items-center justify-center
                             text-2xl"
                >
                  🌹
                </div>

                <div>
                  <p className="text-xs text-[#756B82]">
                    Starting from
                  </p>

                  <p className="text-lg font-bold text-[#7B3FB3]">
                    ₹499
                  </p>

                  <p className="text-xs text-[#D916C7] font-medium">
                    Fresh bouquets
                  </p>
                </div>

              </div>

            </div>


            {/* =================================================
                RATING CARD
            ================================================== */}

            <div
              className="absolute
                         -right-2
                         sm:-right-6
                         top-10
                         bg-white
                         rounded-2xl
                         px-4
                         py-3
                         shadow-xl
                         shadow-[#7B3FB3]/10
                         border
                         border-[#eee6f7]"
            >

              <div className="flex items-center gap-2">

                <div
                  className="w-9 h-9
                             rounded-full
                             bg-[#E7FAEF]
                             flex items-center justify-center"
                >
                  ⭐
                </div>

                <div>
                  <p className="font-bold text-[#29213A]">
                    4.9/5
                  </p>

                  <p className="text-xs text-[#756B82]">
                    2k+ happy customers
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;