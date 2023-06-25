import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import productReducer from "./getProduct/productSlice";
import navbarReducer from "./activeNav/navSlice";
import userReducer from "./user/userSlice";
import cartReducer from "./cart/cartSlice";
import orderReducer from "./order/orderSlice";
import notificationReducer from "./notification/notificationSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    navbar: navbarReducer,
    user: userReducer,
    cart: cartReducer,
    order: orderReducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ["payload.headers"],
      },
    }),
  devTools: process.env.NODE_ENV === "production" ? false : true,
});
