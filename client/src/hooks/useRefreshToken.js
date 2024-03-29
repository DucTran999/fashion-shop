import { useDispatch } from "react-redux";

import axios from "../api/init.axios";
import io from "../utils/initSocket";
import API_URL from "../api/endpoint";
import { LOCAL_STORAGE_KEY } from "../utils/constVariable";
import { resetNotificationList } from "../features/notification/notificationSlice";
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
      const response = await axios.post(
        `${API_URL.sessions}/refresh-token`,
        {},
        { withCredentials: true }
      );

      const newAccessToken = response.data.elements[0].access_token;
      const userRefresh = getUserCredential(response);

      // set new token for user
      dispatch(loginSuccess(userRefresh));

      //announce to the server new user attendance
      io.emit("user-login", userRefresh.user_id);

      // remember device
      localStorage.setItem(LOCAL_STORAGE_KEY.isLogged, true);

      return newAccessToken;
    } catch (err) {
      localStorage.setItem(LOCAL_STORAGE_KEY.isLogged, false);
      dispatch(resetNotificationList());
      dispatch(loginFailed("Session expired!"));
    }
  };

  return refresh;
};

export default useRefreshToken;
