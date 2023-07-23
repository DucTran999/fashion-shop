import React from "react";
import { Container, Col, Row } from "react-bootstrap";

// Component Injected
import Breadcrumb from "../../../components/Breadcrumb";
import Gallery from "../Common/Gallery";
import ProductDetail from "./ProductDetail";
import ProductCarousel from "../../../components/Carousel/ProductCarousel";

import Padding from "../../../components/Padding";

// Style
import style from "./TabletView.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

const DesktopView = ({ allVariants, variant, categoryId }) => {
  return (
    <React.Fragment>
      <Breadcrumb productName={variant.name} />
      <Container className={cx("product-layout")}>
        <Row className={cx("row-cent")}>
          <Gallery variantInfo={variant} />
          <Padding />
          <Col lg="6" className={cx("col-cent")}>
            <ProductDetail allVariants={allVariants} variant={variant} />
          </Col>
        </Row>
      </Container>
      <Padding />
      <ProductCarousel
        title="Products related"
        categoryId={categoryId}
        limit="12"
      />
      <Padding />
    </React.Fragment>
  );
};

export default DesktopView;
