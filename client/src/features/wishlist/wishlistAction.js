import API_URL from "../../api/endpoint";
import { LOCAL_STORAGE_KEY } from "../../utils/constVariable";

import {
  filterProductIds,
  updateWishlistLocal,
  addProductToWishlistLocal,
  removeProductFromWishlistLocal,
} from "./wishlistHelper";

import {
  getUserWishlistStart,
  getUserWishlistSuccess,
  getUserWishlistFailed,
  syncWishlistStart,
  syncWishlistSuccess,
  syncWishlistFailed,
  addProductToWishlistStart,
  addProductToWishlistSuccess,
  addProductToWishlistFailed,
  removeProductFromWishlistStart,
  removeProductFromWishlistSuccess,
  removeProductFromWishlistFailed,
} from "./wishlistSlice";

/**
 * Sync wishlist with DB when user login.
 * @param { number } userId - The userId
 * @param { any } axiosPrivate - An axios instance is used for endpoint protected.
 * @param { any } dispatch - Dispatch function from the Redux store.
 * @returns { Promise<void> }
 */
const syncUserWishlistReq = async (userId, axiosPrivate, dispatch) => {
  dispatch(syncWishlistStart());

  try {
    const res = await axiosPrivate.patch(`${API_URL.wishlist}/${userId}`, {
      wishlist_local: filterProductIds(),
    });

    updateWishlistLocal(res.data.wishlist);
    dispatch(syncWishlistSuccess(res.data.wishlist));
  } catch (err) {
    if (!err?.response) {
      dispatch(syncWishlistFailed("Server is busy"));
    } else if (err.response?.status === 401) {
      dispatch(syncWishlistFailed("Unauthorized"));
    } else if (err.response?.status === 400) {
      dispatch(syncWishlistFailed("Bad Request"));
    } else {
      dispatch(syncWishlistFailed("Error"));
    }
  }
};

/**
 * Add product to local wishlist or sync with DB if the in session.
 * @param { number } userId - The userId
 * @param { any } axiosPrivate - An axios instance is used for endpoint protected.
 * @param { any } dispatch - Dispatch function from the Redux store.
 * @returns { Promise<void> }
 */
const getUserWishlistReq = async (userId, axiosPrivate, dispatch) => {
  const isLogged = localStorage.getItem(LOCAL_STORAGE_KEY.isLogged);
  dispatch(getUserWishlistStart());

  try {
    if (isLogged && userId) {
      // Fetch wishlist
      const res = await axiosPrivate.get(`${API_URL.wishlist}/${userId}`);

      // Sync wishlist in DB to local
      updateWishlistLocal(res.data.wishlist);
      dispatch(getUserWishlistSuccess(res.data.wishlist));
    }
  } catch (err) {
    if (!err?.response) {
      dispatch(getUserWishlistFailed("Server is busy"));
    } else if (err.response?.status === 401) {
      dispatch(getUserWishlistFailed("Unauthorized"));
    } else if (err.response?.status === 400) {
      dispatch(getUserWishlistFailed("Bad Request"));
    } else {
      dispatch(getUserWishlistFailed("Error"));
    }
  }
};

/**
 * Add product to local wishlist or sync with DB if the in session.
 * @param { number } userId - The userId
 * @param { array<variation>} product - The array holds product's variations.
 * @param { any } axiosPrivate - An axios instance is used for endpoint protected.
 * @param { any } dispatch - Dispatch function from the Redux store.
 * @returns { Promise<void> }
 */
const addProductToWishlistReq = async (
  userId,
  product,
  axiosPrivate,
  dispatch
) => {
  dispatch(addProductToWishlistStart());
  const productId = product[0].product_id;
  const isLogged = localStorage.getItem(LOCAL_STORAGE_KEY.isLogged);

  try {
    if (isLogged && userId) {
      // Fetch wishlist
      const res = await axiosPrivate.post(`${API_URL.wishlist}/${userId}`, {
        product_id: productId,
      });

      // Sync wishlist in DB to local
      updateWishlistLocal(res.data.wishlist);
      dispatch(addProductToWishlistSuccess(res.data.wishlist));
    } else {
      // Update local
      const wishlist = addProductToWishlistLocal(productId, product);
      dispatch(addProductToWishlistSuccess(wishlist));
    }
  } catch (err) {
    if (!err?.response) {
      dispatch(addProductToWishlistFailed("Server is busy"));
    } else if (err.response?.status === 401) {
      dispatch(addProductToWishlistFailed("Unauthorized"));
    } else if (err.response?.status === 400) {
      dispatch(getUserWishlistFailed("Bad Request"));
    } else {
      dispatch(addProductToWishlistFailed("Error"));
    }
  }
};

/**
 * Remove product from local wishlist or sync with DB if the in session.
 * @param { number } userId - The userId
 * @param { array<variation>} product - The array holds product's variations.
 * @param { any } axiosPrivate - An axios instance is used for endpoint protected.
 * @param { any } dispatch - Dispatch function from the Redux store.
 * @returns { Promise<void> }
 */
const removeProductFromWishlistReq = async (
  userId,
  product,
  axiosPrivate,
  dispatch
) => {
  dispatch(removeProductFromWishlistStart());
  const productId = product[0].product_id;
  const isLogged = localStorage.getItem(LOCAL_STORAGE_KEY.isLogged);

  try {
    // If the user logged sync the wishlist with DB otherwise stored in local
    if (isLogged && userId) {
      // Fetch wishlist
      const endpoint = `${API_URL.wishlist}/${userId}/${productId}`;
      const res = await axiosPrivate.delete(endpoint);

      // Sync wishlist in DB to local
      updateWishlistLocal(res.data.wishlist);
      dispatch(removeProductFromWishlistSuccess(res.data.wishlist));
    } else {
      const wishlist = removeProductFromWishlistLocal(productId);
      dispatch(removeProductFromWishlistSuccess(wishlist));
    }
  } catch (err) {
    if (!err?.response) {
      dispatch(removeProductFromWishlistFailed("Server is busy"));
    } else if (err.response?.status === 401) {
      dispatch(removeProductFromWishlistFailed("Unauthorized"));
    } else if (err.response?.status === 400) {
      dispatch(removeProductFromWishlistFailed("Bad Request"));
    } else {
      dispatch(removeProductFromWishlistFailed("Error"));
    }
  }
};

export {
  getUserWishlistReq,
  syncUserWishlistReq,
  addProductToWishlistReq,
  removeProductFromWishlistReq,
};
