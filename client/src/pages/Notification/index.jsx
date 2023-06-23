import React, { useEffect } from "react";

import useWindowDimension from "../../hooks/useWindowDimension";
import { formatCapitalize } from "../../utils/formatData";

import ViewDesktop from "./ViewDesktop";

// Style
import classNames from "classnames/bind";
import style from "./Notification.module.scss";
const cx = classNames.bind(style);

const Notification = () => {
  document.title = formatCapitalize("notifications");
  const { width } = useWindowDimension();

  useEffect(() => {
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
