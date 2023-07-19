import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getAllOrdersReq } from "../../redux/order/orderAction";

import classNames from "classnames/bind";
import style from "./ControlBar.module.scss";
const cx = classNames.bind(style);

const ControlBar = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const curFilter = useSelector((state) => state.order.filter);

  const handleRefreshOrders = async () => {
    await getAllOrdersReq(curFilter, axiosPrivate, dispatch);
  };

  return (
    <Container>
      <Row>
        <Col>Date picker</Col>
        <Col>Date picker</Col>
        <Col>
          <button className={cx("btn-refresh")} onClick={handleRefreshOrders}>
            <span className={cx("btn-icon")}>Refresh</span>
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default ControlBar;
