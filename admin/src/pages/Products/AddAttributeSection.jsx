import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import API_URL from "../../api/url.init";

import classNames from "classnames/bind";
import style from "./AddAttributeSection.module.scss";
const cx = classNames.bind(style);

function AddAttributeForm({ pushAnnouncementToParent }) {
  const [newColor, setNewColor] = useState("");
  const [newSize, setNewSize] = useState("");

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  // api call
  const addNewAttributeValue = async (apiURL, payload) => {
    try {
      const res = await axiosPrivate.post(apiURL, payload);

      pushAnnouncementToParent(res.data.message);
    } catch (error) {
      if (!error?.response) {
        pushAnnouncementToParent("Lost connection");
      } else if (error.response.status === 401) {
        navigate("/login", { state: { from: location }, replace: true });
      } else if (error.response.status === 403) {
        navigate("/unauthorized", { state: { from: location }, replace: true });
      } else {
        pushAnnouncementToParent(error.response.data.message);
      }
    }
  };

  const handleAddNewColor = (e) => {
    e.preventDefault();
    const payload = {
      color_value: newColor.trim().toLowerCase(),
    };
    addNewAttributeValue(API_URL.colors, JSON.stringify(payload));
  };

  const handleAddNewSize = (e) => {
    e.preventDefault();
    const payload = {
      size_value: newSize.trim().toLowerCase(),
    };
    addNewAttributeValue(API_URL.sizes, JSON.stringify(payload));
  };

  return (
    <Container>
      <Row className={cx("manage-atr-wrap")}>
        {/* Add Color */}
        <Col>
          <div className={cx("form-header")}>Add New Color</div>
          <form onSubmit={handleAddNewColor} className={cx("form-wrap")}>
            <input
              className={cx("form-control")}
              autoFocus
              type="text"
              value={newColor}
              placeholder="new color"
              onChange={(e) => setNewColor(e.target.value)}
              required
            />
            <input
              type="submit"
              className={cx("btn-submit")}
              value={"Add Color"}
            />
          </form>
        </Col>

        {/* Add Size*/}
        <Col>
          <div className={cx("form-header")}>Add New Size</div>
          <form onSubmit={handleAddNewSize} className={cx("form-wrap")}>
            <input
              className={cx("form-control")}
              autoFocus
              type="text"
              value={newSize}
              placeholder="new size"
              onChange={(e) => setNewSize(e.target.value)}
              required
            />
            <input
              type="submit"
              className={cx("btn-submit")}
              value={"Add Size"}
            />
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddAttributeForm;
