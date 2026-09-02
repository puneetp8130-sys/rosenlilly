import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Roses",
    slug: "roses",
    description: "Express your love",
    count: "120+ Products",
    image:
      "https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 2,
    name: "Bouquets",
    slug: "bouquets",
    description: "Beautifully arranged",
    count: "85+ Products",
    image:
      "https://images.unsplash.com/photo-1523691509543-c55fb32e5cee?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 3,
    name: "Lilies",
    slug: "lilies",
    description: "Elegant & graceful",
    count: "60+ Products",
    image:
      "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 4,
    name: "Sunflowers",
    slug: "sunflowers",
    description: "Spread happiness",
    count: "45+ Products",
    image:
      "https://images.unsplash.com/photo-1597848212624-e19f5e8f9c95?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 5,
    name: "Orchids",
    slug: "orchids",
    description: "Pure elegance",
    count: "40+ Products",
    image:
      "https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 6,
    name: "Mixed Flowers",
    slug: "mixed-flowers",
    description: "A little bit of everything",
    count: "100+ Products",
    image:
      "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=700&q=85",
  },
];

const Categories = () => {
  return (
    <section className="py-16 sm:py-20 bg-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ==================================================
            SECTION HEADER
        ================================================== */}

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">

          <div>

            <span
              className="inline-flex items-center gap-2
                         text-sm font-semibold
                         text-[#9B5DE5]"
            >
              <span className="w-7 h-[<2px>] bg-[#9B5DE5]" />
              EXPLORE OUR COLLECTION
            </span>

            <h2
              className="mt-3
                         text-3xl
                         sm:text-4xl
                         font-bold
                         text-[#29213A]"
            >
              Shop By Category
            </h2>

            <p className="mt-2 text-[#756B82]">
              Find the perfect flowers for every occasion.
            </p>

          </div>


          {/* View all */}
          <Link
            to="/flowers"
            className="group
                       inline-flex
                       items-center
                       gap-2
                       text-[#9B5DE5]
                       font-semibold
                       hover:text-[#D916C7]"
          >
            View All Flowers

            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>

        </div>


        {/* ==================================================
            CATEGORY GRID
        ================================================== */}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">

          {categories.map((category) => (

            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="group"
            >

              {/* Image */}
              <div
                className="relative
                           aspect-[<4/5>]
                           rounded-2xl
                           overflow-hidden
                           bg-[#F7EEFF]"
              >

                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="w-full
                             h-full
                             object-cover
                             group-hover:scale-110
                             transition-transform
                             duration-700"
                />


                {/* Overlay */}
                <div
                  className="absolute
                             inset-0
                             bg-linear-to-t
                             from-[#29213A]/75
                             via-[#29213A]/10
                             to-transparent"
                />


                {/* Category content */}
                <div
                  className="absolute
                             bottom-0
                             left-0
                             right-0
                             p-4
                             text-white"
                >

                  <h3 className="font-bold text-lg">
                    {category.name}
                  </h3>

                  <p className="text-white/80 text-xs mt-1">
                    {category.description}
                  </p>

                </div>


                {/* Arrow */}
                <div
                  className="absolute
                             top-3
                             right-3
                             w-8
                             h-8
                             rounded-full
                             bg-white/90
                             text-[#7B3FB3]
                             flex
                             items-center
                             justify-center
                             opacity-0
                             translate-y-2
                             group-hover:opacity-100
                             group-hover:translate-y-0
                             transition-all
                             duration-300"
                >
                  →
                </div>

              </div>


              {/* Bottom information */}
              <div className="mt-3 px-1">

                <p className="text-xs text-[#756B82]">
                  {category.count}
                </p>

              </div>

            </Link>

          ))}

        </div>


        {/* ==================================================
            BOTTOM CATEGORY CTA
        ================================================== */}

        <div
          className="mt-10
                     rounded-2xl
                     bg-linear-to-r
                     from-[#F7EEFF]
                     via-[#FCE7F8]
                     to-[#E7FAEF]
                     p-6
                     flex
                     flex-col
                     sm:flex-row
                     items-center
                     justify-between
                     gap-5"
        >

          <div className="flex items-center gap-4">

            <div
              className="w-14
                         h-14
                         shrink-0
                         rounded-2xl
                         bg-white
                         flex
                         items-center
                         justify-center
                         text-3xl
                         shadow-sm"
            >
              💐
            </div>

            <div>

              <h3 className="font-bold text-[#29213A]">
                Can't decide what to choose?
              </h3>

              <p className="text-sm text-[#756B82] mt-1">
                Explore our complete flower collection.
              </p>

            </div>

          </div>


          <Link
            to="/flowers"
            className="shrink-0
                       px-6
                       py-3
                       rounded-full
                       bg-[#9B5DE5]
                       text-white
                       font-semibold
                       hover:bg-[#7B3FB3]
                       hover:-translate-y-0.5"
          >
            Explore All
          </Link>

        </div>

      </div>

    </section>
  );
};

export default Categories;