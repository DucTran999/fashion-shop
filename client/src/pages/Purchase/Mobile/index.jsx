import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { getUserReq } from "../../../features/user/userRequest";
import { updateSidebarSelection } from "../../../features/activeNav/navAction";

import FilterBar from "./FilterBar";
import OrderDashboard from "./OrderDashboard";

const ViewMobile = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);

  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  useEffect(() => {
    getUserReq(user.user_id, axiosPrivate, dispatch);
    updateSidebarSelection("Orders pending", dispatch);

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Container>
        <FilterBar />
      </Container>
      {user && <OrderDashboard user={user} />}
    </>
  );
};

export default ViewMobile;
