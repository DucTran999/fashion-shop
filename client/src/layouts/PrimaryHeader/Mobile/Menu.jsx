import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ICONS from "../../../assets/icons";
import {
  updateSelection,
  updateSidebarSelection,
} from "../../../features/activeNav/navAction";

import SideBarNoLogin from "./SideBarNoLogin";
import SideBarHasLogin from "./SideBarHasLogin";

//Style
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
const cx = classNames.bind(styles);

const Menu = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [showSidebar, setShowSidebar] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShowSidebar = () => {
    document.body.style.overflow = "hidden";
    setShowSidebar(true);
  };

  const handleCloseSidebar = async () => {
    document.body.style.overflowY = "scroll";
    setShowSidebar(false);
  };

  const handleNavigateOnChangeOption = (path, primaryNav, subNav) => {
    if (primaryNav !== "") updateSelection(primaryNav, dispatch);
    if (subNav !== "") updateSidebarSelection(subNav, dispatch);
    document.body.style.overflowY = "scroll";
    setShowSidebar(false);
    navigate(path, { replace: true });
  };

  return (
    <>
      <span className={cx("menu")} onClick={handleShowSidebar}>
        {ICONS.menu}
      </span>
      {showSidebar &&
        (user ? (
          <SideBarHasLogin
            onCloseSidebar={handleCloseSidebar}
            onChangeOption={handleNavigateOnChangeOption}
          />
        ) : (
          <SideBarNoLogin
            onCloseSidebar={handleCloseSidebar}
            onChangeOption={handleNavigateOnChangeOption}
          />
        ))}
    </>
  );
};

export default Menu;
