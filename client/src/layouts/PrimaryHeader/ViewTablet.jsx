import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Col, Row } from "react-bootstrap";
import { logOutUser } from "../../features/auth/apiRequest";

import ICONS from "../../assets/icons";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* handle user action */
  const handleLogOut = async () => {
    await logOutUser(dispatch, navigate);
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
        <Link to="/purchases" className={cx("menu__dropdown--tablet__element")}>
          My Purchases
        </Link>
        <Link to="/wishlist" className={cx("menu__dropdown--tablet__element")}>
          Wishlist
        </Link>
      </section>
      <section className={cx("dropdown__service", "last")}>
        <Link
          to="/account/profile"
          className={cx("menu__dropdown--tablet__element")}
        >
          Account Settings
        </Link>
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
  return (
    <nav className={cx("menu__dropdown--tablet")}>
      <section className={cx("dropdown__service")}>
        <Link to="/search" className={cx("menu__dropdown--tablet__element")}>
          Search
        </Link>
        <Link to="/cart" className={cx("menu__dropdown--tablet__element")}>
          Cart
        </Link>
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
