import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

// Custom hook, helper func, global var..
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { formatCapitalize } from "../../utils/formatData";
import { placeOrderReq } from "../../features/order/orderRequest";
import { getCartReq } from "../../features/cart/cartRequest";
import { updateSelection } from "../../features/activeNav/navAction";
import { resetPlaceOrderState } from "../../features/order/orderSlice";
import { useNavigate } from "react-router-dom";

// Component Injected
import SectionHeader from "../../components/SectionHeader";
import InputReadOnly from "../../components/InputReadOnly";
import Button from "../../components/Button";
import Padding from "../../components/Padding";
import ModalContainer from "../../components/Modal/ModalContainer";
import PopupContainer from "../../components/Modal/PopupContainer";
import {
  InfoAlertNavigate,
  SuccessAlertNavigate,
  ErrorAlert,
} from "../../components/Modal/PopupVariant";

// Style
import classNames from "classnames/bind";
import style from "./DeliveryForm.module.scss";
const cx = classNames.bind(style);

const DeliveryForm = ({ user }) => {
  const isMounted = useRef(false);

  const [showModal, setShowModal] = useState(false);
  const [errorCause, setErrorCause] = useState(null);

  const placeOrderLoading = useSelector((state) => state.order.place.isLoading);
  const placeOrderSuccess = useSelector((state) => state.order.place.success);
  const placeOrderFailed = useSelector((state) => state.order.place.errorCause);

  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePlaceOrderOnSubmit = async (e) => {
    e.preventDefault();
    await placeOrderReq({ payment_method_id: "1" }, axiosPrivate, dispatch);
    await getCartReq(user.user_id, axiosPrivate, dispatch);
  };

  const handleSuccessNavigate = async () => {
    setShowModal(false);
    updateSelection("Category", dispatch);
    navigate("/category", { replace: true });
    dispatch(resetPlaceOrderState());
  };

  const handleInfoOnClick = async () => {
    setShowModal(false);
    updateSelection("Account", dispatch);
    navigate("/account/profile", { replace: true });
    dispatch(resetPlaceOrderState());
  };

  useEffect(() => {
    if (placeOrderSuccess || placeOrderFailed) {
      setShowModal(true);
    }
    // eslint-disable-next-line
  }, [placeOrderLoading]);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;

      // Check user profile has missing information
      if (!user.email || !user.phone) {
        setErrorCause("Please update phone, email.");
        setShowModal(true);
      } else {
        setErrorCause(null);
        setShowModal(false);
      }
    }

    // eslint-disable-next-line
  }, []);

  return (
    <Container className={cx("form-wrap")}>
      {showModal && (
        <ModalContainer>
          {errorCause ? (
            <PopupContainer header="Announcement">
              <InfoAlertNavigate
                message={errorCause}
                btnTitle="OK"
                onClickEvent={handleInfoOnClick}
              />
            </PopupContainer>
          ) : placeOrderSuccess ? (
            <PopupContainer header="Announcement">
              <SuccessAlertNavigate
                message="Order successfully"
                btnTitle="Continue Shopping"
                onClickEvent={handleSuccessNavigate}
              />
            </PopupContainer>
          ) : (
            placeOrderFailed && (
              <PopupContainer header="Announcement">
                <ErrorAlert
                  message={placeOrderFailed}
                  onClose={() => setShowModal(false)}
                />
              </PopupContainer>
            )
          )}
        </ModalContainer>
      )}
      <Row>
        <SectionHeader title="Delivery Information" />
      </Row>
      <Padding />
      {user && (
        <form onSubmit={handlePlaceOrderOnSubmit}>
          <Row>
            <Col xs="12" sm="6">
              <InputReadOnly
                fieldName="First Name"
                value={formatCapitalize(user.first_name)}
              />
            </Col>
            <Col xs="12" sm="6">
              <InputReadOnly
                fieldName="Last Name"
                value={formatCapitalize(user.last_name)}
              />
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="6">
              <InputReadOnly fieldName="Email" value={user.email} />
            </Col>
            <Col xs="12" sm="6">
              <InputReadOnly fieldName="Phone" value={user.phone || "Empty"} />
            </Col>
          </Row>
          <Row>
            <Col>
              <InputReadOnly
                fieldName="Address"
                value={user.address || "Empty"}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <span className={cx("payment-section")}>Payment method: </span>
              <span className={cx("payment-method")}>Cash On Delivery</span>
            </Col>
          </Row>
          <Row>
            <Col md="5">
              <Button
                type="submit"
                title="Place Order"
                styles={`box-style-cm sign-up-style mg-tb-4 ${"active"}`}
              />
            </Col>
          </Row>
        </form>
      )}
    </Container>
  );
};

export default DeliveryForm;
