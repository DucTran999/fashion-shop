import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import productReducer from "./getProduct/productSlice";
import navbarReducer from "./activeNav/navSlice";
import userReducer from "./user/userSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    navbar: navbarReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ["payload.headers"],
      },
    }),
});
