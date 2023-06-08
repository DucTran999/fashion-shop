import { useSelector } from "react-redux";
import { useLocation, Outlet, Navigate } from "react-router-dom";

const RequireAuth = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const location = useLocation();

  return !user ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default RequireAuth;
