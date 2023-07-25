import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ICONS from "../../../assets/icons";
import { COMMON_PATH } from "../../../utils/constVariable";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

import {
  updateSelection,
  updateSidebarSelection,
} from "../../../features/activeNav/navAction";
import { logOutReq } from "../../../features/auth/authAction";
import { formatCapitalizeFirstWord } from "../../../utils/formatData";
import { setNotificationFilter } from "../../../features/notification/notificationSlice";

//Style
import classNames from "classnames/bind";
import styles from "./MenuDropDown.module.scss";
const cx = classNames.bind(styles);

const MenuHasLogin = () => {
  const user = useSelector((state) => state.auth.login.currentUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  /* handle user action */
  const handleLogOut = async () => {
    await logOutReq(user.user_id, axiosPrivate, dispatch, navigate);
  };

  const handleNavigateOnClick = (linkTo, pageName) => {
    updateSelection(pageName, dispatch);
    navigate(linkTo, { replace: true });
  };

  return (
    <nav className={cx("menu__dropdown--tablet")}>
      <section className={cx("dropdown__service")}>
        <div
          className={cx("menu__dropdown--tablet__element")}
          onClick={() => handleNavigateOnClick(COMMON_PATH.search, "search")}
        >
          Search
        </div>
        <div
          className={cx("menu__dropdown--tablet__element")}
          onClick={() => handleNavigateOnClick(COMMON_PATH.cart, "cart")}
        >
          Cart
        </div>
        <div
          className={cx("menu__dropdown--tablet__element")}
          onClick={() => {
            updateSelection("notification", dispatch);
            updateSidebarSelection("news", dispatch);
            dispatch(setNotificationFilter("all"));
            navigate(COMMON_PATH.notification, { replace: true });
          }}
        >
          Notifications
        </div>
        <div
          onClick={() => navigate(COMMON_PATH.purchase, { replace: true })}
          className={cx("menu__dropdown--tablet__element")}
        >
          My Purchases
        </div>
        <div
          className={cx("menu__dropdown--tablet__element")}
          onClick={() =>
            handleNavigateOnClick(COMMON_PATH.wishlist, "wishlist")
          }
        >
          Wishlist
        </div>
      </section>
      <section className={cx("dropdown__service", "last")}>
        <div
          className={cx("menu__dropdown--tablet__element")}
          onClick={(e) => {
            e.preventDefault();
            navigate(COMMON_PATH.account, { replace: true });
          }}
        >
          Account Settings
        </div>
        <span
          className={cx("menu__dropdown--tablet__element")}
          onClick={handleLogOut}
        >
          Log out
        </span>
      </section>
    </nav>
  );
};

const MenuNoLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigateOnClick = (linkTo, pageName) => {
    updateSelection(pageName, dispatch);
    navigate(linkTo, { replace: true });
  };
  const services = [
    { link: COMMON_PATH.search, title: "search" },
    { link: COMMON_PATH.cart, title: "cart" },
    { link: COMMON_PATH.wishlist, title: "wishlist" },
  ];

  return (
    <nav className={cx("menu__dropdown--tablet")}>
      <section className={cx("dropdown__service")}>
        {services.map((service) => {
          return (
            <div
              key={service.title}
              className={cx("menu__dropdown--tablet__element")}
              onClick={() => handleNavigateOnClick(service.link, service.title)}
            >
              {formatCapitalizeFirstWord(service.title)}
            </div>
          );
        })}
      </section>
      <section className={cx("dropdown__service", "last")}>
        <Link to="/login" className={cx("menu__dropdown--tablet__element")}>
          Login
        </Link>
        <Link to="/register" className={cx("menu__dropdown--tablet__element")}>
          Register
        </Link>
      </section>
    </nav>
  );
};

const MenuDropDown = () => {
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const menuSwitch = () => {
    return setShowMenu(!showMenu);
  };

  return (
    <div className={cx("menu--tablet")} onClick={menuSwitch}>
      {ICONS.menu}
      {!showMenu ? <></> : user ? <MenuHasLogin /> : <MenuNoLogin />}
    </div>
  );
};

export default MenuDropDown;
