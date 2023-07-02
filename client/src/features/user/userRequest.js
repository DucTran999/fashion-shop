import API_URL from "../../api/init.url";
import delay from "../../utils/delay";
import axios from "../../api/init.axios";

import {
  getUserSuccess,
  getUserStart,
  getUserFailed,
  updateUserStart,
  updateUserSuccess,
  updateUserFailed,
  changeUserPassStart,
  changeUserPassSuccess,
  changeUserPassFailed,
  verifyUserEmailStart,
  verifyUserEmailSuccess,
  verifyUserEmailFailed,
  sendVerifyEmailStart,
  sendVerifyEmailSuccess,
  sendVerifyEmailFailed,
} from "./userSlice";

const getUserReq = async (userId, axiosPrivate, dispatch) => {
  dispatch(getUserStart());
  delay(1000);
  try {
    const res = await axiosPrivate.get(`${API_URL.users}/${userId}`, {
      timeout: 5000,
    });
    const user = res.data.elements;

    dispatch(getUserSuccess(user));
  } catch (err) {
    if (!err?.response) {
      dispatch(getUserFailed("Server is busy"));
    } else if (err.response?.status === 401) {
      dispatch(getUserFailed("Unauthorized"));
    } else if (err.response?.status === 404) {
      dispatch(getUserFailed("Not found"));
    } else {
      dispatch(getUserFailed("Error"));
    }
  }
};

const updateUserReq = async (userId, newInfo, axiosPrivate, dispatch) => {
  dispatch(updateUserStart());

  try {
    await axiosPrivate.patch(`${API_URL.users}/${userId}/info`, newInfo, {
      timeout: 5000,
    });

    dispatch(updateUserSuccess());
  } catch (err) {
    if (!err?.response) {
      dispatch(updateUserFailed("Server is busy"));
    } else if (err.response?.status === 400) {
      dispatch(updateUserFailed("Invalid Info"));
    } else if (err.response?.status === 401) {
      dispatch(updateUserFailed("Unauthorized"));
    } else if (err.response?.status === 404) {
      dispatch(updateUserFailed("Not found"));
    } else {
      dispatch(updateUserFailed("Error"));
    }
  }
};

const changePasswordReq = async (userId, newPass, axiosPrivate, dispatch) => {
  dispatch(changeUserPassStart());

  try {
    await axiosPrivate.patch(`${API_URL.users}/${userId}/password`, newPass, {
      timeout: 5000,
    });

    dispatch(changeUserPassSuccess());
  } catch (err) {
    if (!err?.response) {
      dispatch(changeUserPassFailed("Server is busy"));
    } else if (err.response?.status === 400) {
      dispatch(changeUserPassFailed(err.response.data.message));
    } else if (err.response?.status === 401) {
      dispatch(changeUserPassFailed("Unauthorized"));
    } else {
      dispatch(changeUserPassFailed("Error"));
    }
  }
};

const verifyEmailReq = async (cipher, token, dispatch) => {
  dispatch(verifyUserEmailStart());

  try {
    await axios.get(`${API_URL.users}/verify-email/${cipher}/${token}`, {
      timeout: 5000,
    });
    dispatch(verifyUserEmailSuccess());
  } catch (err) {
    if (!err?.response) {
      dispatch(verifyUserEmailFailed("Server is busy"));
    } else if (err.response?.status === 400) {
      dispatch(verifyUserEmailFailed(err.response.data.message));
    } else if (err.response?.status === 404) {
      dispatch(verifyUserEmailFailed(err.response.data.message));
    } else {
      dispatch(verifyUserEmailFailed("Error"));
    }
  }
};

const sendNewVerifyEmailReq = async (payload, dispatch) => {
  dispatch(sendVerifyEmailStart());

  try {
    await axios.post(`${API_URL.users}/verify-email`, payload, {
      timeout: 5000,
    });
    dispatch(sendVerifyEmailSuccess());
  } catch (err) {
    if (!err?.response) {
      dispatch(sendVerifyEmailFailed("Server is busy"));
    } else if (err.response?.status === 400) {
      dispatch(sendVerifyEmailFailed(err.response.data.message));
    } else if (err.response?.status === 404) {
      dispatch(sendVerifyEmailFailed(err.response.data.message));
    } else {
      dispatch(sendVerifyEmailFailed("Error"));
    }
  }
};

export {
  getUserReq,
  updateUserReq,
  changePasswordReq,
  verifyEmailReq,
  sendNewVerifyEmailReq,
};
