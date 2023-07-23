import React from "react";
import { Link } from "react-router-dom";

import ICONS from "../../../assets/icons";
import { COMMON_PATH } from "../../../utils/constVariable";
import { formatCapitalize } from "../../../utils/formatData";

import ModalContainer from "../../../components/Modal/ModalContainer";

//Style
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
const cx = classNames.bind(styles);

const Header = ({ onClose }) => {
  return (
    <div className={cx("sidebar-header")}>
      <span
        className={cx("sidebar-header__close", "col-right")}
        onClick={onClose}
      >
        {ICONS.rightArrowLine}
      </span>
      <div className={cx("sidebar-header__title", "col-center")}>
        Atlana Shop
      </div>
    </div>
  );
};

const ServiceSection = ({ onChangeOption }) => {
  const options = [
    { path: "/search", title: "search" },
    { path: COMMON_PATH.category, title: "category" },
    { path: "/lookbook", title: "lookbook" },
    { path: "/blog", title: "blog" },
    { path: "/showroom", title: "showroom" },
  ];

  return (
    <section className={cx("sidebar-service")}>
      <nav className={cx("service-list")}>
        {options.map((option, index) => {
          return (
            <div
              key={index}
              className={cx("service-item")}
              onClick={() => onChangeOption(option.path, option.title, "")}
            >
              {formatCapitalize(option.title)}
            </div>
          );
        })}
      </nav>
    </section>
  );
};

const AccountSection = ({ onChangeOption }) => {
  return (
    <section className={cx("sidebar-service", "last-service")}>
      <nav className={cx("service-list")}>
        <div
          className={cx("service-item")}
          onClick={() => onChangeOption(COMMON_PATH.cart, "cart", "")}
        >
          Cart
        </div>
        <div
          className={cx("service-item")}
          onClick={() => onChangeOption(COMMON_PATH.wishlist, "wishlist", "")}
        >
          Wishlist
        </div>
        <Link to="/login" className={cx("service-item")}>
          Sign in
        </Link>
        <Link to="/register" className={cx("service-item")}>
          Sign up
        </Link>
      </nav>
    </section>
  );
};

const SideBarNoLogin = ({ onCloseSidebar, onChangeOption }) => {
  return (
    <ModalContainer>
      <div className={cx("sidebar-wrap", "active")} key={Math.random()}>
        <Header onClose={onCloseSidebar} />
        <ServiceSection
          onClose={onCloseSidebar}
          onChangeOption={onChangeOption}
        />
        <AccountSection onChangeOption={onChangeOption} />
      </div>
    </ModalContainer>
  );
};

export default SideBarNoLogin;
