import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { format } from "date-fns";

import API_URL from "../../api/endpoint";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { sortById } from "../../utils/compareFunc";

import Header from "../../layouts/Header";

import classNames from "classnames/bind";
import style from "./Categories.module.scss";
const cx = classNames.bind(style);

function Categories() {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [announcement, setAnnouncement] = useState("");

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  // api call
  const getCategoriesList = useCallback(async () => {
    try {
      // Get all categories
      const res = await axiosPrivate.get(API_URL.categories);
      let categories = res.data.elements;

      // Sort when categories list is not empty
      if (categories.length > 0) {
        const categoriesSorted = categories.sort(sortById);
        setCategories(categoriesSorted);
      } else {
        setCategories(categories);
      }
      setAnnouncement("Updated");
    } catch (error) {
      if (!error?.response) {
        setAnnouncement("No server response!");
      } else if (error.response.status === 401) {
        navigate("/login", { state: { from: location }, replace: true });
      } else {
        setAnnouncement(error.response.data.message);
      }
    }
  }, [axiosPrivate, location, navigate]);

  const addNewCategory = async (payload) => {
    try {
      await axiosPrivate.post(API_URL.categories, payload);

      setCategoryName("");
      setAnnouncement("new category added!");
    } catch (error) {
      if (!error?.response) {
        setAnnouncement("No server response!");
      } else if (error.response.status === 401) {
        navigate("/login", { state: { from: location }, replace: true });
      } else {
        setAnnouncement(error.response.data.message);
      }
    }
  };

  // handle user click action
  const handleReload = async () => {
    getCategoriesList();
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await addNewCategory({ category_name: categoryName.toLowerCase().trim() });
  };

  useEffect(() => {
    getCategoriesList();
  }, [getCategoriesList]);

  const AddNewCategory = () => {
    return (
      <Container>
        <form onSubmit={handleAdd} className={cx("add-category-section")}>
          <input
            autoFocus
            type="text"
            className={cx("add-category-field")}
            value={categoryName}
            onChange={(event) => setCategoryName(event.target.value)}
            required
          />
          <input className={cx("add-category-btn")} type="submit" value="Add" />
        </form>
      </Container>
    );
  };

  const ListCategory = () => {
    return (
      <Container>
        <Row className={cx("row-cent")}>
          <Col>
            <div className={cx("list-category-header")}>Categories List</div>
          </Col>
          <Col className={cx("col-cent")}>
            <button className={cx("btn-reload")} onClick={() => handleReload()}>
              Reload
            </button>
          </Col>
        </Row>
        <Row>
          {categories?.length ? (
            <table>
              <tbody>
                <tr>
                  <th>Id</th>
                  <th>name</th>
                  <th>Create at</th>
                  <th>Update at</th>
                </tr>
                {categories.map((category, idx) => (
                  <tr key={idx}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>
                      {format(
                        new Date(category.created_at),
                        "yyyy-MM-dd hh:mm:ss z"
                      )}
                    </td>
                    <td>
                      {format(
                        new Date(category.updated_at),
                        "yyyy-MM-dd hh:mm:ss z"
                      )}
                    </td>
                    <td>
                      <button>Edit</button>
                    </td>
                    <td>
                      <button>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No categories to display</p>
          )}
        </Row>
      </Container>
    );
  };

  return (
    <div>
      <Header />
      <div className={cx("announcement")}>Message: {announcement}</div>
      <AddNewCategory />
      <ListCategory />
    </div>
  );
}

export default Categories;
