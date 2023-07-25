import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import { formatCapitalizeFirstWord } from "../../utils/formatData";

import Padding from "../Padding";

import classNames from "classnames/bind";
import style from "./SectionSeparator.module.scss";
const cx = classNames.bind(style);

function SectionSeparator({ title, noPadding }) {
  return (
    <Container>
      <Row>
        <Col>
          <div className={cx("title-style")}>
            {formatCapitalizeFirstWord(title)}
          </div>
          {!noPadding && <Padding />}
        </Col>
      </Row>
    </Container>
  );
}

export default SectionSeparator;
