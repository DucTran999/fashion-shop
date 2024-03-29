import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import orderReducer from "./order/orderSlice";
import userReducer from "./user/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    order: orderReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ["payload.headers"],
      },
    }),
  devTools: process.env.NODE_ENV === "production" ? false : true,
});

export default store;
