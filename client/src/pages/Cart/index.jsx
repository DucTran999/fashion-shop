import React, { useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { updateSelection } from "../../features/activeNav/navAction";
import { getCartReq } from "../../features/cart/cartAction";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

// Component Injected
import Padding from "../../components/Padding";
import SectionHeader from "../../components/SectionHeader";
import CartProduct from "./CartProduct";
import CartPriceSection from "./CartPriceSection";
import ErrorBlock from "../../components/ErrorBlock";

// Style
import classNames from "classnames/bind";
import style from "./Cart.module.scss";

const cx = classNames.bind(style);

const CartEmpty = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigateCategory = () => {
    updateSelection("category", dispatch);
    navigate("/category/all-products", { replace: true });
  };

  return (
    <Row>
      <Padding />
      <div className={cx("cart-empty-wrap")}>
        <div>Cart is empty</div>
        <button
          className={cx("back-category-btn")}
          onClick={handleNavigateCategory}
        >
          Shopping now
        </button>
      </div>
    </Row>
  );
};

const ListProducts = ({ products }) => {
  return (
    <Container>
      <Row>
        <SectionHeader title={`Your cart (${products.length})`} />
      </Row>
      {products.length === 0 ? (
        <CartEmpty />
      ) : (
        <Row className={cx("product-list-wrap")}>
          {products.map((product) => {
            return (
              <span key={product.variant_id}>
                <CartProduct product={product} />
              </span>
            );
          })}
        </Row>
      )}
    </Container>
  );
};

const Cart = () => {
  document.title = "Cart";
  const isMounted = useRef(false);
  const user = useSelector((state) => state.auth.login.currentUser);

  const errCause = useSelector((state) => state.cart.get.errorCause);
  const cart = useSelector((state) => state.cart.get.info);

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      updateSelection("cart", dispatch);
      getCartReq(user.user_id, axiosPrivate, dispatch);
    }
    window.scrollTo(0, 0);

    // eslint-disable-next-line
  }, []);

  return (
    <main className={cx("theme")}>
      {errCause ? (
        <ErrorBlock msg={errCause} />
      ) : (
        cart?.products && (
          <>
            <Padding />
            <Container>
              <Row>
                <Col md="12" lg="8">
                  <ListProducts products={cart.products} />
                </Col>
                <Col md="12" lg="4">
                  <CartPriceSection total_price={cart.total_price} />
                </Col>
              </Row>
            </Container>
            <Padding />
          </>
        )
      )}
    </main>
  );
};

export default React.memo(Cart);
