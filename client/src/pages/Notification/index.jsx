import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import useWindowDimension from "../../hooks/useWindowDimension";
import { updateSidebarSelection } from "../../features/activeNav/navAction";
import { formatCapitalize } from "../../utils/formatData";

import ViewDesktop from "./ViewDesktop";

// Style
import classNames from "classnames/bind";
import style from "./Notification.module.scss";
const cx = classNames.bind(style);

const Notification = () => {
  document.title = formatCapitalize("notifications");

  const isMounted = useRef(false);
  const dispatch = useDispatch();
  const { width } = useWindowDimension();

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      updateSidebarSelection("news", dispatch);
    }

    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);

  return (
    <main className={cx("theme")}>
      {width >= 992 ? <ViewDesktop /> : width >= 768 ? <></> : <></>}
    </main>
  );
};

export default Notification;
