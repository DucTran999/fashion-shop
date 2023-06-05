import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import classNames from "classnames/bind";
import style from "./Breadcrumb.module.scss";
const cx = classNames.bind(style);

function Breadcrumb({ productName }) {
  return (
    <Container>
      <Row className={cx("breadcrumb-wrap")}>
        <Col>
          <Link to="/" className={cx("breadcrumb__item", "link")}>
            Home
          </Link>
          <span className={cx("breadcrumb__slash")}>/</span>
          <Link to="/category" className={cx("breadcrumb__item", "link")}>
            Category
          </Link>
          <span className={cx("breadcrumb__slash")}>/</span>
          <span className={cx("breadcrumb__item")}>{productName}</span>
        </Col>
      </Row>
    </Container>
  );
}

export default Breadcrumb;
