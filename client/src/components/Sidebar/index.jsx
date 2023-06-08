import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import ICONS from "../../assets/icons";
import { updateSidebarSelection } from "../../features/activeNav/navAction";

// Style
import classNames from "classnames/bind";
import style from "./Sidebar.module.scss";
const cx = classNames.bind(style);

const AccountSettingNav = () => {
  const optionSelected = useSelector((state) => state.navbar?.sidebar.active);
  const dispatch = useDispatch();

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
  };

  useEffect(() => {
    updateSidebarSelection("Public profile", dispatch);

    // eslint-disable-next-line
  }, []);

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
        <span className={cx("service__header")}>
          {ICONS.bill}
          <span style={{ paddingLeft: 5 }}>My purchases</span>
        </span>
        <ul className={cx("service__list")}>
          <li className={cx("service__item")}>Orders pending</li>
          <li className={cx("service__item")}>Completed</li>
          <li className={cx("service__item")}>Cancelled</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
