import React, { Fragment, useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useRefreshToken from "../../hooks/useRefreshToken";

import LOCAL_STORAGE_KEY from "../../api/init.localStorage";

// Component
import useForm from "../../hooks/useForm";
import Input from "../Input/";
import Button from "../Button/Button";
import ModalContainer from "../Modal/ModalContainer";
import Popup from "../Modal/PopupContainer";
import { LoadingAlert, ErrorAlert } from "../Modal/PopupVariant";

// Util
import ERROR_MESSAGES from "../Input/InputErrorMessage";
import * as validateMethod from "../../utils/Validator";
import { loginUser } from "../../features/auth/apiRequest";

// Style
import classNames from "classnames/bind";
import styles from "./LoginForm.module.scss";
const cx = classNames.bind(styles);

const Separator = ({ content }) => {
  return (
    <div className={content ? cx("separator") : cx("separator", "no-content")}>
      {content}
    </div>
  );
};

const SocialAuth = () => {
  return (
    <Fragment>
      <Separator content="OR" />
      <div className={cx("social-auth-list")}>
        <Button
          linkTo="/Facebook"
          styles={"box-style-cm mg-tb-1 active"}
          titleStyles={"sm-icon-title"}
          type={"linkOut"}
          icon={"facebook"}
          title={"Login with Facebook"}
        />
        <Button
          linkTo="/Google"
          styles={"box-style-cm mg-tb-1 active"}
          titleStyles={"sm-icon-title"}
          type={"linkOut"}
          icon={"google"}
          title={"Login with Google"}
        />
      </div>
      <Separator />
    </Fragment>
  );
};

function LoginForm() {
  document.title = "Login to start shopping!";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const refresh = useRefreshToken();
  const isMounted = useRef(false);

  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState("loading");

  const [formState, handleInput] = useForm(
    {
      email: "",
      password: "",
    },
    {
      email: false,
      password: false,
    }
  );

  const formData = formState.inputs;
  const formStatus = formState.statuses;

  const loginLoading = useSelector((state) => state.auth.login?.isFetching);
  const errorCause = useSelector((state) => state.auth.login?.errorCause);

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
    await loginUser(user, dispatch, navigate, from);
  };

  const handleCloseModal = () => {
    document.body.style.overflowY = "scroll";
    setShowModal(false);
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
    window.scrollTo(120, 0);

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (loginLoading) {
      setShowModal(true);
      setAlert("loading");
    } else if (errorCause) {
      setShowModal(true);
      setAlert("error");
    }
  }, [loginLoading, errorCause]);

  useEffect(() => {
    buttonSwitchState(formStatus);
  }, [formStatus]);

  const buttonSwitchState = ({ email, password }) => {
    /* When all field are valid turn on the button */
    return email && password
      ? setButtonState("active")
      : setButtonState("inactive");
  };

  /* Modal */
  const LoginModal = () => {
    return (
      <ModalContainer>
        <Popup header="Announcement">
          {alert === "loading" && <LoadingAlert />}
          {alert === "error" && (
            <ErrorAlert message={errorCause} onClose={handleCloseModal} />
          )}
        </Popup>
      </ModalContainer>
    );
  };

  /* Auth Form components */
  const FormHeader = () => {
    return <div className={cx("header")}>Welcome Back</div>;
  };

  const FormSwitch = () => {
    return (
      <div className={cx("switch-mode")}>
        Do not have an account?
        <span
          className={cx("switch-mode__btn")}
          onClick={() => navigate("/register", { replace: true })}
        >
          Sign up now!
        </span>
      </div>
    );
  };

  return (
    <Fragment>
      {showModal && <LoginModal />}
      <FormHeader />
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
      <FormSwitch />
    </Fragment>
  );
}

export default LoginForm;
