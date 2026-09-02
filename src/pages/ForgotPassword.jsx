import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  // =========================================================
  // FIND USER
  // =========================================================

  const handleEmailSubmit = (e) => {
    e.preventDefault();

    const userEmail = email.trim().toLowerCase();

    if (!userEmail) {
      toast.error("Please enter your email");
      return;
    }

    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const userExists = users.some(
      (user) =>
        user.email.toLowerCase() === userEmail
    );

    if (!userExists) {
      toast.error(
        "No account found with this email"
      );
      return;
    }

    // Demo purpose:
    // Normally OTP/email verification happens here.
    setStep(2);

    toast.success("Account found!");
  };

  // =========================================================
  // RESET PASSWORD
  // =========================================================

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (newPassword.length < 6) {
      toast.error(
        "Password must be at least 6 characters"
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const updatedUsers = users.map((user) => {
      if (
        user.email.toLowerCase() ===
        email.trim().toLowerCase()
      ) {
        return {
          ...user,
          password: newPassword,
        };
      }

      return user;
    });

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    toast.success(
      "Password reset successfully! 🎉"
    );

    setTimeout(() => {
      navigate("/login");
    }, 700);
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
              LEFT SECTION
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
                🔐
              </div>

              <h1
                className="text-4xl
                           font-bold
                           text-[#29213A]
                           leading-tight"
              >
                Forgot your
                <span className="block text-[#9B5DE5]">
                  password?
                </span>
              </h1>

              <p
                className="mt-5
                           text-[#756B82]
                           leading-7
                           max-w-md"
              >
                Don't worry. We'll help you get
                back into your Rosenlilly account
                and continue shopping for beautiful
                flowers.
              </p>

              <div className="mt-8 space-y-4">

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
                    Secure account recovery
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
                    Easy password reset
                  </span>

                </div>

              </div>

            </div>

          </div>


          {/* ==================================================
              FORM SECTION
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


              {/* ==================================================
                  STEP 1
              ================================================== */}

              {step === 1 && (
                <>
                  <div>

                    <div
                      className="w-14 h-14
                                 rounded-2xl
                                 bg-[#F7EEFF]
                                 flex
                                 items-center
                                 justify-center
                                 text-2xl"
                    >
                      🔑
                    </div>

                    <h2
                      className="text-3xl
                                 font-bold
                                 text-[#29213A]
                                 mt-5"
                    >
                      Reset Password
                    </h2>

                    <p
                      className="mt-2
                                 text-[#756B82]"
                    >
                      Enter the email associated with
                      your account.
                    </p>

                  </div>


                  <form
                    onSubmit={handleEmailSubmit}
                    className="mt-8"
                  >

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
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="w-full
                                 px-4
                                 py-3.5
                                 rounded-xl
                                 border
                                 border-[#ddd3e8]
                                 outline-none
                                 text-[#29213A]
                                 placeholder:text-[#aaa0b5]
                                 focus:border-[#9B5DE5]
                                 focus:ring-4
                                 focus:ring-[#9B5DE5]/10"
                    />


                    <button
                      type="submit"
                      className="w-full
                                 mt-5
                                 py-3.5
                                 rounded-xl
                                 bg-[#9B5DE5]
                                 text-white
                                 font-bold
                                 hover:bg-[#7B3FB3]
                                 transition"
                    >
                      Continue
                    </button>

                  </form>
                </>
              )}


              {/* ==================================================
                  STEP 2
              ================================================== */}

              {step === 2 && (
                <>
                  <div>

                    <div
                      className="w-14 h-14
                                 rounded-2xl
                                 bg-[#E7FAEF]
                                 flex
                                 items-center
                                 justify-center
                                 text-2xl"
                    >
                      🔒
                    </div>

                    <h2
                      className="text-3xl
                                 font-bold
                                 text-[#29213A]
                                 mt-5"
                    >
                      Create New Password
                    </h2>

                    <p
                      className="mt-2
                                 text-[#756B82]"
                    >
                      Create a new password for:
                    </p>

                    <p
                      className="mt-1
                                 text-sm
                                 font-semibold
                                 text-[#9B5DE5]"
                    >
                      {email}
                    </p>

                  </div>


                  <form
                    onSubmit={handleResetPassword}
                    className="mt-8 space-y-5"
                  >

                    {/* New Password */}

                    <div>

                      <label
                        className="block
                                   text-sm
                                   font-semibold
                                   text-[#29213A]
                                   mb-2"
                      >
                        New Password
                      </label>

                      <div className="relative">

                        <input
                          type={
                            showPassword
                              ? "text"
                              : "password"
                          }
                          value={newPassword}
                          onChange={(e) =>
                            setNewPassword(
                              e.target.value
                            )
                          }
                          placeholder="Enter new password"
                          autoComplete="new-password"
                          className="w-full
                                     px-4
                                     py-3.5
                                     pr-12
                                     rounded-xl
                                     border
                                     border-[#ddd3e8]
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

                      <input
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        value={confirmPassword}
                        onChange={(e) =>
                          setConfirmPassword(
                            e.target.value
                          )
                        }
                        placeholder="Confirm new password"
                        autoComplete="new-password"
                        className="w-full
                                   px-4
                                   py-3.5
                                   rounded-xl
                                   border
                                   border-[#ddd3e8]
                                   outline-none
                                   text-[#29213A]
                                   placeholder:text-[#aaa0b5]
                                   focus:border-[#9B5DE5]
                                   focus:ring-4
                                   focus:ring-[#9B5DE5]/10"
                      />

                    </div>


                    {/* Password Hint */}

                    <div
                      className="p-3
                                 rounded-xl
                                 bg-[#F7EEFF]
                                 text-xs
                                 text-[#756B82]"
                    >
                      💡 Password should contain at least
                      6 characters.
                    </div>


                    <button
                      type="submit"
                      className="w-full
                                 py-3.5
                                 rounded-xl
                                 bg-[#9B5DE5]
                                 text-white
                                 font-bold
                                 hover:bg-[#7B3FB3]
                                 transition"
                    >
                      Reset Password
                    </button>

                  </form>
                </>
              )}


              {/* ==================================================
                  LOGIN LINK
              ================================================== */}

              <div className="text-center mt-7">

                <Link
                  to="/login"
                  className="text-sm
                             font-semibold
                             text-[#9B5DE5]
                             hover:text-[#7B3FB3]"
                >
                  ← Back to Login
                </Link>

              </div>


              <div className="text-center mt-5">

                <Link
                  to="/"
                  className="text-xs
                             text-[#756B82]
                             hover:text-[#9B5DE5]"
                >
                  Back to Home
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ForgotPassword;