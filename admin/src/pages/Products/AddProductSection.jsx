import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import API_URL from "../../api/endpoint";

import classNames from "classnames/bind";
import style from "./AddProductSection.module.scss";
const cx = classNames.bind(style);

function AddProductForm({ pushAnnouncementToParent, categories }) {
  const initialProduct = {
    category_id: "",
    name: "",
    code: "",
    description: "",
  };

  const [product, setProduct] = useState(initialProduct);

  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

  // Helper function
  const genProductCode = (category_id) => {
    const identify = Math.floor(100000 + Math.random() * 900000);
    const category = categories.find((obj) => obj.id === category_id);
    const prefix = category.name.slice(0, 4);

    return `${prefix}${identify}`;
  };

  // Api call
  const callApiAddProduct = async (payload) => {
    try {
      const res = await axiosPrivate.post(API_URL.products, payload);

      pushAnnouncementToParent(res.data.message);
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

  // handle user actions
  const handleAddNewProduct = async (e) => {
    e.preventDefault();

    const productInfo = {
      category_id: product.category_id,
      name: product.name.trim().toLowerCase(),
      code: genProductCode(product.category_id),
      description: product.description.trim(),
    };

    await callApiAddProduct(productInfo);
  };

  return (
    <Container>
      <Row className={cx("add-product-form-wrap")}>
        <Col>
          <div className={cx("form-header")}>Add product</div>
          <form onSubmit={handleAddNewProduct} className={cx("form-wrap")}>
            <select
              onChange={(e) =>
                setProduct({
                  ...product,
                  category_id: e.target.value,
                })
              }
              defaultValue={"DEFAULT"}
            >
              <option value="DEFAULT" disabled>
                Choose a category ...
              </option>
              {categories.map((category, idx) => {
                return (
                  <option key={idx} value={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
            <input
              className={cx("form-control")}
              autoFocus
              type="text"
              placeholder="product name"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              required
            />
            <input
              className={cx("form-control")}
              autoFocus
              type="text"
              placeholder="product description"
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              required
            />
            <input
              type="submit"
              className={cx("btn-submit")}
              value={"Add Product"}
            />
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddProductForm;
