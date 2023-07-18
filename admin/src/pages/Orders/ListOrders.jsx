import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { format } from "date-fns";

// utils func, custom hook, ...
import { setFilter, resetOrdersList } from "../../redux/order/orderSlice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { ORDER_STATE_ID } from "../../utils/constVariable";
import {
  confirmOrdersReq,
  getAllOrdersReq,
  updateOrderStateReq,
  cancelOrderShippingFailedReq,
} from "../../redux/order/orderAction";
import {
  formatHyphenToUpperCase,
  formatMoney,
  getDateFromTimestamp,
} from "../../utils/formatData";

// Component Injected
import ErrorBlock from "../../components/ErrorBlock";
import ControlBar from "./ControlBar";

// Style
import classNames from "classnames/bind";
import style from "./ListOrders.module.scss";
const cx = classNames.bind(style);

const HeaderFilter = () => {
  const dispatch = useDispatch();
  const curFilter = useSelector((state) => state.order.filter);

  const filterOptions = [
    {
      state_id: "1",
      title: "On Pending",
    },
    {
      state_id: "2",
      title: "On Delivering",
    },
    {
      state_id: "5",
      title: "On Cancelling",
    },
    {
      state_id: "3",
      title: "Cancelled",
    },
    {
      state_id: "4",
      title: "Completed",
    },
  ];

  const handleChangeFilter = (state_id) => {
    dispatch(resetOrdersList());
    dispatch(setFilter(state_id));
  };

  return (
    <Container>
      <Row className={cx("filter-bar")}>
        {filterOptions.map((option) => {
          return (
            <Col
              key={option.state_id}
              className={cx(
                "col-cent",
                "filter-option",
                option.state_id === curFilter ? "active" : "inactive"
              )}
              onClick={() => handleChangeFilter(option.state_id)}
            >
              {option.title}
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

const EmptyTable = ({ msg }) => {
  return (
    <Row>
      <div style={{ textAlign: "center", padding: "1em 0", fontWeight: "500" }}>
        {msg}
      </div>
    </Row>
  );
};

const ActionButtonGroup = ({ order, curFilter }) => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const handleShipOnClick = async () => {
    await confirmOrdersReq(order.id, order, axiosPrivate, dispatch);
    await getAllOrdersReq(curFilter, axiosPrivate, dispatch);
  };

  const handleRejectOnClick = async () => {
    await updateOrderStateReq(
      order.id,
      {
        user_id: order.user_id,
        current_state_id: order.state_id,
        next_state_id: ORDER_STATE_ID.cancelled,
      },
      axiosPrivate,
      dispatch
    );
    await getAllOrdersReq(curFilter, axiosPrivate, dispatch);
  };

  const handleShipFailOnClick = async () => {
    await cancelOrderShippingFailedReq(order.id, order, axiosPrivate, dispatch);
    await getAllOrdersReq(curFilter, axiosPrivate, dispatch);
  };

  const handleShipSuccessOnClick = async () => {
    await updateOrderStateReq(
      order.id,
      {
        user_id: order.user_id,
        current_state_id: order.state_id,
        next_state_id: ORDER_STATE_ID.completed,
      },
      axiosPrivate,
      dispatch
    );
    await getAllOrdersReq(curFilter, axiosPrivate, dispatch);
  };

  const handleConfirmCancelOrderRequest = async () => {
    await updateOrderStateReq(
      order.id,
      {
        user_id: order.user_id,
        current_state_id: order.state_id,
        next_state_id: ORDER_STATE_ID.cancelled,
      },
      axiosPrivate,
      dispatch
    );
    await getAllOrdersReq(curFilter, axiosPrivate, dispatch);
  };

  const OnPendingActionsBtn = () => {
    return (
      <>
        <Col md="1">
          <button className={cx("btn-event", "info")}>Details</button>
        </Col>
        <Col md="1" className={cx("col-cent")}>
          <button
            className={cx("btn-event", "success")}
            onClick={handleShipOnClick}
          >
            Ship
          </button>
        </Col>
        <Col md="1">
          <button
            className={cx("btn-event", "error")}
            onClick={handleRejectOnClick}
          >
            Reject
          </button>
        </Col>
      </>
    );
  };

  const OnDeliveringActionsBtn = () => {
    return (
      <>
        <Col md="1">
          <button className={cx("btn-event", "info")}>Details</button>
        </Col>
        <Col md="1" className={cx("col-cent")}>
          <button
            className={cx("btn-event", "success")}
            onClick={handleShipSuccessOnClick}
          >
            Success
          </button>
        </Col>
        <Col md="1">
          <button
            className={cx("btn-event", "error")}
            onClick={handleShipFailOnClick}
          >
            Failed
          </button>
        </Col>
      </>
    );
  };

  const OnCancellingActionsBtn = () => {
    return (
      <>
        <Col md="1">
          <button className={cx("btn-event", "info")}>Details</button>
        </Col>
        <Col md="1" className={cx("col-cent")}>
          <button
            className={cx("btn-event", "success")}
            onClick={handleConfirmCancelOrderRequest}
          >
            Confirm
          </button>
        </Col>
        <Col md="1" className={cx("col-cent")}></Col>
      </>
    );
  };

  return (
    <>
      {curFilter === ORDER_STATE_ID.pending ? (
        <OnPendingActionsBtn />
      ) : curFilter === ORDER_STATE_ID.shipping ? (
        <OnDeliveringActionsBtn />
      ) : curFilter === ORDER_STATE_ID.cancelling ? (
        <OnCancellingActionsBtn />
      ) : (
        <Col md="2">
          <button className={cx("btn-event", "info")}>Details</button>
        </Col>
      )}
    </>
  );
};

const TableHeader = () => {
  const curFilter = useSelector((state) => state.order.filter);

  return (
    <>
      {curFilter === ORDER_STATE_ID.pending ? (
        <Row className={cx("table-row")}>
          <Col md="2" className={cx("tbl-header")}>
            Time
          </Col>
          <Col md="2" className={cx("text-overflow", "tbl-header")}>
            ID
          </Col>
          <Col md="2" className={cx("tbl-header")}>
            Email
          </Col>
          <Col md="1" className={cx("tbl-header")}>
            Products
          </Col>
          <Col md="1" className={cx("tbl-header")}>
            Price
          </Col>
          <Col md="1" className={cx("tbl-header")}>
            Overstock
          </Col>
          <Col md="1"></Col>
          <Col md="1"></Col>
          <Col md="1"></Col>
        </Row>
      ) : curFilter === ORDER_STATE_ID.shipping ||
        curFilter === ORDER_STATE_ID.cancelling ? (
        <Row className={cx("table-row")}>
          <Col md="2" className={cx("tbl-header")}>
            Time
          </Col>
          <Col md="2" className={cx("text-overflow", "tbl-header")}>
            ID
          </Col>
          <Col md="2" className={cx("tbl-header")}>
            Email
          </Col>
          <Col md="1" className={cx("tbl-header")}>
            Products
          </Col>
          <Col md="2" className={cx("tbl-header")}>
            Price
          </Col>
          <Col md="1"></Col>
          <Col md="1"></Col>
          <Col md="1"></Col>
        </Row>
      ) : (
        <Row className={cx("table-row")}>
          <Col md="2" className={cx("tbl-header")}>
            Time
          </Col>
          <Col md="2" className={cx("text-overflow", "tbl-header")}>
            ID
          </Col>
          <Col md="2" className={cx("tbl-header")}>
            Email
          </Col>
          <Col md="2" className={cx("tbl-header")}>
            Products
          </Col>
          <Col md="2" className={cx("tbl-header")}>
            Price
          </Col>
          <Col md="2"></Col>
        </Row>
      )}
    </>
  );
};

const OrderRow = ({ order }) => {
  const curFilter = useSelector((state) => state.order.filter);

  return (
    <Row className={cx("table-row")}>
      <Col md="2">
        {format(getDateFromTimestamp(order.created_at), "yyyy-MM-dd HH:mm:ss")}
      </Col>
      <Col md="2" className={cx("text-overflow")}>
        {formatHyphenToUpperCase(order.id)}
      </Col>
      {curFilter === ORDER_STATE_ID.pending ? (
        <>
          <Col md="2">{order.email}</Col>
          <Col md="1">{order.items.length}</Col>
          <Col md="1">{formatMoney(order.total_price)}</Col>
          <Col
            md="1"
            className={cx(
              "col-cent",
              order.has_overstock === false ? "success" : "true"
            )}
          >
            {String(order.has_overstock)}
          </Col>
        </>
      ) : curFilter === ORDER_STATE_ID.shipping ||
        curFilter === ORDER_STATE_ID.cancelling ? (
        <>
          <Col md="2">{order.email}</Col>
          <Col md="1">{order.items.length}</Col>
          <Col md="2">{formatMoney(order.total_price)}</Col>
        </>
      ) : (
        <>
          <Col md="2">{order.email}</Col>
          <Col md="2">{order.items.length}</Col>
          <Col md="2">{formatMoney(order.total_price)}</Col>
        </>
      )}
      <ActionButtonGroup order={order} curFilter={curFilter} />
    </Row>
  );
};

const OrderTable = ({ orders }) => {
  return (
    <div className={cx("table-wrap")}>
      <TableHeader />
      {orders.map((order) => {
        return (
          <span key={order.id}>
            <OrderRow order={order} />
          </span>
        );
      })}
    </div>
  );
};

const OrderLayout = ({ orders }) => {
  return (
    <Container className={cx("no-gd")}>
      {orders.length === 0 ? (
        <EmptyTable msg="No Orders Found" />
      ) : (
        <OrderTable orders={orders} />
      )}
    </Container>
  );
};

const ListOrders = () => {
  const orders = useSelector((state) => state.order.getAll.orderList);
  const errCause = useSelector((state) => state.order.getAll.errorCause);

  return (
    <>
      <ControlBar />
      <HeaderFilter />
      {errCause ? (
        <ErrorBlock msg={errCause} />
      ) : !orders ? (
        <EmptyTable msg="Refresh to get data" />
      ) : (
        orders && <OrderLayout orders={orders} />
      )}
    </>
  );
};

export default ListOrders;
