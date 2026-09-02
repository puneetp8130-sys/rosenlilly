import React, { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ==================================================
  // STATE
  // ==================================================

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  // ==================================================
  // HANDLE CHANGE
  // ==================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error while typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // ==================================================
  // VALIDATION
  // ==================================================

  const validateForm = () => {
    const newErrors = {};

    const email = formData.email.trim();
    const password = formData.password;

    if (!email) {
      newErrors.email = "Email is required";
    }

    if (!password) {
      newErrors.password =
        "Password is required";
    }

    if (
      email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      newErrors.email =
        "Please enter a valid email";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ==================================================
  // LOGIN
  // ==================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (loading) return;

    // Validate
    if (!validateForm()) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const email = formData.email
        .trim()
        .toLowerCase();

      const password = formData.password;

      // ==================================================
      // GET USERS
      // ==================================================

      const storedUsers =
        localStorage.getItem("users");

      const users = storedUsers
        ? JSON.parse(storedUsers)
        : [];

      // Make sure users is an array
      if (!Array.isArray(users)) {
        toast.error(
          "User data is corrupted. Please register again."
        );

        setLoading(false);
        return;
      }

      // ==================================================
      // FIND USER
      // ==================================================

      const user = users.find(
        (item) =>
          item?.email
            ?.trim()
            .toLowerCase() === email
      );

      // ==================================================
      // USER NOT FOUND
      // ==================================================

      if (!user) {
        setErrors({
          email:
            "No account found with this email",
        });

        toast.error(
          "No account found with this email"
        );

        setLoading(false);
        return;
      }

      // ==================================================
      // PASSWORD CHECK
      // ==================================================

      if (user.password !== password) {
        setErrors({
          password: "Incorrect password",
        });

        toast.error("Incorrect password");

        setLoading(false);
        return;
      }

      // ==================================================
      // CREATE CURRENT USER
      // ==================================================

      const currentUser = {
        id: user.id || Date.now(),
        name: user.name || "User",
        email: user.email,
        phone: user.phone || "",
      };

      // ==================================================
      // SAVE CURRENT USER
      // ==================================================

      localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
      );

      // ==================================================
      // NOTIFY OTHER COMPONENTS
      // ==================================================

      window.dispatchEvent(
        new Event("authChange")
      );

      window.dispatchEvent(
        new Event("userChange")
      );

      // ==================================================
      // SUCCESS TOAST
      // ==================================================

      toast.success(
        `Welcome back, ${
          currentUser.name
        }! 🌸`
      );

      // ==================================================
      // REDIRECT
      // ==================================================

    setLoading(false);

    navigate("/", {
        replace: true,
    });

    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      setLoading(false);

      toast.error(
        "Something went wrong. Please try again."
      );
    }
  };
  // ==================================================
  // UI
  // ==================================================

  return (
    <>
      {/* Hide browser's default password reveal icons */}
      <style>
        {`
          input::-ms-reveal,
          input::-ms-clear {
            display: none;
          }

          input[type="password"]::-webkit-credentials-auto-fill-button,
          input[type="password"]::-webkit-contacts-auto-fill-button {
            visibility: hidden;
            pointer-events: none;
            position: absolute;
            right: 0;
          }
        `}
      </style>

      <div className="min-h-screen bg-[#FCFAFF]">

        <div
          className="
            min-h-[calc(100vh-80px)]
            flex
            items-center
            justify-center
            px-4
            py-10
          "
        >

          <div
            className="
              w-full
              max-w-5xl
              grid
              lg:grid-cols-2
              bg-white
              rounded-3xl
              overflow-hidden
              border
              border-[#eee6f7]
              shadow-xl
            "
          >

            {/* ==================================================
                LEFT SIDE
            ================================================== */}

            <div
              className="
                hidden
                lg:flex
                bg-linear-to-br
                from-[#F7EEFF]
                to-[#FCE7F8]
                p-10
                items-center
                justify-center
              "
            >

              <div className="text-center">

                <div className="text-7xl">
                  🌸
                </div>

                <h2
                  className="
                    mt-6
                    text-4xl
                    font-bold
                    text-[#29213A]
                  "
                >
                  Welcome Back
                </h2>

                <p
                  className="
                    mt-4
                    max-w-sm
                    mx-auto
                    text-[#756B82]
                    leading-7
                  "
                >
                  Login to continue shopping
                  beautiful flowers and
                  thoughtful gifts from
                  RosenLilly.
                </p>

              </div>

            </div>

            {/* ==================================================
                RIGHT SIDE
            ================================================== */}

            <div className="p-6 sm:p-10">

              <div className="max-w-md mx-auto">

                {/* HEADER */}

                <div>

                  <p
                    className="
                      text-sm
                      font-semibold
                      text-[#9B5DE5]
                    "
                  >
                    ROSENLILLY
                  </p>

                  <h1
                    className="
                      mt-2
                      text-3xl
                      font-bold
                      text-[#29213A]
                    "
                  >
                    Login
                  </h1>

                  <p
                    className="
                      mt-2
                      text-sm
                      text-[#756B82]
                    "
                  >
                    Welcome back! Please login
                    to your account.
                  </p>

                </div>

                {/* ==================================================
                    FORM
                ================================================== */}

                <form
                  onSubmit={handleSubmit}
                  className="mt-8 space-y-5"
                >

                  {/* EMAIL */}

                  <div>

                    <label
                      htmlFor="email"
                      className="
                        block
                        mb-2
                        text-sm
                        font-semibold
                        text-[#29213A]
                      "
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      autoComplete="email"
                      disabled={loading}
                      className={`
                        w-full
                        px-4
                        py-3
                        rounded-xl
                        bg-white
                        border
                        outline-none
                        text-[#29213A]
                        placeholder:text-[#aaa1b3]
                        transition
                        disabled:opacity-60
                        ${
                          errors.email
                            ? "border-red-400 focus:border-red-500"
                            : "border-[#ddd3e8] focus:border-[#9B5DE5]"
                        }
                      `}
                    />

                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.email}
                      </p>
                    )}

                  </div>

                  {/* PASSWORD */}

                  <div>

                    <div className="flex items-center justify-between mb-2">

                      <label
                        htmlFor="password"
                        className="
                          text-sm
                          font-semibold
                          text-[#29213A]
                        "
                      >
                        Password
                      </label>

                      <Link
                        to="/forgot-password"
                        className="
                          text-xs
                          font-semibold
                          text-[#9B5DE5]
                          hover:text-[#7B3FB3]
                        "
                      >
                        Forgot Password?
                      </Link>

                    </div>

                    <div className="relative">

                      <input
                        id="password"
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        name="password"
                        value={
                          formData.password
                        }
                        onChange={handleChange}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        disabled={loading}
                        className={`
                          w-full
                          px-4
                          py-3
                          pr-12
                          rounded-xl
                          bg-white
                          border
                          outline-none
                          text-[#29213A]
                          placeholder:text-[#aaa1b3]
                          transition
                          disabled:opacity-60
                          ${
                            errors.password
                              ? "border-red-400 focus:border-red-500"
                              : "border-[#ddd3e8] focus:border-[#9B5DE5]"
                          }
                        `}
                      />

                      {/* CUSTOM EYE BUTTON */}

                      <button
                        type="button"
                        aria-label={
                          showPassword
                            ? "Hide password"
                            : "Show password"
                        }
                        onClick={() =>
                          setShowPassword(
                            (prev) => !prev
                          )
                        }
                        className="
                          absolute
                          right-3
                          top-1/2
                          -translate-y-1/2
                          w-8
                          h-8
                          flex
                          items-center
                          justify-center
                          text-[#756B82]
                          hover:text-[#9B5DE5]
                          cursor-pointer
                          rounded-lg
                          transition
                        "
                      >
                        {showPassword
                          ? "🙈"
                          : "👁️"}
                      </button>

                    </div>

                    {errors.password && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.password}
                      </p>
                    )}

                  </div>

                  {/* LOGIN BUTTON */}

                  <button
                    type="submit"
                    disabled={loading}
                    className="
                      w-full
                      py-3
                      rounded-xl
                      bg-[#9B5DE5]
                      text-white
                      font-semibold
                      transition
                      hover:bg-[#7B3FB3]
                      disabled:opacity-60
                      disabled:cursor-not-allowed
                    "
                  >
                    {loading
                      ? "Logging in..."
                      : "Login"}
                  </button>

                </form>

                {/* REGISTER */}

                <p
                  className="
                    mt-7
                    text-center
                    text-sm
                    text-[#756B82]
                  "
                >
                  Don't have an account?{" "}

                  <Link
                    to="/register"
                    className="
                      font-semibold
                      text-[#9B5DE5]
                      hover:text-[#7B3FB3]
                    "
                  >
                    Create Account
                  </Link>

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default Login;