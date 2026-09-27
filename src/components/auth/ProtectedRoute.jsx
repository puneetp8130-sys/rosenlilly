import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { getCurrentUser } from "../../utils/storage";

const ProtectedRoute = () => {
  const location = useLocation();

  const currentUser = getCurrentUser();

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
