import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Products from "../pages/Products";
import Category from "../pages/Category";
import Search from "../pages/Search";
import ProductDetails from "../pages/ProductDetails";

import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";

import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";

import Profile from "../pages/Profile";
import Orders from "../pages/Orders";
import OrderDetails from "../pages/OrderDetails";
import Checkout from "../pages/Checkout";

import OrderSuccess from "../pages/OrderSucces";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "../components/auth/ProtectedRoute";

const AppRoutes = () => {
  console.log("🔥 APP ROUTES RENDERED");

  return (
    <Routes>

      <Route element={<MainLayout />}>

        {/* PUBLIC */}

        <Route path="/" element={<Home />} />

        <Route path="/flowers" element={<Products />} />

        <Route path="/categories" element={<Category />} />

        <Route path="/search" element={<Search />} />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route path="/cart" element={<Cart />} />

        <Route path="/wishlist" element={<Wishlist />} />

        {/* PROTECTED */}

{/* ======================================
    PROTECTED ROUTES
====================================== */}

<Route element={<ProtectedRoute />}>

  <Route
    path="/profile"
    element={<Profile />}
  />

  <Route
    path="/orders"
    element={<Orders />}
  />

  <Route
    path="/orders/:orderId"
    element={<OrderDetails />}
  />

  <Route
    path="/checkout"
    element={<Checkout />}
  />

  <Route
    path="/order-success"
    element={<OrderSuccess />}
  />

</Route>

        {/* 404 */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Route>

    </Routes>
  );
};

export default AppRoutes;