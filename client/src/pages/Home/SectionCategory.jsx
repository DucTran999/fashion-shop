import React from "react";
import { Container, Col, Row } from "react-bootstrap";

import classNames from "classnames/bind";
import styles from "./SectionCategory.module.scss";
import IMAGES from "../../assets/images";

const cx = classNames.bind(styles);

function SectionCategory() {
  const categories = [
    { images: IMAGES.category1, title: "Bikini" },
    { images: IMAGES.category2, title: "Flare pants" },
    { images: IMAGES.category3, title: "Blouse" },
    { images: IMAGES.category4, title: "Croptop" },
    { images: IMAGES.category5, title: "Dress" },
    { images: IMAGES.category6, title: "Shorts" },
    { images: IMAGES.category7, title: "Skirt" },
    { images: IMAGES.category8, title: "Blazer" },
  ];

  return (
    <Container>
      <div className={cx("category__header")}>Categories</div>
      <Row className={cx("row-space-between")}>
        {categories.map((category, index) => {
          return (
            <Col key={index} xs="3" lg="auto">
              <div className={cx("category__wrap")}>
                <img
                  className={cx("category__img")}
                  src={category.images}
                  alt="Bikini"
                />
                <span className={cx("category__title")}>{category.title}</span>
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default SectionCategory;
