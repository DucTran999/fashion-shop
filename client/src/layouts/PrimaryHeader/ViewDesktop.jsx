import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Col, Row } from "react-bootstrap";

import ICONS from "../../assets/icons";
import IMAGES from "../../assets/images";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { logOutReq } from "../../features/auth/apiRequest";

// Component
import ShopLogo from "../../components/Logo/ShopLogo";
import PrimaryNav from "./PrimaryNav";
import { updateSelection } from "../../features/activeNav/navAction";

//Style
import classNames from "classnames/bind";
import styles from "./ViewDesktop.module.scss";
const cx = classNames.bind(styles);

/* Sub nav component */
const SubNav = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const cart = useSelector((state) => state.cart.get?.info);
  const navigate = useNavigate();

  return (
    <ul className={cx("sub-nav")}>
      <li className={cx("sub-nav__item")}>
        <Link to="/search" className={cx("sub-nav__link")}>
          {ICONS.search}
        </Link>
      </li>
      <li className={cx("sub-nav__item")}>
        <Link to="/account/notifications" className={cx("sub-nav__link")}>
          {ICONS.bellSlime}
        </Link>
      </li>
      <li className={cx("sub-nav__item", "user")}>
        {user ? <UserBarIsLogged /> : <UserBarIsNotLogged />}
      </li>
      <li className={cx("sub-nav__item")}>
        <div
          className={cx("sub-nav__link")}
          onClick={() => navigate("/cart", { replace: true })}
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
      link: "/account",
      title: "Account Settings",
    },
    {
      link: "/wishlist",
      title: "My Wishlist",
    },
    {
      link: "/account/purchases",
      title: "My Purchases",
    },
  ];
  const user = useSelector((state) => state.auth.login.currentUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

  /* handle user action */
  const handleLogOut = async (e) => {
    e.preventDefault();
    await logOutReq(user.user_id, axiosPrivate, dispatch, navigate);
  };

  const handleNavigateOnClick = (endpoint) => {
    if (location.pathname.includes("account")) {
      navigate(endpoint, { state: location, replace: true });
    } else {
      updateSelection("", dispatch);
      navigate(endpoint, { replace: false });
    }
  };

  return (
    <>
      <div
        className={cx("sub-nav__link")}
        onClick={() => handleNavigateOnClick("/account")}
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
                onClick={() => handleNavigateOnClick(option.link)}
              >
                {option.title}
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
