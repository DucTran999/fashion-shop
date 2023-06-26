import React, { useReducer } from "react";

import classNames from "classnames/bind";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import styles from "./Input.module.scss";

const cx = classNames.bind(styles);

const inputReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_ERROR":
      return { ...state, errorMessage: action.errorMsg };
    case "INPUT_TYPE_CHANGE":
      return { ...state, inputType: action.inputType, toggleEye: action.eye };
    default:
      return state;
  }
};

const Input = (props) => {
  const { fieldName, labelTitle, value, onInput, validator, extraElements } =
    props;

  const [inputState, dispatch] = useReducer(inputReducer, {
    inputType: fieldName === "password" ? "password" : "text",
    errorMessage: "",
    toggleEye: "show",
  });

  const { inputType, errorMessage, toggleEye } = inputState;

  /* Send data to form */
  const handleInputChange = (input) => {
    onInput(fieldName, input, validate(input));
  };

  /* Validating input if validation suite is given. */
  const validate = (input) => {
    if (validator) {
      let isValid = validator.validateMethod(input.trim());
      isValid
        ? dispatch({ type: "INPUT_ERROR", errorMsg: "" })
        : dispatch({ type: "INPUT_ERROR", errorMsg: validator.errorMsg });
      return isValid;
    }
    return input.length > 0;
  };

  /* Switch show-hide password */
  const handleToggleEyeClicked = () => {
    toggleEye === "show"
      ? dispatch({ type: "INPUT_TYPE_CHANGE", inputType: "text", eye: "hide" })
      : dispatch({
          type: "INPUT_TYPE_CHANGE",
          inputType: "password",
          eye: "show",
        });
  };

  return (
    <div className={cx("input-box")}>
      <input
        id={labelTitle}
        className={cx("input-box__fill")}
        type={inputType}
        value={value}
        onChange={(event) => handleInputChange(event.target.value)}
        required
      />
      <label htmlFor={labelTitle} className={cx("input-box__label")}>
        {labelTitle}
      </label>
      <span className={cx("input-box__access-signal")}></span>
      <span className={cx("input-box__error-msg")}>{errorMessage}</span>
      {fieldName === "password" && (
        <span className={cx("input-box__eye")} onClick={handleToggleEyeClicked}>
          {toggleEye}
        </span>
      )}
      {extraElements && extraElements.includes("passwordStrengthBar") && (
        <PasswordStrengthMeter password={value} />
      )}
    </div>
  );
};

export default Input;
