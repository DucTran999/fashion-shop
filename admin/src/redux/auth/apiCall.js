import axios from "../../api/init.axios";

import {
  loginFailed,
  loginStart,
  loginSuccess,
  logOutStart,
  logOutFailed,
  logOutSuccess,
} from "./authSlice";

import API_URL from "../../api/url.init";

const getUserCredential = (res) => {
  const { access_token } = res.data.elements[0];
  const userInfo = JSON.parse(atob(access_token.split(".")[1]));
  const credentials = { ...userInfo, accessToken: access_token };

  return credentials;
};

const loginReq = async (user, dispatch, navigate, location) => {
  dispatch(loginStart());

  try {
    const res = await axios.post(API_URL.sessions, user, {
      withCredentials: true,
      headers: {
        "Content-type": "application/json",
      },
    });
    const credentials = getUserCredential(res);
    dispatch(loginSuccess(credentials));
    navigate(location, { replace: true });
  } catch (err) {
    if (!err?.response) {
      dispatch(loginFailed("timeout"));
    } else if (err.response?.status === 400) {
      dispatch(loginFailed("Bad request"));
    } else if (err.response?.status === 401) {
      dispatch(loginFailed("Unauthorized"));
    } else if (err.response?.status === 403) {
      dispatch(loginFailed("Forbidden"));
    } else {
      dispatch(loginFailed("Login Failed!"));
    }
  }
};

const logOutReq = async (
  userId,
  axiosPrivate,
  dispatch,
  navigate,
  location
) => {
  dispatch(logOutStart());
  try {
    await axiosPrivate.post(
      `${API_URL.sessions}/${userId}`,
      {},
      {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch(logOutSuccess());
    navigate("/login", { state: location, replace: true });
  } catch (error) {
    dispatch(logOutFailed());
  }
};

export { loginReq, logOutReq };
