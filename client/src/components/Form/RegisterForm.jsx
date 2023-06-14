import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useForm from "../../hooks/useForm";

// Component
import ModalContainer from "../Modal/ModalContainer";
import Popup from "../Modal/PopupContainer";
import Input from "../Input/";
import Button from "../Button/Button";
import {
  LoadingAlert,
  SuccessAlertNavigate,
  ErrorAlert,
} from "../Modal/PopupVariant";

// Util
import ERROR_MESSAGES from "../Input/InputErrorMessage";
import * as validateMethod from "../../utils/Validator";
import { registerUser } from "../../features/auth/apiRequest";

// Style
import classNames from "classnames/bind";
import styles from "./RegisterForm.module.scss";
const cx = classNames.bind(styles);

function RegisterForm() {
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
  const registerSuccess = useSelector((state) => state.auth.register.success);
  const registerError = useSelector((state) => state.auth.register.error);
  const errorCause = useSelector((state) => state.auth.register.errorCause);

  const [formState, handleInput] = useForm(
    { firstName: "", lastName: "", email: "", password: "" },
    {
      firstName: false,
      lastName: false,
      email: false,
      password: false,
    }
  );

  const formData = formState.inputs;
  const formStatus = formState.statuses;

  /* Handle button click event */
  const handleCloseModal = () => {
    setShowModal(false);
    document.body.style.overflowY = "scroll";
  };

  const handleSwitchForm = () => {
    navigate("/login", { replace: true });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowModal(true);
    document.body.style.overflow = "hidden";

    // api accept fields with snake_case
    const user = {
      first_name: formData.firstName.toString().trim(),
      last_name: formData.lastName.toString().trim(),
      email: formData.email.toString().trim(),
      password: formData.password.toString().trim(),
    };

    await registerUser(user, dispatch, navigate);
  };

  /* Handle Side Effect */
  useEffect(() => {
    if (registerLoading) {
      setAlert("loading");
    } else if (registerSuccess) {
      setAlert("success");
    } else if (registerError) {
      setAlert("error");
    }
    // eslint-disable-next-line
  }, [registerLoading, registerSuccess, registerError]);

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
    return (
      <ModalContainer>
        <Popup header="Announcement">
          {alert === "loading" && <LoadingAlert />}
          {alert === "success" && (
            <SuccessAlertNavigate
              onClickEvent={() => {
                navigate("/login", { replace: true });
              }}
              message="Thank you"
              btnTitle="Return to Login Page"
            />
          )}
          {alert === "error" && (
            <ErrorAlert message={errorCause} onClose={handleCloseModal} />
          )}
        </Popup>
      </ModalContainer>
    );
  };

  const FormHeader = () => {
    return <div className={cx("header")}>Join Atlana Family</div>;
  };

  const FormSwitch = () => {
    return (
      <div className={cx("switch-mode")}>
        Already have an account?
        <span className={cx("switch-mode__btn")} onClick={handleSwitchForm}>
          Sign in now!
        </span>
      </div>
    );
  };

  return (
    <Fragment>
      {showModal && <RegisterPopup />}
      <FormHeader />
      <form className={cx("form-body")} onSubmit={handleSubmit}>
        <Input
          fieldName="firstName"
          labelTitle="First name"
          value={formData.firstName}
          onInput={handleInput}
          validator={{
            validateMethod: validateMethod.isName,
            errorMsg: ERROR_MESSAGES.nameInvalid,
          }}
        />
        <Input
          fieldName="lastName"
          labelTitle="Last name"
          value={formData.lastName}
          onInput={handleInput}
          validator={{
            validateMethod: validateMethod.isName,
            errorMsg: ERROR_MESSAGES.nameInvalid,
          }}
        />
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
          validator={{
            validateMethod: validateMethod.isLengthValid,
            errorMsg: ERROR_MESSAGES.lengthError,
          }}
          extraElements={["passwordStrengthBar"]}
        />
        <Button
          styles={`box-style-cm sign-up-style mg-tb-4 ${buttonState}`}
          type={"submit"}
          title="Sign Up"
        />
      </form>
      <FormSwitch />
    </Fragment>
  );
}

export default RegisterForm;
