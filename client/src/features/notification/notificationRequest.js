import API_URL from "../../api/init.url";
import {
  getNotificationStart,
  getNotificationSuccess,
  getNotificationFailed,
  changeNotificationMarkStart,
  changeNotificationMarkSuccess,
  changeNotificationMarkFailed,
  deleteNotificationStart,
  deleteNotificationSuccess,
  deleteNotificationFailed,
} from "./notificationSlice";

const getNotificationsReq = async (userId, axiosPrivate, dispatch) => {
  dispatch(getNotificationStart());
  try {
    const res = await axiosPrivate.get(`${API_URL.notifications}/${userId}`);

    await dispatch(getNotificationSuccess(res.data.elements));
  } catch (err) {
    if (!err?.response) {
      dispatch(getNotificationFailed("Server is busy"));
    } else if (err.response?.status === 401) {
      dispatch(getNotificationFailed("Unauthorized"));
    } else if (err.response?.status === 404) {
      dispatch(getNotificationFailed("Not found"));
    } else {
      dispatch(getNotificationFailed("Cannot get notifications!"));
    }
  }
};

const changeNotificationMarkReq = async (
  userId,
  payload,
  notificationId,
  axiosPrivate,
  dispatch
) => {
  dispatch(changeNotificationMarkStart());
  try {
    await axiosPrivate.patch(`${API_URL.notifications}/${userId}`, payload, {
      params: { notification_id: notificationId },
    });

    await dispatch(changeNotificationMarkSuccess());
  } catch (err) {
    if (!err?.response) {
      dispatch(changeNotificationMarkFailed("Server is busy"));
    } else if (err.response?.status === 401) {
      dispatch(changeNotificationMarkFailed("Unauthorized"));
    } else if (err.response?.status === 404) {
      dispatch(changeNotificationMarkFailed("Not found"));
    } else {
      dispatch(changeNotificationMarkFailed("Cannot change mark!"));
    }
  }
};

const deleteNotificationReq = async (
  userId,
  notificationId,
  axiosPrivate,
  dispatch
) => {
  dispatch(deleteNotificationStart());
  try {
    await axiosPrivate.delete(
      `${API_URL.notifications}/${userId}/${notificationId}`
    );

    await dispatch(deleteNotificationSuccess());
  } catch (err) {
    if (!err?.response) {
      dispatch(deleteNotificationFailed("Server is busy"));
    } else if (err.response?.status === 401) {
      dispatch(deleteNotificationFailed("Unauthorized"));
    } else if (err.response?.status === 404) {
      dispatch(deleteNotificationFailed("Not found"));
    } else {
      dispatch(deleteNotificationFailed("Delete failed!"));
    }
  }
};

export {
  getNotificationsReq,
  changeNotificationMarkReq,
  deleteNotificationReq,
};
