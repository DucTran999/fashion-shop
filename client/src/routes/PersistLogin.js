import { Outlet } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import useRefreshToken from "../hooks/useRefreshToken";
import PageLoadingSpinner from "../components/LoadingSpinner/PageLoadingSpinner";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const user = useSelector((state) => state.auth.login.currentUser);
  const isCalled = useRef(false);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!isCalled.current) {
      isCalled.current = true;
      !user?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{isLoading ? <PageLoadingSpinner /> : <Outlet />}</>;
};

export default PersistLogin;
