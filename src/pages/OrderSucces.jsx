import React from "react";
import { Link, useSearchParams } from "react-router-dom";

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");

  const orders = JSON.parse(
    localStorage.getItem("orders") || "[]"
  );

  const order = orders.find(
    (item) => item.id === orderId
  );

  return (
    <div className="min-h-[75vh] bg-[#FCFAFF] flex items-center justify-center px-4 py-12">

      <div className="w-full max-w-2xl">

        <div className="bg-white rounded-3xl border border-[#eee6f7] p-7 sm:p-10 text-center shadow-sm">

          {/* Success Icon */}
          <div className="mx-auto w-24 h-24 rounded-full bg-green-50 flex items-center justify-center text-5xl">
            ✓
          </div>

          <h1 className="mt-6 text-3xl sm:text-4xl font-bold text-[#29213A]">
            Order Placed Successfully!
          </h1>

          <p className="mt-3 text-[#756B82]">
            Thank you for shopping with Rosenlilly.
            Your beautiful flowers are on their way 🌸
          </p>

          {/* Order ID */}
          {orderId && (
            <div className="mt-7 rounded-2xl bg-[#F7EEFF] p-5">

              <p className="text-sm text-[#756B82]">
                Order ID
              </p>

              <p className="mt-1 text-lg font-bold text-[#9B5DE5]">
                #{orderId}
              </p>

            </div>
          )}

          {/* Order Details */}
          {order && (
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">

              <div className="rounded-xl bg-[#FCFAFF] p-4">
                <p className="text-xs text-[#9A91A4]">
                  Status
                </p>
                <p className="mt-1 font-semibold text-green-600">
                  {order.status}
                </p>
              </div>

              <div className="rounded-xl bg-[#FCFAFF] p-4">
                <p className="text-xs text-[#9A91A4]">
                  Payment
                </p>
                <p className="mt-1 font-semibold text-[#29213A]">
                  {order.payment === "cod"
                    ? "Cash on Delivery"
                    : "Online Payment"}
                </p>
              </div>

              <div className="rounded-xl bg-[#FCFAFF] p-4">
                <p className="text-xs text-[#9A91A4]">
                  Total
                </p>
                <p className="mt-1 font-semibold text-[#9B5DE5]">
                  ₹{Number(order.total).toLocaleString("en-IN")}
                </p>
              </div>

            </div>
          )}

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">

            <Link
              to="/orders"
              className="
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
              View My Orders
            </Link>

            <Link
              to="/flowers"
              className="
                px-6
                py-3
                rounded-xl
                border
                border-[#ddd3e8]
                text-[#29213A]
                font-semibold
                hover:border-[#9B5DE5]
                hover:text-[#9B5DE5]
                transition
              "
            >
              Continue Shopping
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default OrderSuccess;