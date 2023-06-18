import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      isFetching: false,
      currentUser: null,
      errorCause: null,
    },
    register: {
      isFetching: false,
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
      state.login.errorCause = null;
    },
    loginFailed: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = null;
      state.login.errorCause = action.payload;
    },
    // when switch form
    resetLoginState: (state) => {
      state.login.isFetching = false;
      state.login.currentUser = null;
      state.login.errorCause = null;
    },

    // Register Reducers
    registerStart: (state) => {
      state.register.isFetching = true;
    },
    registerSuccess: (state) => {
      state.register.isFetching = false;
      state.register.errorCause = null;
    },
    registerFailed: (state, action) => {
      state.register.isFetching = false;
      state.register.errorCause = action.payload;
    },
    // when switch form
    resetRegisterState: (state) => {
      state.register.isFetching = false;
      state.register.errorCause = null;
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
    logOutFailed: (state) => {
      state.logout.isFetching = false;
      state.logout.error = true;
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
  resetLoginState,
  resetRegisterState,
} = authSlice.actions;

export default authSlice.reducer;
