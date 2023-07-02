import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row } from "react-bootstrap";

import ICONS from "../../assets/icons";
import { verifyEmailReq } from "../../features/user/userRequest";

import classNames from "classnames/bind";
import style from "./VerificationEmail.module.scss";
const cx = classNames.bind(style);

const Verifying = () => {
  return (
    <Row>
      <div className={cx("icon")}>{ICONS.loading}</div>
      <div className={cx("header")}>Verifying Email...</div>
    </Row>
  );
};

const VerifySuccess = () => {
  const navigate = useNavigate();

  return (
    <Row className={cx("row-cent")}>
      <div className={cx("icon")}>{ICONS.checkCircle}</div>
      <div className={cx("header")}>Verified!</div>
      <div className={cx("message")}>
        You have successfully verified account.
      </div>
      <button
        className={cx("btn-action")}
        onClick={() => navigate("/login", { replace: true })}
      >
        Login Now!
      </button>
    </Row>
  );
};

const VerifyError = ({ errorMsg }) => {
  return (
    <Row className={cx("row-cent")}>
      <div className={cx("icon", "error-clr")}>{ICONS.errorCircle}</div>
      <div className={cx("header", "error-clr")}>
        Sorry, verification failed!
      </div>
      <div className={cx("message")}>{errorMsg}</div>
    </Row>
  );
};

const VerificationEmail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isMounted = useRef(false);

  const dirs = location.pathname.split("/");

  const isVerifying = useSelector(
    (state) => state.user.verifyEmail.isVerifying
  );
  const errorCause = useSelector((state) => state.user.verifyEmail.errorCause);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      verifyEmailReq(dirs[3], dirs[4], dispatch);
    }

    // eslint-disable-next-line
  }, []);

  return (
    <main className={cx("theme")}>
      <Container className={cx("main-layout")}>
        {isVerifying ? (
          <Verifying />
        ) : errorCause ? (
          <VerifyError errorMsg={errorCause} />
        ) : (
          <VerifySuccess />
        )}
      </Container>
    </main>
  );
};

export default VerificationEmail;
