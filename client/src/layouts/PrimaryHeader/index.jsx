import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useWindowDimension from "../../hooks/useWindowDimension";
import { getCartReq } from "../../features/cart/cartRequest";
import { getCartSuccess } from "../../features/cart/cartSlice";

import ViewDesktop from "./ViewDesktop";
import ViewTablet from "./ViewTablet";
import ViewMobile from "./ViewMobile";

//Style
import classNames from "classnames/bind";
import styles from "./PrimaryHeader.module.scss";
const cx = classNames.bind(styles);

const PrimaryHeader = () => {
  const { width } = useWindowDimension();

  const [fix, setFix] = useState(false);

  const setFixed = () => {
    if (window.scrollY >= 250) {
      setFix(true);
    } else {
      setFix(false);
    }
  };

  window.addEventListener("scroll", setFixed);

  const user = useSelector((state) => state.auth.login?.currentUser);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      getCartReq(user.user_id, axiosPrivate, dispatch);
    } else {
      const localCart = localStorage.getItem("@atlana/cart");
      dispatch(getCartSuccess(JSON.parse(localCart)));
    }

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
