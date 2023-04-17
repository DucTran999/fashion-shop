import { PrimaryLayout, LoginLayout } from "../layouts/";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Category from "../pages/Category";

// Pages can access without authentication.
const publicRoutes = [
  { path: "/", component: Home, layout: PrimaryLayout },
  { path: "/login", component: Login, layout: LoginLayout },
  { path: "/Category", component: Category, layout: PrimaryLayout },
];

// Pages need authenticate before accessing
const privateRoutes = [];

export { publicRoutes, privateRoutes };
