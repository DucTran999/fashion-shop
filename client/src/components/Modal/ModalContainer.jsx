import React from "react";
import { createPortal } from "react-dom";

import classNames from "classnames/bind";
import styles from "./ModalContainer.module.scss";
const cx = classNames.bind(styles);

function ModalContainer({ children }) {
  return createPortal(
    <div className={cx("overlay")}>{children}</div>,
    document.body
  );
}

export default ModalContainer;
