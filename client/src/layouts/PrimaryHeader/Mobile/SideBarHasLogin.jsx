import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ICONS from "../../../assets/icons";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { COMMON_PATH } from "../../../utils/constVariable";
import { formatCapitalize } from "../../../utils/formatData";
import { logOutReq } from "../../../features/auth/apiRequest";
import { setNotificationFilter } from "../../../features/notification/notificationSlice";

import ModalContainer from "../../../components/Modal/ModalContainer";

//Style
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
const cx = classNames.bind(styles);

const Header = ({ user, onClose }) => {
  return (
    <div className={cx("sidebar-header")}>
      <span
        className={cx("sidebar-header__close", "col-right")}
        onClick={onClose}
      >
        {ICONS.rightArrowLine}
      </span>
      <div className={cx("sidebar-header__title", "col-cent")}>
        {`Hi, ${user.first_name}`}
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

const ServiceLoggedSection = ({ onChangeOption }) => {
  const dispatch = useDispatch();

  return (
    <section className={cx("sidebar-service")}>
      <nav className={cx("service-list")}>
        <div
          onClick={() => {
            dispatch(setNotificationFilter("all"));
            onChangeOption(COMMON_PATH.notification, "notifications", "news");
          }}
          className={cx("service-item")}
        >
          Notification
        </div>
        <div
          onClick={() =>
            onChangeOption(COMMON_PATH.purchase, "purchase", "orders pending")
          }
          className={cx("service-item")}
        >
          My Purchases
        </div>
        <div
          className={cx("service-item")}
          onClick={() => onChangeOption(COMMON_PATH.cart, "cart", "")}
        >
          Cart
        </div>
      </nav>
    </section>
  );
};

const AccountSection = ({ user, onClose, onChangeOption }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const handleLogOut = async () => {
    onClose();
    await logOutReq(user.user_id, axiosPrivate, dispatch, navigate);
  };

  return (
    <section className={cx("sidebar-service", "last-service")}>
      <nav className={cx("service-list")}>
        <div
          className={cx("service-item")}
          onClick={() => onChangeOption(COMMON_PATH.account, "account", "")}
        >
          Account Settings
        </div>
        <span className={cx("service-item")} onClick={handleLogOut}>
          Log out
        </span>
      </nav>
    </section>
  );
};

const SideBarHasLogin = ({ onCloseSidebar, onChangeOption }) => {
  const user = useSelector((state) => state.auth.login?.currentUser);

  return (
    <ModalContainer>
      <div className={cx("sidebar-wrap", "active")} key={Math.random()}>
        <Header user={user} onClose={onCloseSidebar} />
        <ServiceSection onChangeOption={onChangeOption} />
        <ServiceLoggedSection onChangeOption={onChangeOption} />
        <AccountSection
          user={user}
          onClose={onCloseSidebar}
          onChangeOption={onChangeOption}
        />
      </div>
    </ModalContainer>
  );
};

export default SideBarHasLogin;
