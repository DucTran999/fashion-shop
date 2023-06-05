import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthLayout, PrimaryLayout } from "./layouts";
import { Login, Register, Home, Category, Product, MissingPage } from "./pages";
import PersistLogin from "./routes/PersistLogin";

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
          {/* <Route element={<RequireAuth />}>
          </Route> */}
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

            {/* Page not found 404 */}
            <Route path="*" element={<MissingPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
