import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

import { formatMoney, formatCapitalize } from "../../utils/formatData";

import classNames from "classnames/bind";
import style from "./ProductInfo.module.scss";
const cx = classNames.bind(style);

const ProductInfo = () => {
  const currentVariant = useSelector(
    (state) => state.product.variants?.selected
  );

  return (
    <Container className={cx("product-info")}>
      <Row className={cx("product-info__name")}>
        <Col> {formatCapitalize(currentVariant.name)}</Col>
      </Row>
      <Row className={cx("row-mg")}>
        <Col className={cx("product-info__sku")}>
          SKU: {currentVariant.sku.toUpperCase()}
        </Col>
        {currentVariant.in_stock > 0 ? (
          <Col sm="3" className={cx("product-info__stock", "col-cent")}>
            In Stock: {currentVariant.in_stock}
          </Col>
        ) : (
          <Col
            sm="3"
            className={cx("product-info__stock", "col-cent", "sold-out")}
          >
            Sold out
          </Col>
        )}
      </Row>
      <Row className={cx("row-mg")}>
        <Col className={cx("product-info__price")}>
          Price: {formatMoney(currentVariant.price)}
        </Col>
      </Row>
      <Row className={cx("row-mg")}>
        <Col className={cx("product-info__sold")}>
          Sales: {currentVariant.sold}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductInfo;
