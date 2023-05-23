import React, { Fragment, useEffect, useState } from "react";

import classNames from "classnames/bind";
import styles from "./AuthForm.module.scss";

import useForm from "../../hooks/useForm";
import Input from "../Input/Input";
import Button from "../Button/Button";
import ERROR_MESSAGES from "../Input/InputErrorMessage";
import * as validateMethod from "../../utils/Validator";

const cx = classNames.bind(styles);

function AuthForm() {
  const [formState, handleInput, setFormData] = useForm(
    { firstName: "", lastName: "", email: "", password: "" },
    {
      firstName: true,
      lastName: true,
      email: false,
      password: false,
    }
  );

  const formData = formState.inputs;
  const formStatus = formState.statuses;

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [buttonState, setButtonState] = useState("inactive");
  const [pageTitle, setPageTitle] = useState("Login now to start shopping!");

  document.title = pageTitle;

  const handleSwitchMode = () => {
    if (isLoginMode) {
      setFormData(
        { ...formData, firstName: "", lastName: "", password: "" },
        { ...formStatus, firstName: false, lastName: false, password: false }
      );
      setPageTitle("Sign up today!");
    } else {
      setFormData(
        { ...formData, firstName: "", lastName: "", password: "" },
        { ...formStatus, firstName: true, lastName: true, password: false }
      );
      setPageTitle("Login now to start shopping!");
    }
    setIsLoginMode((prevMode) => !prevMode);
    setButtonState("inactive");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  useEffect(() => {
    buttonSwitchState(formStatus);
  }, [formStatus]);

  const buttonSwitchState = ({ firstName, lastName, email, password }) => {
    /* When all field are valid turn on the button */
    return firstName && lastName && email && password
      ? setButtonState("active")
      : setButtonState("inactive");
  };

  /* Auth Form components */
  const FormHeader = () => {
    return (
      <div className={cx("header")}>
        {isLoginMode ? "Welcome Back" : "Join Atlana Family"}
      </div>
    );
  };

  const Separator = ({ content }) => {
    return (
      <div
        className={content ? cx("separator") : cx("separator", "no-content")}
      >
        {content}
      </div>
    );
  };

  const SocialAuth = () => {
    return (
      isLoginMode && (
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
      )
    );
  };

  const FormSwitch = () => {
    return (
      <div className={cx("switch-mode")}>
        {isLoginMode ? "Do not have an account?" : "Already have an account?"}
        <span className={cx("switch-mode__btn")} onClick={handleSwitchMode}>
          {isLoginMode ? "Sign up now!" : "Sign in now!"}
        </span>
      </div>
    );
  };

  return (
    <Fragment>
      <FormHeader />
      <form className={cx("form-body")} onSubmit={handleSubmit}>
        {!isLoginMode && (
          <>
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
          </>
        )}
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
          validator={
            !isLoginMode
              ? {
                  validateMethod: validateMethod.isLengthValid,
                  errorMsg: ERROR_MESSAGES.lengthError,
                }
              : null
          }
          extraElements={!isLoginMode ? ["passwordStrengthBar"] : null}
        />
        <Button
          styles={`box-style-cm sign-up-style mg-tb-4 ${buttonState}`}
          type={"submit"}
          title={isLoginMode ? "Sign In" : "Sign Up"}
        />
      </form>
      <SocialAuth />
      <FormSwitch />
    </Fragment>
  );
}

export default AuthForm;
