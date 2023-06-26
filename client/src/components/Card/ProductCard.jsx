import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// Custom hook, util func, variables ...
import ICONS from "../../assets/icons";
import IMAGES from "../../assets/images";
import useWindowDimensions from "../../hooks/useWindowDimension";
import { updateSelection } from "../../features/activeNav/navAction";
import {
  formatMoney,
  formatColorCode,
  formatCapitalize,
  formatVietnameseToNonAccent,
} from "../../utils/formatData";

// Style
import classNames from "classnames/bind";
import style from "./ProductCard.module.scss";
const cx = classNames.bind(style);

const IMG_URL = process.env.REACT_APP_API_SERVER_URL;

function ProductCard({ productInfo }) {
  const [currentVariant, setVariant] = useState(0);
  const [isWishlistAdded, setIsWishlistAdded] = useState("inactive");
  const [mouseMoved, setMouseMoved] = useState(false);
  const { width } = useWindowDimensions();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToWishlist = () => {
    setIsWishlistAdded((prev) => {
      return prev === "active" ? "inactive" : "active";
    });
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
            effect="blur"
            alt="Product IMG"
            onMouseMove={() => setMouseMoved(true)}
            onMouseDown={() => setMouseMoved(false)}
            onMouseUp={handleNavigateOnClick}
          />
          <div
            className={cx("add-wishlist-btn", `${isWishlistAdded}`)}
            onClick={handleAddToWishlist}
          >
            {ICONS.favourite}
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
          <div
            className={cx("add-wishlist-btn", `${isWishlistAdded}`)}
            onClick={handleAddToWishlist}
          >
            {ICONS.favourite}
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
}

export default React.memo(ProductCard);
