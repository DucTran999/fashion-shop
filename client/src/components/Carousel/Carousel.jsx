import React from "react";
import Slider from "react-slick";
import { Container, Row } from "react-bootstrap";

import IMAGES from "../../assets/images";
import ICONS from "../../assets/icons";

// style
import classNames from "classnames/bind";
import styles from "./Carousel.module.scss";
const cx = classNames.bind(styles);

function Carousel() {
  const slides = [
    {
      id: 1,
      mobileSz: IMAGES.mbSlider1,
      desktopSz: IMAGES.slider1,
      alt: "Slide 1",
    },
    {
      id: 2,
      mobileSz: IMAGES.mbSlider2,
      desktopSz: IMAGES.slider2,
      alt: "Slide 2",
    },
    {
      id: 3,
      mobileSz: IMAGES.mbSlider3,
      desktopSz: IMAGES.slider3,
      alt: "Slide 3",
    },
  ];

  const NextArrow = (props) => {
    return (
      <div className={cx("btn", "next-btn")} onClick={props.onClick}>
        {ICONS.nextArrow}
      </div>
    );
  };

  const PrevArrow = (props) => {
    return (
      <div className={cx("btn", "prev-btn")} onClick={props.onClick}>
        {ICONS.backArrow}
      </div>
    );
  };

  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    autoplay: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Container fluid>
      <Row className={cx("row-center", "no-gutter")}>
        <Slider {...settings} className={cx("slider-wrap")}>
          {slides.map((slide) => {
            return (
              <div key={slide.id} className={cx("mega-img-wrap")}>
                <picture>
                  <source media="(min-width:768px)" srcSet={slide.desktopSz} />
                  <source media="(min-width:200px)" srcSet={slide.mobileSz} />
                  <img
                    src={slide.desktopSz}
                    className={cx("mega-img")}
                    alt={slide.alt}
                  />
                  <div className={cx("overlay")}></div>
                  <button className={cx("btn-link")}>See more</button>
                </picture>
              </div>
            );
          })}
        </Slider>
      </Row>
    </Container>
  );
}

export default Carousel;
