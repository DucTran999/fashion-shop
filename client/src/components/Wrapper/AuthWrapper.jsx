import React from "react";
import classNames from "classnames/bind";
import styles from "./AuthWrapper.scss";
import { Container, Row, Col } from "react-bootstrap";

const cx = classNames.bind(styles);

let AuthWrapper = ({ backgroundUrl, children }) => {
  return (
    <div className={cx("lg-wrapper")}>
      <div
        className={cx("background")}
        style={{
          backgroundImage: `url("${backgroundUrl}")`,
        }}
      ></div>
      <div className={cx("main-section")}>
        <Container>
          <Row className={cx("justify-content-center")}>
            <Col sm={10} md={12} lg={8} xxl={6}>
              {children}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default AuthWrapper;
