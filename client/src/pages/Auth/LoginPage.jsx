import React, { Fragment, useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Util
import LOCAL_STORAGE_KEY from "../../api/init.localStorage";
import useRefreshToken from "../../hooks/useRefreshToken";
import ERROR_MESSAGES from "../../components/Input/InputErrorMessage";
import * as validateMethod from "../../utils/Validator";
import { logInReq } from "../../features/auth/apiRequest";
import { sendNewVerifyEmailReq } from "../../features/email/emailAction";
import { EMAIL_TYPE } from "../../utils/constVariable";

// Component
import useForm from "../../hooks/useForm";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ModalContainer from "../../components/Modal/ModalContainer";
import Popup from "../../components/Modal/PopupContainer";
import {
  LoadingAlert,
  ErrorAlert,
  ConfirmAlert,
} from "../../components/Modal/PopupVariant";
import SocialAuth from "./SocialAuth";
import FormSwitch from "./FormSwitch";

// Style
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
const cx = classNames.bind(styles);

function LoginPage() {
  document.title = "Login to start shopping!";

  const refresh = useRefreshToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isMounted = useRef(false);

  const from = location.state?.from?.pathname || "/";

  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState("loading");

  const [formState, handleInput] = useForm(
    { email: "", password: "" },
    { email: false, password: false }
  );

  const formData = formState.inputs;
  const formStatus = formState.statuses;

  const loginLoading = useSelector((state) => state.auth.login.isFetching);
  const errorCause = useSelector((state) => state.auth.login.errorCause);
  const resending = useSelector(
    (state) => state.email.sendVerifyEmail.isSending
  );
  const resendError = useSelector(
    (state) => state.email.sendVerifyEmail.errorCause
  );

  const [buttonState, setButtonState] = useState("inactive");

  // Handle button click event
  const handleSubmit = async (event) => {
    event.preventDefault();
    document.body.style.overflow = "hidden";
    setShowModal(true);

    const user = {
      email: formData.email,
      password: formData.password,
    };
    if (showModal === false) {
      await logInReq(user, dispatch, navigate, from);
    }
  };

  useEffect(() => {
    const refreshTokenIfLogged = async () => {
      if (localStorage.getItem(LOCAL_STORAGE_KEY.isLogged) === "true") {
        const newAccessToken = await refresh();

        // If refresh success redirect to home page
        if (newAccessToken) {
          navigate(from, { replace: true });
        }
      }
    };

    if (!isMounted.current) {
      isMounted.current = true;
      refreshTokenIfLogged();
    }

    document.body.style.overflowY = "scroll";

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (loginLoading) {
      setAlert("loading");
      setShowModal(true);
    } else if (errorCause) {
      setAlert("error");
      setShowModal(true);
    }
  }, [loginLoading, errorCause]);

  useEffect(() => {
    if (resendError) {
      document.body.style.overflowY = "scroll";
      setShowModal(false);
    }
  }, [resendError]);

  // Change button state by form status
  useEffect(() => {
    const buttonSwitchState = ({ email, password }) => {
      /* When all field are valid turn on the button */
      return email && password
        ? setButtonState("active")
        : setButtonState("inactive");
    };

    buttonSwitchState(formStatus);
  }, [formStatus]);

  /* Modal */
  const LoginModal = () => {
    const handleCloseModal = () => {
      document.body.style.overflowY = "scroll";
      setShowModal(false);
    };

    const handleResendUnlockAccountEmail = async () => {
      const payload = {
        email: formData.email.toLowerCase().trim(),
        first_name: "customer",
        service: EMAIL_TYPE.unlockAccount,
      };
      if (!resending) await sendNewVerifyEmailReq(payload, dispatch);
    };

    return (
      <ModalContainer>
        <Popup header="Announcement">
          {alert === "loading" && <LoadingAlert />}
          {alert === "error" &&
            (errorCause.includes("Lockout") ? (
              <ConfirmAlert
                message={errorCause}
                actionTitle={"Resend unlock email"}
                onAction={handleResendUnlockAccountEmail}
                onClose={handleCloseModal}
              />
            ) : (
              <ErrorAlert message={errorCause} onClose={handleCloseModal} />
            ))}
        </Popup>
      </ModalContainer>
    );
  };

  return (
    <Fragment>
      {showModal && <LoginModal />}
      <div className={cx("header")}>Welcome Back</div>;
      <form className={cx("form-body")} onSubmit={handleSubmit}>
        <Input
          fieldName="email"
          labelTitle="Email"
          value={formData.email}
          onInput={handleInput}
          validator={{
            validateMethod: validateMethod.isEmail,
            errorMsg: ERROR_MESSAGES.emailInvalid,
          }}
        />
        <Input
          fieldName="password"
          labelTitle="Password"
          value={formData.password}
          onInput={handleInput}
        />
        <Button
          styles={`box-style-cm sign-up-style mg-tb-4 ${buttonState}`}
          type={"submit"}
          title="Sign In"
        />
      </form>
      <SocialAuth />
      <FormSwitch currentMode="login" />
    </Fragment>
  );
}

export default LoginPage;
