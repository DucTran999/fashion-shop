import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Container, Col, Row } from "react-bootstrap";

import ICONS from "../../../assets/icons";
import { COMMON_PATH } from "../../../utils/constVariable";
import { updateSidebarSelection } from "../../../features/activeNav/navAction";

// Component
import ShopLogo from "../../../components/Logo";
import Menu from "./Menu";

//Style
import classNames from "classnames/bind";
import styles from "./ViewMobile.module.scss";
const cx = classNames.bind(styles);

const BackHomeButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigateOnChangeOption = (optionTitle, path) => {
    updateSidebarSelection(optionTitle, dispatch);
    navigate(path, { replace: true });
  };

  return (
    <div
      className={cx("btn-back-home")}
      onClick={() => handleNavigateOnChangeOption("home", COMMON_PATH.home)}
    >
      {ICONS.backArrow}
    </div>
  );
};

const ViewMobile = () => {
  return (
    <Container>
      <Row className={cx("row-cent")}>
        <Col xs="3" className={cx("col-cent")}>
          <BackHomeButton />
        </Col>
        <Col xs="6" className={cx("col-cent")}>
          <ShopLogo />
        </Col>
        <Col xs="3" className={cx("col-cent")}>
          <Menu />
        </Col>
      </Row>
    </Container>
  );
};

export default React.memo(ViewMobile);
