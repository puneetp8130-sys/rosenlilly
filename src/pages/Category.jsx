import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Roses",
    slug: "roses",
    description: "Elegant roses for every special moment.",
    image:
      "https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Bouquets",
    slug: "bouquets",
    description: "Beautifully arranged bouquets made with love.",
    image:
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Lilies",
    slug: "lilies",
    description: "Fresh and graceful lilies for every occasion.",
    image:
      "https://images.unsplash.com/photo-1591886960571-74d43a9e4166?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Sunflowers",
    slug: "sunflowers",
    description: "Bright sunflowers to spread happiness.",
    image:
      "https://images.unsplash.com/photo-1597848212624-e19c9e4a3a7d?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Orchids",
    slug: "orchids",
    description: "Premium orchids with timeless elegance.",
    image:
      "https://images.unsplash.com/photo-1566982461703-2c7f0c4c8f0c?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Mixed Flowers",
    slug: "mixed-flowers",
    description: "A colorful combination of fresh flowers.",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80",
  },
];

const Category = () => {
  return (
    <div className="min-h-screen bg-[#FCFAFF]">

      {/* HERO */}

      <section className="bg-linear-to-r from-[#F7EEFF] to-[#FCE7F8]">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

          <p className="text-sm font-semibold text-[#9B5DE5]">
            ROSENLILLY
          </p>

          <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-[#29213A]">
            Flower Categories
          </h1>

          <p className="mt-4 max-w-2xl text-[#756B82] text-base sm:text-lg">
            Explore our collection of beautiful fresh flowers,
            carefully selected for every occasion.
          </p>

        </div>

      </section>


      {/* CATEGORIES */}

      <section className="py-12">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {categories.map((category) => (

              <Link
                key={category.slug}
                to={`/flowers?category=${category.slug}`}
                className="
                  group
                  bg-white
                  rounded-3xl
                  overflow-hidden
                  border
                  border-[#eee6f7]
                  hover:border-[#D8B9F5]
                  hover:-translate-y-1
                  transition-all
                  duration-300
                  shadow-sm
                  hover:shadow-md
                "
              >

                {/* IMAGE */}

                <div className="relative h-64 overflow-hidden">

                  <img
                    src={category.image}
                    alt={category.name}
                    className="
                      w-full
                      h-full
                      object-cover
                      group-hover:scale-105
                      transition-transform
                      duration-500
                    "
                  />

                  <div
                    className="
                      absolute
                      inset-0
                      bg-linear-to-t
                      from-black/45
                      via-transparent
                      to-transparent
                    "
                  />

                  <h2
                    className="
                      absolute
                      bottom-5
                      left-5
                      text-2xl
                      font-bold
                      text-white
                    "
                  >
                    {category.name}
                  </h2>

                </div>


                {/* CONTENT */}

                <div className="p-5">

                  <p className="text-[#756B82] text-sm leading-6">
                    {category.description}
                  </p>

                  <div
                    className="
                      mt-5
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <span
                      className="
                        text-sm
                        font-semibold
                        text-[#9B5DE5]
                      "
                    >
                      Explore Collection
                    </span>

                    <span
                      className="
                        w-9
                        h-9
                        rounded-full
                        bg-[#F7EEFF]
                        text-[#9B5DE5]
                        flex
                        items-center
                        justify-center
                        group-hover:bg-[#9B5DE5]
                        group-hover:text-white
                        transition
                      "
                    >
                      →
                    </span>

                  </div>

                </div>

              </Link>

            ))}

          </div>

        </div>

      </section>


      {/* CTA */}

      <section className="pb-14">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div
            className="
              rounded-3xl
              bg-[#29213A]
              px-6
              py-10
              sm:px-10
              flex
              flex-col
              md:flex-row
              md:items-center
              md:justify-between
              gap-6
            "
          >

            <div>

              <h2 className="text-2xl font-bold text-white">
                Looking for something special?
              </h2>

              <p className="mt-2 text-white/70">
                Explore all our fresh flower collections.
              </p>

            </div>

            <Link
              to="/flowers"
              className="
                shrink-0
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
              View All Flowers
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Category;