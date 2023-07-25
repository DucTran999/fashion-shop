import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import ICONS from "../../../assets/icons";
import { LOCAL_STORAGE_KEY } from "../../../utils/constVariable";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import {
  formatMoney,
  formatCapitalizeFirstWord,
} from "../../../utils/formatData";
import {
  addProductToWishlistReq,
  removeProductFromWishlistReq,
} from "../../../features/wishlist/wishlistAction";

import classNames from "classnames/bind";
import style from "./ProductInfo.module.scss";
const cx = classNames.bind(style);

const checkProductInWishlist = (productId) => {
  const wishlist = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEY.wishlistLocal)
  );
  return wishlist?.[productId] ? true : false;
};

const ProductInfo = ({ allVariants }) => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const user = useSelector((state) => state.auth.login?.currentUser);

  const currentVariant = useSelector(
    (state) => state.product.variants?.selected
  );

  const [inWishlist, setInWishlist] = useState(
    checkProductInWishlist(currentVariant.product_id)
  );

  const handleAddToWishlist = async () => {
    if (inWishlist === false) {
      await addProductToWishlistReq(
        user?.user_id,
        allVariants,
        axiosPrivate,
        dispatch
      );
      setInWishlist(!inWishlist);
    } else {
      await removeProductFromWishlistReq(
        user?.user_id,
        allVariants,
        axiosPrivate,
        dispatch
      );
      setInWishlist(!inWishlist);
    }
  };

  return (
    <Container className={cx("product-info")}>
      <Row className={cx("product-info__name")}>
        <Col> {formatCapitalizeFirstWord(currentVariant.name)}</Col>
      </Row>
      <Row className={cx("row-mg")}>
        <Col className={cx("product-info__sku")}>
          SKU: {currentVariant.sku.toUpperCase()}
        </Col>
        {currentVariant.in_stock > 0 ? (
          <Col sm="3" className={cx("product-info__stock", "col-right")}>
            In Stock: {currentVariant.in_stock}
          </Col>
        ) : (
          <Col
            sm="3"
            className={cx("product-info__stock", "col-right", "sold-out")}
          >
            Stock out
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
        <Col className={cx("col-right")}>
          <div className={cx("add-wishlist-btn")} onClick={handleAddToWishlist}>
            <span className={cx("btn-icon")}>
              {inWishlist ? ICONS.heart : ICONS.favourite}
            </span>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductInfo;
