import React, { Fragment } from "react";

import PrimaryHeader from "../Header/PrimaryHeader";
import Footer from "../Footer/Footer";

function PrimaryLayout(props) {
  document.title = "Atlana Fashion";
  document.body.style.overflowY = "scroll";

  return (
    <Fragment>
      <PrimaryHeader />
      <main>{props.children}</main>
      <Footer />
    </Fragment>
  );
}

export default PrimaryLayout;
