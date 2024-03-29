import axios from "../../api/init.axios";
import API_URL from "../../api/endpoint";

import io from "../../utils/initSocket";
import { LOCAL_STORAGE_KEY } from "../../utils/constVariable";
import { resetCart } from "../cart/cartSlice";
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
      timeout: 2000,
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
    } else if (err.response?.status === 423) {
      dispatch(
        loginFailed(
          "Lockout! Try again after 5 mins or confirm email to unlock!"
        )
      );
    } else if (err.response?.status === 429) {
      dispatch(loginFailed("Too many request. Try later"));
    } else if (err.response?.status === 403) {
      dispatch(loginFailed("Account not verified!"));
    } else {
      dispatch(loginFailed("Login Failed!"));
    }
  }
};

const registerReq = async (user, dispatch) => {
  dispatch(registerStart());

  try {
    await axios.post(API_URL.users, user);
    dispatch(registerSuccess());

    io.emit("user-register", user.email);
  } catch (err) {
    // Response timeout when api server have problem
    if (!err?.response) {
      dispatch(registerFailed("Server is maintaining"));
    } else if (err.response?.status === 400) {
      dispatch(registerFailed("Input not valid"));
    } else if (err.response?.status === 409) {
      dispatch(registerFailed("Email already in use!"));
    } else if (err.response?.status === 422) {
      dispatch(registerFailed("Need verify"));
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
    dispatch(resetCart());
    navigate("/login", { replace: true });
  } catch (error) {
    dispatch(logOutFailed());
  }
};

export { logInReq, registerReq, logOutReq };
