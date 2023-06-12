import { Outlet } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import useRefreshToken from "../hooks/useRefreshToken";
import PageLoadingSpinner from "../components/LoadingSpinner/PageLoadingSpinner";
import LOCAL_STORAGE_KEY from "../api/init.localStorage";

const PersistLogin = () => {
  const isMounted = useRef(false);
  const refresh = useRefreshToken();

  const isLoading = useSelector((state) => state.auth.login.isFetching);
  const user = useSelector((state) => state.auth.login.currentUser);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      await refresh();
    };

    if (!isMounted.current) {
      isMounted.current = true;
      if (
        !user?.accessToken &&
        localStorage.getItem(LOCAL_STORAGE_KEY.isLogged) === "true"
      )
        verifyRefreshToken();
    }

    // eslint-disable-next-line
  }, []);

  return <>{isLoading ? <PageLoadingSpinner /> : <Outlet />}</>;
};

export default PersistLogin;
