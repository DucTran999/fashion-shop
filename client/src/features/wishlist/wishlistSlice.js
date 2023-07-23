import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: {},
    get: {
      isLoading: false,
      errorCause: null,
    },
    sync: {
      isLoading: false,
      errorCause: null,
    },
    add: {
      isLoading: false,
      errorCause: null,
    },
    remove: {
      isLoading: false,
      errorCause: null,
    },
  },
  reducers: {
    // fetch user wishlist
    getUserWishlistStart: (state) => {
      state.get.isLoading = true;
    },
    getUserWishlistSuccess: (state, action) => {
      state.get.isLoading = false;
      state.wishlist = action.payload;
      state.get.errorCause = null;
    },
    getUserWishlistFailed: (state, action) => {
      state.get.isLoading = false;
      state.get.errorCause = action.payload;
    },

    // sync wishlist.
    syncWishlistStart: (state) => {
      state.sync.isLoading = true;
    },
    syncWishlistSuccess: (state, action) => {
      state.sync.isLoading = false;
      state.wishlist = action.payload;
      state.sync.errorCause = null;
    },
    syncWishlistFailed: (state, action) => {
      state.sync.isLoading = false;
      state.sync.errorCause = action.payload;
    },

    // add product to wishlist.
    addProductToWishlistStart: (state) => {
      state.add.isLoading = true;
    },
    addProductToWishlistSuccess: (state, action) => {
      state.add.isLoading = false;
      state.wishlist = action.payload;
      state.add.errorCause = null;
    },
    addProductToWishlistFailed: (state, action) => {
      state.add.isLoading = false;
      state.add.errorCause = action.payload;
    },

    // remove product from wishlist.
    removeProductFromWishlistStart: (state) => {
      state.remove.isLoading = true;
    },
    removeProductFromWishlistSuccess: (state, action) => {
      state.remove.isLoading = false;
      state.wishlist = action.payload;
      state.remove.errorCause = null;
    },
    removeProductFromWishlistFailed: (state, action) => {
      state.remove.isLoading = false;
      state.remove.errorCause = action.payload;
    },
  },
});

export const {
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
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
