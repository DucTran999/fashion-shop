import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// custom hook, helper func, ...
import useWindowDimensions from "../../hooks/useWindowDimension";
import { SCREEN_MIN_SIZE } from "../../utils/constVariable";
import { fetchProductReq } from "../../features/product/productAction";
import { fetchProductFailed } from "../../features/product/productSlice";

import PageLoadingSpinner from "../../components/LoadingSpinner/PageLoadingSpinner";
import MissingPage from "../MissingPage";
import DesktopView from "./Desktop/DesktopView";
import TabletView from "./Tablet/TabletView";
import MobileView from "./Mobile/MobileView";

// Style
import style from "./Product.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

const Product = () => {
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
  const { width } = useWindowDimensions();

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
        currentVariant &&
        (width >= SCREEN_MIN_SIZE.desktop ? (
          <DesktopView
            allVariants={productVariants}
            variant={currentVariant}
            categoryId={state.category_id}
          />
        ) : width >= SCREEN_MIN_SIZE.tablet ? (
          <TabletView
            allVariants={productVariants}
            variant={currentVariant}
            categoryId={state.category_id}
          />
        ) : (
          <MobileView
            allVariants={productVariants}
            variant={currentVariant}
            categoryId={state.category_id}
          />
        ))
      )}
    </main>
  );
};

export default Product;
