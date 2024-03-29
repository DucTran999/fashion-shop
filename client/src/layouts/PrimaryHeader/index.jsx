import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import socket from "../../utils/initSocket";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useWindowDimension from "../../hooks/useWindowDimension";
import { getCartReq } from "../../features/cart/cartAction";
import { getNotificationsReq } from "../../features/notification/notificationAction";
import { syncUserWishlistReq } from "../../features/wishlist/wishlistAction";

import ViewDesktop from "./Desktop/DesktopView";
import ViewTablet from "./Tablet/ViewTablet";
import ViewMobile from "./Mobile/ViewMobile";

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

  const setFixed = useCallback(() => {
    return window.scrollY >= 150 ? setFix(true) : setFix(false);
  }, []);

  window.addEventListener("scroll", setFixed);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      // If user in session fetch cart, notifications
      if (user) {
        getCartReq(user.user_id, axiosPrivate, dispatch);
        getNotificationsReq(user.user_id, axiosPrivate, dispatch);
        syncUserWishlistReq(user.user_id, axiosPrivate, dispatch);
      }
    }

    const onFetchNotifications = (message) => {
      console.log(message);
      if (user) {
        getNotificationsReq(user.user_id, axiosPrivate, dispatch);
      }
    };

    // listening on event user has new notification
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
