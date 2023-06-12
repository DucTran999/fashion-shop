import {
  getCartStart,
  getCartSuccess,
  getCartFailed,
  addProductToCartFailed,
  addProductToCartSuccess,
  addProductToCartStart,
  deleteProductFormCartFailed,
  deleteProductFormCartSuccess,
  deleteProductFormCartStart,
} from "./cartSlice";

import API_URL from "../../api/init.url";

const getCartReq = async (cart_id, axiosPrivate, dispatch) => {
  dispatch(getCartStart());
  try {
    const res = await axiosPrivate.get(`${API_URL.carts}/full-info/${cart_id}`);
    dispatch(getCartSuccess(res.data.elements));
  } catch (error) {
    dispatch(getCartFailed());
  }
};

const addProductToCartReq = async (
  cart_id,
  payload,
  axiosPrivate,
  dispatch
) => {
  dispatch(addProductToCartStart());
  try {
    await axiosPrivate.patch(`${API_URL.carts}/${cart_id}`, payload);
    dispatch(addProductToCartSuccess());
  } catch (error) {
    if (!error?.response) {
      dispatch(addProductToCartFailed("Connection Error"));
    } else if (error?.response?.status === 409) {
      dispatch(addProductToCartFailed(error.response.data.message));
    } else {
      dispatch(addProductToCartFailed("Something went wrong"));
    }
  }
};

const changeProductQtyReq = async (
  cart_id,
  payload,
  axiosPrivate,
  dispatch
) => {
  dispatch(addProductToCartStart());
  try {
    await axiosPrivate.patch(`${API_URL.carts}/direct-qty/${cart_id}`, payload);
    dispatch(addProductToCartSuccess());
  } catch (error) {
    if (!error?.response) {
      dispatch(addProductToCartFailed("Connection Error"));
    } else if (error?.response?.status === 409) {
      dispatch(addProductToCartFailed(error.response.data.message));
    } else {
      dispatch(addProductToCartFailed("Something went wrong"));
    }
  }
};

const deleteProductFromCartReq = async (
  cart_id,
  payload,
  axiosPrivate,
  dispatch
) => {
  dispatch(deleteProductFormCartStart());
  try {
    await axiosPrivate.delete(`${API_URL.carts}/one-product/${cart_id}`, {
      data: payload,
    });
    dispatch(deleteProductFormCartSuccess());
  } catch (error) {
    dispatch(deleteProductFormCartFailed());
  }
};

export {
  getCartReq,
  addProductToCartReq,
  deleteProductFromCartReq,
  changeProductQtyReq,
};
