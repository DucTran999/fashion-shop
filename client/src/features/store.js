import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ["payload.headers"],
      },
    }),
});
