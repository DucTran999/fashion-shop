import { createSlice } from "@reduxjs/toolkit";

const productListSlice = createSlice({
  name: "productList",
  initialState: {
    search: {
      isLoading: false,
      result: null,
      errorCause: null,
    },
  },
  reducers: {
    // search product
    searchProductStart: (state) => {
      state.search.isLoading = true;
    },
    searchProductSuccess: (state, action) => {
      state.search.isLoading = false;
      state.search.result = action.payload;
      state.search.errorCause = null;
    },
    searchProductFailed: (state, action) => {
      state.search.isLoading = false;
      state.search.result = null;
      state.search.errorCause = action.payload;
    },

    // reset
    resetSearchResult: (state) => {
      state.search.result = null;
    },
  },
});

export const {
  searchProductStart,
  searchProductFailed,
  searchProductSuccess,
  resetSearchResult,
} = productListSlice.actions;
export default productListSlice.reducer;
