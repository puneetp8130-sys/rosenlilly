import React from "react";

const Rating = ({ rating, reviews }) => {
  return (
    <div className="flex items-center gap-2 mt-2">
      <div className="flex items-center gap-0.5">
        <span className="text-yellow-500">★</span>
        <span className="text-sm font-medium text-gray-700">
          {rating}
        </span>
      </div>

      {reviews && (
        <span className="text-sm text-gray-400">
          ({reviews})
        </span>
      )}
    </div>
  );
};

export default Rating;