import axios from "../../api/init.axios";
import API_URL from "../../api/init.url";
import delay from "../../utils/delay";
import LOCAL_STORAGE_KEY from "../../api/init.localStorage";
import io from "../../utils/init.socket";
import { resetNotificationList } from "../notification/notificationSlice";

import {
  loginFailed,
  loginStart,
  loginSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
  logOutStart,
  logOutSuccess,
  logOutFailed,
} from "./authSlice";

const getUserCredential = (res) => {
  const { access_token } = res.data.elements[0];
  const userInfo = JSON.parse(atob(access_token.split(".")[1]));
  const credentials = { ...userInfo, accessToken: access_token };

  return credentials;
};

const logInReq = async (user, dispatch, navigate, location) => {
  dispatch(loginStart());

  try {
    const res = await axios.post(API_URL.sessions, user, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      timeout: 5000,
    });
    const userInfo = getUserCredential(res);
    dispatch(loginSuccess(userInfo));

    //announce to the server new user attendance
    io.emit("user-login", userInfo.user_id);

    // remember user used to login at this device
    localStorage.setItem(LOCAL_STORAGE_KEY.isLogged, true);

    navigate(location, { replace: true });
  } catch (err) {
    if (!err?.response) {
      dispatch(loginFailed("Server is maintaining"));
    } else if (err.response?.status === 400) {
      dispatch(loginFailed("Input not valid"));
    } else if (err.response?.status === 401) {
      dispatch(loginFailed("Wrong email or password"));
    } else {
      dispatch(loginFailed("Login Failed!"));
    }
  }
};

const registerReq = async (user, dispatch, navigate) => {
  dispatch(registerStart());

  try {
    await axios.post(API_URL.users, user);
    dispatch(registerSuccess());

    // Auto return to login page after 5 seconds
    await delay(5000);
    navigate("/login", { replace: true });
  } catch (err) {
    // Response timeout when api server have problem
    if (!err?.response) {
      dispatch(registerFailed("Server is maintaining"));
    } else if (err.response?.status === 400) {
      dispatch(registerFailed("Input not valid"));
    } else if (err.response?.status === 409) {
      dispatch(registerFailed("Email already in use!"));
    } else {
      dispatch(registerFailed("Register Failed!"));
    }
  }
};

const logOutReq = async (userId, axiosPrivate, dispatch, navigate) => {
  dispatch(logOutStart());
  try {
    await axiosPrivate.post(`${API_URL.sessions}/${userId}`, {});
    dispatch(logOutSuccess());

    //announce to the server an user left
    io.emit("user-logout", userId);

    // browser remember account is logout
    localStorage.setItem(LOCAL_STORAGE_KEY.isLogged, false);
    dispatch(resetNotificationList());

    navigate("/login", { replace: true });
  } catch (error) {
    dispatch(logOutFailed());
  }
};

export { logInReq, registerReq, logOutReq };
