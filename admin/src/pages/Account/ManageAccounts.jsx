import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

// Util, custom hook, ...
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getAllUsersReq } from "../../redux/user/userAction";

// Component
import Header from "../../layouts/Header";

// style
import classNames from "classnames/bind";
import style from "./ManageAccounts.module.scss";
const cx = classNames.bind(style);

function ManageAccounts() {
  const isMounted = useRef(false);
  const users = useSelector((state) => state.user.getAll.userList);

  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  const handleReload = async () => {
    await getAllUsersReq(axiosPrivate, dispatch);
  };

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      handleReload();
    }

    // eslint-disable-next-line
  }, []);

  const ListAccount = () => {
    return (
      <Container>
        <Row className={cx("row-cent")}>
          <Col>
            <span className={cx("tbl-header")}>List Account</span>
          </Col>
          <Col className={cx("col-cent")}>
            <button className={cx("btn-reload")} onClick={() => handleReload()}>
              Reload data
            </button>
          </Col>
        </Row>
        <Row>
          {users?.length ? (
            <table>
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Disabled</th>
                </tr>
                {users.map((user, idx) => (
                  <tr key={idx}>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                    <td>{String(user.phone)}</td>
                    <td>{String(user.is_disabled)}</td>
                    <td>
                      <button>Edit</button>
                    </td>
                    <td>
                      <button>Ban</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No users to display</p>
          )}
        </Row>
      </Container>
    );
  };

  return (
    <div>
      <Header />
      {users && <ListAccount />}
    </div>
  );
}

export default ManageAccounts;
