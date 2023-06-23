import React from "react";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";

// Component Injected
import ErrorBlock from "../../../components/ErrorBlock";
import SectionHeader from "../../../components/SectionHeader";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

import StateFilter from "../CommonComponent/StateFilter";
import EmptyNotification from "../CommonComponent/EmptyNotification";

import NotificationList from "./NotificationList";

const NotificationLayout = () => {
  const optionSelected = useSelector((state) => state.navbar.sidebar.active);
  const filter = useSelector((state) => state.notification.filter);

  const isFetching = useSelector((state) => state.notification.get.isFetching);
  const errorCause = useSelector((state) => state.notification.get.errorCause);
  const notifications = useSelector(
    (state) => state.notification.get.notifications
  );

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
        notifications && (
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
