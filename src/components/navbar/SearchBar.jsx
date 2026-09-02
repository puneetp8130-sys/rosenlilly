import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const value = query.trim();

    if (!value) return;

    navigate(`/search?q=${encodeURIComponent(value)}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative w-full"
    >

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for flowers, bouquets, gifts..."
        className="w-full
                   h-11
                   pl-5
                   pr-14
                   rounded-full
                   bg-[#FCFAFF]
                   border
                   border-[#eee6f7]
                   text-[#29213A]
                   placeholder:text-[#756B82]
                   outline-none
                   focus:border-[#9B5DE5]
                   focus:ring-2
                   focus:ring-[#9B5DE5]/10"
      />

      <button
        type="submit"
        className="absolute
                   right-1.5
                   top-1/2
                   -translate-y-1/2
                   w-9
                   h-9
                   rounded-full
                   bg-linear-to-r
                   from-[#9B5DE5]
                   to-[#D916C7]
                   text-white
                   flex
                   items-center
                   justify-center
                   hover:scale-105"
      >
        🔍
      </button>

    </form>
  );
};

export default SearchBar;