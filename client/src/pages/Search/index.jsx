import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import useWindowDimensions from "../../hooks/useWindowDimension";
import { resetSearchResult } from "../../features/productList/productListSlice";
import { SCREEN_MIN_SIZE } from "../../utils/constVariable";

import DesktopView from "./Desktop/DesktopView";
import TabletView from "./Tablet/TabletView";
import MobileView from "./Mobile/MobileView";

// Style
import classNames from "classnames/bind";
import style from "./Search.module.scss";
const cx = classNames.bind(style);

const Search = () => {
  document.title = "Want to find something?";
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(resetSearchResult());

    // eslint-disable-next-line
  }, []);

  return (
    <main className={cx("theme")}>
      {width >= SCREEN_MIN_SIZE.desktop ? (
        <DesktopView />
      ) : width >= SCREEN_MIN_SIZE.tablet ? (
        <TabletView />
      ) : (
        <MobileView />
      )}
    </main>
  );
};

export default Search;
