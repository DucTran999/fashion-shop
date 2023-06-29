import React from "react";
import { Outlet } from "react-router-dom";

// Component
import SimpleHeader from "../Header/SimpleHeader";
import AuthWrapper from "../../components/Wrapper/AuthWrapper";
import Footer from "../Footer/Footer";

// Util
import IMAGES from "../../assets/images";

// Style
import classNames from "classnames/bind";
import authLayoutStyles from "./AuthLayout.module.scss";
const cx = classNames.bind(authLayoutStyles);

const backgrounds = [
  { bg: IMAGES.bgAuthWrapper1, main: IMAGES.mAuthWrapper1 },
  { bg: IMAGES.bgAuthWrapper2, main: IMAGES.mAuthWrapper2 },
  { bg: IMAGES.bgAuthWrapper3, main: IMAGES.mAuthWrapper3 },
  { bg: IMAGES.bgAuthWrapper4, main: IMAGES.mAuthWrapper4 },
  { bg: IMAGES.bgAuthWrapper5, main: IMAGES.mAuthWrapper5 },
  { bg: IMAGES.bgAuthWrapper6, main: IMAGES.mAuthWrapper6 },
  { bg: IMAGES.bgAuthWrapper7, main: IMAGES.mAuthWrapper7 },
  { bg: IMAGES.bgAuthWrapper8, main: IMAGES.mAuthWrapper8 },
  { bg: IMAGES.bgAuthWrapper8, main: IMAGES.mAuthWrapper9 },
  { bg: IMAGES.bgAuthWrapper10, main: IMAGES.mAuthWrapper10 },
  { bg: IMAGES.bgAuthWrapper11, main: IMAGES.mAuthWrapper11 },
  { bg: IMAGES.bgAuthWrapper12, main: IMAGES.mAuthWrapper12 },
];

// This layout use for both Login and Register Pages.
function AuthLayout() {
  const currentImage = Math.floor(Math.random() * 12);

  return (
    <React.Fragment>
      <SimpleHeader />
      <AuthWrapper backgroundUrl={backgrounds[currentImage].bg}>
        <section className={cx("main-section-wrapper")}>
          <div
            className={cx("banner")}
            style={{
              backgroundImage: `url(${backgrounds[currentImage].main})`,
            }}
          ></div>
          <div className={cx("form-wrapper")}>
            {/* Auth Form */}
            <Outlet />
          </div>
        </section>
      </AuthWrapper>
      <Footer />
    </React.Fragment>
  );
}

export default AuthLayout;
