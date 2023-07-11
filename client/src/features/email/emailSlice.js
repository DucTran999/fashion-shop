import { createSlice } from "@reduxjs/toolkit";

const emailSlice = createSlice({
  name: "email",
  initialState: {
    verifyEmail: {
      isVerifying: false,
      errorCause: null,
    },
    sendVerifyEmail: {
      isSending: false,
      errorCause: null,
    },
  },
  reducers: {
    // verify email
    verifyUserEmailStart: (state) => {
      state.verifyEmail.isVerifying = true;
    },
    verifyUserEmailSuccess: (state) => {
      state.verifyEmail.isVerifying = false;
      state.verifyEmail.errorCause = null;
    },
    verifyUserEmailFailed: (state, action) => {
      state.verifyEmail.isVerifying = false;
      state.verifyEmail.errorCause = action.payload;
    },

    // send Verify Email
    sendVerifyEmailStart: (state) => {
      state.sendVerifyEmail.isSending = true;
    },
    sendVerifyEmailSuccess: (state) => {
      state.sendVerifyEmail.isSending = false;
      state.sendVerifyEmail.errorCause = null;
    },
    sendVerifyEmailFailed: (state, action) => {
      state.sendVerifyEmail.isSending = false;
      state.sendVerifyEmail.errorCause = action.payload;
    },
  },
});

export const {
  verifyUserEmailStart,
  verifyUserEmailSuccess,
  verifyUserEmailFailed,
  sendVerifyEmailStart,
  sendVerifyEmailSuccess,
  sendVerifyEmailFailed,
} = emailSlice.actions;

export default emailSlice.reducer;
