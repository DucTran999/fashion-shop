import React, { useEffect, useRef, useState, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

import API_URL from "../../api/init.url";
import axios from "../../api/init.axios";
import { formatHyphenToCapitalize } from "../../utils/formatData";

// Component injected
import Carousel from "../../components/Carousel/Carousel";
import SectionCategory from "../Home/SectionCategory";
import SectionSeparator from "../../components/SectionSeparator";
import ProductCardResponsive from "../../components/Card/ProductCard";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Pagination from "../../components/Pagination";
import MissingPage from "../MissingPage";

// Style
import classNames from "classnames/bind";
import style from "./Category.module.scss";
const cx = classNames.bind(style);

function Category() {
  const isMounted = useRef(true);
  const isFirstRun = useRef(true);
  const ref = useRef(null);

  const { slug } = useParams();

  const [totalPages, setTotalPages] = useState(0);
  const [offset, setOffset] = useState(1);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  if (!isError)
    document.title = `${formatHyphenToCapitalize(slug)} - page ${offset}`;
  else document.title = "Atlana Fashion";

  const handleChangePage = useCallback((pageSelected) => {
    setOffset(pageSelected);
  }, []);

  // Component
  const ListProducts = () => {
    return (
      <>
        <Row>
          {products?.length > 0 ? (
            products.map((product, idx) => {
              return (
                <Col xs="6" lg="3" key={idx} className={cx("col-cent")}>
                  <ProductCardResponsive productInfo={product} />
                </Col>
              );
            })
          ) : (
            <p className={cx("product-list-empty")}>No product found</p>
          )}
        </Row>
        <Row>
          <Pagination
            currentPage={offset}
            pageNumbers={totalPages}
            onPageChange={handleChangePage}
          />
        </Row>
      </>
    );
  };

  const ProductSection = () => {
    return (
      <>
        <SectionSeparator title="All Products" />
        <Container ref={ref}>
          {loading ? <LoadingSpinner /> : <ListProducts />}
        </Container>
      </>
    );
  };

  // Fetch data
  const fetchAllProducts = useCallback(
    async (pageNum) => {
      setLoading(true);

      try {
        const res = await axios.get(`${API_URL.products}/brief-variants`, {
          params: { category: slug, page: pageNum },
        });
        const { total_page, current_page } = res.data.pages;

        setLoading(false);
        setIsError(false);

        setTotalPages(+total_page);
        setOffset(+current_page);
        setProducts(res.data.elements);
      } catch (error) {
        setLoading(false);
        if (!error?.response) {
          console.log("Lost connection");
        } else if (error.response.status === 404) {
          setIsError(true);
        }
      }
    },
    [slug]
  );

  // fetch first time not scroll to product view
  useEffect(() => {
    if (isMounted.current) {
      isMounted.current = false;
      isFirstRun.current = false;
      fetchAllProducts(offset);
    }

    // eslint-disable-next-line
  }, []);

  // update new products when page change
  useEffect(() => {
    fetchAllProducts(offset);
    if (isError) {
      window.scrollTo(0, 0, { behavior: "smooth" });
    } else if (!isFirstRun.current)
      ref?.current.scrollIntoView({ behavior: "smooth" });
  }, [offset, fetchAllProducts, isError]);

  return (
    <main className={cx("theme")}>
      {isError ? (
        <MissingPage />
      ) : (
        <>
          <Carousel />
          <SectionCategory />
          <ProductSection />
        </>
      )}
    </main>
  );
}

export default Category;
