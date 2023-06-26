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

// This layout use for both Login and Register Pages.
function AuthLayout({ children }) {
  return (
    <React.Fragment>
      <SimpleHeader />
      <AuthWrapper backgroundUrl={backgrounds[10]}>
        <section className={cx("main-section-wrapper")}>
          <div
            className={cx("banner")}
            style={{ backgroundImage: `url(${backgrounds[10]})` }}
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
