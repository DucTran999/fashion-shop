import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

// custom hook, util, helper func
import IMAGES from "../../../assets/images";
import ICONS from "../../../assets/icons";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { getUserReq, updateUserReq } from "../../../features/user/userRequest";
import { resetUpdateState } from "../../../features/user/userSlice";

// Component Injected
import ErrorBlock from "../../../components/ErrorBlock";
import SectionHeader from "../../../components/SectionHeader";
import Padding from "../../../components/Padding";
import Dropdown from "../../../components/Dropdown";
import FormInput from "./FormInput";

// Style
import classNames from "classnames/bind";
import style from "./UpdateInfo.module.scss";
const cx = classNames.bind(style);

const FormChangeInfo = ({ userInfo }) => {
  const isLoading = useSelector((state) => state.user.update.isLoading);
  const isSuccess = useSelector((state) => state.user.update.success);
  const errorCause = useSelector((state) => state.user.update.errorCause);

  const [user, setUser] = useState(userInfo);

  const isMounted = useRef(false);
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const userPhone = useRef(user.phone);
  const userEmail = useRef(user.email);

  const handleOnInputChange = (field, value) => {
    setUser({ ...user, [field]: value });
  };

  const handleOnOptionChange = (value) => {
    setUser({ ...user, gender: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    await updateUserReq(user.user_id, user, axiosPrivate, dispatch);
    await getUserReq(user.user_id, axiosPrivate, dispatch);
  };

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      dispatch(resetUpdateState());
    }

    // eslint-disable-next-line
  }, []);

  return (
    <form onSubmit={handleOnSubmit} className={cx("form-profile")}>
      {(!userEmail.current || !userPhone.current) && (
        <div className={cx("form-alert")}>Please update phone, email</div>
      )}
      <FormInput
        label="First Name (Cannot empty or over 32 letters)"
        inputVal={user.first_name}
        field="first_name"
        onInputChange={handleOnInputChange}
      />
      <FormInput
        label="Last Name (Cannot empty or over 32 letters)"
        inputVal={user.last_name}
        field="last_name"
        onInputChange={handleOnInputChange}
      />
      <FormInput
        label="Phone (E.g: 0123456789)"
        inputVal={user.phone || ""}
        field="phone"
        onInputChange={handleOnInputChange}
        notRequire={true}
      />
      <FormInput
        label="Address"
        inputVal={user.address || ""}
        field="address"
        onInputChange={handleOnInputChange}
        notRequire={true}
      />
      <Dropdown
        title="Gender"
        name="dropdown-gender"
        onOptionChange={handleOnOptionChange}
        optionSelected={user.gender}
      />
      <Padding />
      <button
        className={cx("submit-btn", isLoading ? "inactive" : "active")}
        type="submit"
      >
        Update
      </button>
      {isLoading ? (
        <div className={cx("announcement", "loading")}>{ICONS.loading}</div>
      ) : isSuccess ? (
        <div className={cx("announcement", "success")}>Update Success</div>
      ) : (
        <div className={cx("announcement", "error")}>{errorCause}</div>
      )}
    </form>
  );
};

const InfoSection = ({ userInfo }) => {
  return (
    <Row className={cx("info-section-wrap")}>
      <Col xs="12" md="12" lg="8">
        <FormChangeInfo userInfo={userInfo} />
      </Col>
      <Col xs="12" md="12" lg="4">
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

const UpdateInfo = ({ optionSelected }) => {
  const isMounted = useRef(false);

  const user = useSelector((state) => state.auth.login.currentUser);

  const userInfo = useSelector((state) => state.user.get.info);
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
    <Container className={cx("page-wrap")}>
      <Row>
        <SectionHeader title={optionSelected} />
      </Row>
      {errorCause ? (
        <ErrorBlock msg={errorCause} />
      ) : (
        userInfo && <InfoSection userInfo={userInfo} />
      )}
    </Container>
  );
};

export default React.memo(UpdateInfo);
