import { PrimaryLayout, AuthLayout } from "../layouts/";

import Home from "../pages/Home";
import Auth from "../pages/Auth";

// Pages can access without authentication.
const publicRoutes = [
  { path: "/", component: Home, layout: PrimaryLayout },
  { path: "/auth", component: Auth, layout: AuthLayout },
];

// Pages need authenticate before accessing
const privateRoutes = [];

export { publicRoutes, privateRoutes };
