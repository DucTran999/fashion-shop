import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

// Component Injected
import Padding from "../../../components/Padding";
import Header from "../../Account/Header";
import Sidebar from "../../../components/Sidebar";
import NotificationLayout from "./NotificationLayout";

const ViewDesktop = () => {
  const user = useSelector((state) => state.auth.login.currentUser);

  return (
    <>
      <Padding />
      <Container>
        <Row>
          <Header />
        </Row>
        <Padding />
        <Row>
          <Col lg="3" style={{ display: "flex", justifyContent: "center" }}>
            <Sidebar />
          </Col>
          <Col lg="9">{user && <NotificationLayout />}</Col>
        </Row>
      </Container>
      <Padding />
    </>
  );
};

export default ViewDesktop;
