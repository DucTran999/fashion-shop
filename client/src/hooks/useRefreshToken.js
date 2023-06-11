import axios from "../api/init.axios";
import { useDispatch } from "react-redux";
import LOCAL_STORAGE_KEY from "../api/init.localStorage";
import {
  loginStart,
  loginFailed,
  loginSuccess,
} from "../features/auth/authSlice";

const getUserCredential = (res) => {
  const { access_token } = res.data.elements[0];
  const userInfo = JSON.parse(atob(access_token.split(".")[1]));
  const credentials = { ...userInfo, accessToken: access_token };

  return credentials;
};

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    // request to get new token
    dispatch(loginStart());
    try {
      const response = await axios.get("/api/v1/users/refresh-token", {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      const newAccessToken = response.data.elements[0].access_token;
      const userRefresh = getUserCredential(response);

      // set new token for user
      dispatch(loginSuccess(userRefresh));
      localStorage.setItem(LOCAL_STORAGE_KEY.isLogged, true);

      return newAccessToken;
    } catch (err) {
      localStorage.setItem(LOCAL_STORAGE_KEY.isLogged, false);
      dispatch(loginFailed("Session expired!"));
    }
  };

  return refresh;
};

export default useRefreshToken;
