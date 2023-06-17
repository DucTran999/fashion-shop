import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequireAuth from "./routes/RequireAuth";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Products from "./pages/Products/Products";
import ManageAccounts from "./pages/Account/ManageAccounts";
import Unauthorized from "./pages/Unauthorized";
import PageNotFound from "./pages/PageNotFound";
import Categories from "./pages/Categories/Categories";
import ManageOrders from "./pages/Orders";

import PersistLogin from "./routes/PersistLogin";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected route */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/accounts" element={<ManageAccounts />} />
            <Route path="/orders" element={<ManageOrders />} />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
