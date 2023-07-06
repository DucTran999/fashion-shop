import React from "react";
import { Link } from "react-router-dom";

import IMAGES from "../../assets/images";

import classNames from "classnames/bind";
import styles from "./ShopLogo.module.scss";
const cx = classNames.bind(styles);

const ShopLogo = () => {
  return (
    <Link to="/" className={cx("logo-link")}>
      <img src={IMAGES.logo} alt="Shop logo" className={cx("logo-img")} />
    </Link>
  );
};

export default ShopLogo;
