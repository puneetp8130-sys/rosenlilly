import React from "react";
import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

const ProtectedRoute = () => {
  const location = useLocation();

  const currentUser =
    localStorage.getItem("currentUser");

  console.log("🔥 PROTECTED ROUTE CHECK");
  console.log("🔥 CURRENT USER:", currentUser);

  if (!currentUser) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;