import React from "react";
import Slider from "react-slick";
import { Container, Row } from "react-bootstrap";

import ProductCard from "../../components/Card/ProductCard";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import style from "./SectionLatestProducts.module.scss";
// import classNames from "classnames/bind";

// const cx = classNames.bind(style);

const SectionLatestProducts = () => {
  {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <Container>
        <h2> Latest Products</h2>
        <Row>
          <Slider {...settings}>
            <div>
              <ProductCard></ProductCard>
            </div>
            <div>
              <ProductCard></ProductCard>
            </div>
          </Slider>
        </Row>
      </Container>
    );
  }
};

export default SectionLatestProducts;
