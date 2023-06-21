import React, { useEffect, useRef, memo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

// custom hook, util, helper func
import IMAGES from "../../../assets/images";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { formatCapitalize } from "../../../utils/formatData";
import { getUserReq } from "../../../features/user/userRequest";

// Component Injected
import PageSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import SectionHeader from "../../../components/SectionHeader";
import ErrorBlock from "../../../components/ErrorBlock";
import Padding from "../../../components/Padding";

// Style
import classNames from "classnames/bind";
import style from "./PublicProfile.module.scss";
const cx = classNames.bind(style);

const InformationSection = memo(({ userInfo }) => {
  return (
    <div className={cx("form-profile")}>
      <div className={cx("input-label")}>Name</div>
      <div className={cx("form-inp")}>
        {formatCapitalize(`${userInfo.first_name} ${userInfo.last_name}`)}
      </div>
      <div className={cx("input-label")}>Email</div>
      <div className={cx("form-inp")}>{userInfo.email}</div>

      <div className={cx("input-label")}>Phone</div>
      <div className={cx("form-inp")}>{userInfo.phone || "Not set"}</div>

      <div className={cx("input-label")}>Address</div>
      <div className={cx("form-inp")}>{userInfo.address || "Not set"}</div>

      <div className={cx("input-label")}>Gender</div>
      <div className={cx("form-inp")}>
        {userInfo.gender ? formatCapitalize(userInfo.gender) : "Not set"}
      </div>
      <Padding />
    </div>
  );
});

const ProfileSection = ({ userInfo }) => {
  return (
    <Row className={cx("profile-layout")}>
      <Col sx="12" md="12" lg="8">
        <InformationSection userInfo={userInfo} />
      </Col>
      <Col sx="auto" md="auto" lg="4">
        <div className={cx("avatar-wrap")}>
          <div className={cx("avatar-title")}>Profile Picture</div>
          <img
            className={cx("avatar-img")}
            src={IMAGES.defaultAvatar}
            alt="avatar"
          />
        </div>
        <Padding />
      </Col>
    </Row>
  );
};

const PublicProfile = ({ optionSelected }) => {
  const isMounted = useRef(false);

  const user = useSelector((state) => state.auth.login.currentUser);

  const userInfo = useSelector((state) => state.user.get.info);
  const isLoading = useSelector((state) => state.user.get.isLoading);
  const errorCause = useSelector((state) => state.user.get.errorCause);

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;

      if (user && !userInfo) getUserReq(user.user_id, axiosPrivate, dispatch);
    }

    // eslint-disable-next-line
  }, []);

  return (
    <Container className={cx("profile-wrap")}>
      <Row>
        <SectionHeader title={optionSelected} />
      </Row>
      {isLoading ? (
        <PageSpinner />
      ) : errorCause ? (
        <ErrorBlock msg={errorCause} />
      ) : (
        userInfo && <ProfileSection userInfo={userInfo} />
      )}
    </Container>
  );
};

export default React.memo(PublicProfile);
