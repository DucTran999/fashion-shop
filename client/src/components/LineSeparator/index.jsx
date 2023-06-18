import React from "react";

import classNames from "classnames/bind";
import style from "./LineSeparator.module.scss";
const cx = classNames.bind(style);

const LineSeparator = ({ content }) => {
  return (
    <div className={content ? cx("separator") : cx("separator", "no-content")}>
      {content}
    </div>
  );
};
export default LineSeparator;
