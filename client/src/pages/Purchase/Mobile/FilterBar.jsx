import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import { updateSidebarSelection } from "../../../features/activeNav/navAction";
import { resetGetOrderListState } from "../../../features/order/orderSlice";
import { COMMON_PATH } from "../../../utils/constVariable";

import classNames from "classnames/bind";
import style from "./FilterBar.module.scss";
const cx = classNames.bind(style);

const FilterBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const optionSelected = useSelector((state) => state.navbar.sidebar.active);

  const options = [
    { title: "Orders pending" },
    { title: "On Delivery" },
    { title: "On Cancelling" },
    { title: "Completed" },
    { title: "Cancelled" },
  ];

  const handleOnChangeOption = (curOption) => {
    updateSidebarSelection(curOption, dispatch);
    dispatch(resetGetOrderListState());
    navigate(COMMON_PATH.purchase, { replace: true });
  };

  return (
    <Container>
      <Row className={cx("row-cent", "over-flow-drag")}>
        {options.map((option) => {
          return (
            <Col key={option.title} xs="5" sm="3" className={cx("col-cent")}>
              <span
                className={cx(
                  "nav-option",
                  optionSelected === option.title ? "active" : "inactive"
                )}
                onClick={() => handleOnChangeOption(option.title)}
              >
                {option.title}
              </span>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default FilterBar;
