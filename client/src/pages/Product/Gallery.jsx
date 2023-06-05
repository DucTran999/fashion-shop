import React, { useState } from "react";
import { Col } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import classNames from "classnames/bind";
import style from "./Gallery.module.scss";
const cx = classNames.bind(style);

const IMG_URL = process.env.REACT_APP_API_SERVER_URL;

const Gallery = ({ variantInfo }) => {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const imageList = variantInfo.images;

  const gallerySettings = {
    infinite: true,
    slidesToShow: 3,
    lazyLoad: true,
    vertical: true,
    focusOnSelect: true,
    arrows: false,
  };

  const currentImgSettings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <>
      <Col lg={1} className="d-none d-lg-block">
        <div className={cx("gallery-wrap")}>
          <Slider
            asNavFor={nav1}
            ref={(slider2) => setNav2(slider2)}
            {...gallerySettings}
          >
            {imageList.map((image, idx) => {
              return (
                <img
                  key={idx}
                  className={cx("img-gallery")}
                  src={`${IMG_URL}/product/${image}`}
                  alt="product img"
                />
              );
            })}
          </Slider>
        </div>
      </Col>
      <Col lg={5}>
        <Slider
          asNavFor={nav2}
          ref={(slider1) => setNav1(slider1)}
          {...currentImgSettings}
        >
          {imageList.map((image, idx) => {
            return (
              <img
                key={idx}
                className={cx("img-selected")}
                src={`${IMG_URL}/product/${image}`}
                alt="select img"
              />
            );
          })}
        </Slider>
      </Col>
    </>
  );
};

export default React.memo(Gallery);
