import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Col, Row } from "react-bootstrap";

import ICONS from "../../assets/icons";
import IMAGES from "../../assets/images";
import { COMMON_PATH } from "../../utils/constVariable";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { logOutReq } from "../../features/auth/apiRequest";
import { formatCapitalize } from "../../utils/formatData";

// Component
import ShopLogo from "../../components/Logo";
import PrimaryNav from "./PrimaryNav";
import {
  updateSelection,
  updateSidebarSelection,
} from "../../features/activeNav/navAction";

//Style
import classNames from "classnames/bind";
import styles from "./ViewDesktop.module.scss";
const cx = classNames.bind(styles);

/* Sub nav component */
const SubNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const currentPath = location.pathname;

  const user = useSelector((state) => state.auth.login.currentUser);
  const cart = useSelector((state) => state.cart.get.info);
  const hasUnreadNotification = useSelector(
    (state) => state.notification.hasUnread
  );

  const handleIconNavigateOnClick = (path, subNavActive, sidebarActive) => {
    if (path !== currentPath) {
      updateSelection(subNavActive, dispatch);
      updateSidebarSelection(sidebarActive, dispatch);
      navigate(path, { replace: true });
    }
  };

  return (
    <ul className={cx("sub-nav")}>
      <li className={cx("sub-nav__item")}>
        <Link to="/search" className={cx("sub-nav__link")}>
          {ICONS.search}
        </Link>
      </li>
      <li className={cx("sub-nav__item")}>
        <div
          className={cx("sub-nav__link")}
          onClick={() =>
            handleIconNavigateOnClick(
              COMMON_PATH.notification,
              "notifications",
              "news"
            )
          }
        >
          {ICONS.bellSlime}
          {hasUnreadNotification && <span className={cx("bell-dot")}></span>}
        </div>
      </li>
      <li className={cx("sub-nav__item", "user")}>
        {user ? <UserBarIsLogged /> : <UserBarIsNotLogged />}
      </li>
      <li className={cx("sub-nav__item")}>
        <div
          className={cx("sub-nav__link")}
          onClick={() => navigate(COMMON_PATH.cart, { replace: true })}
        >
          {ICONS.cart}
        </div>
        {cart ? (
          <span className={cx("cart__num-products")}>
            {cart.products.length}
          </span>
        ) : (
          <span className={cx("cart__num-products")}>0</span>
        )}
      </li>
    </ul>
  );
};

const UserBarIsLogged = () => {
  const loggedOptions = [
    {
      link: COMMON_PATH.account,
      title: "account settings",
      navbar: "account",
      sidebar: "public profile",
    },
    {
      link: "/wishlist",
      title: "my wishlist",
      navbar: "wishlist",
      sidebar: "wishlist",
    },
    {
      link: COMMON_PATH.purchase,
      title: "my purchases",
      navbar: "purchase",
      sidebar: "orders pending",
    },
  ];
  const user = useSelector((state) => state.auth.login.currentUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

  const currentPath = location.pathname;

  /* handle user action */
  const handleLogOut = async (e) => {
    e.preventDefault();
    await logOutReq(user.user_id, axiosPrivate, dispatch, navigate);
  };

  const handleIconNavigateOnClick = (path, subNavActive, sidebarActive) => {
    if (currentPath !== path) {
      updateSelection(subNavActive, dispatch);
      updateSidebarSelection(sidebarActive, dispatch);
      navigate(path, { replace: true });
    }
  };

  return (
    <>
      <div
        className={cx("sub-nav__link")}
        onClick={() =>
          handleIconNavigateOnClick(
            COMMON_PATH.account,
            "account",
            "public profile"
          )
        }
      >
        <img
          src={IMAGES.defaultAvatar}
          className={cx("user-avatar")}
          alt="user avatar"
        />
      </div>
      <ul className={cx("user-options")}>
        {loggedOptions.map((option, idx) => {
          return (
            <li key={idx} className={cx("user-options__option")}>
              <div
                className={cx("user-options__link")}
                onClick={() =>
                  handleIconNavigateOnClick(
                    option.link,
                    option.navbar,
                    option.sidebar
                  )
                }
              >
                {formatCapitalize(option.title)}
              </div>
            </li>
          );
        })}
        <div className={cx("user-options__separate")}></div>
        <li className={cx("user-options__option")}>
          <span className={cx("user-options__link")} onClick={handleLogOut}>
            Log out
          </span>
        </li>
      </ul>
    </>
  );
};

const UserBarIsNotLogged = () => {
  return (
    <>
      <Link to="/login" className={cx("sub-nav__link")}>
        {ICONS.user}
      </Link>
      <ul className={cx("user-options")}>
        <li className={cx("user-options__option")}>
          <Link to="/login" className={cx("user-options__link")}>
            Login
          </Link>
        </li>
        <li className={cx("user-options__option")}>
          <Link to="/register" className={cx("user-options__link")}>
            Register
          </Link>
        </li>
      </ul>
    </>
  );
};

const ViewDesktop = () => {
  return (
    <Container>
      <Row className={cx("row-cent")}>
        <Col lg="2" className={cx("col-cent")}>
          <ShopLogo />
        </Col>
        <Col lg="7" xl="8">
          <PrimaryNav />
        </Col>
        <Col lg="2">
          <SubNav />
        </Col>
      </Row>
    </Container>
  );
};

export default ViewDesktop;
