import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import Padding from "../../components/Padding";
import { formatMoney } from "../../utils/formatData";

import classNames from "classnames/bind";
import style from "./CartPriceSection.module.scss";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(style);

const CartPriceSection = ({ total_price }) => {
  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate("/checkout", { replace: false });
  };

  return (
    <Container>
      <Padding />
      <Padding />
      <div className={cx("cart-price-wrap")}>
        <Row className={cx("row-mg")}>
          <Col>
            <div className={cx("cart-price__header")}>The total amount of</div>
          </Col>
        </Row>
        <Row className={cx("row-mg")}>
          <Col xs="7">Temporary amount</Col>
          <Col xs="5" className={cx("col-right")}>
            {formatMoney(total_price)}
          </Col>
        </Row>
        <Row className={cx("row-mg")}>
          <Col xs="7">Shipping</Col>
          <Col xs="5" className={cx("col-right")}>
            Free
          </Col>
        </Row>
        <Row className={cx("row-mg", "last-child")}>
          <Col xs="7">Total</Col>
          <Col xs="5" className={cx("col-right")}>
            {formatMoney(total_price)}
          </Col>
        </Row>
        <Row className={cx("row-mg")}>
          <button
            onClick={handleCheckout}
            className={cx(
              "checkout-btn",
              +total_price === 0 ? "inactive" : "active"
            )}
          >
            Checkout now
          </button>
        </Row>
      </div>
    </Container>
  );
};

export default CartPriceSection;
