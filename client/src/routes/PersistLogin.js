import { Outlet } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import useRefreshToken from "../hooks/useRefreshToken";
import PageLoadingSpinner from "../components/LoadingSpinner/PageLoadingSpinner";

const PersistLogin = () => {
  const refresh = useRefreshToken();
  const isLoading = useSelector((state) => state.auth.login.isFetching);
  const user = useSelector((state) => state.auth.login.currentUser);
  const isCalled = useRef(false);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      await refresh();
    };

    if (!isCalled.current) {
      isCalled.current = true;
      !user?.accessToken && verifyRefreshToken();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{isLoading ? <PageLoadingSpinner /> : <Outlet />}</>;
};

export default PersistLogin;
