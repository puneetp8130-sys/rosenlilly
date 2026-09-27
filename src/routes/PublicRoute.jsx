
import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../utils/storage";

const PublicRoute = () => {
  const currentUser = getCurrentUser();

  // Already logged in
  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
