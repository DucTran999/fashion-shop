import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import ICONS from "../../assets/icons";
import { formatCapitalize } from "../../utils/formatData";
import { updateSidebarSelection } from "../../features/activeNav/navAction";
import { resetGetOrderListState } from "../../features/order/orderSlice";
import { setNotificationFilter } from "../../features/notification/notificationSlice";

// Style
import classNames from "classnames/bind";
import style from "./Sidebar.module.scss";
const cx = classNames.bind(style);

const AccountSettingNav = () => {
  const optionSelected = useSelector((state) => state.navbar?.sidebar.active);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const options = [
    {
      title: "public profile",
    },
    {
      title: "update information",
    },
    {
      title: "change password",
    },
  ];

  const handleNavigateOnClick = (title) => {
    updateSidebarSelection(title, dispatch);
    navigate("/account/profile", { replace: true });
  };

  return (
    <div className={cx("service")}>
      <span className={cx("service__header")}>
        {ICONS.settings}
        <span style={{ paddingLeft: 5 }}>Account Settings</span>
      </span>
      <ul className={cx("service__list")}>
        {options.map((option) => {
          return (
            <li
              key={option.title}
              className={cx(
                "service__item",
                optionSelected === option.title ? "active" : "inactive"
              )}
              onClick={() => handleNavigateOnClick(option.title)}
            >
              {formatCapitalize(option.title)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const ManagePurchaseNav = () => {
  const optionSelected = useSelector((state) => state.navbar?.sidebar.active);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const options = [
    {
      title: "orders pending",
    },
    {
      title: "on delivery",
    },
    {
      title: "on cancelling",
    },
    {
      title: "cancelled",
    },
    {
      title: "completed",
    },
  ];

  const handleNavigateOnClick = (title) => {
    updateSidebarSelection(title, dispatch);
    dispatch(resetGetOrderListState());
    navigate("/account/purchases", { replace: true });
  };

  return (
    <div className={cx("service")}>
      <span className={cx("service__header")}>
        {ICONS.bill}
        <span style={{ paddingLeft: 5 }}>My Purchases</span>
      </span>
      <ul className={cx("service__list")}>
        {options.map((option) => {
          return (
            <li
              key={option.title}
              className={cx(
                "service__item",
                optionSelected === option.title ? "active" : "inactive"
              )}
              onClick={() => handleNavigateOnClick(option.title)}
            >
              {formatCapitalize(option.title)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const NotificationNav = () => {
  const optionSelected = useSelector((state) => state.navbar?.sidebar.active);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const options = [
    {
      title: "news",
    },
    {
      title: "promotions",
    },
    {
      title: "orders",
    },
  ];

  const handleNavigateOnClick = (title) => {
    updateSidebarSelection(title, dispatch);
    dispatch(setNotificationFilter("all"));
    navigate("/account/notifications", { replace: true });
  };

  return (
    <div className={cx("service")}>
      <span className={cx("service__header")}>
        {ICONS.bell}
        <span style={{ paddingLeft: 5 }}>Notifications</span>
      </span>
      <ul className={cx("service__list")}>
        {options.map((option) => {
          return (
            <li
              key={option.title}
              className={cx(
                "service__item",
                optionSelected === option.title ? "active" : "inactive"
              )}
              onClick={() => handleNavigateOnClick(option.title)}
            >
              {formatCapitalize(option.title)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className={cx("sidebar-wrap")}>
      <AccountSettingNav />
      <NotificationNav />
      <ManagePurchaseNav />
    </div>
  );
};

export default Sidebar;
