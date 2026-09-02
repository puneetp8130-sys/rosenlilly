import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[75vh] bg-[#FCFAFF] flex items-center justify-center px-4 py-12">

      <div className="w-full max-w-2xl text-center">

        {/* Flower Illustration */}

        <div
          className="
            relative
            w-32
            h-32
            mx-auto
            rounded-full
            bg-[#F7EEFF]
            flex
            items-center
            justify-center
          "
        >
          <span className="text-6xl">🌸</span>

          <span
            className="
              absolute
              -top-2
              -right-2
              w-10
              h-10
              rounded-full
              bg-[#FCE7F8]
              flex
              items-center
              justify-center
              text-lg
            "
          >
            ?
          </span>
        </div>


        {/* 404 */}

        <p
          className="
            mt-8
            text-7xl
            sm:text-8xl
            font-black
            text-[#9B5DE5]
            tracking-tight
          "
        >
          404
        </p>


        {/* Heading */}

        <h1
          className="
            mt-2
            text-2xl
            sm:text-3xl
            font-bold
            text-[#29213A]
          "
        >
          Oops! This page has bloomed away.
        </h1>


        {/* Description */}

        <p
          className="
            mt-3
            max-w-lg
            mx-auto
            text-[#756B82]
            leading-relaxed
          "
        >
          The page you're looking for doesn't exist
          or may have been moved somewhere else.
        </p>


        {/* Buttons */}

        <div
          className="
            mt-8
            flex
            flex-col
            sm:flex-row
            justify-center
            gap-3
          "
        >

          <Link
            to="/"
            className="
              px-7
              py-3.5
              rounded-xl
              bg-[#9B5DE5]
              text-white
              font-semibold
              hover:bg-[#7B3FB3]
              transition
            "
          >
            🏠 Back to Home
          </Link>


          <button
            onClick={() => navigate(-1)}
            className="
              px-7
              py-3.5
              rounded-xl
              border
              border-[#ddd3e8]
              bg-white
              text-[#7B3FB3]
              font-semibold
              hover:bg-[#F7EEFF]
              transition
            "
          >
            ← Go Back
          </button>

        </div>


        {/* Quick Link */}

        <div
          className="
            mt-8
            pt-6
            border-t
            border-[#eee6f7]
          "
        >

          <p
            className="
              text-sm
              text-[#9A91A4]
            "
          >
            Looking for something special?
          </p>

          <Link
            to="/flowers"
            className="
              inline-block
              mt-2
              text-sm
              font-semibold
              text-[#9B5DE5]
              hover:text-[#7B3FB3]
            "
          >
            Browse all flowers →
          </Link>

        </div>

      </div>

    </div>
  );
};

export default NotFound;