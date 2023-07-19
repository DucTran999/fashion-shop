import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { format } from "date-fns";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import "react-lazy-load-image-component/src/effects/blur.css";

import IMAGES from "../../../assets/images";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { ORDER_STATE_MAP } from "../../../utils/constVariable";
import { cancelOrderReq } from "../../../features/order/orderAction";
import { setRefreshTrue } from "../../../features/order/orderSlice";
import {
  getDateFromTimestamp,
  formatCapitalize,
  formatHyphenToUpperCase,
  formatMoney,
} from "../../../utils/formatData";

import SectionHeader from "../../../components/SectionHeader";
import ModalContainer from "../../../components/Modal/ModalContainer";
import Dialog from "../../../components/Dialog";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

import classNames from "classnames/bind";
import style from "./Order.module.scss";
const cx = classNames.bind(style);

const IMG_URL = process.env.REACT_APP_API_SERVER_URL;

const ConfirmAlert = ({ onClose, onCancel }) => {
  return (
    <div className={cx("dialog-wrap")}>
      <div className={cx("dialog-msg")}>You want to cannel the order?</div>
      <div className={cx("btn-group")}>
        <button className={cx("confirm-btn", "agree")} onClick={onCancel}>
          YES
        </button>
        <button className={cx("confirm-btn", "disagree")} onClick={onClose}>
          NO
        </button>
      </div>
    </div>
  );
};

const Product = ({ product }) => {
  return (
    <Container>
      <Row className={cx("item-wrap")}>
        <Col xs="5" sm="3" className={cx("col-cent")}>
          <LazyLoadImage
            src={`${IMG_URL}/product/${product.image}`}
            className={cx("img-side")}
            placeholderSrc={IMAGES.defaultImg}
            effect="blur"
            alt="Product IMG"
          />
        </Col>
        <Col xs="7" sm="9">
          <div className={cx("info-side")}>
            <div className={cx("item__name")}>
              {formatCapitalize(product.name)}
            </div>
            <span className={cx("item__variant")}>Size: {product.size}</span>
            <span className={cx("item__variant")}>Color: {product.color}</span>
            <div className={cx("item__variant")}>Quantity: {product.qty}</div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const Order = ({ key, order, onClose }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const errCause = useSelector((state) => state.order.cancel.errCause);
  const success = useSelector((state) => state.order.cancel.success);
  const isLoading = useSelector((state) => state.order.cancel.isLoading);

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const handleSendCancelOrderRequest = async () => {
    await cancelOrderReq(
      order.user_id,
      { order_id: order.id },
      axiosPrivate,
      dispatch
    );
    setShowAlert(false);
    setShowDialog(true);
  };

  return (
    <div key={key} className={cx("order-wrap")}>
      {showDialog &&
        (isLoading ? (
          <LoadingSpinner />
        ) : (
          <ModalContainer modalStyle="transparent">
            {success ? (
              <Dialog
                onClose={() => {
                  setShowDialog(false);
                  dispatch(setRefreshTrue());
                  onClose();
                }}
                typeDialog="success"
                message="Sent cancel request success"
              />
            ) : (
              <Dialog
                onClose={() => setShowDialog(false)}
                typeDialog="error"
                message={errCause}
              />
            )}
          </ModalContainer>
        ))}
      {showAlert && (
        <ModalContainer>
          <ConfirmAlert
            onClose={() => setShowAlert(false)}
            onCancel={handleSendCancelOrderRequest}
          />
        </ModalContainer>
      )}
      <SectionHeader title="Order Details" />
      <Container>
        <Row className={cx("row-mg")}>
          <Col>Order ID: {formatHyphenToUpperCase(order.id)}</Col>
        </Row>
        <Row className={cx("row-mg")}>
          <Col>Status: {order.state}</Col>
        </Row>
        <Row className={cx("row-mg")}>
          <Col>Products: {order.items.length}</Col>
          <Col>Total: {formatMoney(order.total_price)}</Col>
        </Row>
        <Row className={cx("row-mg")}></Row>
        <Row className={cx("row-mg")}>
          <Col>
            Placed at:
            {format(
              getDateFromTimestamp(order.created_at),
              "  yyyy-MM-dd  HH:mm:ss"
            )}
          </Col>
        </Row>
        {order.state === "completed" ||
          (order.state === "cancelled" && (
            <>
              <Row className={cx("row-mg")}>
                <Col>
                  Finished at:
                  {format(
                    getDateFromTimestamp(order.updated_at),
                    " yyyy-MM-dd  HH:mm:ss"
                  )}
                </Col>
              </Row>
            </>
          ))}
        <Row className={cx("row-mg", "row-cent")}>
          <div className={cx("list-product-wrap")}>
            {order.items.map((product, idx) => {
              return <Product key={idx} product={product} />;
            })}
          </div>
        </Row>
        <Row className={cx("row-mg", "row-cent")}>
          <Col className={cx("col-cent")}>
            <button className={cx("btn-inactive")} onClick={onClose}>
              Close
            </button>
          </Col>
          {order.state === ORDER_STATE_MAP.process && (
            <Col className={cx("col-cent")}>
              <button
                className={cx("btn-inactive", "danger")}
                onClick={() => setShowAlert(true)}
              >
                Cancel Order
              </button>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Order;
