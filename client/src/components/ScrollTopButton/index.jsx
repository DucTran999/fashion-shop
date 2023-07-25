import React from "react";

import ICONS from "../../assets/icons";

import classNames from "classnames/bind";
import style from "./ScrollTopButton.module.scss";
const cx = classNames.bind(style);

const ScrollTopButton = () => {
  return (
    <div
      className={cx("scroll-top-btn")}
      onClick={() =>
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        })
      }
    >
      {ICONS.arrowUp}
    </div>
  );
};

export default ScrollTopButton;
