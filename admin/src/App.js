import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequireAuth from "./routes/RequireAuth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ManageAccounts from "./pages/ManageAccounts";
import Unauthorized from "./pages/Unauthorized";
import PageNotFound from "./pages/PageNotFound";
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
            <Route path="/accounts" element={<ManageAccounts />} />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
