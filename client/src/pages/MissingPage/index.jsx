import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import IMAGES from "../../assets/images";
import useWindowDimensions from "../../hooks/useWindowDimension";
import { SCREEN_MIN_SIZE } from "../../utils/constVariable";
import { updateSelection } from "../../features/activeNav/navAction";

import classNames from "classnames/bind";
import style from "./MissingPage.module.scss";
const cx = classNames.bind(style);

function MissingPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  const handleClick = () => {
    updateSelection("home", dispatch);
    navigate("/", { replace: true });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className={cx("wrapper")}>
      {width > SCREEN_MIN_SIZE.desktop ? (
        <div className={cx("banner-wrap")}>
          <img
            className={cx("banner")}
            src={IMAGES.missingPage}
            alt="missing Page"
            draggable={false}
          />
        </div>
      ) : (
        <>
          <p className={cx("header")}>404 Not Found</p>
          <p className={cx("message")}>Sorry, We can not find this page.</p>
        </>
      )}

      <button className={cx("back-home-btn")} onClick={handleClick}>
        Come Back Home
      </button>
    </div>
  );
}

export default React.memo(MissingPage);
