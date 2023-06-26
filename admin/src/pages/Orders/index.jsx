import React from "react";
import { Container, Row } from "react-bootstrap";

import Header from "../../layouts/Header";
import SearchBar from "./SearchBar";
import ListOrders from "./ListOrders";

const OrderManage = () => {
  return (
    <Container>
      <Header />
      <Row>
        <SearchBar />
        <ListOrders />
      </Row>
    </Container>
  );
};

export default OrderManage;
