import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import classNames from "classnames/bind";
import style from "./MissingPage.module.scss";
const cx = classNames.bind(style);

function MissingPage() {
  const navigate = useNavigate();
  const from = useLocation();

  const handleClick = () => {
    navigate("/", { state: from, replace: true });
  };

  return (
    <div className={cx("wrapper")}>
      <p className={cx("header")}>404 Not Found</p>
      <p className={cx("message")}>Sorry, We can not find this page.</p>
      <button className={cx("back-home-btn")} onClick={handleClick}>
        Back to Home Page
      </button>
    </div>
  );
}

export default MissingPage;
