import React from "react";
import { Container, Col, Row } from "react-bootstrap";

// Component
import PrimaryNav from "../Common/PrimaryNav";
import ShopLogo from "../../../components/Logo";
import MenuDropDown from "./MenuDropDown";

//Style
import classNames from "classnames/bind";
import styles from "./ViewTablet.module.scss";
const cx = classNames.bind(styles);

const ViewTablet = () => {
  return (
    <Container>
      <Row className={cx("row-cent")}>
        <Col md="2" className={cx("col-cent")}>
          <ShopLogo />
        </Col>
        <Col md="8">
          <PrimaryNav />
        </Col>
        <Col md="2" className={cx("col-cent")}>
          <MenuDropDown />
        </Col>
      </Row>
    </Container>
  );
};

export default React.memo(ViewTablet);
