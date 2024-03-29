import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

// custom hook, util func, ...
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getUserReq } from "../../features/user/userAction";

// Component Injected
import Padding from "../../components/Padding";
import Header from "./Header";
import Sidebar from "../../components/Sidebar";
import PublicProfile from "./PublicProfile";
import UpdateInfo from "./UpdateInfo";
import ChangePassword from "./ChangePassword";

const AccountSettingSection = () => {
  const optionSelected = useSelector((state) => state.navbar.sidebar.active);

  return (
    <>
      {optionSelected === "public profile" ? (
        <PublicProfile optionSelected={optionSelected} />
      ) : optionSelected === "update information" ? (
        <UpdateInfo optionSelected={optionSelected} />
      ) : (
        optionSelected === "change password" && (
          <ChangePassword optionSelected={optionSelected} />
        )
      )}
    </>
  );
};

const ViewDesktop = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);

  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  useEffect(() => {
    getUserReq(user.user_id, axiosPrivate, dispatch);

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
          <Col lg="9">
            <AccountSettingSection />
          </Col>
        </Row>
      </Container>
      <Padding />
    </>
  );
};

export default ViewDesktop;
