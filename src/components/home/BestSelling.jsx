import React, { useMemo } from "react";
import { Link } from "react-router-dom";

import products from "../../data/products";
import ProductCard from "../product/ProductCard";

const BestSelling = () => {

  // ==========================================
  // BEST SELLING PRODUCTS
  // ==========================================

  const bestSellingProducts = useMemo(() => {

    return [...products]
      .sort(
        (a, b) =>
          Number(b.rating || 0) -
          Number(a.rating || 0)
      )
      .slice(0, 8);

  }, []);

  return (
    <section className="py-16 bg-[#FCFAFF]">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ======================================
            SECTION HEADER
        ====================================== */}

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">

          <div>

            <p className="text-sm font-semibold text-[#9B5DE5]">
              CUSTOMER FAVOURITES
            </p>

            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-[#29213A]">
              Best Selling Flowers
            </h2>

            <p className="mt-2 max-w-xl text-[#756B82]">
              Loved by our customers, these beautiful
              flowers are perfect for making every
              moment special.
            </p>

          </div>


          {/* View All */}

          <Link
            to="/flowers"
            className="
              self-start
              sm:self-auto
              px-5
              py-2.5
              rounded-xl
              border
              border-[#ddd3e8]
              text-[#7B3FB3]
              font-semibold
              text-sm
              hover:bg-[#F7EEFF]
              transition
            "
          >
            View All →
          </Link>

        </div>


        {/* ======================================
            PRODUCT GRID
        ====================================== */}

        {bestSellingProducts.length > 0 ? (

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

            {bestSellingProducts.map(
              (product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                />

              )
            )}

          </div>

        ) : (

          <div className="py-16 text-center">

            <div className="text-5xl">
              🌸
            </div>

            <h3 className="mt-4 text-xl font-bold text-[#29213A]">
              No products available
            </h3>

            <p className="mt-2 text-[#756B82]">
              Please check again later.
            </p>

          </div>

        )}

      </div>

    </section>
  );
};

export default BestSelling;