import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// Custom hook, util func, variables ...
import ICONS from "../../assets/icons";
import IMAGES from "../../assets/images";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useWindowDimensions from "../../hooks/useWindowDimension";
import { LOCAL_STORAGE_KEY } from "../../utils/constVariable";
import { updateSelection } from "../../features/activeNav/navAction";
import {
  formatMoney,
  formatColorCode,
  formatCapitalize,
  formatVietnameseToNonAccent,
} from "../../utils/formatData";
import {
  addProductToWishlistReq,
  removeProductFromWishlistReq,
} from "../../features/wishlist/wishlistAction";

// Style
import classNames from "classnames/bind";
import style from "./ProductCard.module.scss";
const cx = classNames.bind(style);

const IMG_URL = process.env.REACT_APP_API_SERVER_URL;

const checkProductInWishlist = (productId) => {
  const wishlist = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEY.wishlistLocal)
  );
  return wishlist?.[productId] ? true : false;
};

const ProductCard = ({ productInfo }) => {
  const [currentVariant, setVariant] = useState(0);
  const [inWishlist, setInWishlist] = useState(
    checkProductInWishlist(productInfo[0].product_id)
  );

  const [mouseMoved, setMouseMoved] = useState(false);
  const { width } = useWindowDimensions();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const user = useSelector((state) => state.auth.login?.currentUser);

  const handleAddToWishlist = async () => {
    if (inWishlist === false) {
      await addProductToWishlistReq(
        user?.user_id,
        productInfo,
        axiosPrivate,
        dispatch
      );
      setInWishlist(!inWishlist);
    } else {
      await removeProductFromWishlistReq(
        user?.user_id,
        productInfo,
        axiosPrivate,
        dispatch
      );
      setInWishlist(!inWishlist);
    }
  };

  const handleNavigateOnClick = () => {
    if (!mouseMoved) {
      const slug = formatVietnameseToNonAccent(
        productInfo[currentVariant].name
      );
      updateSelection("category", dispatch);
      navigate(`/product/${slug}`, {
        state: {
          category_id: productInfo[currentVariant].category_id,
          product_id: productInfo[currentVariant].product_id,
        },
        replace: false,
      });
    }
  };

  const handleOnTouch = () => {
    const slug = formatVietnameseToNonAccent(productInfo[currentVariant].name);
    updateSelection("category", dispatch);
    navigate(`/product/${slug}`, {
      state: {
        category_id: productInfo[currentVariant].category_id,
        product_id: productInfo[currentVariant].product_id,
      },
      replace: false,
    });
  };

  const SwitchVariantBar = () => {
    return (
      <div className={cx("change-variant__bar")}>
        {width > 480
          ? productInfo.map((variant, idx) => {
              return (
                <button
                  key={idx}
                  type="submit"
                  className={cx(
                    "change-variant__btn",
                    `${formatColorCode(variant.color)}`
                  )}
                  onClick={() => setVariant(idx)}
                />
              );
            })
          : productInfo.map((variant, idx) => {
              return (
                idx < 3 && (
                  <button
                    key={idx}
                    type="submit"
                    className={cx(
                      "change-variant__btn",
                      `${formatColorCode(variant.color)}`
                    )}
                    onClick={() => setVariant(idx)}
                  />
                )
              );
            })}
      </div>
    );
  };

  // Processing product price
  const productPrice = () => {
    let productOriginalPrice = productInfo[currentVariant].price;

    return formatMoney(productOriginalPrice);
  };

  return (
    <div className={cx("card-wrap")}>
      {width > 768 ? (
        <div className={cx("image-wrap")}>
          <LazyLoadImage
            src={`${IMG_URL}/product/${productInfo[currentVariant].image}`}
            className={cx("product-img")}
            placeholderSrc={IMAGES.defaultImg}
            alt="Product IMG"
            onMouseMove={() => setMouseMoved(true)}
            onMouseDown={() => setMouseMoved(false)}
            onMouseUp={handleNavigateOnClick}
          />
          <div className={cx("add-wishlist-btn")} onClick={handleAddToWishlist}>
            <span className={cx("btn-icon")}>
              {inWishlist ? ICONS.heart : ICONS.favourite}
            </span>
          </div>
        </div>
      ) : (
        <div className={cx("image-wrap")}>
          <LazyLoadImage
            src={`${IMG_URL}/product/${productInfo[currentVariant].image}`}
            className={cx("product-img")}
            placeholderSrc={IMAGES.defaultImg}
            effect="blur"
            alt="Product IMG"
            onClick={handleOnTouch}
          />
          <div className={cx("add-wishlist-btn")} onClick={handleAddToWishlist}>
            <span className={cx("btn-icon")}>
              {inWishlist ? ICONS.heart : ICONS.favourite}
            </span>
          </div>
        </div>
      )}
      <SwitchVariantBar />
      <p className={cx("product-name")}>
        {formatCapitalize(productInfo[currentVariant].name)}
      </p>
      <p className={cx("product-price")}>Price: {`${productPrice()}`}</p>
    </div>
  );
};

export default ProductCard;
