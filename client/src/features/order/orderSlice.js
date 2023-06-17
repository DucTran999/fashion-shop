import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    getAll: {
      isLoading: false,
      info: null,
      errorCause: null,
    },
    place: {
      isLoading: false,
      success: false,
      errorCause: null,
    },
    cancel: {
      isLoading: false,
      success: false,
      errorCause: null,
    },
    refresh: {
      needRefresh: false,
    },
  },
  reducers: {
    // place new order
    placeOrderStart: (state) => {
      state.place.isLoading = true;
    },
    placeOrderSuccess: (state) => {
      state.place.isLoading = false;
      state.place.success = true;
      state.place.errorCause = null;
    },
    placeOrderFailed: (state, action) => {
      state.place.isLoading = false;
      state.place.success = false;
      state.place.errorCause = action.payload;
    },
    resetPlaceOrderState: (state) => {
      state.place.isLoading = false;
      state.place.success = false;
      state.place.errorCause = null;
    },

    getOrderListStart: (state) => {
      state.getAll.isLoading = true;
    },
    getOrderListSuccess: (state, action) => {
      state.getAll.isLoading = false;
      state.getAll.info = action.payload;
      state.getAll.errorCause = null;
    },
    getOrderListFailed: (state, action) => {
      state.getAll.isLoading = false;
      state.getAll.info = null;
      state.getAll.errorCause = action.payload;
    },
    resetGetOrderListState: (state) => {
      state.getAll.isLoading = false;
      state.getAll.info = null;
      state.getAll.errorCause = null;
    },

    cancelOrderStart: (state) => {
      state.cancel.isLoading = true;
    },
    cancelOrderSuccess: (state) => {
      state.cancel.isLoading = false;
      state.cancel.success = true;
      state.cancel.errorCause = null;
    },
    cancelOrderFailed: (state, action) => {
      state.cancel.isLoading = false;
      state.cancel.success = false;
      state.cancel.errorCause = action.payload;
    },

    setRefreshTrue: (state) => {
      state.refresh.needRefresh = true;
    },
    setRefreshFail: (state) => {
      state.refresh.needRefresh = false;
    },
  },
});

export const {
  placeOrderFailed,
  placeOrderSuccess,
  placeOrderStart,
  resetPlaceOrderState,
  getOrderListStart,
  getOrderListFailed,
  getOrderListSuccess,
  resetGetOrderListState,
  cancelOrderStart,
  cancelOrderSuccess,
  cancelOrderFailed,
  setRefreshFail,
  setRefreshTrue,
} = orderSlice.actions;

export default orderSlice.reducer;
