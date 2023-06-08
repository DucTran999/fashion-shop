import React, { useState } from "react";

// Style
import classNames from "classnames/bind";
import style from "./FormInput.module.scss";
const cx = classNames.bind(style);

const Input = ({ label, field, inputVal, onInputChange }) => {
  const [fieldType, setFieldType] = useState("password");

  const handleToggleOnClick = () => {
    if (fieldType === "password") {
      setFieldType("text");
    } else {
      setFieldType("password");
    }
  };

  // TODO: need validate strong password
  return (
    <>
      <div className={cx("input-label")}>{label}</div>
      <div className={cx("input-wrap")}>
        <input
          type={fieldType}
          className={cx("form-inp")}
          onChange={(e) => onInputChange(field, e.target.value)}
          value={inputVal}
          required
        />
        <span className={cx("toggle")} onClick={handleToggleOnClick}>
          {fieldType === "password" ? "show" : "hide"}
        </span>
      </div>
    </>
  );
};

export default Input;
