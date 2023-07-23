import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import { Container, Row, Col } from "react-bootstrap";

// custom hook, helper func, utils ...
import axios from "../../api/init.axios";
import API_URL from "../../api/endpoint";

// Component Injected
import ProductCard from "../../components/Card/ProductCard";
import SectionSeparator from "../../components/SectionSeparator";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

// Style
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "./ProductCarousel.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

function ProductCarousel({ title, typeFilter, categoryId, limit }) {
  const isMounted = useRef(false);
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProduct = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${API_URL.products}/filter`, {
        params: { type: typeFilter, category: categoryId, limit: limit },
      });
      setProducts(res.data.elements);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    swipeToSlide: true,
    lazyLoad: true,
    arrows: false,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: false,
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 1,
          speed: 500,
          lazyLoad: true,
          autoplay: true,
          pauseOnHover: true,
          autoplaySpeed: 5000,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          dots: false,
          infinite: false,
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 1,
          speed: 500,
          autoplay: false,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 500,
        settings: {
          dots: false,
          slidesToShow: 2,
          slidesToScroll: 1,
          speed: 500,
          arrows: false,
          infinite: false,
          autoplay: false,
          swipeToSlide: true,
        },
      },
    ],
  };

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      fetchProduct();
    }

    // eslint-disable-next-line
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        products?.length > 0 && (
          <>
            <SectionSeparator title={title} />
            <Container>
              <Row className={cx("row-center")}>
                <Slider {...settings}>
                  {products.map((product, idx) => {
                    return (
                      <Col lg={3} key={idx} className={cx("col-cent")}>
                        <ProductCard productInfo={product} />
                      </Col>
                    );
                  })}
                </Slider>
              </Row>
            </Container>
          </>
        )
      )}
    </>
  );
}

export default ProductCarousel;
