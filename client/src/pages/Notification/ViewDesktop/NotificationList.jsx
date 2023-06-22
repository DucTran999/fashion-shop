import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { formatCapitalize } from "../../../utils/formatData";
import {
  changeNotificationMarkReq,
  getNotificationsReq,
  deleteNotificationReq,
} from "../../../features/notification/notificationRequest";

import classNames from "classnames/bind";
import style from "./NotificationList.module.scss";
const cx = classNames.bind(style);

const Notification = ({ notification }) => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const handleMarkMessage = async () => {
    const notificationChanged = {
      ...notification,
      unread: !notification.unread,
    };
    await changeNotificationMarkReq(
      user.user_id,
      notificationChanged,
      notification.time,
      axiosPrivate,
      dispatch
    );
    await getNotificationsReq(user.user_id, axiosPrivate, dispatch);
  };

  const handleRemoveNotification = async () => {
    await deleteNotificationReq(
      user.user_id,
      notification.time,
      axiosPrivate,
      dispatch
    );
    await getNotificationsReq(user.user_id, axiosPrivate, dispatch);
  };

  return (
    <Row
      className={cx(
        "notification-wrap",
        notification.unread ? "active" : "inactive"
      )}
    >
      <div className={cx("notification__heading")}>
        <span className={cx("notification__time")}>
          {format(notification.time, "yyyy-MM-dd HH:mm:ss")}
        </span>
        <span
          className={cx("notification__btn--remove")}
          onClick={handleRemoveNotification}
        >
          remove
        </span>
      </div>
      <Col lg="10" className={cx("notification__message")}>
        <div>{notification.subject.toUpperCase()}</div>
        <div style={{ textAlign: "justify" }}>
          Hi, {formatCapitalize(user.first_name)}. {notification.message}
        </div>
      </Col>
      <Col lg="2" className={cx("col-cent")}>
        <button
          className={cx("notification__btn")}
          onClick={() => handleMarkMessage(notification.unread)}
        >
          {notification.unread ? "Mark as read" : "Mark as unread"}
        </button>
      </Col>
    </Row>
  );
};

const NotificationList = ({ notifications }) => {
  return (
    <Container className={cx("notification-list")}>
      {notifications.map((notification) => {
        return (
          <Notification key={notification.time} notification={notification} />
        );
      })}
    </Container>
  );
};

export default NotificationList;
