import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Custom hook, utils, api call, etc.
import ICONS from "../../../assets/icons";
import {
  updateSelection,
  updateSidebarSelection,
} from "../../../features/activeNav/navAction";
import { COMMON_PATH } from "../../../utils/constVariable";

// Component Injected
import UserDropDownLogged from "./UserDropDownLogged";
import UserDropDownNoLogin from "./UserDropDownNoLogin";

// Style
import style from "./SubNavBar.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

const SubNavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const currentPath = location.pathname;

  const user = useSelector((state) => state.auth.login.currentUser);
  const cart = useSelector((state) => state.cart.get.info);
  const hasUnreadNotification = useSelector(
    (state) => state.notification.hasUnread
  );

  const handleIconNavigateOnClick = (path, subNavActive, sidebarActive) => {
    if (path !== currentPath) {
      updateSelection(subNavActive, dispatch);
      updateSidebarSelection(sidebarActive, dispatch);
      navigate(path, { replace: true });
    }
  };

  return (
    <ul className={cx("sub-nav")}>
      <li className={cx("sub-nav__item")}>
        <div
          className={cx("sub-nav__link")}
          onClick={() => navigate("/search", { replace: true })}
        >
          {ICONS.search}
        </div>
      </li>
      <li className={cx("sub-nav__item")}>
        <div
          className={cx("sub-nav__link")}
          onClick={() =>
            handleIconNavigateOnClick(
              COMMON_PATH.notification,
              "notifications",
              "news"
            )
          }
        >
          {ICONS.bellSlime}
          {hasUnreadNotification && <span className={cx("bell-dot")}></span>}
        </div>
      </li>
      <li className={cx("sub-nav__item", "user")}>
        {user ? <UserDropDownLogged /> : <UserDropDownNoLogin />}
      </li>
      <li className={cx("sub-nav__item")}>
        <div
          className={cx("sub-nav__link")}
          onClick={() => navigate(COMMON_PATH.cart, { replace: true })}
        >
          {ICONS.cart}
        </div>
        {cart ? (
          <span className={cx("cart__num-products")}>
            {cart.products.length}
          </span>
        ) : (
          <span className={cx("cart__num-products")}>0</span>
        )}
      </li>
    </ul>
  );
};

export default SubNavBar;
