import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { updateSelection } from "../../../features/activeNav/navAction";
import { formatCapitalize } from "../../../utils/formatData";

import CategoryDropDown from "./CategoryDropDown";

// Style
import classNames from "classnames/bind";
import styles from "./PrimaryNav.module.scss";
const cx = classNames.bind(styles);

const PrimaryNav = () => {
  const primaryOptions = [
    { link: "/", title: "home" },
    { link: "/category/all-products", title: "category" },
    { link: "/lookbook", title: "lookbook" },
    { link: "/blogs", title: "blog" },
    { link: "/showrooms", title: "showroom" },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const activeOption = useSelector((state) => state.navbar.primary.active);

  const handleSwitchBar = (title, link) => {
    updateSelection(title, dispatch);
    navigate(link, { replace: true });
  };

  return (
    <ul className={cx("primary-nav")}>
      {primaryOptions.map((option) => {
        return (
          <li
            key={option.title}
            className={cx(
              "nav-item",
              option.title === "category" ? "nav-item--category" : "",
              activeOption === option.title ? "active" : "inactive"
            )}
            onClick={() => handleSwitchBar(option.title, option.link)}
          >
            {formatCapitalize(option.title)}
            {option.title === "category" && <CategoryDropDown />}
          </li>
        );
      })}
    </ul>
  );
};

export default PrimaryNav;
