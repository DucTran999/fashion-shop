import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import classNames from "classnames/bind";
import style from "./SectionSeparator.module.scss";
const cx = classNames.bind(style);

function SectionSeparator({ title }) {
  return (
    <Container>
      <Row>
        <Col>
          <div className={cx("title-style")}>{title}</div>;
        </Col>
      </Row>
    </Container>
  );
}

export default SectionSeparator;
