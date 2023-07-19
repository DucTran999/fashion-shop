import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getUserReq } from "../../features/user/userAction";

// Component
import Padding from "../../components/Padding";
import HorizontalBar from "../../components/HorizontalBar";
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

const ViewMobile = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);

  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  useEffect(() => {
    getUserReq(user.user_id, axiosPrivate, dispatch);

    // eslint-disable-next-line
  }, []);

  const accountSettingOptions = [
    { title: "public profile" },
    { title: "update information" },
    { title: "change password" },
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

export default ViewMobile;
