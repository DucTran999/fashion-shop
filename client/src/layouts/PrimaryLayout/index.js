import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";

import PrimaryHeader from "../PrimaryHeader";
import Footer from "../Footer/Footer";

function PrimaryLayout() {
  document.title = "Atlana Fashion";
  document.body.style.overflowY = "scroll";

  return (
    <Fragment>
      <PrimaryHeader />
      <Outlet />
      <Footer />
    </Fragment>
  );
}

export default PrimaryLayout;
