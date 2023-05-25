import React from "react";
import Slider from "react-slick";
import { Container, Row } from "react-bootstrap";

import ProductCard from "../../components/Card/ProductCard";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./CustomCarousel.scss";
import style from "./SectionLatestProducts.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

const SectionLatestProducts = () => {
  const tempProducts = [
    // product 1
    [
      {
        product_id: 1,
        sku: "BLZ000001SDBLU",
        name: "Blazer Style Blazer Style Blazer Style Blazer Style Blazer Style",
        price: "2000",
        image: "/product/pro_lam_1_4c6093b27166479297ed63231ec98dcc.webp",
        images: [],
        color: "dark-blue",
        in_stock: 15,
      },
      {
        product_id: 1,
        sku: "BLZ000001SBLK",
        name: "Blazer Style",
        price: "2000",
        image: "/product/pro_den_1_09ee625d88d644799f24402ddcadb724.webp",
        images: [],
        color: "black",
        in_stock: 15,
      },
    ],
    // product 2
    [
      {
        product_id: 1,
        sku: "BLZ000001SBLK",
        name: "Blazer Style",
        price: "2000",
        image: "/product/pro_den_1_09ee625d88d644799f24402ddcadb724.webp",
        images: [],
        color: "Black",
        in_stock: 15,
      },
      {
        product_id: 1,
        sku: "BLZ000001SBLA",
        name: "Blazer Style",
        price: "2000",
        image: "/product/pro_lam_1_4c6093b27166479297ed63231ec98dcc.webp",
        images: [],
        in_stock: 15,
      },
    ],
    // product 3
    [
      {
        product_id: 1,
        sku: "BLZ000001SBLA",
        name: "Blazer Style",
        price: "2000",
        image: "/product/pro_lam_1_4c6093b27166479297ed63231ec98dcc.webp",
        images: [],
        in_stock: 15,
      },
      {
        product_id: 1,
        sku: "BLZ000001SBLA",
        name: "Blazer Style",
        price: "2000",
        image: "/product/pro_lam_1_4c6093b27166479297ed63231ec98dcc.webp",
        images: [],
        in_stock: 15,
      },
    ],
    // product 4
    [
      {
        product_id: 1,
        sku: "BLZ000001SBLA",
        name: "Blazer Style",
        price: "2000",
        image: "/product/pro_lam_1_4c6093b27166479297ed63231ec98dcc.webp",
        images: [],
        in_stock: 15,
      },
      {
        product_id: 1,
        sku: "BLZ000001SBLA",
        name: "Blazer Style",
        price: "2000",
        image: "/product/pro_lam_1_4c6093b27166479297ed63231ec98dcc.webp",
        images: [],
        in_stock: 15,
      },
    ],
    // product 5
    [
      {
        product_id: 1,
        sku: "BLZ000001SBLA",
        name: "Blazer Style",
        price: "2000",
        image: "/product/pro_lam_1_4c6093b27166479297ed63231ec98dcc.webp",
        images: [],
        in_stock: 15,
      },
      {
        product_id: 1,
        sku: "BLZ000001SBLA",
        name: "Blazer Style",
        price: "2000",
        image: "/product/pro_lam_1_4c6093b27166479297ed63231ec98dcc.webp",
        images: [],
        in_stock: 15,
      },
    ],
    // product 6
    [
      {
        product_id: 1,
        sku: "BLZ000001SBLA",
        name: "Blazer Style",
        price: "2000",
        image: "/product/pro_lam_1_4c6093b27166479297ed63231ec98dcc.webp",
        images: [],
        in_stock: 15,
      },
      {
        product_id: 1,
        sku: "BLZ000001SBLA",
        name: "Blazer Style",
        price: "2000",
        image: "/product/pro_lam_1_4c6093b27166479297ed63231ec98dcc.webp",
        images: [],
        in_stock: 15,
      },
    ],
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          dots: true,
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          speed: 500,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          dots: true,
          slidesToShow: 2,
          slidesToScroll: 1,
          speed: 500,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 500,
          infinite: false,
          arrows: false,
        },
      },
    ],
  };

  return (
    <Container>
      <div className={cx("section__header")}>Latest Products</div>
      <Row className={cx("row-center")}>
        <Slider {...settings}>
          <div className={cx("align-center")}>
            <ProductCard productInfo={tempProducts[0]} />
          </div>
          <div className={cx("align-center")}>
            <ProductCard productInfo={tempProducts[1]} />
          </div>
          <div className={cx("align-center")}>
            <ProductCard productInfo={tempProducts[2]} />
          </div>
          <div className={cx("align-center")}>
            <ProductCard productInfo={tempProducts[3]} />
          </div>
        </Slider>
      </Row>
    </Container>
  );
};

export default React.memo(SectionLatestProducts);
