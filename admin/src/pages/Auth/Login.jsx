import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { loginReq } from "../../redux/auth/apiCall";

import classNames from "classnames/bind";
import style from "./Login.module.scss";

const cx = classNames.bind(style);

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState();
  const errorCause = useSelector((state) => state.auth.login.errorCause);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      email: formData.email,
      password: formData.password,
    };

    await loginReq(user, dispatch, navigate, from);
  };

  useEffect(() => {
    setErrorMsg(errorCause);
  }, [errorCause]);

  return (
    <Container>
      <Row className={cx("row-cen")}>
        <Col className={cx("col-cen", "header")}>Login</Col>
      </Row>
      <Row className={cx("row-cen")}>
        <Col className={cx("col-cen", "header")}>{errorMsg}</Col>
      </Row>
      <Row className={cx("col-cen")}>
        <Col md="8" className={cx("col-cen")}>
          <form className={cx("form")}>
            <input
              type="email"
              className={cx("form-control")}
              placeholder="email"
              onChange={(event) =>
                setFormData({ ...formData, email: event.target.value })
              }
            />
            <input
              type="password"
              className={cx("form-control")}
              placeholder="password"
              onChange={(event) =>
                setFormData({ ...formData, password: event.target.value })
              }
            />
            <input
              type="submit"
              className={cx("btn", "btn-submit")}
              value={"Sign In"}
              onClick={handleSubmit}
            />
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
