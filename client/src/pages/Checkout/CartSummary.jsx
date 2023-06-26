import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// Custom hook, util, ..
import IMAGES from "../../assets/images";
import { formatCapitalize, formatMoney } from "../../utils/formatData";

// Component Injected
import SectionHeader from "../../components/SectionHeader";

// Style
import classNames from "classnames/bind";
import style from "./CartSummary.module.scss";
const cx = classNames.bind(style);

const IMG_URL = process.env.REACT_APP_API_SERVER_URL;

const ListItems = ({ items }) => {
  return (
    <Row className={cx("list-items")}>
      <Col>
        {items.map((product, idx) => {
          return (
            <span key={idx}>
              <Container>
                <Row className={cx("item-wrap")}>
                  <Col xs="3">
                    <LazyLoadImage
                      src={`${IMG_URL}/product/${product.image}`}
                      className={cx("img-side")}
                      placeholderSrc={IMAGES.defaultImg}
                      effect="blur"
                      alt="Product IMG"
                    />
                  </Col>
                  <Col xs="9">
                    <div className={cx("info-side")}>
                      <div className={cx("item__name")}>
                        {formatCapitalize(product.name)}
                      </div>
                      <span className={cx("item__variant")}>
                        Size: {product.size}
                      </span>
                      <span className={cx("item__variant")}>
                        Color: {product.color}
                      </span>
                      <div className={cx("item__variant")}>
                        Quantity: {product.qty}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </span>
          );
        })}
      </Col>
    </Row>
  );
};

const CartSummary = ({ cart }) => {
  return (
    <Container className={cx("cart-summary-section")}>
      <SectionHeader title="Cart Summary" />
      {cart.products && <ListItems items={cart.products} />}
      <Row>
        <Col>
          <div className={cx("total-section")}>
            <span>Total:</span>
            <span> {formatMoney(cart.total_price)}</span>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CartSummary;
