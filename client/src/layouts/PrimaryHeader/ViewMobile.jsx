import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Col, Row } from "react-bootstrap";

import ICONS from "../../assets/icons";
import { COMMON_PATH } from "../../utils/constVariable";
import { logOutUser } from "../../features/auth/apiRequest";
import { updateSidebarSelection } from "../../features/activeNav/navAction";

// Component
import ShopLogo from "../../components/Logo/ShopLogo";
import ModalContainer from "../../components/Modal/ModalContainer";

//Style
import classNames from "classnames/bind";
import styles from "./ViewMobile.module.scss";
const cx = classNames.bind(styles);

const ViewMobile = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [showSidebar, setShowSidebar] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* handle user action */
  const handleLogOut = async () => {
    await logOutUser(dispatch, navigate);
  };

  const handleNavigateOnChangeOption = (optionTitle, path) => {
    updateSidebarSelection(optionTitle, dispatch);
    navigate(path, { replace: true });
  };

  const handleShowSidebar = () => {
    document.body.style.overflow = "hidden";
    setShowSidebar(true);
  };

  const handleCloseSidebar = () => {
    document.body.style.overflowY = "scroll";
    setShowSidebar(false);
  };

  /* Sub nav component */
  const BackHomeButton = () => {
    return (
      <div
        className={cx("btn-back-home")}
        onClick={() => handleNavigateOnChangeOption("home", COMMON_PATH.home)}
      >
        {ICONS.backArrow}
      </div>
    );
  };

  const Menu = () => {
    return (
      <span className={cx("menu")} onClick={handleShowSidebar}>
        {ICONS.menu}
      </span>
    );
  };

  const SideBarHasLogin = () => {
    return (
      <ModalContainer>
        <div
          className={
            showSidebar
              ? cx("sidebar-wrap", "active")
              : cx("sidebar-wrap", "inactive")
          }
          key={Math.random()}
        >
          <div className={cx("sidebar-header")}>
            <span
              className={cx("sidebar-header__close", "col-right")}
              onClick={handleCloseSidebar}
            >
              {ICONS.rightArrowLine}
            </span>
            <div className={cx("sidebar-header__title", "col-cent")}>
              {`Hi, ${user.first_name}`}
            </div>
          </div>

          <section className={cx("sidebar-service")}>
            <nav className={cx("service-list")} onClick={handleCloseSidebar}>
              <Link to="/search" className={cx("service-item")}>
                Search
              </Link>
              <div
                className={cx("service-item")}
                onClick={() =>
                  handleNavigateOnChangeOption("category", COMMON_PATH.category)
                }
              >
                Category
              </div>
              <Link to="/lookbook" className={cx("service-item")}>
                Lookbook
              </Link>
              <Link to="/blogs" className={cx("service-item")}>
                Blog
              </Link>
              <Link to="/stores" className={cx("service-item")}>
                Showroom
              </Link>
            </nav>
          </section>

          <section className={cx("sidebar-service")}>
            <nav className={cx("service-list")} onClick={handleCloseSidebar}>
              <Link to="/blogs" className={cx("service-item")}>
                Notification
              </Link>
              <div
                onClick={() =>
                  handleNavigateOnChangeOption(
                    "Orders pending",
                    COMMON_PATH.purchase
                  )
                }
                className={cx("service-item")}
              >
                My Purchases
              </div>
              <div
                className={cx("service-item")}
                onClick={() =>
                  handleNavigateOnChangeOption("cart", COMMON_PATH.cart)
                }
              >
                Cart
              </div>
            </nav>
          </section>

          <section className={cx("sidebar-service", "last-service")}>
            <nav className={cx("service-list")} onClick={handleCloseSidebar}>
              <div
                className={cx("service-item")}
                onClick={() =>
                  handleNavigateOnChangeOption("account", COMMON_PATH.account)
                }
              >
                Account Settings
              </div>
              <span className={cx("service-item")} onClick={handleLogOut}>
                Log out
              </span>
            </nav>
          </section>
        </div>
      </ModalContainer>
    );
  };

  const SideBarNoLogin = () => {
    return (
      <ModalContainer>
        <div
          className={
            showSidebar
              ? cx("sidebar-wrap", "active")
              : cx("sidebar-wrap", "inactive")
          }
          key={Math.random()}
        >
          <div
            className={cx("sidebar-header")}
            onClick={() => setShowSidebar(false)}
          >
            <span
              className={cx("sidebar-header__close", "col-right")}
              onClick={handleCloseSidebar}
            >
              {ICONS.rightArrowLine}
            </span>
            <div className={cx("sidebar-header__title", "col-center")}>
              Atlana Shop
            </div>
          </div>

          <section className={cx("sidebar-service")}>
            <nav
              className={cx("service-list")}
              onClick={() => setShowSidebar(false)}
            >
              <Link to="/search" className={cx("service-item")}>
                Search
              </Link>
              <Link to="/category" className={cx("service-item")}>
                Category
              </Link>
              <Link to="/lookbook" className={cx("service-item")}>
                Lookbook
              </Link>
              <Link to="/blogs" className={cx("service-item")}>
                Blog
              </Link>
              <Link to="/stores" className={cx("service-item")}>
                Showroom
              </Link>
            </nav>
          </section>

          <section
            className={cx("sidebar-service", "last-service")}
            onClick={() => setShowSidebar(false)}
          >
            <nav className={cx("service-list")}>
              <Link to="/cart" className={cx("service-item")}>
                Cart
              </Link>
              <Link to="/login" className={cx("service-item")}>
                Sign in
              </Link>
              <Link to="/register" className={cx("service-item")}>
                Sign up
              </Link>
            </nav>
          </section>
        </div>
      </ModalContainer>
    );
  };

  return (
    <Container>
      <Row className={cx("row-cent")}>
        <Col xs="3" className={cx("col-cent")}>
          <BackHomeButton />
        </Col>
        <Col xs="6" className={cx("col-cent")}>
          <ShopLogo />
        </Col>
        <Col xs="3" className={cx("col-cent")}>
          <Menu />
        </Col>
        {showSidebar && (user ? <SideBarHasLogin /> : <SideBarNoLogin />)}
      </Row>
    </Container>
  );
};

export default ViewMobile;
