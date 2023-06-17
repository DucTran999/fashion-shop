import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { format, addDays } from "date-fns";

import { formatCapitalize } from "../../../utils/formatData";
import { getOrderListReq } from "../../../features/order/orderRequest";
import {
  convertStateToStateCode,
  formatMoney,
  getDateFromTimestamp,
} from "../../../utils/formatData";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

import DateFilterBar from "./DateFilterBar";
import SectionHeader from "../../../components/SectionHeader";
import ErrorBlock from "../../../components/ErrorBlock";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import ModalContainer from "../../../components/Modal/ModalContainer";
import Order from "./Order";

import classNames from "classnames/bind";
import style from "./OrderDashboard.module.scss";
const cx = classNames.bind(style);

const OrderRecord = ({ orders }) => {
  const [showModal, setShowModal] = useState(false);
  const [orderSelected, setOrderSelected] = useState(null);
  const optionSelected = useSelector((state) => state.navbar?.sidebar.active);

  // display day finished instead of placed date
  const finishCase = ["completed", "cancelled"];

  const handleGetOrderDetails = (order) => {
    setOrderSelected(order);
    setShowModal(true);
  };

  return (
    <>
      {showModal && (
        <ModalContainer>
          <Order order={orderSelected} onClose={() => setShowModal(false)} />
        </ModalContainer>
      )}
      {orders.map((order, idx) => {
        return (
          <Row key={idx} className={cx("order-record-wrap")}>
            <Col md="4">
              {format(
                getDateFromTimestamp(
                  finishCase.includes(optionSelected)
                    ? order.updated_at
                    : order.created_at
                ),
                "yyyy-MM-dd HH:mm:ss"
              )}
            </Col>
            <Col md="3">{order.items.length} products</Col>
            <Col md="2">{formatMoney(order.total_price)}</Col>
            <Col md="3" className={cx("col-cent")}>
              <button
                type="submit"
                className={cx("submit-btn")}
                onClick={() => handleGetOrderDetails(order)}
              >
                Details
              </button>
            </Col>
          </Row>
        );
      })}
    </>
  );
};

const MessageBlock = ({ msg }) => {
  return <div style={{ textAlign: "center", margin: "1em 0" }}>{msg}</div>;
};

const OrderDashboard = ({ user }) => {
  const optionSelected = useSelector((state) => state.navbar.sidebar.active);
  const orders = useSelector((state) => state.order.getAll?.info);
  const errCause = useSelector((state) => state.order.getAll?.errorCause);
  const isLoading = useSelector((state) => state.order.getAll?.isLoading);

  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  const handleOnDateChange = async (startDate, endDate) => {
    const startDateFormatted = format(startDate, "yyyy-MM-dd");
    const endDateFormatted = format(addDays(endDate, 1), "yyyy-MM-dd");
    const stateCode = convertStateToStateCode(optionSelected);

    await getOrderListReq(
      user.user_id,
      {
        state: stateCode,
        start_date: startDateFormatted,
        end_date: endDateFormatted,
      },
      axiosPrivate,
      dispatch
    );
  };

  return (
    <Container>
      <SectionHeader title={formatCapitalize(optionSelected)} />
      <DateFilterBar onDateChange={handleOnDateChange} />
      <Container className={cx("order-list-wrap")}>
        {errCause ? (
          <ErrorBlock msg={errCause} />
        ) : !orders ? (
          <MessageBlock msg="Select date and click look up" />
        ) : isLoading ? (
          <LoadingSpinner />
        ) : (
          orders && (
            <>
              <Row className={cx("order-record-wrap", "header")}>
                <Col md="4">Date & Time</Col>
                <Col md="3">Products Qty</Col>
                <Col md="2">Total</Col>
                <Col md="2"></Col>
              </Row>
              <div className={cx("order-list")}>
                {orders.length === 0 ? (
                  <MessageBlock msg="No record found" />
                ) : (
                  orders.length > 0 && <OrderRecord orders={orders} />
                )}
              </div>
            </>
          )
        )}
      </Container>
    </Container>
  );
};

export default OrderDashboard;
