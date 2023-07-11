import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    get: {
      isLoading: false,
      info: null,
      errorCause: null,
    },
    update: {
      isLoading: false,
      success: false,
      errorCause: null,
    },
    delete: {
      isLoading: false,
      success: false,
      errorCause: null,
    },
  },
  reducers: {
    // reset cart
    resetCart: (state) => {
      state.get.info = null;
    },

    // fetch user data.
    getCartStart: (state) => {
      state.get.isLoading = true;
    },
    getCartSuccess: (state, action) => {
      state.get.isLoading = false;
      state.get.info = action.payload;
      state.get.errorCause = null;
    },
    getCartFailed: (state, action) => {
      state.get.isLoading = false;
      state.get.info = null;
      state.get.errorCause = action.payload;
    },

    // add product
    addProductToCartStart: (state) => {
      state.update.isLoading = true;
    },
    addProductToCartSuccess: (state) => {
      state.update.isLoading = false;
      state.update.success = true;
      state.update.errorCause = null;
    },
    addProductToCartFailed: (state, action) => {
      state.update.isLoading = false;
      state.update.success = false;
      state.update.errorCause = action.payload;
    },

    // Delete one product
    deleteProductFormCartStart: (state) => {
      state.delete.isLoading = true;
    },
    deleteProductFormCartSuccess: (state) => {
      state.delete.isLoading = false;
      state.delete.success = true;
      state.delete.errorCause = null;
    },
    deleteProductFormCartFailed: (state, action) => {
      state.delete.isLoading = false;
      state.delete.success = false;
      state.delete.errorCause = action.payload;
    },
  },
});

export const {
  resetCart,
  getCartStart,
  getCartFailed,
  getCartSuccess,
  addProductToCartFailed,
  addProductToCartSuccess,
  addProductToCartStart,
  deleteProductFormCartFailed,
  deleteProductFormCartSuccess,
  deleteProductFormCartStart,
} = cartSlice.actions;

export default cartSlice.reducer;
