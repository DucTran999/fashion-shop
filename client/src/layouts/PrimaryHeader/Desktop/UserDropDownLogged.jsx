import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import IMAGES from "../../../assets/images";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { COMMON_PATH } from "../../../utils/constVariable";
import { formatCapitalize } from "../../../utils/formatData";
import {
  updateSelection,
  updateSidebarSelection,
} from "../../../features/activeNav/navAction";
import { logOutReq } from "../../../features/auth/authAction";

// Style
import style from "./SubNavBar.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

const UserDropDownLogged = () => {
  const loggedOptions = [
    {
      link: COMMON_PATH.account,
      title: "account settings",
      navbar: "account",
      sidebar: "public profile",
    },
    {
      link: "/wishlist",
      title: "my wishlist",
      navbar: "wishlist",
      sidebar: "wishlist",
    },
    {
      link: COMMON_PATH.purchase,
      title: "my purchases",
      navbar: "purchase",
      sidebar: "orders pending",
    },
  ];
  const user = useSelector((state) => state.auth.login.currentUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

  const currentPath = location.pathname;

  /* handle user action */
  const handleLogOut = async () => {
    await logOutReq(user.user_id, axiosPrivate, dispatch, navigate);
  };

  const handleIconNavigateOnClick = (path, subNavActive, sidebarActive) => {
    if (currentPath !== path) {
      updateSelection(subNavActive, dispatch);
      updateSidebarSelection(sidebarActive, dispatch);
      navigate(path, { replace: true });
    }
  };

  return (
    <>
      <div
        className={cx("sub-nav__link")}
        onClick={() =>
          handleIconNavigateOnClick(
            COMMON_PATH.account,
            "account",
            "public profile"
          )
        }
      >
        <img
          src={IMAGES.defaultAvatar}
          className={cx("user-avatar")}
          alt="user avatar"
        />
      </div>
      <ul className={cx("user-options")}>
        {loggedOptions.map((option, idx) => {
          return (
            <li key={idx} className={cx("user-options__option")}>
              <div
                className={cx("user-options__link")}
                onClick={() =>
                  handleIconNavigateOnClick(
                    option.link,
                    option.navbar,
                    option.sidebar
                  )
                }
              >
                {formatCapitalize(option.title)}
              </div>
            </li>
          );
        })}
        <div className={cx("user-options__separate")}></div>
        <li className={cx("user-options__option")}>
          <span className={cx("user-options__link")} onClick={handleLogOut}>
            Log out
          </span>
        </li>
      </ul>
    </>
  );
};

export default UserDropDownLogged;
