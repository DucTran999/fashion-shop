import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import API_URL from "../../api/endpoint";

// Component Injected
import Header from "../../layouts/Header";
import Announcement from "../../components/Announcement/Announcement";
import AddAttributeSection from "./AddAttributeSection";
import AddProductSection from "./AddProductSection";
import AddVariantSection from "./AddVariantSection";

import ViewProducts from "./ViewProducts";

// Style
import classNames from "classnames/bind";
import style from "./Products.module.scss";
const cx = classNames.bind(style);

function Products() {
  const [announcement, setAnnouncement] = useState("");
  const [isManageView, setIsManageView] = useState(true);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

  const updateAnnouncement = (message) => {
    setAnnouncement(message);
  };

  const apiCallGetCategories = async () => {
    try {
      const res = await axiosPrivate.get(API_URL.categories);

      setCategories(res.data.elements);
      setAnnouncement("categories UPDATED");
    } catch (error) {
      if (!error?.response) {
        setAnnouncement("No Server response");
      } else if (error.response.status === 401) {
        navigate("/login", { state: location, replace: true });
      } else if (error.response.status === 403) {
        navigate("/unauthorized", { state: location, replace: true });
      } else {
        setAnnouncement(error.response.data.message);
      }
    }
  };

  const SubNavbar = () => {
    return (
      <Container>
        <Row className={cx("row-border--btm")}>
          <Col>
            <input
              className={cx(
                "sub-nav-btn",
                isManageView ? "active" : "inactive"
              )}
              type="submit"
              value={"Manage"}
              onClick={() => setIsManageView(true)}
            />
            <input
              className={cx(
                "sub-nav-btn",
                !isManageView ? "active" : "inactive"
              )}
              type="submit"
              value={"View"}
              onClick={() => setIsManageView(false)}
            />
          </Col>
        </Row>
      </Container>
    );
  };

  useEffect(() => {
    apiCallGetCategories();

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header />
      <Announcement message={announcement} />
      <SubNavbar />
      {isManageView ? (
        <>
          <AddAttributeSection pushAnnouncementToParent={updateAnnouncement} />
          <AddProductSection
            pushAnnouncementToParent={updateAnnouncement}
            categories={categories}
          />
          <AddVariantSection
            pushAnnouncementToParent={updateAnnouncement}
            categories={categories}
          />
        </>
      ) : (
        <ViewProducts pushAnnouncementToParent={updateAnnouncement} />
      )}
    </>
  );
}

export default Products;
