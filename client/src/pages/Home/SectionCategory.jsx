import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Container, Col, Row } from "react-bootstrap";

// util, redux, helper func, custom hook...
import IMAGES from "../../assets/images";
import { updateSelection } from "../../features/activeNav/navAction";

// Style
import classNames from "classnames/bind";
import styles from "./SectionCategory.module.scss";

const cx = classNames.bind(styles);

function SectionCategory() {
  /* TODO: need to change to dynamic load category */
  const categories = [
    { images: IMAGES.category1, title: "Bikini" },
    { images: IMAGES.category2, title: "Pants" },
    { images: IMAGES.category3, title: "Blouse" },
    { images: IMAGES.category4, title: "Croptop" },
    { images: IMAGES.category5, title: "Dress" },
    { images: IMAGES.category6, title: "Shorts" },
    { images: IMAGES.category7, title: "Skirt" },
    { images: IMAGES.category8, title: "Blazer" },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // handle navigate for clean history stack
  const handleNavigateOnClick = (category) => {
    //TODO: when dynamic category need function convert to lowercase with hyphen
    const path = category.toLowerCase();
    updateSelection("category", dispatch);
    navigate(`/category/${path}`, { replace: true });
  };

  return (
    <Container>
      <div className={cx("category__header")}>CATEGORIES</div>
      <Row className={cx("row-space-between")}>
        {categories.map((category, index) => {
          return (
            <Col key={index} xs="3" lg="auto">
              <div
                className={cx("category__wrap")}
                onClick={() => handleNavigateOnClick(category.title)}
              >
                <img
                  className={cx("category__img")}
                  src={category.images}
                  alt="category img"
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

export default React.memo(SectionCategory);
