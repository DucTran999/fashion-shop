import React from "react";

// Style
import classNames from "classnames/bind";
import style from "./SectionHeader.module.scss";
const cx = classNames.bind(style);

const SectionHeader = ({ title }) => {
  return <div className={cx("section-header")}>{title}</div>;
};

export default SectionHeader;
