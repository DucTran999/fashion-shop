import React from "react";

import IMAGES from "../../assets/images";
import AuthWrapper from "../../components/Wrapper/AuthWrapper";
import AuthForm from "../../components/Form/AuthForm";

import classNames from "classnames/bind";
import AuthPageStyles from "./AuthPage.module.scss";

const cx = classNames.bind(AuthPageStyles);

function Login() {
  const backgrounds = [
    IMAGES.authWrapper1,
    IMAGES.authWrapper2,
    IMAGES.authWrapper3,
    IMAGES.authWrapper4,
    IMAGES.authWrapper5,
    IMAGES.authWrapper6,
    IMAGES.authWrapper7,
    IMAGES.authWrapper8,
    IMAGES.authWrapper9,
    IMAGES.authWrapper10,
    IMAGES.authWrapper11,
    IMAGES.authWrapper12,
  ];

  const imgId = Math.floor(Math.random() * 12);

  return (
    <AuthWrapper backgroundUrl={backgrounds[imgId]}>
      <div className={cx("main-section-wrapper")}>
        <div
          className={cx("banner")}
          style={{ backgroundImage: `url(${backgrounds[imgId]})` }}
        ></div>
        <div className={cx("form-wrapper")}>
          <AuthForm />
        </div>
      </div>
    </AuthWrapper>
  );
}

export default Login;
