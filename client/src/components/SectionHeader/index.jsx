import React from "react";

import { formatCapitalize } from "../../utils/formatData";

// Style
import classNames from "classnames/bind";
import style from "./SectionHeader.module.scss";
const cx = classNames.bind(style);

const SectionHeader = ({ title }) => {
  return <div className={cx("section-header")}>{formatCapitalize(title)}</div>;
};

export default SectionHeader;
