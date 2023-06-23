import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: "all",
  hasUnread: false,
  get: {
    isFetching: false,
    notifications: null,
    errorCause: null,
  },
  changeMark: {
    isLoading: false,
    errorCause: null,
  },
  delete: {
    isLoading: false,
    errorCause: null,
  },
};

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    // set filter
    setNotificationFilter: (state, action) => {
      state.filter = action.payload;
    },

    // reset notifications state
    resetNotificationList: (state) => {
      state.get.isFetching = false;
      state.get.notifications = null;
      state.get.errorCause = null;
      state.hasUnread = false;
    },

    // fetch orderNotify
    getNotificationStart: (state) => {
      state.get.isFetching = true;
    },
    getNotificationSuccess: (state, action) => {
      state.get.isFetching = false;
      state.get.notifications = action.payload;
      state.get.errorCause = null;
      state.hasUnread = action.payload.hasUnread;
    },
    getNotificationFailed: (state, action) => {
      state.get.isFetching = false;
      state.get.notifications = null;
      state.get.errorCause = action.payload;
    },

    // change mark to read or unread
    changeNotificationMarkStart: (state) => {
      state.changeMark.isLoading = true;
    },
    changeNotificationMarkSuccess: (state) => {
      state.changeMark.isLoading = false;
      state.changeMark.errorCause = null;
    },
    changeNotificationMarkFailed: (state, action) => {
      state.changeMark.isLoading = false;
      state.changeMark.errorCause = action.payload;
    },

    // delete notification
    deleteNotificationStart: (state) => {
      state.delete.isLoading = true;
    },
    deleteNotificationSuccess: (state) => {
      state.delete.isLoading = false;
      state.delete.errorCause = null;
    },
    deleteNotificationFailed: (state, action) => {
      state.delete.isLoading = false;
      state.delete.errorCause = action.payload;
    },
  },
});

export const {
  setNotificationFilter,
  resetNotificationList,
  getNotificationStart,
  getNotificationSuccess,
  getNotificationFailed,
  changeNotificationMarkFailed,
  changeNotificationMarkSuccess,
  changeNotificationMarkStart,
  deleteNotificationStart,
  deleteNotificationSuccess,
  deleteNotificationFailed,
} = notificationSlice.actions;

export default notificationSlice.reducer;
