import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    get: {
      isLoading: false,
      info: null,
      errorCause: null,
      error: false,
    },
    update: {
      isLoading: false,
      success: false,
      errorCause: null,
    },
    changePass: {
      isLoading: false,
      success: false,
      errorCause: null,
    },
  },
  reducers: {
    // fetch user data.
    getUserStart: (state) => {
      state.get.isLoading = true;
    },
    getUserSuccess: (state, action) => {
      state.get.isLoading = false;
      state.get.info = action.payload;
      state.get.error = false;
    },
    getUserFailed: (state, action) => {
      state.get.isLoading = false;
      state.get.error = true;
      state.get.info = null;
      state.get.errorCause = action.payload;
    },

    // update user
    updateUserStart: (state) => {
      state.update.isLoading = true;
    },
    updateUserSuccess: (state) => {
      state.update.isLoading = false;
      state.update.success = true;
      state.update.errorCause = null;
    },
    updateUserFailed: (state, action) => {
      state.update.isLoading = false;
      state.update.success = false;
      state.update.errorCause = action.payload;
    },
    resetUpdateState: (state) => {
      state.update.isLoading = false;
      state.update.success = false;
      state.update.errorCause = null;
    },

    //change password
    changeUserPassStart: (state) => {
      state.changePass.isLoading = true;
    },
    changeUserPassSuccess: (state) => {
      state.changePass.isLoading = false;
      state.changePass.success = true;
      state.changePass.errorCause = null;
    },
    changeUserPassFailed: (state, action) => {
      state.changePass.isLoading = false;
      state.changePass.success = false;
      state.changePass.errorCause = action.payload;
    },
    resetUserChangePassState: (state) => {
      state.changePass.isLoading = false;
      state.changePass.success = false;
      state.changePass.errorCause = null;
    },
  },
});

export const {
  getUserStart,
  getUserSuccess,
  getUserFailed,
  updateUserStart,
  updateUserSuccess,
  updateUserFailed,
  resetUpdateState,
  changeUserPassStart,
  changeUserPassSuccess,
  changeUserPassFailed,
  resetUserChangePassState,
} = userSlice.actions;

export default userSlice.reducer;
