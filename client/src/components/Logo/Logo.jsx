import React from "react";
import { Link } from "react-router-dom";
import className from "classnames/bind";

import styles from "./Logo.scss";
import IMAGES from "../../assets/images";

const cx = className.bind(styles);

function Logo() {
  return (
    <Link to="/" className={cx("logo__link")}>
      <img src={IMAGES.logo} alt="Shop logo" className={cx("logo__img")} />
    </Link>
  );
}

export default Logo;
