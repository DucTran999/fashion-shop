import React from "react";
import classNames from "classnames/bind";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./SimpleHeader.module.scss";
import ShopLogo from "../../components/Logo";
import Button from "../../components/Button";

const cx = classNames.bind(styles);

function SimpleHeader() {
  return (
    <header className={cx("header--simplified")}>
      <Container>
        <Row className={cx("row-items-center")}>
          <Col xs={4} className={cx("col-items-center", "d-sm-none")}>
            <Button
              linkTo="/"
              icon="backArrow"
              styles="line-style-center light-theme"
            />
          </Col>
          <Col xs={4} sm={4} md={3} lg={2} className={cx("col-items-center")}>
            <ShopLogo />
          </Col>
          <Col xs={4} sm={4} md={3} lg={2} className={cx("col-items-center")}>
            <Button
              linkTo="/#help"
              icon={"help"}
              title={"Help centre"}
              styles={"line-style-center light-theme"}
              titleStyles={"sx-hide-title md-icon-title"}
            />
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default React.memo(SimpleHeader);
