import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import classNames from "classnames/bind";

import IMAGES from "../../assets/images";
import ICONS from "../../assets/icons";
import styles from "./Carousel.module.scss";

const cx = classNames.bind(styles);

function Carousel() {
  const slider = [
    [IMAGES.mbSlider1, IMAGES.slider1],
    [IMAGES.mbSlider2, IMAGES.slider2],
    [IMAGES.mbSlider3, IMAGES.slider3],
  ];

  const length = slider.length;
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <Container fluid>
      <Row className={cx("row-center")}>
        <Col className={cx("no-gutter", "col-center")}>
          <picture className={cx("picture-container")} key={current}>
            <source media="(min-width:765px)" srcSet={slider[current][1]} />
            <source media="(min-width:200px)" srcSet={slider[current][0]} />
            <img
              src={slider[current][1]}
              className={cx("mega-img")}
              alt="Slider"
            />
          </picture>
          <div className={cx("btn", "prev-btn")} onClick={prevSlide}>
            {ICONS.backArrow}
          </div>
          <div className={cx("btn", "next-btn")} onClick={nextSlide}>
            {ICONS.nextArrow}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Carousel;
