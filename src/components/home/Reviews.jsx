import React from "react";

const reviews = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Delhi",
    rating: 5,
    review:
      "The flowers were absolutely beautiful and looked even better than the pictures. Delivery was also right on time. Loved the experience!",
    initials: "PS",
  },
  {
    id: 2,
    name: "Rahul Verma",
    location: "Mumbai",
    rating: 5,
    review:
      "Ordered a bouquet for my wife's birthday and she absolutely loved it. Fresh flowers, beautiful packaging and fast delivery.",
    initials: "RV",
  },
  {
    id: 3,
    name: "Ananya Gupta",
    location: "Bangalore",
    rating: 4,
    review:
      "Really happy with the quality of the flowers. The bouquet was fresh and beautifully arranged. Will definitely order again.",
    initials: "AG",
  },
];

const Reviews = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#FCFAFF]">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="text-center max-w-2xl mx-auto">

          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#9B5DE5]">
            <span className="w-7 h-[<2px>] bg-[#9B5DE5]" />
            CUSTOMER LOVE
            <span className="w-7 h-[<2px>] bg-[#9B5DE5]" />
          </span>

          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#29213A]">
            Loved By Our Customers
          </h2>

          <p className="mt-3 text-[#756B82]">
            Every flower tells a story. Here's what our happy
            customers have to say about their Rosenlilly experience.
          </p>

        </div>


        {/* ==================================================
            RATING SUMMARY
        ================================================== */}

        <div className="mt-10 max-w-3xl mx-auto">

          <div className="bg-white border border-[#eee6f7] rounded-3xl p-6 sm:p-8">

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">

              {/* Overall rating */}
              <div className="text-center">

                <div className="text-5xl font-bold text-[#7B3FB3]">
                  4.9
                </div>

                <div className="flex justify-center gap-1 mt-2 text-[#F5B301] text-lg">
                  ★★★★★
                </div>

                <p className="text-sm text-[#756B82] mt-2">
                  Based on 2,000+ reviews
                </p>

              </div>


              {/* Divider */}
              <div className="hidden sm:block w-px h-24 bg-[#eee6f7]" />


              {/* Rating bars */}
              <div className="w-full max-w-sm space-y-2">

                {[5, 4, 3, 2, 1].map((star) => {

                  const percentage =
                    star === 5
                      ? 92
                      : star === 4
                      ? 6
                      : star === 3
                      ? 1
                      : 0.5;

                  return (
                    <div
                      key={star}
                      className="flex items-center gap-3 text-xs"
                    >

                      <span className="w-8 text-[#756B82]">
                        {star} ★
                      </span>

                      <div className="flex-1 h-2 bg-[#F1ECF7] rounded-full overflow-hidden">

                        <div
                          className="h-full bg-linear-to-r from-[#9B5DE5] to-[#D916C7] rounded-full"
                          style={{ width: `${percentage}%` }}
                        />

                      </div>

                      <span className="w-10 text-right text-[#756B82]">
                        {percentage}%
                      </span>

                    </div>
                  );
                })}

              </div>

            </div>

          </div>

        </div>


        {/* ==================================================
            REVIEW CARDS
        ================================================== */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">

          {reviews.map((review) => (

            <div
              key={review.id}
              className="bg-white
                         border border-[#eee6f7]
                         rounded-2xl
                         p-6
                         hover:border-[#D9C5F2]
                         hover:shadow-xl
                         hover:shadow-[#7B3FB3]/10
                         transition-all duration-300"
            >

              {/* Stars */}
              <div className="flex items-center justify-between">

                <div className="flex gap-1 text-[#F5B301]">
                  {"★".repeat(review.rating)}
                  <span className="text-[#E5E0EA]">
                    {"★".repeat(5 - review.rating)}
                  </span>
                </div>

                <span className="text-2xl text-[#FCE7F8]">
                  “
                </span>

              </div>


              {/* Review */}
              <p className="mt-5 text-[#756B82] leading-7 text-sm">
                "{review.review}"
              </p>


              {/* Customer */}
              <div className="flex items-center gap-3 mt-6 pt-5 border-t border-[#eee6f7]">

                <div
                  className="w-11 h-11 rounded-full
                             bg-linear-to-br
                             from-[#9B5DE5]
                             to-[#D916C7]
                             text-white
                             flex items-center justify-center
                             font-bold text-sm"
                >
                  {review.initials}
                </div>

                <div>
                  <h3 className="font-semibold text-[#29213A]">
                    {review.name}
                  </h3>

                  <p className="text-xs text-[#756B82] mt-0.5">
                    {review.location}
                  </p>
                </div>

                <div className="ml-auto text-[#12D96B] text-sm">
                  ✓ Verified
                </div>

              </div>

            </div>

          ))}

        </div>


        {/* ==================================================
            TRUST MESSAGE
        ================================================== */}

        <div className="mt-10 text-center">

          <div
            className="inline-flex
                       items-center
                       gap-3
                       px-5
                       py-3
                       rounded-full
                       bg-[#E7FAEF]
                       text-[#0BA957]
                       text-sm
                       font-semibold"
          >
            <span>💚</span>
            Trusted by 50,000+ happy customers
          </div>

        </div>

      </div>

    </section>
  );
};

export default Reviews;