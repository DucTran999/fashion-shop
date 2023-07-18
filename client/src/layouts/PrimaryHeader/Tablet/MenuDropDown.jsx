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
        <Link to="/search" className={cx("menu__dropdown--tablet__element")}>
          Search
        </Link>
        <div
          className={cx("menu__dropdown--tablet__element")}
          onClick={() => handleNavigateOnClick(COMMON_PATH.cart, "Cart")}
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
        <Link to="/wishlist" className={cx("menu__dropdown--tablet__element")}>
          Wishlist
        </Link>
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

  return (
    <nav className={cx("menu__dropdown--tablet")}>
      <section className={cx("dropdown__service")}>
        <Link to="/search" className={cx("menu__dropdown--tablet__element")}>
          Search
        </Link>
        <div
          className={cx("menu__dropdown--tablet__element")}
          onClick={(e) => {
            e.preventDefault();
            navigate(COMMON_PATH.cart, { replace: true });
          }}
        >
          Cart
        </div>
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
