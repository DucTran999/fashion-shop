import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Col, Row } from "react-bootstrap";

import ICONS from "../../assets/icons";
import { COMMON_PATH } from "../../utils/constVariable";
import { logOutReq } from "../../features/auth/apiRequest";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

// Component
import ShopLogo from "../../components/Logo/ShopLogo";

//Style
import classNames from "classnames/bind";
import styles from "./ViewTablet.module.scss";
import PrimaryNav from "./PrimaryNav";
const cx = classNames.bind(styles);

/* Sub nav component */
const MenuDropDown = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);

  return (
    <div className={cx("menu--tablet")}>
      {ICONS.menu}
      {user ? <MenuDropDownServiceHasLogin /> : <MenuDropDownServiceNoLogin />}
    </div>
  );
};

const MenuDropDownServiceHasLogin = () => {
  const user = useSelector((state) => state.auth.login.currentUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  /* handle user action */
  const handleLogOut = async () => {
    await logOutReq(user.user_id, axiosPrivate, dispatch, navigate);
  };

  return (
    <nav className={cx("menu__dropdown--tablet")}>
      <section className={cx("dropdown__service")}>
        <Link to="/search" className={cx("menu__dropdown--tablet__element")}>
          Search
        </Link>
        <Link to="/cart" className={cx("menu__dropdown--tablet__element")}>
          Cart
        </Link>
        <div
          onClick={() => navigate(COMMON_PATH.purchase, { replace: true })}
          className={cx("menu__dropdown--tablet__element")}
        >
          My Purchases
        </div>
        <Link to="/wishlist" className={cx("menu__dropdown--tablet__element")}>
          Wishlist
        </Link>
      </section>
      <section className={cx("dropdown__service", "last")}>
        <div
          className={cx("menu__dropdown--tablet__element")}
          onClick={(e) => {
            e.preventDefault();
            navigate(COMMON_PATH.account, { replace: true });
          }}
        >
          Account Settings
        </div>
        <span
          className={cx("menu__dropdown--tablet__element")}
          onClick={handleLogOut}
        >
          Log out
        </span>
      </section>
    </nav>
  );
};

const MenuDropDownServiceNoLogin = () => {
  const navigate = useNavigate();

  return (
    <nav className={cx("menu__dropdown--tablet")}>
      <section className={cx("dropdown__service")}>
        <Link to="/search" className={cx("menu__dropdown--tablet__element")}>
          Search
        </Link>
        <div
          className={cx("menu__dropdown--tablet__element")}
          onClick={(e) => {
            e.preventDefault();
            navigate(COMMON_PATH.cart, { replace: true });
          }}
        >
          Cart
        </div>
      </section>
      <section className={cx("dropdown__service", "last")}>
        <Link to="/login" className={cx("menu__dropdown--tablet__element")}>
          Login
        </Link>
        <Link to="/register" className={cx("menu__dropdown--tablet__element")}>
          Register
        </Link>
      </section>
    </nav>
  );
};

const ViewTablet = () => {
  return (
    <Container>
      <Row className={cx("row-cent")}>
        <Col md="2">
          <ShopLogo />
        </Col>
        <Col md="8" className={cx("col-cent")}>
          <PrimaryNav />
        </Col>
        <Col md="2">
          <MenuDropDown />
        </Col>
      </Row>
    </Container>
  );
};

export default ViewTablet;
