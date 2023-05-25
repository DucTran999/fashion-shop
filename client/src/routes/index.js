import { createBrowserRouter } from "react-router-dom";

import { AuthLayout, PrimaryLayout } from "../layouts/index";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import MissingPage from "../pages/MissingPage/MissingPage";
import PersistLogin from "../routes/PersistLogin";

const configRoutes = [
  {
    element: <PersistLogin />,
    children: [
      {
        path: "/",
        element: (
          <PrimaryLayout>
            <Home />
          </PrimaryLayout>
        ),
      },
      {
        path: "*",
        element: (
          <PrimaryLayout>
            <MissingPage />,
          </PrimaryLayout>
        ),
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
];
const router = createBrowserRouter(configRoutes);

export default router;
