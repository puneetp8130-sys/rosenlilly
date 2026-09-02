import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const currentUser = localStorage.getItem("currentUser");

  // Already logged in
  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;