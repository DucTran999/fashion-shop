import React from "react";

// Style
import classNames from "classnames/bind";
import style from "./Dropdown.module.scss";
const cx = classNames.bind(style);

const Dropdown = ({ title, onOptionChange, optionSelected }) => {
  const options = [
    { label: "Other", value: "other" },

    { label: "Male", value: "male" },

    { label: "Female", value: "female" },
  ];

  return (
    <div className={cx("dropdown-wrap")}>
      <span className={cx("dropdown-name")}>{title}</span>
      <select
        className={cx("dropdown-list")}
        value={optionSelected}
        onChange={(e) => onOptionChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
