import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

// Component Injected
import Padding from "../../../components/Padding";
import NotificationLayout from "../CommonComponent/NotificationLayout";
import TypeFilterBar from "./TypeFilterBar";

const ViewMobile = () => {
  const user = useSelector((state) => state.auth.login.currentUser);

  return (
    <>
      <Container>
        <TypeFilterBar />
        <Row>
          <Col>{user && <NotificationLayout />}</Col>
        </Row>
      </Container>
      <Padding />
    </>
  );
};

export default ViewMobile;
