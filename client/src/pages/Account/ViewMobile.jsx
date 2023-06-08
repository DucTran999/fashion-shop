import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getUserReq } from "../../features/user/userRequest";

// Component
import Padding from "../../components/Padding";
import HorizontalBar from "../../components/HorizontalBar";
import PublicProfile from "./PublicProfile";
import UpdateInfo from "./UpdateInfo";
import ChangePassword from "./ChangePassword";

const AccountSettingSection = () => {
  const optionSelected = useSelector((state) => state.navbar?.sidebar.active);

  return (
    <>
      {optionSelected === "Public profile" ? (
        <PublicProfile />
      ) : optionSelected === "Update information" ? (
        <UpdateInfo />
      ) : (
        optionSelected === "Change password" && <ChangePassword />
      )}
    </>
  );
};

const ViewTablet = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);

  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  useEffect(() => {
    getUserReq(user.user_id, axiosPrivate, dispatch);

    // eslint-disable-next-line
  }, []);

  const accountSettingOptions = [
    { title: "Public profile" },
    { title: "Update information" },
    { title: "Change password" },
  ];

  return (
    <>
      <Container>
        <Row>
          <HorizontalBar options={accountSettingOptions} />
        </Row>
        <Row>
          <Col xs="12">
            <AccountSettingSection />
          </Col>
        </Row>
      </Container>
      <Padding />
    </>
  );
};

export default ViewTablet;
