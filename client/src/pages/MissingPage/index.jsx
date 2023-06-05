import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import classNames from "classnames/bind";
import style from "./MissingPage.module.scss";
const cx = classNames.bind(style);

function MissingPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/", { replace: true });
  };
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

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
