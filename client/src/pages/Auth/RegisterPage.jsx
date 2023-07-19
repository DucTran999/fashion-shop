import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Hooks, utils, redux, ...
import useForm from "../../hooks/useForm";
import socket from "../../utils/initSocket";
import * as validateMethod from "../../utils/inputValidation";
import { EMAIL_TYPE, INPUT_ERROR_MESSAGE } from "../../utils/constVariable";
import { registerReq } from "../../features/auth/authAction";
import { sendNewVerifyEmailReq } from "../../features/email/emailAction";

// Component
import FormSwitch from "./FormSwitch";
import {
  LoadingAlert,
  ConfirmAlert,
  ErrorAlert,
} from "../../components/Modal/PopupVariant";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Popup from "../../components/Modal/PopupContainer";
import ModalContainer from "../../components/Modal/ModalContainer";

// Style
import classNames from "classnames/bind";
import styles from "./RegisterPage.module.scss";
const cx = classNames.bind(styles);

function RegisterPage() {
  document.title = "Be part of our family!";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState("loading");
  const [buttonState, setButtonState] = useState("inactive");

  // Consuming redux
  const registerLoading = useSelector(
    (state) => state.auth.register.isFetching
  );
  const errorCause = useSelector((state) => state.auth.register.errorCause);
  const isSending = useSelector(
    (state) => state.email.sendVerifyEmail.isSending
  );
  const resendFailed = useSelector(
    (state) => state.email.sendVerifyEmail.errorCause
  );

  const [formState, handleInput] = useForm(
    { firstName: "", lastName: "", email: "", password: "" },
    { firstName: false, lastName: false, email: false, password: false }
  );

  const formData = formState.inputs;
  const formStatus = formState.statuses;

  const handleSubmit = async (e) => {
    e.preventDefault();
    document.body.style.overflow = "hidden";
    setShowModal(true);

    // api accept fields with snake_case
    const user = {
      first_name: String(formData.firstName).trim(),
      last_name: String(formData.lastName).trim(),
      email: String(formData.email).trim(),
      password: String(formData.password).trim(),
    };

    if (showModal === false) {
      await registerReq(user, dispatch);
    }
  };

  const handleResendVerifyEmail = async () => {
    const payload = {
      email: formData.email.trim().toLowerCase(),
      first_name: formData.firstName.trim().toLowerCase(),
      service: EMAIL_TYPE.newRegister,
    };
    if (!isSending) {
      await sendNewVerifyEmailReq(payload, dispatch);
    }
  };

  // Listen verify action success navigate to login page
  useEffect(() => {
    const onVerify = (message) => {
      console.log(message);
      navigate("/login", { replace: true });
    };
    socket.on("verify-email-registration", onVerify);

    return () => {
      socket.off("verify-email-registration", onVerify);
    };

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (resendFailed) {
      setShowModal(false);
      document.body.style.overflowY = "scroll";
    }
  }, [resendFailed]);

  useEffect(() => {
    if (registerLoading) {
      setAlert("loading");
    } else if (errorCause) {
      setAlert("error");
    } else {
      setAlert("success");
    }
    // eslint-disable-next-line
  }, [registerLoading, errorCause]);

  useEffect(() => {
    const buttonSwitchState = ({ firstName, lastName, email, password }) => {
      /* When all field are valid turn on the button */
      return firstName && lastName && email && password
        ? setButtonState("active")
        : setButtonState("inactive");
    };

    buttonSwitchState(formStatus);

    // eslint-disable-next-line
  }, [formStatus]);

  /* Register Form components */
  const RegisterPopup = () => {
    const handleCloseModal = () => {
      setShowModal(false);
      document.body.style.overflowY = "scroll";
    };

    return (
      <ModalContainer>
        <Popup header="Announcement">
          {alert === "loading" ? (
            <LoadingAlert />
          ) : alert === "success" ? (
            <ConfirmAlert
              alertStyle="success"
              message="A verified email has been sent!"
              actionTitle="Resend verify email"
              onAction={handleResendVerifyEmail}
              onClose={handleCloseModal}
            />
          ) : (
            alert === "error" &&
            (errorCause.includes("verify") ? (
              <ConfirmAlert
                alertStyle="success"
                message="A verified email has been sent!"
                actionTitle="Resend verify email"
                onAction={handleResendVerifyEmail}
                onClose={handleCloseModal}
              />
            ) : (
              <ErrorAlert message={errorCause} onClose={handleCloseModal} />
            ))
          )}
        </Popup>
      </ModalContainer>
    );
  };

  return (
    <Fragment>
      {showModal && <RegisterPopup />}
      <div className={cx("header")}>Join Atlana Family</div>;
      <form className={cx("form-body")} onSubmit={handleSubmit}>
        <Input
          fieldName="firstName"
          labelTitle="First name"
          value={formData.firstName}
          onInput={handleInput}
          validator={{
            validateMethod: validateMethod.isName,
            errorMsg: INPUT_ERROR_MESSAGE.nameInvalid,
          }}
        />
        <Input
          fieldName="lastName"
          labelTitle="Last name"
          value={formData.lastName}
          onInput={handleInput}
          validator={{
            validateMethod: validateMethod.isName,
            errorMsg: INPUT_ERROR_MESSAGE.nameInvalid,
          }}
        />
        <Input
          fieldName="email"
          labelTitle="Email"
          value={formData.email}
          onInput={handleInput}
          validator={{
            validateMethod: validateMethod.isEmail,
            errorMsg: INPUT_ERROR_MESSAGE.emailInvalid,
          }}
        />
        <Input
          fieldName="password"
          labelTitle="Password"
          value={formData.password}
          onInput={handleInput}
          validator={{
            validateMethod: validateMethod.isPasswordStrong,
            errorMsg: INPUT_ERROR_MESSAGE.passwordWeak,
          }}
          extraElements={["passwordStrengthBar"]}
        />
        <Button
          styles={`box-style-cm sign-up-style mg-tb-4 ${buttonState}`}
          type="submit"
          title="Sign Up"
        />
      </form>
      <FormSwitch currentMode="register" />
    </Fragment>
  );
}

export default RegisterPage;
