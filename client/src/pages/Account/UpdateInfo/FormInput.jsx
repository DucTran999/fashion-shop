import React from "react";

// Style
import classNames from "classnames/bind";
import style from "./FormInput.module.scss";
const cx = classNames.bind(style);

const Input = ({ label, field, notRequire, inputVal, onInputChange }) => {
  return (
    <>
      <div className={cx("input-label")}>{label}</div>
      {notRequire ? (
        <input
          type="text"
          name={field}
          className={cx("form-inp")}
          onChange={(e) => onInputChange(field, e.target.value)}
          value={inputVal}
        />
      ) : (
        <input
          type="text"
          name={field}
          className={cx("form-inp")}
          onChange={(e) => onInputChange(field, e.target.value)}
          value={inputVal}
          required
        />
      )}
    </>
  );
};

export default Input;
