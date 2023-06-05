import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    variants: {
      isFetching: false,
      allVariants: null,
      selected: null,
      error: false,
    },
  },
  reducers: {
    fetchProductStart: (state) => {
      state.variants.isFetching = true;
    },
    fetchProductSuccess: (state, action) => {
      state.variants.isFetching = false;
      state.variants.allVariants = action.payload.variants;
      state.variants.selected = action.payload.selection;
      state.variants.error = false;
    },
    fetchProductFailed: (state) => {
      state.variants.isFetching = false;
      state.variants.error = true;
    },

    changeVariant: (state, action) => {
      state.variants.selected = action.payload;
    },
  },
});

export const {
  fetchProductStart,
  fetchProductSuccess,
  fetchProductFailed,
  changeVariant,
} = productSlice.actions;
export default productSlice.reducer;
