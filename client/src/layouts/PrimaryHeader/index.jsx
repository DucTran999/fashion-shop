import React, { useState } from "react";

import useWindowDimension from "../../hooks/useWindowDimension";

import ViewDesktop from "./ViewDesktop";
import ViewTablet from "./ViewTablet";
import ViewMobile from "./ViewMobile";

//Style
import classNames from "classnames/bind";
import styles from "./PrimaryHeader.module.scss";
const cx = classNames.bind(styles);

const PrimaryHeader = () => {
  const { width } = useWindowDimension();

  const [fix, setFix] = useState(false);

  const setFixed = () => {
    if (window.scrollY >= 250) {
      setFix(true);
    } else {
      setFix(false);
    }
  };

  window.addEventListener("scroll", setFixed);

  return (
    <header className={cx("header", fix ? "fixed" : "inactive")}>
      {width >= 992 ? (
        <ViewDesktop />
      ) : width >= 768 ? (
        <ViewTablet />
      ) : (
        <ViewMobile />
      )}
    </header>
  );
};

export default PrimaryHeader;
