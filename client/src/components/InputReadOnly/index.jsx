import React from "react";

// Style
import classNames from "classnames/bind";
import style from "./InputReadOnly.module.scss";
const cx = classNames.bind(style);

const InputReadOnly = ({ fieldName, value }) => {
  return (
    <div className={cx("input-box")}>
      <div className={cx("input-label")}>{fieldName}</div>
      <div className={cx("input-value")}>{value}</div>
    </div>
  );
};

export default InputReadOnly;
