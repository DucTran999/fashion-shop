import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

// Redux, custom hook, const variable, ...
import { changeVariantSelected } from "../../../features/product/productAction";

// Style
import classNames from "classnames/bind";
import style from "./VariantBar.module.scss";
const cx = classNames.bind(style);

const IMG_URL = process.env.REACT_APP_API_SERVER_URL;

const ProductVariantBar = () => {
  const productVariants = useSelector(
    (state) => state.product.variants?.allVariants
  );
  const currentVariant = useSelector(
    (state) => state.product.variants?.selected
  );

  const dispatch = useDispatch();

  const getColorsList = () => {
    let colorList = [];
    let imageColorList = [];
    productVariants.forEach((variant) => {
      if (!colorList.includes(variant.color)) {
        colorList.push(variant.color);
        imageColorList.push({ image: variant.image, color: variant.color });
      }
    });

    return imageColorList;
  };

  const findVariant = (size, color) => {
    for (let i = 0; i < productVariants.length; ++i) {
      if (
        productVariants[i].color === color &&
        productVariants[i].size === size
      ) {
        return productVariants[i];
      }
    }
  };

  const imageColors = getColorsList();
  const [sizeSelected, setSizeSelected] = useState(currentVariant.size);
  const [colorSelected, setColorSelected] = useState(currentVariant.color);

  const handleChangeColor = (newClr) => {
    setColorSelected(newClr);
    const variant = findVariant(sizeSelected, newClr);
    changeVariantSelected(variant, dispatch);
  };

  const handleChangeSize = (e) => {
    const newSize = e.target.value.toLowerCase();
    setSizeSelected(newSize);
    const variant = findVariant(newSize, colorSelected);
    changeVariantSelected(variant, dispatch);
  };

  return (
    <Container fluid={true} className={cx("variant-section")}>
      {/* Color Bar*/}
      <Row>
        {imageColors.map((variation) => {
          return (
            <span
              key={variation.color}
              className={cx(
                "color-image-wrap",
                colorSelected === variation.color ? "active" : "inactive"
              )}
              onClick={() => handleChangeColor(variation.color)}
            >
              <img
                className={cx("image-section")}
                src={`${IMG_URL}/product/${variation.image}`}
                alt="select img"
              />
              <input
                className={cx("radio__input")}
                type="radio"
                name="productVariants-clr"
                value={variation.color}
                id={variation.color}
              />
              <label
                htmlFor={variation.color}
                className={cx(
                  "color-label",
                  colorSelected === variation.color ? "active" : "inactive"
                )}
              >
                {variation.color}
              </label>
            </span>
          );
        })}
      </Row>
      {/* Size Bar */}
      <Row>
        <Col>
          <input
            className={cx("radio__input")}
            type="radio"
            name="productVariants-sz"
            value="Small"
            id="size-s"
            onChange={(e) => handleChangeSize(e)}
          />
          <label
            htmlFor="size-s"
            className={cx(
              "size-label",
              sizeSelected === "small" ? "active" : "inactive"
            )}
          >
            Small
          </label>
          <input
            className={cx("radio__input")}
            type="radio"
            name="productVariants-sz"
            value="Medium"
            id="size-m"
            onChange={(e) => handleChangeSize(e)}
          />
          <label
            htmlFor="size-m"
            className={cx(
              "size-label",
              sizeSelected === "medium" ? "active" : "inactive"
            )}
          >
            Medium
          </label>
          <input
            className={cx("radio__input")}
            type="radio"
            name="productVariants-sz"
            value="Large"
            id="size-l"
            onChange={(e) => handleChangeSize(e)}
          />
          <label
            htmlFor="size-l"
            className={cx(
              "size-label",
              sizeSelected === "large" ? "active" : "inactive"
            )}
          >
            Large
          </label>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductVariantBar;
