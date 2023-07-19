import React, { useRef, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getUserReq } from "../../features/user/userAction";
import { getCartReq } from "../../features/cart/cartAction";

// Component Injected
import CartSummary from "./CartSummary";
import DeliveryForm from "./DeliveryForm";
import Padding from "../../components/Padding";

// Style
import classNames from "classnames/bind";
import style from "./Checkout.module.scss";
const cx = classNames.bind(style);

const Checkout = () => {
  document.title = "Checkout";
  const isMounted = useRef(false);
  const curUser = useSelector((state) => state.auth.login?.currentUser);
  const user = useSelector((state) => state.user.get?.info);
  const cart = useSelector((state) => state.cart.get?.info);

  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      getUserReq(curUser?.user_id, axiosPrivate, dispatch);
      getCartReq(curUser?.user_id, axiosPrivate, dispatch);
    }

    // eslint-disable-next-line
  }, []);

  return (
    <main className={cx("theme")}>
      {user?.email && cart?.products && (
        <Container>
          <Padding />
          <Row className={cx("main-layout")}>
            <Col lg="6">
              <DeliveryForm user={user} />
            </Col>
            <Col lg="6">
              <CartSummary cart={cart} />
            </Col>
          </Row>
          <Padding />
        </Container>
      )}
    </main>
  );
};

export default Checkout;
