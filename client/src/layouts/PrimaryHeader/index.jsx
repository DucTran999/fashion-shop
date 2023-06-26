import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import socket from "../../utils/init.socket";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useWindowDimension from "../../hooks/useWindowDimension";
import { getCartReq } from "../../features/cart/cartRequest";
import { getNotificationsReq } from "../../features/notification/notificationRequest";

import ViewDesktop from "./ViewDesktop";
import ViewTablet from "./ViewTablet";
import ViewMobile from "./ViewMobile";

//Style
import classNames from "classnames/bind";
import styles from "./PrimaryHeader.module.scss";
const cx = classNames.bind(styles);

const PrimaryHeader = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { width } = useWindowDimension();

  const isMounted = useRef(false);
  const user = useSelector((state) => state.auth.login.currentUser);
  const [fix, setFix] = useState(false);

  const setFixed = () => {
    if (window.scrollY >= 250) {
      setFix(true);
    } else {
      setFix(false);
    }
  };

  window.addEventListener("scroll", setFixed);

  // Fetch notification and cart after login or refresh
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      if (user) {
        getCartReq(user.user_id, axiosPrivate, dispatch);
        getNotificationsReq(user.user_id, axiosPrivate, dispatch);
      }
    }

    const onFetchNotifications = (message) => {
      console.log(message);
      if (user) {
        getNotificationsReq(user.user_id, axiosPrivate, dispatch);
      }
    };

    socket.on("new-notification", onFetchNotifications);

    return () => socket.off("new-notification", onFetchNotifications);

    // eslint-disable-next-line
  }, []);

  return (
    <header className={cx("header", fix ? "fixed" : "inactive")}>
      {width >= 992 ? (
        <ViewDesktop />
      ) : width >= 768 ? (
        <ViewTablet />
      ) : (
        <ViewMobile />
      )}
    </header>
  );
};

export default PrimaryHeader;
