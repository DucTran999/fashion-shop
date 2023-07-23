import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ICONS from "../../../assets/icons";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { debounce } from "../../../utils/doStuff";
import {
  addProductToCartReq,
  getCartReq,
} from "../../../features/cart/cartAction";

import ProductInfo from "./ProductInfo";
import ProductVariantBar from "./VariantBar";
import ModalContainer from "../../../components/Modal/ModalContainer";
import Dialog from "../../../components/Dialog";

// Style
import style from "./ProductDetail.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

const UtilitySection = ({ currentVariant, quantity }) => {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const success = useSelector((state) => state.cart.update.success);
  const errorCause = useSelector((state) => state.cart.update?.errorCause);

  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartProcess = async () => {
    const payload = {
      cart_id: String(user.user_id),
      variant_id: String(currentVariant.id),
      qty: String(quantity),
    };

    await addProductToCartReq(user.user_id, payload, axiosPrivate, dispatch);
    await getCartReq(user.user_id, axiosPrivate, dispatch);
  };

  const handleAddToCartOnClick = async () => {
    await addToCartProcess();
    setShowModal(true);
  };

  const handleBuyOnClick = async () => {
    if (user) {
      await addToCartProcess();
      errorCause ? setShowModal(true) : navigate("/cart", { replace: false });
    } else {
      navigate("/login", { replace: false });
    }
  };

  return (
    <Row>
      {showModal && (
        <ModalContainer
          modalStyle="transparent"
          onClose={() => setShowModal(false)}
        >
          {errorCause ? (
            <Dialog
              typeDialog="info"
              message={errorCause}
              onClose={() => setShowModal(false)}
            />
          ) : (
            success && (
              <Dialog
                typeDialog="success"
                message="Product add successfully"
                onClose={() => setShowModal(false)}
              />
            )
          )}
        </ModalContainer>
      )}
      {currentVariant.in_stock > 0 && (
        <Col className={cx("col-cent")}>
          <span
            className={cx("btn-user-action")}
            onClick={
              user
                ? debounce(handleAddToCartOnClick, 800)
                : () => navigate("/login", { replace: false })
            }
          >
            <span className={cx("btn-user-action__icon")}>{ICONS.cart}</span>
            <span className={cx("btn-user-action__title")}>Add to Cart</span>
          </span>
        </Col>
      )}
      {currentVariant.in_stock ? (
        <Col className={cx("col-cent")}>
          <span className={cx("btn-user-action")} onClick={handleBuyOnClick}>
            <span className={cx("btn-user-action__icon")}>
              {ICONS.moneyBag}
            </span>
            <span className={cx("btn-user-action__title")}>Buy now</span>
          </span>
        </Col>
      ) : (
        <Col className={cx("col-cent")}>
          <span className={cx("btn-user-action", "disable")}>
            <span className={cx("btn-user-action__icon")}>
              {ICONS.moneyBag}
            </span>
            <span className={cx("btn-user-action__title")}>Sold Out</span>
          </span>
        </Col>
      )}
    </Row>
  );
};

const Description = ({ currentVariant }) => {
  const lines = currentVariant.description.trim().split("-");
  return (
    <Row>
      <p className={cx("description__header")}>Description</p>
      {lines.map((line, idx) => {
        return line && <p key={idx}> - {line}</p>;
      })}
    </Row>
  );
};

const ProductDetail = ({ allVariants, variant }) => {
  const [currentQty, setCurrentQty] = useState(1);

  const handleIncreaseQty = () => {
    const maxQty = variant.in_stock;
    setCurrentQty((prev) => {
      return prev < maxQty ? prev + 1 : prev;
    });
  };

  const handleDecreaseQty = () => {
    setCurrentQty((prev) => {
      return prev > 1 ? prev - 1 : 1;
    });
  };

  const ChangeProductQtySection = () => {
    return (
      <Row className={cx("row-mg")}>
        <Col>
          <div className={cx("change-qty-wrap")}>
            <button
              className={cx("btn-change-qty")}
              type="submit"
              onClick={handleDecreaseQty}
            >
              -
            </button>
            <div className={cx("current-qty")}>{currentQty}</div>
            <button
              className={cx("btn-change-qty")}
              type="submit"
              onClick={handleIncreaseQty}
            >
              +
            </button>
          </div>
        </Col>
      </Row>
    );
  };

  useEffect(() => {
    setCurrentQty(1);
  }, [variant]);

  return (
    <Container className={cx("product-detail")}>
      <ProductInfo allVariants={allVariants} />
      <ProductVariantBar />
      <ChangeProductQtySection />
      <UtilitySection currentVariant={variant} quantity={currentQty} />
      <Description currentVariant={variant} />
    </Container>
  );
};

export default ProductDetail;
