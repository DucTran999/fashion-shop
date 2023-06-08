import React from "react";

import useWindowDimension from "../../hooks/useWindowDimension";
import ViewDesktop from "./ViewDesktop";
import ViewTablet from "./ViewTablet";
import ViewMobile from "./ViewMobile";

// Style
import classNames from "classnames/bind";
import style from "./Account.module.scss";
const cx = classNames.bind(style);

const Account = () => {
  const { width } = useWindowDimension();

  return (
    <main className={cx("theme")}>
      {width >= 992 ? (
        <ViewDesktop />
      ) : width >= 768 ? (
        <ViewTablet />
      ) : (
        <ViewMobile />
      )}
    </main>
  );
};

export default Account;
