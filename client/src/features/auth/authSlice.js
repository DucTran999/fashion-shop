import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      isFetching: false,
      currentUser: null,
      error: false,
      errorCause: null,
    },
    register: {
      isFetching: false,
      success: false,
      error: false,
      errorCause: null,
    },
    logout: {
      isFetching: false,
      error: false,
    },
  },
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

    // Register Reducers
    registerStart: (state) => {
      state.register.isFetching = true;
    },
    registerSuccess: (state) => {
      state.register.isFetching = false;
      state.register.error = false;
      state.register.success = true;
    },
    registerFailed: (state, action) => {
      state.register.isFetching = false;
      state.register.success = false;
      state.register.errorCause = action.payload;
      state.register.error = true;
    },

    // Log out Reducers
    logOutStart: (state) => {
      state.logout.isFetching = true;
    },
    logOutSuccess: (state) => {
      state.logout.isFetching = false;
      state.logout.error = false;
      state.login.currentUser = null;
    },
    logOutFailed: (state, action) => {
      state.register.isFetching = false;
      state.register.error = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  registerStart,
  registerSuccess,
  registerFailed,
  logOutStart,
  logOutSuccess,
  logOutFailed,
} = authSlice.actions;

export default authSlice.reducer;
