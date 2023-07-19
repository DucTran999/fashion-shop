import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import { logOutReq } from "../redux/auth/authAction";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import classNames from "classnames/bind";
import styles from "./Header.module.scss";
const cx = classNames.bind(styles);

function Header() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const from = useLocation();
  const user = useSelector((state) => state.auth.login.currentUser);

  const handleLogout = async () => {
    await logOutReq(user.user_id, axiosPrivate, dispatch, navigate, from);
  };

  return (
    <Container className={cx("wrap")}>
      <Row className={cx("row-cen")}>
        <Col md="2" className={cx("col-cen", "logo")}>
          <Link to="/">Atlana shop</Link>
        </Col>
        <Col md="6" className={cx("col-cen")}>
          <Link to="/accounts" className={cx("nav-link")}>
            Accounts
          </Link>
          <Link to="/products" className={cx("nav-link")}>
            Products
          </Link>
          <Link to="/categories" className={cx("nav-link")}>
            Categories
          </Link>
          <Link to="/orders" className={cx("nav-link")}>
            Orders
          </Link>
        </Col>
        <Col md="4" className={cx("col-cen")}>
          <div className={cx("user-info")}>
            Hi, {user.first_name.toUpperCase()}
          </div>
          <input type="submit" value={"Log out"} onClick={handleLogout} />
        </Col>
      </Row>
    </Container>
  );
}

export default Header;
