import React from "react";

// Style
import classNames from "classnames/bind";
import style from "./ErrorBlock.module.scss";
const cx = classNames.bind(style);

const ErrorBlock = ({ msg }) => {
  return <div className={cx("error-msg")}>{msg}</div>;
};

export default ErrorBlock;
