import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Col, Row } from "react-bootstrap";
import { logOutUser } from "../../features/auth/apiRequest";

import ICONS from "../../assets/icons";
import IMAGES from "../../assets/images";

// Component
import ShopLogo from "../../components/Logo/ShopLogo";
import PrimaryNav from "./PrimaryNav";

//Style
import classNames from "classnames/bind";
import styles from "./ViewDesktop.module.scss";
const cx = classNames.bind(styles);

const ViewDesktop = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* handle user action */
  const handleLogOut = async () => {
    await logOutUser(dispatch, navigate, location);
  };

  /* Sub nav component */
  const SubNav = () => {
    return (
      <ul className={cx("sub-nav")}>
        <li className={cx("sub-nav__item")}>
          <Link to="/search" className={cx("sub-nav__link")}>
            {ICONS.search}
          </Link>
        </li>
        <li className={cx("sub-nav__item", "user")}>
          {user ? <UserBarIsLogged /> : <UserBarIsNotLogged />}
        </li>
        <li className={cx("sub-nav__item")}>
          <Link to="/wishlist" className={cx("sub-nav__link")}>
            {ICONS.favourite}
          </Link>
        </li>
        <li className={cx("sub-nav__item")}>
          <Link to="/cart" className={cx("sub-nav__link")}>
            {ICONS.cart}
          </Link>
          <span className={cx("cart__num-products")}>10</span>
        </li>
      </ul>
    );
  };

  const UserBarIsLogged = () => {
    return (
      <>
        <Link to="/" className={cx("sub-nav__link")}>
          <img
            src={IMAGES.defaultAvatar}
            className={cx("user-avatar")}
            alt="user avatar"
          />
        </Link>
        <ul className={cx("user-options")}>
          <li className={cx("user-options__option")}>
            <Link to="/login" className={cx("user-options__link")}>
              Account Settings
            </Link>
          </li>
          <li className={cx("user-options__option")}>
            <Link to="/register" className={cx("user-options__link")}>
              Notification
            </Link>
          </li>
          <li className={cx("user-options__option")}>
            <Link to="/register" className={cx("user-options__link")}>
              My Purchases
            </Link>
            <div className={cx("user-options__separate")}></div>
          </li>
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
