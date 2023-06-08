import { createSlice } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    primary: {
      active: "home",
    },
    sidebar: {
      active: "Public profile",
    },
  },
  reducers: {
    changeOption: (state, action) => {
      state.primary.active = action.payload;
    },
    sidebarChangeOption: (state, action) => {
      state.sidebar.active = action.payload;
    },
  },
});

export const { changeOption, sidebarChangeOption } = navbarSlice.actions;

export default navbarSlice.reducer;
