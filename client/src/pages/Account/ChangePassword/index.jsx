import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

// custom hook, util, helper func
import ICONS from "../../../assets/icons";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { changePasswordReq } from "../../../features/user/userRequest";
import { resetUserChangePassState } from "../../../features/user/userSlice";

// Component Injected
import SectionHeader from "../../../components/SectionHeader";
import Padding from "../../../components/Padding";
import FormInput from "./FormInput";

// Style
import classNames from "classnames/bind";
import style from "./ChangePassword.module.scss";
const cx = classNames.bind(style);

const FormChangePassword = ({ userId }) => {
  const isLoading = useSelector((state) => state.user.changePass.isLoading);
  const isSuccess = useSelector((state) => state.user.changePass.success);
  const errorCause = useSelector((state) => state.user.changePass.errorCause);

  const [isPassMatch, setIsPassMatch] = useState(false);

  const [user, setUser] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const isMounted = useRef(false);
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const handleOnInputChange = (field, value) => {
    setUser({ ...user, [field]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      old_password: user.old_password,
      new_password: user.new_password,
    };
    setUser({
      ...user,
      new_password: "",
      old_password: "",
      confirm_password: "",
    });
    await changePasswordReq(userId, payload, axiosPrivate, dispatch);
  };

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      dispatch(resetUserChangePassState());
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (
      user.old_password &&
      user.new_password &&
      user.new_password === user.confirm_password &&
      user.new_password !== user.old_password
    ) {
      setIsPassMatch(true);
    } else {
      setIsPassMatch(false);
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <form onSubmit={handleOnSubmit} className={cx("form-profile")}>
      <FormInput
        label="Old password"
        inputVal={user.old_password}
        field="old_password"
        onInputChange={handleOnInputChange}
      />
      <FormInput
        label="New password"
        inputVal={user.new_password}
        field="new_password"
        onInputChange={handleOnInputChange}
      />
      <FormInput
        label="Re-enter new password"
        inputVal={user.confirm_password}
        field="confirm_password"
        onInputChange={handleOnInputChange}
      />
      <Padding />
      <div className={cx("btn-announcement-block")}>
        <button
          className={cx(
            "submit-btn",
            isLoading || !isPassMatch ? "inactive" : "active"
          )}
          type="submit"
        >
          Change password
        </button>
        {isLoading ? (
          <div className={cx("announcement", "loading")}>{ICONS.loading}</div>
        ) : isSuccess ? (
          <div className={cx("announcement", "success")}>Update Success</div>
        ) : (
          <div className={cx("announcement", "error")}>{errorCause}</div>
        )}
      </div>
    </form>
  );
};

const ChangePassword = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);

  return (
    <Container>
      <Row>
        <SectionHeader title="Change password" />
      </Row>
      <Row>
        <Col xs="12" lg="8">
          {user && <FormChangePassword userId={user.user_id} />}
        </Col>
      </Row>
    </Container>
  );
};

export default ChangePassword;
