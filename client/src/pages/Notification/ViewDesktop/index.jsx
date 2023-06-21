import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

// custom hook, util func, ...
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { getUserReq } from "../../../features/user/userRequest";
import { updateSidebarSelection } from "../../../features/activeNav/navAction";

// Component Injected
import Padding from "../../../components/Padding";
import Header from "../../Account/Header";
import Sidebar from "../../../components/Sidebar";
import NotificationLayout from "./NotificationLayout";

const ViewDesktop = () => {
  const user = useSelector((state) => state.auth.login.currentUser);

  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  useEffect(() => {
    getUserReq(user.user_id, axiosPrivate, dispatch);
    updateSidebarSelection("news", dispatch);

    // eslint-disable-next-line
  }, []);

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
          <Col lg="9">{user && <NotificationLayout user={user} />}</Col>
        </Row>
      </Container>
      <Padding />
    </>
  );
};

export default ViewDesktop;
