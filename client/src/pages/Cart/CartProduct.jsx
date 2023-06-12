import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// Util, custom hook,...
import ICONS from "../../assets/icons";
import IMAGES from "../../assets/images";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { updateSelection } from "../../features/activeNav/navAction";
import {
  formatMoney,
  formatCapitalize,
  formatVietnameseToNonAccent,
} from "../../utils/formatData";
import {
  deleteProductFromCartReq,
  getCartReq,
  changeProductQtyReq,
} from "../../features/cart/cartRequest";

// Component Injected
import ModalContainer from "../../components/Modal/ModalContainer";
import Dialog from "../../components/Dialog";

// Style
import classNames from "classnames/bind";
import style from "./CartProduct.module.scss";

const cx = classNames.bind(style);

const IMG_URL = process.env.REACT_APP_API_SERVER_URL;

const CartProduct = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  const [productQty, setProductQty] = useState(product.qty);

  const errorCause = useSelector((state) => state.cart.update.errorCause);
  const prevQuantity = useRef(product.qty);

  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnClick = (e) => {
    e.preventDefault();
  };

  const handleRemoveProduct = async (e) => {
    e.preventDefault();
    const payload = {
      cart_id: String(product.cart_id),
      variant_id: String(product.variant_id),
    };

    await deleteProductFromCartReq(
      product.cart_id,
      payload,
      axiosPrivate,
      dispatch
    );
    await getCartReq(product.cart_id, axiosPrivate, dispatch);
  };

  const handleNavigateToProduct = async () => {
    const slug = formatVietnameseToNonAccent(product.name);
    updateSelection("category", dispatch);
    navigate(`/product/${slug}`, {
      state: {
        category_id: product.category_id,
        product_id: product.product_id,
      },
      replace: false,
    });
  };

  const handleQuantityOnChange = (e) => {
    const newQty = e.target.value;
    const numberRegex = /^\d+$/;
    if (!newQty.length) {
      setProductQty(newQty);
    } else if (numberRegex.test(newQty) && +newQty > 0) {
      setProductQty(newQty);

      // save prev qty if not null
      if (productQty) {
        prevQuantity.current = productQty;
      }
    }
  };

  const handleQuantityOnBlur = async (e) => {
    const currentQty = e.target.value;
    if (!currentQty.length) {
      setProductQty(prevQuantity.current);
    } else if (+currentQty !== +prevQuantity.current) {
      prevQuantity.current = productQty;

      const payload = {
        cart_id: String(product.cart_id),
        variant_id: String(product.variant_id),
        qty: String(productQty),
      };

      // add new qty
      await changeProductQtyReq(
        product.cart_id,
        payload,
        axiosPrivate,
        dispatch
      );

      // update latest cart
      await getCartReq(product.cart_id, axiosPrivate, dispatch);
      setShowModal(true);
    }
  };

  return (
    <Container fluid={true}>
      {showModal && (
        <ModalContainer
          modalStyle="transparent"
          onClose={() => {
            setProductQty(product.in_stock);
            setShowModal(false);
          }}
        >
          {errorCause && (
            <Dialog
              typeDialog="info"
              message={errorCause}
              onClose={() => {
                setProductQty(product.in_stock);
                setShowModal(false);
              }}
            />
          )}
        </ModalContainer>
      )}
      <Row className={cx("product-wrap")}>
        <Col xs="6" sm="4" md="3" className={cx("col-cent")}>
          <LazyLoadImage
            src={`${IMG_URL}/product/${product.image}`}
            className={cx("product-img")}
            placeholderSrc={IMAGES.defaultImg}
            effect="blur"
            alt="Product IMG"
            onClick={handleNavigateToProduct}
          />
        </Col>
        <Col xs="6" sm="5" md="6" className={cx("info-wrap")}>
          <div className={cx("product-name")}>
            {formatCapitalize(product.name)}
          </div>
          <div className={cx("product-variant")}>Size: {product.size}</div>
          <div className={cx("product-variant")}>Color: {product.color}</div>
          <div className={cx("product-variant")}>
            Available: {product.in_stock}
          </div>
          <div className={cx("user-action")}>
            <button
              className={cx("event-btn", "remove")}
              onClick={handleRemoveProduct}
            >
              <span className={cx("btn-icon")}>{ICONS.trash}</span>
              <span className={cx("btn-title")}>Remove</span>
            </button>
            <button
              className={cx("event-btn", "wishlist")}
              onClick={handleOnClick}
            >
              <span className={cx("btn-icon")}>{ICONS.heart}</span>
              <span className={cx("btn-title")}>Add to wishlist</span>
            </button>
          </div>
        </Col>
        <Col xs="12" sm="3" md="3">
          <input
            type="text"
            className={cx("input-qty")}
            value={productQty}
            onBlur={(e) => handleQuantityOnBlur(e)}
            onChange={(e) => handleQuantityOnChange(e)}
          />
          <div className={cx("product-price")}>
            Unit price: {formatMoney(product.price)}
          </div>
          <div className={cx("product-price")}>
            Sub price: {formatMoney(product.sub_price)}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CartProduct;
