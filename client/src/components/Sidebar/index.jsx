import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import ICONS from "../../assets/icons";
import { updateSidebarSelection } from "../../features/activeNav/navAction";
import { resetGetOrderListState } from "../../features/order/orderSlice";
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
      title: "Public profile",
    },
    {
      title: "Update information",
    },
    {
      title: "Change password",
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
              {option.title}
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
      title: "Orders pending",
    },
    {
      title: "On delivery",
    },
    {
      title: "On cancelling",
    },
    {
      title: "Cancelled",
    },
    {
      title: "Completed",
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
              {option.title}
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
      <div className={cx("service")}>
        <span className={cx("service__header")}>
          {ICONS.bell}
          <span style={{ paddingLeft: 5 }}>Notifications</span>
        </span>
        <ul className={cx("service__list")}>
          <li className={cx("service__item")}>News</li>
          <li className={cx("service__item")}>Promotions</li>
          <li className={cx("service__item")}>Orders</li>
        </ul>
      </div>
      <div className={cx("service")}>
        <ManagePurchaseNav />
      </div>
    </div>
  );
};

export default Sidebar;
