import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

import { SCREEN_MIN_SIZE } from "../../../utils/constVariable";

import Padding from "../../../components/Padding";
import ProductCard from "../../../components/Card/ProductCard";

// Style
import classNames from "classnames/bind";
import style from "./SearchResult.module.scss";
import useWindowDimensions from "../../../hooks/useWindowDimension";
const cx = classNames.bind(style);

const EmptyResult = () => {
  return <div className={cx("header", "empty")}>Sorry, no result found</div>;
};

const SearchResult = () => {
  const myRef = useRef(null);
  const { width } = useWindowDimensions();

  const products = useSelector((state) => state.productList.search.result);
  const errorCause = useSelector(
    (state) => state.productList.search.errorCause
  );

  const ProductList = () => {
    return (
      <>
        <div className={cx("header")}>
          {Object.keys(products).length} results found
        </div>
        {Object.keys(products).map((key) => {
          return (
            <Col key={key} xs="6" md="4" lg="3">
              <ProductCard productInfo={products[key]} />
              <Padding />
            </Col>
          );
        })}
      </>
    );
  };

  useEffect(() => {
    if (width > SCREEN_MIN_SIZE.desktop) myRef.current.scrollIntoView();

    // eslint-disable-next-line
  }, []);

  return (
    <Container ref={myRef}>
      {products ? (
        <Row>
          <Padding />
          {Object.keys(products).length > 0 ? <ProductList /> : <EmptyResult />}
          <Padding />
        </Row>
      ) : (
        errorCause && (
          <Row>
            <Padding />
            <EmptyResult />
            <Padding />
          </Row>
        )
      )}
    </Container>
  );
};

export default React.memo(SearchResult);
