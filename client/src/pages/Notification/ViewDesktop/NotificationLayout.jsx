import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "react-bootstrap";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { getNotificationsReq } from "../../../features/notification/notificationRequest";

import SectionHeader from "../../../components/SectionHeader";
import StateFilter from "./StateFilter";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import ErrorBlock from "../../../components/ErrorBlock";
import NotificationList from "./NotificationList";
import EmptyNotification from "./EmptyNotification";

const NotificationLayout = ({ user }) => {
  const isMounted = useRef(false);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  const optionSelected = useSelector((state) => state.navbar.sidebar.active);
  const filter = useSelector((state) => state.notification.filter);

  const notifications = useSelector(
    (state) => state.notification.get.notifications
  );
  const isFetching = useSelector((state) => state.notification.get.isFetching);
  const errorCause = useSelector((state) => state.notification.get.errorCause);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      getNotificationsReq(user.user_id, axiosPrivate, dispatch);
    }
    // eslint-disable-next-line
  }, []);

  const RenderListNotifications = ({ notifications, filter }) => {
    return notifications[filter].length === 0 ? (
      <EmptyNotification />
    ) : (
      <NotificationList notifications={notifications[filter]} />
    );
  };

  return (
    <Container style={{ position: "relative" }}>
      <SectionHeader title={optionSelected} />
      <StateFilter />
      {isFetching && !notifications ? (
        <LoadingSpinner />
      ) : errorCause ? (
        <ErrorBlock msg={errorCause} />
      ) : (
        notifications &&
        filter && (
          <RenderListNotifications
            notifications={notifications[optionSelected]}
            filter={filter}
          />
        )
      )}
    </Container>
  );
};

export default NotificationLayout;
