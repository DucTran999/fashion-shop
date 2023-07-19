import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import IMAGES from "../../../assets/images";
import ImageCard from "../../../components/Card/ImageCard";

// Style
import classNames from "classnames/bind";
import styles from "./PrimaryNav.module.scss";
const cx = classNames.bind(styles);

const DiscountList = () => {
  return (
    <nav className={cx("util-nav")}>
      <div className={cx("util-nav__header")}>Discount</div>
      <Link to="/blogs" className={cx("util-nav__item")}>
        First time
      </Link>
      <Link to="/blogs" className={cx("util-nav__item")}>
        Members
      </Link>
    </nav>
  );
};

const CategoryList = () => {
  return (
    <nav className={cx("util-nav")}>
      <div className={cx("util-nav__header")}>Products</div>
      <div className={cx("util-nav__list", "upper")}>Upper Body</div>
      <Link to="category/blazer" className={cx("util-nav__item")}>
        <span className={cx("util-nav__item-title")}>Blazer</span>
      </Link>
      <Link to="category/blouse" className={cx("util-nav__item")}>
        Blouse
      </Link>
      <Link to="category/polo" className={cx("util-nav__item")}>
        Polo
      </Link>
      <Link to="category/croptop" className={cx("util-nav__item")}>
        Croptop
      </Link>

      <div className={cx("util-nav__list", "lower")}>Lower Body</div>
      <Link to="category/dress" className={cx("util-nav__item")}>
        Dress
      </Link>
      <Link to="category/shorts" className={cx("util-nav__item")}>
        Shorts
      </Link>
      <Link to="category/skirt" className={cx("util-nav__item")}>
        Skirt
      </Link>
      <Link to="category/pants" className={cx("util-nav__item")}>
        Pants
      </Link>
    </nav>
  );
};

const TrendingList = () => {
  return (
    <nav className={cx("util-nav")}>
      <div className={cx("util-nav__header")}>Trending</div>
      <Link to="/blogs" className={cx("util-nav__item")}>
        Blazer & Short
      </Link>
      <Link to="/blogs" className={cx("util-nav__item")}>
        T-Shirt & Flare
      </Link>
    </nav>
  );
};

const CategoryDropDown = () => {
  return (
    <section className={cx("category-section")}>
      <Container className={cx("category-wrap")}>
        <Row>
          <Col lg="3" className={cx("col-center", "d-none d-lg-block")}>
            <ImageCard
              linkTo="/blogs"
              imageUrl={IMAGES.lookbookPoster1}
              cardStyle="medium"
              title="Buy Now"
              titleStyle={"card__title--abs"}
            />
          </Col>
          <Col lg="3" className={cx("col-center", "d-none d-lg-block")}>
            <ImageCard
              linkTo="/blogs"
              imageUrl={IMAGES.lookbookPoster2}
              cardStyle="medium"
              title="Buy Now"
              titleStyle={"card__title--abs"}
            />
          </Col>
          <Col md="4" lg="2">
            <DiscountList />
          </Col>
          <Col md="4" lg="2">
            <CategoryList />
          </Col>
          <Col md="4" lg="2">
            <TrendingList />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CategoryDropDown;
