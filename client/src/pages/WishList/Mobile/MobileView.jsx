import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

import EmptyWishlist from "../Common/EmptyWishlist";

import ProductCard from "../../../components/Card/ProductCard";
import LoadingPage from "../../../components/LoadingSpinner/PageLoadingSpinner";

// Style
import classNames from "classnames/bind";
import style from "./MobileView.module.scss";
const cx = classNames.bind(style);

const MobileView = ({ wishlist }) => {
  const isFetchingWishlist = useSelector(
    (state) => state.wishlist.get.isLoading
  );

  return (
    <div className={cx("wrapper")}>
      <Container>
        {isFetchingWishlist ? (
          <LoadingPage />
        ) : Object.keys(wishlist).length > 0 ? (
          <Row className={cx("catalog-wrapper ")}>
            <div className={cx("header")}>My wishlist</div>
            {Object.keys(wishlist).map((key) => {
              return (
                <Col key={key} xs="6">
                  <ProductCard productInfo={wishlist[key]} />
                </Col>
              );
            })}
          </Row>
        ) : (
          <EmptyWishlist />
        )}
      </Container>
    </div>
  );
};

export default React.memo(MobileView);
