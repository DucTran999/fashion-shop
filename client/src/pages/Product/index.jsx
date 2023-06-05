import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";

// custom hook, helper func, ...
import ICONS from "../../assets/icons";
import { fetchProductReq } from "../../features/getProduct/fetchRequest";
import { fetchProductFailed } from "../../features/getProduct/productSlice";

// Component Injected
import Breadcrumb from "../../components/Breadcrumb";
import Gallery from "./Gallery";
import ProductInfo from "./ProductInfo";
import ProductVariantBar from "./ProductVariantBar";
import PolicySection from "./PolicySection";
import ProductCarousel from "../../components/Carousel/ProductCarousel";

import Padding from "../../components/Padding";
import PageLoadingSpinner from "../../components/LoadingSpinner/PageLoadingSpinner";
import MissingPage from "../MissingPage";

// Style
import style from "./Product.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

function Product() {
  const isMounted = useRef(false);

  const isLoading = useSelector((state) => state.product.variants?.isFetching);
  const isError = useSelector((state) => state.product.variants?.error);
  const productVariants = useSelector(
    (state) => state.product.variants.allVariants
  );
  const currentVariant = useSelector(
    (state) => state.product.variants?.selected
  );

  const [currentQty, setCurrentQty] = useState(1);

  const dispatch = useDispatch();
  const { state } = useLocation();

  /* Handle User Action */
  // Quantity Action
  const handleIncreaseQty = () => {
    const maxQty = currentVariant.in_stock;
    setCurrentQty((prev) => {
      if (prev < maxQty) {
        return prev + 1;
      }
      return prev;
    });
  };

  const handleDecreaseQty = () => {
    setCurrentQty((prev) => {
      if (prev > 1) {
        return prev - 1;
      }
      return 1;
    });
  };

  const handleOnBuySubmit = () => {
    console.log(currentQty, currentVariant.sku);
  };

  // Component
  const ChangeProductQtySection = () => {
    return (
      <Row className={cx("row-mg")}>
        <Col>
          <div className={cx("change-qty-wrap")}>
            <input
              className={cx("btn-change-qty")}
              type="submit"
              value={"-"}
              onClick={handleDecreaseQty}
            />
            <div className={cx("current-qty")}>{currentQty}</div>
            <input
              className={cx("btn-change-qty")}
              type="submit"
              value={"+"}
              onClick={handleIncreaseQty}
            />
          </div>
        </Col>
      </Row>
    );
  };

  const UtilitySection = () => {
    return (
      <Row>
        {currentVariant.in_stock > 0 && (
          <Col className={cx("col-cent")}>
            <span className={cx("btn-user-action")}>
              <span className={cx("btn-user-action__icon")}>{ICONS.cart}</span>
              <span className={cx("btn-user-action__title")}>Add to Cart</span>
            </span>
          </Col>
        )}
        {currentVariant.in_stock ? (
          <Col className={cx("col-cent")}>
            <span className={cx("btn-user-action")} onClick={handleOnBuySubmit}>
              <span className={cx("btn-user-action__icon")}>
                {ICONS.moneyBag}
              </span>
              <span className={cx("btn-user-action__title")}>Buy now</span>
            </span>
          </Col>
        ) : (
          <Col className={cx("col-cent")}>
            <span className={cx("btn-user-action", "disable")}>
              <span className={cx("btn-user-action__icon")}>
                {ICONS.moneyBag}
              </span>
              <span className={cx("btn-user-action__title")}>Sold Out</span>
            </span>
          </Col>
        )}
        <Col className={cx("col-cent")}>
          <span className={cx("btn-user-action")}>
            <span className={cx("btn-user-action__icon")}>
              {ICONS.favourite}
            </span>
            <span className={cx("btn-user-action__title")}>Wishlist</span>
          </span>
        </Col>
      </Row>
    );
  };

  /* productVariants description Component */
  const Description = () => {
    const lines = currentVariant.description.trim().split("-");
    return lines.map((line, idx) => {
      return line && <p key={idx}> - {line}</p>;
    });
  };

  const ProductDetail = () => {
    return (
      <Container className={cx("product-detail")}>
        <ProductInfo />
        <ProductVariantBar />
        <ChangeProductQtySection />
        <UtilitySection />
        <Row>
          <p className={cx("description__header")}>Description</p>
          <Description />
        </Row>
        <PolicySection />
      </Container>
    );
  };

  // Fetch product data
  useEffect(() => {
    // If user change the remain of url.
    if (!state) dispatch(fetchProductFailed());

    if (!isMounted.current && state) {
      isMounted.current = true;
      fetchProductReq(state.product_id, dispatch);
    }

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // If user change the remain of url.
    if (!state) dispatch(fetchProductFailed());

    if (!isMounted.current && state) {
      isMounted.current = true;
      fetchProductReq(state.product_id, dispatch);
    }

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line
  }, [state]);

  return (
    <main className={cx("theme")}>
      {isError ? (
        <MissingPage />
      ) : isLoading ? (
        <PageLoadingSpinner />
      ) : (
        productVariants &&
        currentVariant && (
          <>
            <Breadcrumb productName={currentVariant.name} />
            <Container>
              <Row className={cx("row-cent")}>
                <Gallery variantInfo={currentVariant} />
                <Col lg="6" className={cx("col-cent")}>
                  <ProductDetail />
                </Col>
              </Row>
            </Container>
            <Padding />
            <ProductCarousel
              title="PRODUCTS RELATED"
              categoryId={state.category_id}
              limit="12"
            />
            <Padding />
          </>
        )
      )}
    </main>
  );
}

export default Product;
