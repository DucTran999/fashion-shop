import React from "react";
import { useSelector } from "react-redux";

import IMAGES from "../../assets/images";
import { formatCapitalize } from "../../utils/formatData";

// Style
import classNames from "classnames/bind";
import style from "./Header.module.scss";
const cx = classNames.bind(style);

const Header = () => {
  const user = useSelector((state) => state.user.get?.info);

  return (
    user && (
      <div className={cx("header-wrap")}>
        <img
          className={cx("account-ava")}
          src={IMAGES.defaultAvatar}
          alt="avatar"
        />
        <div className={cx("account-info")}>
          <div className={cx("account-info__name")}>
            {formatCapitalize(user.first_name)}
          </div>
          <div className={cx("account-info__type")}>Your personal account</div>
        </div>
      </div>
    )
  );
};

export default Header;
