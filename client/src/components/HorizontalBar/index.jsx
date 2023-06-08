import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { sidebarChangeOption } from "../../features/activeNav/navSlice";

import classNames from "classnames/bind";
import style from "./HorizontalBar.module.scss";
const cx = classNames.bind(style);

const HorizontalBar = ({ options }) => {
  const optionSelected = useSelector((state) => state.navbar?.sidebar.active);
  const dispatch = useDispatch();

  const handleSwitchOnClick = (option) => {
    console.log("handler");
    dispatch(sidebarChangeOption(option));
  };

  return (
    <div className={cx("bar-wrap")}>
      {options.map((option) => {
        return (
          <span
            key={option.title}
            className={cx(
              "bar-option",
              optionSelected === option.title ? "active" : "inactive"
            )}
            onClick={() => handleSwitchOnClick(option.title)}
          >
            {option.title}
          </span>
        );
      })}
    </div>
  );
};

export default HorizontalBar;
