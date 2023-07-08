import { encryptAES } from "../../utils/helper.crypto";
import API_URL from "../../api/init.url";
import axios from "../../api/init.axios";

import {
  verifyUserEmailStart,
  verifyUserEmailSuccess,
  verifyUserEmailFailed,
  sendVerifyEmailStart,
  sendVerifyEmailSuccess,
  sendVerifyEmailFailed,
} from "./emailSlice";

const verifyEmailReq = async (cipher, token, dispatch) => {
  dispatch(verifyUserEmailStart());

  try {
    await axios.get(`${API_URL.emails}/verify/${cipher}/${token}`, {
      timeout: 3000,
    });
    dispatch(verifyUserEmailSuccess());
  } catch (err) {
    if (!err?.response) {
      dispatch(verifyUserEmailFailed("Server is busy"));
    } else if (err.response?.status === 400) {
      dispatch(verifyUserEmailFailed(err.response.data.message));
    } else if (err.response?.status === 404) {
      dispatch(verifyUserEmailFailed(err.response.data.message));
    } else if (err.response?.status === 406) {
      dispatch(verifyUserEmailFailed(err.response.data.message));
    } else {
      dispatch(verifyUserEmailFailed("Error"));
    }
  }
};

const sendNewVerifyEmailReq = async (payload, dispatch) => {
  dispatch(sendVerifyEmailStart());

  const apiSendMailKey = encryptAES(process.env.REACT_APP_API_MAIL_KEY);

  let newPayload = { api_mail_key: apiSendMailKey, ...payload };

  try {
    await axios.post(`${API_URL.emails}/resend`, newPayload, {
      timeout: 3000,
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

export { verifyEmailReq, sendNewVerifyEmailReq };
