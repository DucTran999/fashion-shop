import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import API_URL from "../../api/endpoint";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import classNames from "classnames/bind";
import style from "./ViewProducts.module.scss";
const cx = classNames.bind(style);

function ViewProducts({ pushAnnouncementToParent }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(1);

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  let isApiCalled = useRef(false);

  const apiCallGetProducts = async (url) => {
    try {
      const res = await axiosPrivate.get(url);

      setProducts(res.data.elements);
      pushAnnouncementToParent("latest data Updated");
    } catch (error) {
      if (!error?.response) {
        pushAnnouncementToParent("Server not response");
      } else if (error.response.status === 401) {
        navigate("/login", { state: { from: location }, replace: true });
      } else if (error.response.status === 403) {
        navigate("/unauthorized", { state: { from: location }, replace: true });
      } else {
        pushAnnouncementToParent(error.response.data.message);
      }
    }
  };

  const handleGetAll = async () => {
    await apiCallGetProducts(API_URL.products);
  };

  const handleReload = async () => {
    await apiCallGetProducts(`${API_URL.categories}/${categoryId}/products`);
  };

  useEffect(() => {
    const callApiGetAllCategories = async () => {
      try {
        const res = await axiosPrivate.get(API_URL.categories);
        setCategories(res.data.elements);

        pushAnnouncementToParent("Categories Loaded Successful");
      } catch (error) {
        if (!error?.response) {
          pushAnnouncementToParent("No Server response");
        } else if (error.response.status === 401) {
          navigate("/login", { state: location, replace: true });
        } else if (error.response.status === 403) {
          navigate("/unauthorized", { state: location, replace: true });
        } else {
          pushAnnouncementToParent(error.response.data.message);
        }
      }
    };

    if (!isApiCalled.current) {
      isApiCalled.current = true;
      callApiGetAllCategories();
    }

    // eslint-disable-next-line
  }, []);

  const CategoryDropdown = () => {
    return (
      <Col>
        <label htmlFor="Category">
          Category:
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            {categories.map((category, idx) => {
              return (
                <option key={idx} value={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </label>
      </Col>
    );
  };

  const TableData = () => {
    return (
      <Row>
        {products?.length ? (
          <table style={{ width: "100%" }}>
            <colgroup>
              <col span={1} width={"10%"} />
              <col span={1} width={"10%"} />
              <col span={1} width={"20%"} />
              <col span={1} width={"10%"} />
              <col span={1} width={"30%"} />
              <col span={1} width={"10%"} />
              <col span={1} width={"10%"} />
            </colgroup>
            <tbody>
              <tr>
                <th className={cx("table-c-1")}>id</th>
                <th className={cx("table-c-1")}>category</th>
                <th className={cx("table-c-2")}>name</th>
                <th className={cx("table-c-1")}>code</th>
                <th className={cx("table-c-2")}>description</th>
                <th className={cx("table-c-1", "tbl-d-cent")}>Edit</th>
                <th className={cx("table-c-1", "tbl-d-cent")}>Delete</th>
              </tr>
              {products.map((product, idx) => (
                <tr key={idx}>
                  <td>{product.id}</td>
                  <td>{product.category}</td>
                  <td>{product.name}</td>
                  <td>{product.code}</td>
                  <td className={cx("table-c-2")}>{product.description}</td>
                  <td className={cx("tbl-d-cent")}>
                    <button>Edit</button>
                  </td>
                  <td className={cx("tbl-d-cent")}>
                    <button> Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No product to display</p>
        )}
      </Row>
    );
  };

  const ListProduct = () => {
    return (
      <Container>
        <Row className={cx("row-cent")}>
          <Col>
            <span className={cx("tbl-header")}>List Product</span>
          </Col>
          <CategoryDropdown />
          <Col className={cx("col-cent")}>
            <button className={cx("btn-reload")} onClick={() => handleGetAll()}>
              Get All
            </button>
          </Col>
          <Col className={cx("col-cent")}>
            <button className={cx("btn-reload")} onClick={() => handleReload()}>
              Reload data
            </button>
          </Col>
        </Row>
        <TableData />
      </Container>
    );
  };

  return (
    <>
      <ListProduct />
    </>
  );
}

export default ViewProducts;
