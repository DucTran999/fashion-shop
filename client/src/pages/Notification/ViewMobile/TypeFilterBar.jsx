import React from "react";
import { Container, Row } from "react-bootstrap";

import HorizontalBar from "../../../components/HorizontalBar";

const TypeFilterBar = () => {
  const options = [
    { title: "news" },
    { title: "promotions" },
    { title: "orders" },
  ];
  return (
    <Container>
      <Row>
        <HorizontalBar options={options} />
      </Row>
    </Container>
  );
};

export default TypeFilterBar;
