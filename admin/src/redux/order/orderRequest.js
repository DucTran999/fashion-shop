import {
  getAllOrdersStart,
  getAllOrdersSuccess,
  getAllOrdersFailed,
  confirmOrdersFailed,
  confirmOrdersSuccess,
  confirmOrdersStart,
  updateOrderStateFailed,
  updateOrderStateSuccess,
  updateOrderStateStart,
} from "./orderSlice";

import API_URL from "../../api/url.init";

const getAllOrdersReq = async (stateId, axiosPrivate, dispatch) => {
  dispatch(getAllOrdersStart());

  try {
    const res = await axiosPrivate.get(API_URL.orders, {
      params: { state_id: stateId },
    });
    dispatch(getAllOrdersSuccess(res.data.elements));
  } catch (err) {
    if (!err?.response) {
      dispatch(getAllOrdersFailed("timeout"));
    } else if (err.response?.status === 400) {
      dispatch(getAllOrdersFailed("Bad request"));
    } else if (err.response?.status === 401) {
      dispatch(getAllOrdersFailed("Unauthorized"));
    } else {
      dispatch(getAllOrdersFailed("Get Orders List Failed!"));
    }
  }
};

const confirmOrdersReq = async (orderId, payload, axiosPrivate, dispatch) => {
  dispatch(confirmOrdersStart());

  try {
    await axiosPrivate.patch(`${API_URL.orders}/${orderId}/to-ship`, payload);
    dispatch(confirmOrdersSuccess());
  } catch (err) {
    if (!err?.response) {
      dispatch(confirmOrdersFailed("timeout"));
    } else if (err.response?.status === 400) {
      dispatch(confirmOrdersFailed("Bad request"));
    } else if (err.response?.status === 401) {
      dispatch(confirmOrdersFailed("Unauthorized"));
    } else {
      dispatch(confirmOrdersFailed("Set Shipping Failed!"));
    }
  }
};

const cancelOrderShippingFailedReq = async (
  orderId,
  payload,
  axiosPrivate,
  dispatch
) => {
  dispatch(updateOrderStateStart());

  try {
    await axiosPrivate.patch(
      `${API_URL.orders}/${orderId}/shipping-failed`,
      payload
    );
    dispatch(updateOrderStateSuccess());
  } catch (err) {
    if (!err?.response) {
      dispatch(updateOrderStateFailed("timeout"));
    } else if (err.response?.status === 400) {
      dispatch(updateOrderStateFailed("Bad request"));
    } else if (err.response?.status === 401) {
      dispatch(updateOrderStateFailed("Unauthorized"));
    } else {
      dispatch(updateOrderStateFailed("Cancel Order Failed!"));
    }
  }
};

const updateOrderStateReq = async (
  orderId,
  payload,
  axiosPrivate,
  dispatch
) => {
  dispatch(updateOrderStateStart());

  try {
    await axiosPrivate.patch(`${API_URL.orders}/${orderId}`, payload);
    dispatch(updateOrderStateSuccess());
  } catch (err) {
    if (!err?.response) {
      dispatch(updateOrderStateFailed("timeout"));
    } else if (err.response?.status === 400) {
      dispatch(updateOrderStateFailed("Bad request"));
    } else if (err.response?.status === 401) {
      dispatch(updateOrderStateFailed("Unauthorized"));
    } else {
      dispatch(updateOrderStateFailed("Update State Failed!"));
    }
  }
};

export {
  getAllOrdersReq,
  confirmOrdersReq,
  updateOrderStateReq,
  cancelOrderShippingFailedReq,
};
