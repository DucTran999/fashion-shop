import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import className from "classnames/bind";
import style from "./Announcement.module.scss";
const cx = className.bind(style);

function Announcement({ message }) {
  return (
    <Container>
      <Row>
        <Col>
          <div className={cx("announcement")}>Announcement: {message}</div>
        </Col>
      </Row>
    </Container>
  );
}

export default Announcement;
