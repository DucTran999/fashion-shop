import React, { useEffect } from "react";

// Component Injected
import Category from "./SectionCategory";
import Carousel from "../../components/Carousel/Carousel";
import ProductCarousel from "../../components/Carousel/ProductCarousel";
import PolicySection from "./PolicySection";
import Padding from "../../components/Padding";

//Style
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
const cx = classNames.bind(styles);

const Home = () => {
  document.title = "Atlana Fashion";
  document.body.style.overflowY = "scroll";

  useEffect(() => {
    window.scrollTo(0, 0);

    // eslint-disable-next-line
  }, []);

  return (
    <main className={cx("theme")}>
      <Carousel />
      <Padding />
      <Category />

      <Padding />
      <ProductCarousel title="NEW IN" typeFilter="new-in" limit="12" />
      <Padding />
      <ProductCarousel
        title="BEST SELLERS"
        typeFilter="best-selling"
        limit="12"
      />
      <Padding />
      {/* TODO: Collect link to blog */}
      <PolicySection />
      <Padding />
    </main>
  );
};

export default Home;
