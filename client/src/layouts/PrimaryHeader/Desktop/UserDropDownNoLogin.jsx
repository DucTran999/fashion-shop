import React from "react";
import { Link } from "react-router-dom";

// Custom hook, utils, api call, etc.
import ICONS from "../../../assets/icons";

// Style
import style from "./SubNavBar.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

const UserDropDownNoLogin = () => {
  return (
    <>
      <Link to="/login" className={cx("sub-nav__link")}>
        {ICONS.user}
      </Link>
      <ul className={cx("user-options")}>
        <li className={cx("user-options__option")}>
          <Link to="/login" className={cx("user-options__link")}>
            Login
          </Link>
        </li>
        <li className={cx("user-options__option")}>
          <Link to="/register" className={cx("user-options__link")}>
            Register
          </Link>
        </li>
      </ul>
    </>
  );
};

export default UserDropDownNoLogin;
