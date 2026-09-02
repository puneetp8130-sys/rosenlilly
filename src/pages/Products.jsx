import React, { useMemo, useState } from "react";
import products from "../data/products";
import ProductCard from "../components/product/ProductCard";

const categories = [
  {
    name: "All Flowers",
    slug: "all",
  },
  {
    name: "Roses",
    slug: "roses",
  },
  {
    name: "Bouquets",
    slug: "bouquets",
  },
  {
    name: "Lilies",
    slug: "lilies",
  },
  {
    name: "Sunflowers",
    slug: "sunflowers",
  },
  {
    name: "Orchids",
    slug: "orchids",
  },
  {
    name: "Mixed Flowers",
    slug: "mixed-flowers",
  },
];

const Products = () => {
  const [selectedCategory, setSelectedCategory] =
    useState("all");

  const [sort, setSort] = useState("featured");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // -------------------------------
    // CATEGORY FILTER
    // -------------------------------

    if (selectedCategory !== "all") {
      result = result.filter(
        (product) =>
          product.category?.toLowerCase() ===
          selectedCategory.toLowerCase()
      );
    }

    // -------------------------------
    // SORT
    // -------------------------------

    switch (sort) {
      case "low":
        result.sort(
          (a, b) =>
            Number(a.price || 0) -
            Number(b.price || 0)
        );
        break;

      case "high":
        result.sort(
          (a, b) =>
            Number(b.price || 0) -
            Number(a.price || 0)
        );
        break;

      case "rating":
        result.sort(
          (a, b) =>
            Number(b.rating || 0) -
            Number(a.rating || 0)
        );
        break;

      default:
        // Featured = original products order
        break;
    }

    return result;
  }, [selectedCategory, sort]);

  return (
    <div className="min-h-screen bg-[#FCFAFF]">

      {/* ==========================================
          PAGE HEADER
      ========================================== */}

      <section className="bg-linear-to-r from-[#F7EEFF] to-[#FCE7F8]">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          <p className="text-sm font-semibold text-[#9B5DE5]">
            HOME / FLOWERS
          </p>

          <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-[#29213A]">
            Fresh Flowers
          </h1>

          <p className="mt-3 max-w-2xl text-[#756B82]">
            Discover beautiful fresh flowers and
            thoughtfully designed bouquets for every
            special moment.
          </p>

        </div>

      </section>


      {/* ==========================================
          PRODUCTS SECTION
      ========================================== */}

      <section className="py-12">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ========================================
              FILTER + SORT
          ======================================== */}

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

            {/* Categories */}

            <div className="flex gap-2 overflow-x-auto pb-2">

              {categories.map((category) => (

                <button
                  key={category.slug}
                  onClick={() =>
                    setSelectedCategory(
                      category.slug
                    )
                  }
                  className={`
                    whitespace-nowrap
                    px-4
                    py-2.5
                    rounded-full
                    text-sm
                    font-semibold
                    transition-all
                    ${
                      selectedCategory ===
                      category.slug
                        ? "bg-[#9B5DE5] text-white shadow-md"
                        : "bg-white border border-[#eee6f7] text-[#756B82] hover:border-[#9B5DE5] hover:text-[#9B5DE5]"
                    }
                  `}
                >
                  {category.name}
                </button>

              ))}

            </div>


            {/* Sort */}

            <div className="flex items-center gap-3 shrink-0">

              <span className="text-sm text-[#756B82]">
                Sort by
              </span>

              <select
                value={sort}
                onChange={(e) =>
                  setSort(e.target.value)
                }
                className="
                  px-4
                  py-2.5
                  bg-white
                  border
                  border-[#eee6f7]
                  rounded-xl
                  text-sm
                  text-[#29213A]
                  outline-none
                  focus:border-[#9B5DE5]
                  cursor-pointer
                "
              >
                <option value="featured">
                  Featured
                </option>

                <option value="low">
                  Price: Low to High
                </option>

                <option value="high">
                  Price: High to Low
                </option>

                <option value="rating">
                  Top Rated
                </option>
              </select>

            </div>

          </div>


          {/* ========================================
              PRODUCT COUNT
          ======================================== */}

          <div className="mb-6">

            <p className="text-sm text-[#756B82]">

              Showing{" "}

              <span className="font-semibold text-[#29213A]">
                {filteredProducts.length}
              </span>{" "}

              {filteredProducts.length === 1
                ? "product"
                : "products"}

            </p>

          </div>


          {/* ========================================
              PRODUCT GRID
          ======================================== */}

          {filteredProducts.length > 0 ? (

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
                gap-5
              "
            >

              {filteredProducts.map((product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                />

              ))}

            </div>

          ) : (

            /* ======================================
               EMPTY STATE
            ====================================== */

            <div className="py-20 text-center">

              <div className="text-6xl">
                🌸
              </div>

              <h2 className="mt-5 text-2xl font-bold text-[#29213A]">
                No flowers found
              </h2>

              <p className="mt-2 text-[#756B82]">
                We couldn't find flowers in this
                category.
              </p>

              <button
                onClick={() =>
                  setSelectedCategory("all")
                }
                className="
                  mt-6
                  px-6
                  py-3
                  rounded-full
                  bg-[#9B5DE5]
                  text-white
                  font-semibold
                  hover:bg-[#7B3FB3]
                  transition
                "
              >
                View All Flowers
              </button>

            </div>

          )}

        </div>

      </section>

    </div>
  );
};

export default Products;