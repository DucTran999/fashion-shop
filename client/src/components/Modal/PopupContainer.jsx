import React from "react";

// Style
import classNames from "classnames/bind";
import styles from "./PopupContainer.module.scss";

const cx = classNames.bind(styles);

function Popup({ children, header }) {
  return (
    <div className={cx("popup-box")}>
      <div className={cx("popup-box__header")}>{header}</div>
      {children}
    </div>
  );
}

export default Popup;
