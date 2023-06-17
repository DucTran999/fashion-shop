import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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
} from "./pages";
import PersistLogin from "./routes/PersistLogin";
import RequireAuth from "./routes/RequireAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
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
              <Route path="/account/:slug" element={<Account />} />
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
