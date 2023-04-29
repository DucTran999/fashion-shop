import React from "react";
import classNames from "classnames/bind";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./HeaderSimplified.module.scss";
import Logo from "../../components/Logo/Logo";
import Button from "../../components/Button/Button";

const cx = classNames.bind(styles);

function HeaderSimplified() {
  return (
    <header className={cx("header--simplified")}>
      <Container>
        <Row className={cx("row-items-center")}>
          <Col xs={4} className={cx("col-items-center", "d-sm-none")}>
            <Button
              linkTo={"/"}
              icon={"backArrow"}
              styles={"line-style-center light-theme"}
            />
          </Col>
          <Col xs={4} sm={4} md={3} lg={2} className={cx("col-items-center")}>
            <Logo />
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

export default HeaderSimplified;
