import { useSelector } from "react-redux";
import { useLocation, Outlet, Navigate } from "react-router-dom";

const RequireAuth = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const isLoading = useSelector((state) => state.auth.login.isFetching);
  const location = useLocation();

  return !user?.accessToken && !isLoading ? (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  ) : (
    <Outlet />
  );
};

export default RequireAuth;
