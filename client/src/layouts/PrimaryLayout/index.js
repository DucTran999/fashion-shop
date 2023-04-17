import React from "react";

import HeaderAdvanced from "../HeaderAdvanced";
import Footer from "../Footer";

function PrimaryLayout(props) {
  return (
    <div>
      <HeaderAdvanced />
      <div className="container">
        <div className="content">{props.children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default PrimaryLayout;
