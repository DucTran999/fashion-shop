import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import socket from "./utils/init.socket";
import useRefreshToken from "./hooks/useRefreshToken";
import LOCAL_STORAGE_KEY from "./api/init.localStorage";

import { AuthLayout, PrimaryLayout } from "./layouts";
import {
  Login,
  Register,
  Home,
  Category,
  Product,
  Account,
  Cart,
  Checkout,
  MissingPage,
  Purchase,
  Notification,
  VerificationEmail,
} from "./pages";
import PersistLogin from "./routes/PersistLogin";
import RequireAuth from "./routes/RequireAuth";

function App() {
  const refresh = useRefreshToken();

  useEffect(() => {
    const onConnect = () => {
      /* If a user is in session and the server is down unexpectedly.
      Try to refresh the token to keep the user login when the server restarts.
      */
      const isLogged = localStorage.getItem(LOCAL_STORAGE_KEY.isLogged);
      if (isLogged === "true") refresh();

      console.log("Socket Connected to Server!");
    };

    const onDisconnect = (reason) => {
      console.log("disconnect because", reason);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };

    // eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route
          path="/auth/verify-email/:cipher/:token"
          element={<VerificationEmail />}
        />

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Persist login */}
        <Route element={<PersistLogin />}>
          <Route path="/" element={<PrimaryLayout />}>
            <Route index element={<Home />} />

            {/* Category path */}
            <Route path="/category/:slug" element={<Category />} />
            <Route
              path="/category"
              element={<Navigate to="/category/all-products" replace={true} />}
            />

            {/* product path */}
            <Route path="/product/:slug" element={<Product />} />
            <Route
              path="/product"
              element={<Navigate to="/category/all-products" replace={true} />}
            />

            {/* Protected route */}
            <Route element={<RequireAuth />}>
              {/* Account path */}
              <Route path="/account/profile" element={<Account />} />
              <Route
                path="/account"
                element={<Navigate to="/account/profile" replace={true} />}
              />

              {/* Cart path */}
              <Route path="/cart" element={<Cart />} />

              {/* Checkout path */}
              <Route path="/checkout" element={<Checkout />} />

              {/* purchase path */}
              <Route path="/account/purchases" element={<Purchase />} />

              {/* notification */}
              <Route path="/account/notifications" element={<Notification />} />

              <Route path="/account/:slug" element={<Account />} />
            </Route>

            {/* Page not found 404 */}
            <Route path="*" element={<MissingPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
