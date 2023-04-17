import React from "react";

import HeaderSimplified from "../HeaderSimplified";
import Footer from "../Footer";

// This layout use for both Login and Signup Pages.
function LoginLayout({ children }) {
  return (
    <React.Fragment>
      <HeaderSimplified />
      <div className="container">{children}</div>
      <Footer />
    </React.Fragment>
  );
}

export default LoginLayout;
