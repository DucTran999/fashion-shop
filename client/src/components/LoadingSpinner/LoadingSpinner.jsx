import React from "react";
import ICONS from "../../assets/icons";

import classNames from "classnames/bind";
import style from "./LoadingSpinner.module.scss";
const cx = classNames.bind(style);

function LoadingSpinner() {
  return (
    <div className={cx("spinner-wrap")}>
      {ICONS.loading} <span className={cx("spinner-title")}>Loading ...</span>
    </div>
  );
}

export default LoadingSpinner;
