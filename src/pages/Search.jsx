import React, { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";

import products from "../data/products";
import ProductCard from "../components/product/ProductCard";

const Search = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  const searchResults = useMemo(() => {
    const searchText = query.trim().toLowerCase();

    if (!searchText) {
      return [];
    }

    return products.filter((product) => {
      const name =
        product.name?.toLowerCase() || "";

      const category =
        product.category?.toLowerCase() || "";

      const description =
        product.description?.toLowerCase() || "";

      return (
        name.includes(searchText) ||
        category.includes(searchText) ||
        description.includes(searchText)
      );
    });
  }, [query]);

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
            py-12
          "
        >

          <p className="text-sm font-semibold text-[#9B5DE5]">
            ROSENLILLY / SEARCH
          </p>

          <h1
            className="
              mt-3
              text-3xl
              sm:text-4xl
              font-bold
              text-[#29213A]
            "
          >
            Search Flowers
          </h1>

          {query && (
            <p className="mt-3 text-[#756B82]">
              Showing results for{" "}
              <span className="font-semibold text-[#29213A]">
                "{query}"
              </span>
            </p>
          )}

        </div>
      </section>


      {/* ==========================================
          SEARCH RESULT
      ========================================== */}

      <section className="py-12">

        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
          "
        >

          {/* Result count */}

          {query && searchResults.length > 0 && (
            <div className="mb-6">

              <p className="text-sm text-[#756B82]">
                Found{" "}
                <span className="font-semibold text-[#29213A]">
                  {searchResults.length}
                </span>{" "}
                {searchResults.length === 1
                  ? "product"
                  : "products"}
              </p>

            </div>
          )}


          {/* ========================================
              PRODUCTS
          ======================================== */}

          {searchResults.length > 0 ? (

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-4
                gap-5
              "
            >

              {searchResults.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}

            </div>

          ) : (

            /* ======================================
               NO RESULT
            ====================================== */

            <div
              className="
                min-h-[<350px>]
                flex
                flex-col
                items-center
                justify-center
                text-center
              "
            >

              <div
                className="
                  w-20
                  h-20
                  rounded-full
                  bg-[#F7EEFF]
                  flex
                  items-center
                  justify-center
                  text-4xl
                "
              >
                🔍
              </div>

              <h2
                className="
                  mt-6
                  text-2xl
                  font-bold
                  text-[#29213A]
                "
              >
                {query
                  ? "No flowers found"
                  : "Search for flowers"}
              </h2>

              <p
                className="
                  mt-2
                  max-w-md
                  text-[#756B82]
                "
              >
                {query
                  ? `We couldn't find any products matching "${query}". Try another search.`
                  : "Find your perfect flowers by searching for roses, lilies, bouquets and more."}
              </p>

              <Link
                to="/flowers"
                className="
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
                Browse All Flowers
              </Link>

            </div>

          )}

        </div>

      </section>

    </div>
  );
};

export default Search;