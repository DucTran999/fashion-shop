import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";

// custom hook, helper func, ...
import { fetchProductReq } from "../../features/product/productAction";
import { fetchProductFailed } from "../../features/product/productSlice";

// Component Injected
import Breadcrumb from "../../components/Breadcrumb";
import Gallery from "./Gallery";
import ProductDetail from "./ProductDetail";
import ProductCarousel from "../../components/Carousel/ProductCarousel";

import Padding from "../../components/Padding";
import PageLoadingSpinner from "../../components/LoadingSpinner/PageLoadingSpinner";
import MissingPage from "../MissingPage";

// Style
import style from "./Product.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

const ProductMainLayout = ({ variant, categoryId }) => {
  return (
    <>
      <Breadcrumb productName={variant.name} />
      <Container className={cx("product-layout")}>
        <Row className={cx("row-cent")}>
          <Gallery variantInfo={variant} />
          <Col lg="6" className={cx("col-cent")}>
            <ProductDetail variant={variant} />
          </Col>
        </Row>
      </Container>
      <Padding />
      <ProductCarousel
        title="PRODUCTS RELATED"
        categoryId={categoryId}
        limit="12"
      />
      <Padding />
    </>
  );
};

function Product() {
  const isMounted = useRef(false);
  const isLoading = useSelector((state) => state.product.variants.isFetching);
  const isError = useSelector((state) => state.product.variants.error);

  const productVariants = useSelector(
    (state) => state.product.variants.allVariants
  );
  const currentVariant = useSelector(
    (state) => state.product.variants.selected
  );

  const dispatch = useDispatch();
  const { state } = useLocation();

  // Fetch product data
  useEffect(() => {
    // If user change the remain of url -> lost state -> not found page
    if (!state) dispatch(fetchProductFailed());

    if (!isMounted.current && state) {
      isMounted.current = true;
      fetchProductReq(state.product_id, dispatch);
    }

    window.scrollTo(0, 0);

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // If user change the remain of url.
    if (!state) dispatch(fetchProductFailed());

    if (!isMounted.current && state) {
      isMounted.current = true;
      fetchProductReq(state.product_id, dispatch);
    }

    window.scrollTo(0, 0);
    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line
  }, [state]);

  return (
    <main className={cx("theme")}>
      {isLoading ? (
        <PageLoadingSpinner />
      ) : isError ? (
        <MissingPage />
      ) : (
        productVariants &&
        currentVariant && (
          <ProductMainLayout
            variant={currentVariant}
            categoryId={state.category_id}
          />
        )
      )}
    </main>
  );
}

export default Product;
