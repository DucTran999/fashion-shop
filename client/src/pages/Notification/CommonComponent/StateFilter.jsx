import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";

import { setNotificationFilter } from "../../../features/notification/notificationSlice";
import { formatCapitalize } from "../../../utils/formatData";

import classNames from "classnames/bind";
import style from "./StateFilter.module.scss";
const cx = classNames.bind(style);

const StateFilter = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.notification.filter);
  const filters = [{ type: "all" }, { type: "unread" }, { type: "read" }];

  return (
    <Row className={cx("filter-wrap")}>
      {filters.map((filter) => {
        return (
          <Col
            key={filter.type}
            className={cx(
              "filter-title",
              currentFilter === filter.type ? "active" : "inactive"
            )}
            onClick={() => dispatch(setNotificationFilter(filter.type))}
          >
            {formatCapitalize(filter.type)}
          </Col>
        );
      })}
    </Row>
  );
};

export default StateFilter;
