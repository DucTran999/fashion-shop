import React from "react";

import ICONS from "../../../assets/icons";

import classNames from "classnames/bind";
import style from "./EmptyNotification.module.scss";
const cx = classNames.bind(style);

const EmptyNotification = () => {
  return (
    <div className={cx("wrap")}>
      <span className={cx("icon")}>{ICONS.bellSlash}</span>
      <span className={cx("message")}>
        You don't have any notifications right now!
      </span>
    </div>
  );
};

export default EmptyNotification;
