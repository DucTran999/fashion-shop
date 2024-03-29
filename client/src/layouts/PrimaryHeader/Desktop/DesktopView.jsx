import React from "react";
import { Container, Col, Row } from "react-bootstrap";

// Component
import ShopLogo from "../../../components/Logo";
import PrimaryNav from "../Common/PrimaryNav";
import SubNavBar from "./SubNavBar";

// Style
import style from "./DesktopView.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

const DesktopView = () => {
  return (
    <Container>
      <Row className={cx("row-cent")}>
        <Col lg="2" xl="2" className={cx("col-cent")}>
          <ShopLogo />
        </Col>
        <Col lg="6" xl="8">
          <PrimaryNav />
        </Col>
        <Col lg="4" xl="2" className={cx("col-cent")}>
          <SubNavBar />
        </Col>
      </Row>
    </Container>
  );
};

export default React.memo(DesktopView);
