import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: {
    isFetching: false,
    currentUser: null,
    errorCause: null,
    error: false,
  },
  logout: {
    isLoading: false,
    error: false,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    // Login Reducers
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
    },
    loginFailed: (state, action) => {
      state.login.isFetching = false;
      state.login.errorCause = action.payload;
      state.login.error = true;
    },

    // Logout reducers
    logOutStart: (state) => {
      state.logout.isLoading = true;
    },
    logOutSuccess: (state) => {
      state.logout.isLoading = false;
      state.login.currentUser = null;
      state.logout.error = false;
    },
    logOutFailed: (state) => {
      state.logout.isLoading = false;
      state.logout.error = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  logOutStart,
  logOutSuccess,
  logOutFailed,
} = authSlice.actions;

export default authSlice.reducer;
