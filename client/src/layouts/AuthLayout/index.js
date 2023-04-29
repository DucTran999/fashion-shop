import React from "react";

import HeaderSimplified from "../HeaderSimplified";
import Footer from "../Footer";

// This layout use for both Signin and Signup Pages.
function AuthLayout({ children }) {
  return (
    <React.Fragment>
      <HeaderSimplified />
      <div>{children}</div>
      <Footer />
    </React.Fragment>
  );
}

export default AuthLayout;
