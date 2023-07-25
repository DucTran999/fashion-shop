import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import IMAGES from "../../../assets/images";
import useWindowDimension from "../../../hooks/useWindowDimension";
import { COMMON_PATH, SCREEN_MIN_SIZE } from "../../../utils/constVariable";
import { updateSelection } from "../../../features/activeNav/navAction";

// Style
import classNames from "classnames/bind";
import style from "./EmptyWishlist.module.scss";
const cx = classNames.bind(style);

const EmptyWishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { width } = useWindowDimension();

  const handleClick = () => {
    updateSelection("category", dispatch);
    navigate(COMMON_PATH.category, { replace: true });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className={cx("wrapper")}>
      {width >= SCREEN_MIN_SIZE.tablet ? (
        <div className={cx("banner-wrap")}>
          <img
            src={IMAGES.emptyWishlist}
            alt="Empty wishlist"
            className={cx("banner")}
            draggable={false}
          />
        </div>
      ) : (
        <p className={cx("header")}>My wishlist</p>
      )}
      <p className={cx("message")}>
        Your wishlist is empty! Click on the heart icon to add the product to
        wishlist
      </p>
      <button className={cx("back-home-btn")} onClick={handleClick}>
        Continue Shopping
      </button>
    </div>
  );
};

export default EmptyWishlist;
