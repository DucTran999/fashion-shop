import axios from "../../api/init.axios";
import delay from "../../utils/delay";

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

const API_URL = {
  LOGIN: "api/v1/users/sign-in",
  REGISTER: "api/v1/users/sign-up",
  LOGOUT: "/api/v1/users/sign-out",
};

const getUserCredential = (res) => {
  const { access_token } = res.data.elements[0];
  const userInfo = JSON.parse(atob(access_token.split(".")[1]));
  const credentials = { ...userInfo, accessToken: access_token };

  return credentials;
};

const loginUser = async (user, dispatch, navigate, location) => {
  // Start Phase
  dispatch(loginStart());
  await delay(1000);

  try {
    const res = await axios.post(API_URL.LOGIN, user, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      timeout: 5000,
    });
    const userInfo = getUserCredential(res);
    dispatch(loginSuccess(userInfo));

    navigate("/", { state: location, replace: true });
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

const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  await delay(1000);

  try {
    const res = await axios.post(API_URL.REGISTER, user);
    dispatch(registerSuccess(res));

    // Auto return to login page after 5 seconds
    await delay(5000);
    navigate("/login");
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

const logOutUser = async (dispatch, navigate) => {
  dispatch(logOutStart());
  try {
    await axios.get(API_URL.LOGOUT, {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    });
    dispatch(logOutSuccess());
    navigate("/login", { state: "logout", replace: true });
  } catch (error) {
    dispatch(logOutFailed());
  }
};

export { loginUser, registerUser, logOutUser };
