import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import useWindowDimension from "../../hooks/useWindowDimension";
import { updateSidebarSelection } from "../../features/activeNav/navAction";

import ViewDesktop from "./Desktop";
import ViewTablet from "./Tablet";
import ViewMobile from "./Mobile";

// Style
import classNames from "classnames/bind";
import style from "./Purchase.module.scss";
const cx = classNames.bind(style);

const Purchase = () => {
  document.title = "Purchases Dashboard";

  const isMounted = useRef(false);
  const dispatch = useDispatch();
  const { width } = useWindowDimension();

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      updateSidebarSelection("Orders pending", dispatch);
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

export default Purchase;
