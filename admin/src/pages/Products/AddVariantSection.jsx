import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

// Custom hook, util func
import API_URL from "../../api/url.init";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { convertSizeCode, convertColorCode } from "../../utils/convertData";
import { sortByValue } from "../../utils/compareFunc";

// Component Injected
import Announcement from "../../components/Announcement/Announcement";
import UploadAndDisplayImage from "../../components/UploadImageForm";

// Style
import classNames from "classnames/bind";
import style from "./AddVariantSection.module.scss";
const cx = classNames.bind(style);

function AddVariantSection({ pushAnnouncementToParent, categories }) {
  const [variant, setVariant] = useState({
    product_id: "",
    color_id: "",
    size_id: "",
    sku: "",
    image: "",
    images: [],
    price: "",
    in_stock: "",
  });

  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [products, setProducts] = useState([]);
  const [categorySelected, setCategorySelected] = useState(1);
  const [announcement, setAnnouncement] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

  // api call
  const updateAttributeValue = async () => {
    try {
      const resSizes = await axiosPrivate.get(API_URL.sizes);
      setSizes(resSizes.data.elements);
      const resColors = await axiosPrivate.get(API_URL.colors);
      let colors = resColors.data.elements;
      setColors(colors.sort(sortByValue));

      pushAnnouncementToParent("Colors and Sizes UPDATED");
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

  const apiCallGetProducts = useCallback(async () => {
    try {
      const res = await axiosPrivate.get(
        `${API_URL.categories}/${categorySelected}/products`
      );
      setProducts(res.data.elements);

      pushAnnouncementToParent("categories UPDATED");
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
  }, [
    axiosPrivate,
    location,
    navigate,
    categorySelected,
    pushAnnouncementToParent,
  ]);

  const apiCallAddVariant = async (payload) => {
    try {
      const res = await axiosPrivate.post(API_URL.variants, payload);

      setAnnouncement(res.data.message);
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

  // helper
  const genSKU = () => {
    const product = products.find(
      (product) => product.id === variant.product_id
    );
    const product_code = product.code;

    const size = sizes.find((size) => size.id === variant.size_id);
    const size_code = convertSizeCode(size.value);

    const color = colors.find((color) => color.id === variant.color_id);
    const color_code = convertColorCode(color.value);

    return `${product_code}${size_code}${color_code}`;
  };

  // handle user action
  const handleRefreshLatestAttribute = () => {
    updateAttributeValue();
  };

  const handleSetImage = (files) => {
    const listUrl = [];
    files.forEach((file) => listUrl.push(file.name));

    setVariant({ ...variant, image: listUrl[0], images: listUrl });
  };

  const handleAddVariant = (e) => {
    e.preventDefault();
    const variantNormalization = {
      product_id: variant.product_id,
      color_id: variant.color_id,
      size_id: variant.size_id,
      sku: genSKU(),
      image: variant.image,
      images: variant.images,
      price: variant.price,
      in_stock: variant.in_stock,
    };

    console.log(variantNormalization);
    apiCallAddVariant(variantNormalization);
  };

  useEffect(() => {
    updateAttributeValue();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    apiCallGetProducts();
  }, [categorySelected, apiCallGetProducts]);

  return (
    <Container>
      <Announcement message={announcement} />
      <Row className={cx("add-form-wrap")}>
        <div className={cx("form-header")}>Add Variant</div>
        <Col className={cx("mg-left-05")}>
          <select
            className={cx("dropdown-wrap")}
            defaultValue="DEFAULT"
            onChange={(e) => setCategorySelected(e.target.value)}
          >
            <option value="DEFAULT" disabled>
              Select category ...
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
            className={cx("mg-left-1")}
            onClick={handleRefreshLatestAttribute}
            type="submit"
            value="Update latest color, size"
          />
        </Col>
        <Col>
          <form
            onSubmit={(e) => handleAddVariant(e)}
            className={cx("form-wrap")}
          >
            <Container fluid={true}>
              <Row className={cx("mg-tb-1")}>
                {/* Select product */}
                <Col>
                  <select
                    className={cx("dropdown-wrap")}
                    defaultValue="DEFAULT"
                    onChange={(e) =>
                      setVariant({ ...variant, product_id: e.target.value })
                    }
                  >
                    <option value="DEFAULT" disabled>
                      Select product ...
                    </option>
                    {products.map((product, idx) => {
                      return (
                        <option key={idx} value={product.id}>
                          {product.name}
                        </option>
                      );
                    })}
                  </select>
                </Col>

                {/* Select Color */}
                <Col>
                  <select
                    className={cx("dropdown-wrap")}
                    defaultValue={"DEFAULT"}
                    onChange={(e) =>
                      setVariant({ ...variant, color_id: e.target.value })
                    }
                  >
                    <option value="DEFAULT" disabled>
                      Choose color ...
                    </option>
                    {colors.map((color, idx) => {
                      return (
                        <option key={idx} value={color.id}>
                          {color.value}
                        </option>
                      );
                    })}
                  </select>
                </Col>

                {/* Select Size */}
                <Col>
                  <select
                    className={cx("dropdown-wrap")}
                    defaultValue={"DEFAULT"}
                    onChange={(e) =>
                      setVariant({ ...variant, size_id: e.target.value })
                    }
                  >
                    <option value="DEFAULT" disabled>
                      Choose size ...
                    </option>
                    {sizes.map((size, idx) => {
                      return (
                        <option key={idx} value={size.id}>
                          {size.value}
                        </option>
                      );
                    })}
                  </select>
                </Col>

                {/* Price */}
                <Col>
                  <input
                    autoFocus
                    className={cx("form-control")}
                    type="text"
                    value={variant.price}
                    onChange={(e) =>
                      setVariant({ ...variant, price: e.target.value })
                    }
                    placeholder="product price..."
                    required
                  />
                </Col>

                {/*Stock*/}
                <Col>
                  <input
                    autoFocus
                    className={cx("form-control")}
                    type="text"
                    value={variant.in_stock}
                    onChange={(e) =>
                      setVariant({ ...variant, in_stock: e.target.value })
                    }
                    placeholder="quantity in stoke..."
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <input type="submit" value="Add Variant" />
                </Col>
              </Row>
            </Container>
          </form>
          <Container>
            <Row className={cx("mg-tb-1")}>
              <Col>
                <UploadAndDisplayImage parentGetImageList={handleSetImage} />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default React.memo(AddVariantSection);
