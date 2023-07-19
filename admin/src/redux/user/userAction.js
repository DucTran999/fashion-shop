import {
  getAllUsersFailed,
  getAllUsersStart,
  getAllUsersSuccess,
} from "./userSlice";

import API_URL from "../../api/endpoint";

const getAllUsersReq = async (axiosPrivate, dispatch) => {
  dispatch(getAllUsersStart());

  try {
    const res = await axiosPrivate.get(API_URL.users);

    dispatch(getAllUsersSuccess(res.data.elements));
  } catch (err) {
    if (!err?.response) {
      dispatch(getAllUsersFailed("timeout"));
    } else if (err.response?.status === 400) {
      dispatch(getAllUsersFailed("Bad request"));
    } else if (err.response?.status === 401) {
      dispatch(getAllUsersFailed("Unauthorized"));
    } else {
      dispatch(getAllUsersFailed("Get Orders List Failed!"));
    }
  }
};

export { getAllUsersReq };
