import React, { useState, forwardRef, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ICONS from "../../../assets/icons";
import { setRefreshFail } from "../../../features/order/orderSlice";
import Padding from "../../../components/Padding";

// Style
import classNames from "classnames/bind";
import style from "./DateFilterBar.module.scss";
const cx = classNames.bind(style);

const DateFilterBar = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const refresh = useSelector((state) => state.order.refresh.needRefresh);
  const dispatch = useDispatch();

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className={cx("date-pk-input")} onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  // Refresh order list when flag on.
  useEffect(() => {
    const refreshCurrentOrderList = async () => {
      dispatch(setRefreshFail());
      await onDateChange(startDate, endDate);
    };

    if (refresh) {
      refreshCurrentOrderList();
    }

    // eslint-disable-next-line
  }, [refresh, dispatch, onDateChange]);

  return (
    <Container>
      <Padding />
      <Row className={cx("bar-wrap")}>
        <Col md="4" className={cx("col-flex")}>
          <span className={cx("label")}>From</span>
          <DatePicker
            selectsStart
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            startDate={startDate}
            maxDate={new Date()}
            customInput={<CustomInput />}
          />
        </Col>
        <Col md="4" className={cx("col-flex")}>
          <span className={cx("label")}>To</span>
          <DatePicker
            selectsEnd
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            endDate={endDate}
            minDate={startDate}
            maxDate={new Date()}
            customInput={<CustomInput />}
          />
        </Col>
        <Col md="4" className={cx("col-cent")}>
          <button
            className={cx("look-up-btn")}
            onClick={() => onDateChange(startDate, endDate)}
          >
            <span
              style={{ marginRight: "0.2em", display: "flex", fontSize: "1em" }}
            >
              {ICONS.search}
            </span>
            <span>Look up</span>
          </button>
        </Col>
      </Row>
      <Padding />
    </Container>
  );
};

export default DateFilterBar;
