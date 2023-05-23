import React, { useEffect } from "react";

import Carousel from "../../components/Carousel/Carousel";
import Category from "./SectionCategory";
import LatestProducts from "./SectionLatestProducts";

import classNames from "classnames/bind";
import styles from "./Home.module.scss";
const cx = classNames.bind(styles);

const Home = () => {
  document.body.style.overflowY = "scroll";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={cx("theme")}>
      <Carousel />
      <Category />
      <LatestProducts />
    </main>
  );
};

export default Home;
