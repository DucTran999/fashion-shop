import API_URL from "../../api/init.url";
import {
  placeOrderStart,
  placeOrderSuccess,
  placeOrderFailed,
  getOrderListStart,
  getOrderListSuccess,
  getOrderListFailed,
  cancelOrderStart,
  cancelOrderSuccess,
  cancelOrderFailed,
} from "./orderSlice";

const placeOrderReq = async (payload, axiosPrivate, dispatch) => {
  dispatch(placeOrderStart());
  try {
    await axiosPrivate.post(`${API_URL.orders}`, payload, {
      timeout: 3000,
    });

    await dispatch(placeOrderSuccess());
  } catch (err) {
    if (!err?.response) {
      dispatch(placeOrderFailed("Server is busy"));
    } else if (err.response?.status === 400) {
      dispatch(placeOrderFailed("Order failed"));
    } else if (err.response?.status === 401) {
      dispatch(placeOrderFailed("Unauthorized"));
    } else if (err.response?.status === 404) {
      dispatch(placeOrderFailed("Not found"));
    } else {
      dispatch(placeOrderFailed("Order failed!"));
    }
  }
};

const getOrderListReq = async (userId, payload, axiosPrivate, dispatch) => {
  dispatch(getOrderListStart());
  try {
    const res = await axiosPrivate.get(
      `${API_URL.orders}/${userId}`,
      { params: payload },
      {
        timeout: 3000,
      }
    );

    await dispatch(getOrderListSuccess(res.data.elements));
  } catch (err) {
    if (!err?.response) {
      dispatch(getOrderListFailed("Server is busy"));
    } else if (err.response?.status === 401) {
      dispatch(getOrderListFailed("Unauthorized"));
    } else if (err.response?.status === 404) {
      dispatch(getOrderListFailed("Not found"));
    } else {
      dispatch(getOrderListFailed("Get orders list failed!"));
    }
  }
};

const cancelOrderReq = async (userId, payload, axiosPrivate, dispatch) => {
  dispatch(cancelOrderStart());
  try {
    await axiosPrivate.delete(
      `${API_URL.orders}/${userId}`,
      { params: payload },
      {
        timeout: 3000,
      }
    );

    await dispatch(cancelOrderSuccess());
  } catch (err) {
    if (!err?.response) {
      dispatch(cancelOrderFailed("Server is busy"));
    } else if (err.response?.status === 401) {
      dispatch(cancelOrderFailed("Unauthorized"));
    } else if (err.response?.status === 404) {
      dispatch(cancelOrderFailed("Not found"));
    } else {
      dispatch(cancelOrderFailed("Cancel order failed!"));
    }
  }
};

export { placeOrderReq, getOrderListReq, cancelOrderReq };
