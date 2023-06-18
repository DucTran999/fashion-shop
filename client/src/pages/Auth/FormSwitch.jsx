import React from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import {
  resetLoginState,
  resetRegisterState,
} from "../../features/auth/authSlice";

// Style
import classNames from "classnames/bind";
import styles from "./FormSwitch.module.scss";
const cx = classNames.bind(styles);

const FormSwitch = ({ currentMode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSwitchFormOnClick = (e) => {
    e.preventDefault();
    const linkTo = currentMode === "login" ? "/register" : "/login";
    currentMode === "login"
      ? dispatch(resetLoginState())
      : dispatch(resetRegisterState());
    navigate(linkTo, { replace: true });
  };

  return (
    <div className={cx("switch-mode")}>
      {currentMode === "login"
        ? "Do not have an account?"
        : "Already have an account?"}
      <span
        className={cx("switch-mode__btn")}
        onClick={handleSwitchFormOnClick}
      >
        {currentMode === "login" ? "Sign up now!" : "Sign in now!"}
      </span>
    </div>
  );
};

export default FormSwitch;
