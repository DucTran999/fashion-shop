import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import { Container, Row, Col } from "react-bootstrap";
import Header from "../layouts/Header";

import classNames from "classnames/bind";
import style from "./ManageAccounts.module.scss";
import { useLocation, useNavigate } from "react-router-dom";

const cx = classNames.bind(style);

function ManageAccounts() {
  const [users, setUsers] = useState();

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  // Direct refresh the users list
  const handleReload = async () => {
    try {
      const response = await axiosPrivate.get("/api/v1/users/get-users");
      setUsers(response.data.elements);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axiosPrivate.get("/api/v1/users/get-users");
        setUsers(res.data.elements);
      } catch (error) {
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUsers();
  }, [axiosPrivate, location, navigate]);

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
      <ListAccount />
    </div>
  );
}

export default ManageAccounts;
