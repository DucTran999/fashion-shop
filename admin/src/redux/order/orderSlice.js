import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: "1",
  getAll: {
    isLoading: false,
    orderList: null,
    errorCause: null,
  },
  confirmOrder: {
    isLoading: false,
    success: false,
    errorCause: null,
  },
  updateState: {
    isLoading: false,
    success: false,
    errorCause: null,
  },
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },

    // fetch all order
    getAllOrdersStart: (state) => {
      state.getAll.isLoading = true;
    },
    getAllOrdersSuccess: (state, action) => {
      state.getAll.isLoading = false;
      state.getAll.orderList = action.payload;
      state.getAll.errorCause = null;
    },
    getAllOrdersFailed: (state, action) => {
      state.getAll.isLoading = false;
      state.getAll.orderList = null;
      state.getAll.errorCause = action.payload;
    },
    resetOrdersList: (state) => {
      state.getAll.isLoading = false;
      state.getAll.orderList = null;
      state.getAll.errorCause = null;
    },

    // confirm an order
    confirmOrdersStart: (state) => {
      state.confirmOrder.isLoading = true;
    },
    confirmOrdersSuccess: (state) => {
      state.confirmOrder.isLoading = false;
      state.confirmOrder.success = true;
      state.confirmOrder.errorCause = null;
    },
    confirmOrdersFailed: (state, action) => {
      state.confirmOrder.isLoading = false;
      state.confirmOrder.success = false;
      state.confirmOrder.errorCause = action.payload;
    },

    // reject and completed order
    updateOrderStateStart: (state) => {
      state.updateState.isLoading = true;
    },
    updateOrderStateSuccess: (state) => {
      state.updateState.isLoading = false;
      state.updateState.success = true;
      state.updateState.errorCause = null;
    },
    updateOrderStateFailed: (state, action) => {
      state.updateState.isLoading = false;
      state.updateState.success = false;
      state.updateState.errorCause = action.payload;
    },
  },
});

export const {
  setFilter,
  getAllOrdersFailed,
  getAllOrdersSuccess,
  getAllOrdersStart,
  resetOrdersList,
  confirmOrdersStart,
  confirmOrdersSuccess,
  confirmOrdersFailed,
  updateOrderStateFailed,
  updateOrderStateSuccess,
  updateOrderStateStart,
} = orderSlice.actions;

export default orderSlice.reducer;
