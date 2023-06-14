import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import useWindowDimension from "../../hooks/useWindowDimension";
import { updateSidebarSelection } from "../../features/activeNav/navAction";
import { formatCapitalize } from "../../utils/formatData";

import ViewDesktop from "./ViewDesktop";
import ViewTablet from "./ViewTablet";
import ViewMobile from "./ViewMobile";

// Style
import classNames from "classnames/bind";
import style from "./Account.module.scss";
const cx = classNames.bind(style);

const Account = () => {
  document.title = formatCapitalize("Personal Account");

  const isMounted = useRef(false);
  const dispatch = useDispatch();
  const { width } = useWindowDimension();

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      updateSidebarSelection("Public profile", dispatch);
    }

    // eslint-disable-next-line
  }, []);

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
