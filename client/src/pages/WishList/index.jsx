import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import useWindowDimensions from "../../hooks/useWindowDimension";
import { SCREEN_MIN_SIZE } from "../../utils/constVariable";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getUserWishlistReq } from "../../features/wishlist/wishlistAction";

import DesktopView from "./Desktop/DesktopView";
import TabletView from "./Tablet/TabletView";
import MobileView from "./Mobile/MobileView";

// Style
import classNames from "classnames/bind";
import style from "./Wishlist.module.scss";
const cx = classNames.bind(style);

const WishList = () => {
  document.title = "Your wishlist";
  const { width } = useWindowDimensions();

  const isMounted = useRef(false);
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  const user = useSelector((state) => state.auth.login.currentUser);

  useEffect(() => {
    const updateLatestWishlist = async () => {
      if (!isMounted.current) {
        isMounted.current = true;
        // Fetching latest wishlist from DB
        if (user)
          await getUserWishlistReq(user.user_id, axiosPrivate, dispatch);
      }
    };

    updateLatestWishlist();
    // eslint-disable-next-line
  }, []);

  return (
    <main className={cx("theme")}>
      {width >= SCREEN_MIN_SIZE.desktop ? (
        <DesktopView wishlist={wishlist} />
      ) : width >= SCREEN_MIN_SIZE.tablet ? (
        <TabletView wishlist={wishlist} />
      ) : (
        <MobileView wishlist={wishlist} />
      )}
    </main>
  );
};

export default WishList;
