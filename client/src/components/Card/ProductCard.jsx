import React, { useState } from "react";

import ICONS from "../../assets/icons";

import classNames from "classnames/bind";
import style from "./ProductCard.module.scss";
const cx = classNames.bind(style);

const IMG_URL = process.env.REACT_APP_API_SERVER_URL;

function ProductCard({ productInfo }) {
  const [currentVariant, setVariant] = useState(0);
  const [isWishlistAdded, setIsWishlistAdded] = useState("inactive");

  const handleAddToWishlist = () => {
    setIsWishlistAdded((prev) => {
      return prev === "active" ? "inactive" : "active";
    });
  };

  const SwitchVariantBar = () => {
    return (
      <div className={cx("change-variant__bar")}>
        {productInfo.map((variant, idx) => {
          return (
            <button
              key={idx}
              type="submit"
              className={cx("change-variant__btn", `${variant.color}`)}
              onClick={() => setVariant(idx)}
            />
          );
        })}
      </div>
    );
  };

  // Processing product price
  const productPrice = () => {
    let productOriginalPrice = productInfo[currentVariant].price;

    // vnd Format
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(productOriginalPrice);
  };

  return (
    <div>
      <div className={cx("image-wrap")}>
        <img
          className={cx("product-img")}
          src={`${IMG_URL}${productInfo[currentVariant].image}`}
          alt="product-img"
        />
        <div
          className={cx("add-wishlist-btn", `${isWishlistAdded}`)}
          onClick={handleAddToWishlist}
        >
          {ICONS.favourite}
        </div>
      </div>
      <SwitchVariantBar />
      <p className={cx("product-name")}>{productInfo[currentVariant].name}</p>
      <p className={cx("product-price")}>Price: {`${productPrice()}`}</p>
    </div>
  );
}

export default React.memo(ProductCard);
