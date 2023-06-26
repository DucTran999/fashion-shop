import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  getAll: {
    isLoading: false,
    userList: null,
    errorCause: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    // fetch list users
    getAllUsersStart: (state) => {
      state.getAll.isLoading = true;
    },
    getAllUsersSuccess: (state, action) => {
      state.getAll.isLoading = false;
      state.getAll.userList = action.payload;
      state.getAll.errorCause = null;
    },
    getAllUsersFailed: (state, action) => {
      state.getAll.isLoading = false;
      state.getAll.userList = null;
      state.getAll.errorCause = action.payload;
    },
  },
});

export const { getAllUsersFailed, getAllUsersSuccess, getAllUsersStart } =
  userSlice.actions;

export default userSlice.reducer;
