import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  // =========================================================
  // HANDLE INPUT
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // REGISTER
  // =========================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const phone = formData.phone.trim();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    // ---------------------------------------------------------
    // VALIDATION
    // ---------------------------------------------------------

    if (!name || !email || !phone || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (name.length < 2) {
      toast.error("Please enter a valid name");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      toast.error("Enter a valid 10-digit phone number");
      return;
    }

    if (password.length < 6) {
      toast.error(
        "Password must be at least 6 characters"
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    // ---------------------------------------------------------
    // GET EXISTING USERS
    // ---------------------------------------------------------

    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    // ---------------------------------------------------------
    // CHECK EMAIL
    // ---------------------------------------------------------

    const emailExists = users.some(
      (user) => user.email.toLowerCase() === email
    );

    if (emailExists) {
      toast.error(
        "An account with this email already exists"
      );

      setLoading(false);
      return;
    }

    // ---------------------------------------------------------
    // CHECK PHONE
    // ---------------------------------------------------------

    const phoneExists = users.some(
      (user) => user.phone === phone
    );

    if (phoneExists) {
      toast.error(
        "An account with this phone number already exists"
      );

      setLoading(false);
      return;
    }

    // ---------------------------------------------------------
    // CREATE USER
    // ---------------------------------------------------------

    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      phone,
      password,
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [
      ...users,
      newUser,
    ];

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    setTimeout(() => {
      toast.success(
        "Account created successfully! 🌸"
      );

      setLoading(false);

      navigate("/login");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#FCFAFF]">

      {/* ==================================================
          MAIN
      ================================================== */}

      <div
        className="min-h-[calc(100vh-80px)]
                   flex
                   items-center
                   justify-center
                   px-4
                   py-10"
      >

        <div
          className="w-full
                     max-w-5xl
                     grid
                     lg:grid-cols-2
                     bg-white
                     rounded-3xl
                     overflow-hidden
                     border border-[#eee6f7]
                     shadow-xl"
        >

          {/* ==================================================
              LEFT BRAND SECTION
          ================================================== */}

          <div
            className="hidden
                       lg:flex
                       relative
                       bg-linear-to-br
                       from-[#F7EEFF]
                       via-[#FCE7F8]
                       to-[#F7EEFF]
                       p-12
                       flex-col
                       justify-center"
          >

            {/* Decorative circles */}

            <div
              className="absolute
                         -top-20
                         -right-20
                         w-60
                         h-60
                         rounded-full
                         bg-white/40"
            />

            <div
              className="absolute
                         -bottom-20
                         -left-20
                         w-60
                         h-60
                         rounded-full
                         bg-[#D916C7]/10"
            />

            <div className="relative z-10">

              <div className="text-6xl mb-6">
                🌸
              </div>

              <h1
                className="text-4xl
                           font-bold
                           text-[#29213A]
                           leading-tight"
              >
                Become a part of
                <span className="block text-[#9B5DE5]">
                  Rosenlilly.
                </span>
              </h1>

              <p
                className="mt-5
                           text-[#756B82]
                           leading-7
                           max-w-md"
              >
                Create your account and discover
                beautiful flowers, gifts and special
                moments made memorable.
              </p>

              {/* Features */}

              <div className="space-y-4 mt-8">

                <div className="flex items-center gap-3">

                  <div
                    className="w-9 h-9
                               rounded-full
                               bg-white
                               flex
                               items-center
                               justify-center"
                  >
                    ✓
                  </div>

                  <span className="text-sm font-medium text-[#29213A]">
                    Save your favourite flowers
                  </span>

                </div>


                <div className="flex items-center gap-3">

                  <div
                    className="w-9 h-9
                               rounded-full
                               bg-white
                               flex
                               items-center
                               justify-center"
                  >
                    ✓
                  </div>

                  <span className="text-sm font-medium text-[#29213A]">
                    Track your orders easily
                  </span>

                </div>


                <div className="flex items-center gap-3">

                  <div
                    className="w-9 h-9
                               rounded-full
                               bg-white
                               flex
                               items-center
                               justify-center"
                  >
                    ✓
                  </div>

                  <span className="text-sm font-medium text-[#29213A]">
                    Faster checkout experience
                  </span>

                </div>

              </div>

            </div>

          </div>


          {/* ==================================================
              REGISTER FORM
          ================================================== */}

          <div className="p-6 sm:p-10 lg:p-12">

            <div className="max-w-md mx-auto">

              {/* Mobile Logo */}

              <div className="lg:hidden text-center mb-8">

                <div className="text-4xl">
                  🌸
                </div>

                <h1 className="text-2xl font-bold text-[#29213A] mt-2">
                  Rosenlilly
                </h1>

              </div>


              {/* Heading */}

              <div>

                <h2
                  className="text-3xl
                             font-bold
                             text-[#29213A]"
                >
                  Create Account
                </h2>

                <p className="mt-2 text-[#756B82]">
                  Join Rosenlilly and start shopping.
                </p>

              </div>


              {/* ==================================================
                  FORM
              ================================================== */}

              <form
                onSubmit={handleSubmit}
                className="mt-7 space-y-4"
              >

                {/* Name */}

                <div>

                  <label
                    className="block
                               text-sm
                               font-semibold
                               text-[#29213A]
                               mb-2"
                  >
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    className="w-full
                               px-4
                               py-3.5
                               rounded-xl
                               border border-[#ddd3e8]
                               outline-none
                               text-[#29213A]
                               placeholder:text-[#aaa0b5]
                               focus:border-[#9B5DE5]
                               focus:ring-4
                               focus:ring-[#9B5DE5]/10"
                  />

                </div>


                {/* Email */}

                <div>

                  <label
                    className="block
                               text-sm
                               font-semibold
                               text-[#29213A]
                               mb-2"
                  >
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full
                               px-4
                               py-3.5
                               rounded-xl
                               border border-[#ddd3e8]
                               outline-none
                               text-[#29213A]
                               placeholder:text-[#aaa0b5]
                               focus:border-[#9B5DE5]
                               focus:ring-4
                               focus:ring-[#9B5DE5]/10"
                  />

                </div>


                {/* Phone */}

                <div>

                  <label
                    className="block
                               text-sm
                               font-semibold
                               text-[#29213A]
                               mb-2"
                  >
                    Phone Number
                  </label>

                  <div className="flex">

                    <span
                      className="flex
                                 items-center
                                 px-3
                                 rounded-l-xl
                                 border border-r-0
                                 border-[#ddd3e8]
                                 bg-[#FAF7FD]
                                 text-sm
                                 font-semibold
                                 text-[#756B82]"
                    >
                      +91
                    </span>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => {
                        const value =
                          e.target.value.replace(
                            /\D/g,
                            ""
                          );

                        if (value.length <= 10) {
                          setFormData((prev) => ({
                            ...prev,
                            phone: value,
                          }));
                        }
                      }}
                      placeholder="9876543210"
                      autoComplete="tel"
                      className="w-full
                                 px-4
                                 py-3.5
                                 rounded-r-xl
                                 border border-[#ddd3e8]
                                 outline-none
                                 text-[#29213A]
                                 placeholder:text-[#aaa0b5]
                                 focus:border-[#9B5DE5]
                                 focus:ring-4
                                 focus:ring-[#9B5DE5]/10"
                    />

                  </div>

                </div>


                {/* Password */}

                <div>

                  <label
                    className="block
                               text-sm
                               font-semibold
                               text-[#29213A]
                               mb-2"
                  >
                    Password
                  </label>

                  <div className="relative">

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Minimum 6 characters"
                      autoComplete="new-password"
                      className="w-full
                                 px-4
                                 py-3.5
                                 pr-12
                                 rounded-xl
                                 border border-[#ddd3e8]
                                 outline-none
                                 text-[#29213A]
                                 placeholder:text-[#aaa0b5]
                                 focus:border-[#9B5DE5]
                                 focus:ring-4
                                 focus:ring-[#9B5DE5]/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      className="absolute
                                 right-4
                                 top-1/2
                                 -translate-y-1/2
                                 text-[#756B82]"
                    >
                      {showPassword
                        ? "🙈"
                        : "👁️"}
                    </button>

                  </div>

                </div>


                {/* Confirm Password */}

                <div>

                  <label
                    className="block
                               text-sm
                               font-semibold
                               text-[#29213A]
                               mb-2"
                  >
                    Confirm Password
                  </label>

                  <div className="relative">

                    <input
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter your password"
                      autoComplete="new-password"
                      className="w-full
                                 px-4
                                 py-3.5
                                 pr-12
                                 rounded-xl
                                 border border-[#ddd3e8]
                                 outline-none
                                 text-[#29213A]
                                 placeholder:text-[#aaa0b5]
                                 focus:border-[#9B5DE5]
                                 focus:ring-4
                                 focus:ring-[#9B5DE5]/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                      className="absolute
                                 right-4
                                 top-1/2
                                 -translate-y-1/2
                                 text-[#756B82]"
                    >
                      {showConfirmPassword
                        ? "🙈"
                        : "👁️"}
                    </button>

                  </div>

                </div>


                {/* Terms */}

                <div className="flex items-start gap-2 pt-1">

                  <input
                    id="terms"
                    type="checkbox"
                    required
                    className="w-4 h-4
                               mt-0.5
                               accent-[#9B5DE5]"
                  />

                  <label
                    htmlFor="terms"
                    className="text-xs
                               leading-5
                               text-[#756B82]"
                  >
                    I agree to the{" "}
                    <span className="font-semibold text-[#9B5DE5]">
                      Terms & Conditions
                    </span>{" "}
                    and{" "}
                    <span className="font-semibold text-[#9B5DE5]">
                      Privacy Policy
                    </span>
                    .
                  </label>

                </div>


                {/* Submit */}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full
                             py-3.5
                             rounded-xl
                             bg-[#9B5DE5]
                             text-white
                             font-bold
                             hover:bg-[#7B3FB3]
                             disabled:opacity-60
                             transition"
                >
                  {loading
                    ? "Creating Account..."
                    : "Create Account"}
                </button>

              </form>


              {/* Login */}

              <p
                className="text-center
                           text-sm
                           text-[#756B82]
                           mt-6"
              >
                Already have an account?{" "}

                <Link
                  to="/login"
                  className="font-bold
                             text-[#9B5DE5]
                             hover:text-[#7B3FB3]"
                >
                  Login
                </Link>
              </p>


              {/* Home */}

              <div className="text-center mt-4">

                <Link
                  to="/"
                  className="text-xs
                             text-[#756B82]
                             hover:text-[#9B5DE5]"
                >
                  ← Back to Home
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;