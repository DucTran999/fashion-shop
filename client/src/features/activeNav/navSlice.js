import { createSlice } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    primary: {
      active: "home",
    },
  },
  reducers: {
    changeOption: (state, action) => {
      state.primary.active = action.payload;
    },
  },
});

export const { changeOption } = navbarSlice.actions;

export default navbarSlice.reducer;
