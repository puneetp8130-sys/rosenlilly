import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

const ProtectedRoute = () => {
  const location = useLocation();

  const currentUser =
    localStorage.getItem("currentUser");

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
