import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

// Redux, custom hook, const variable, ...
import { changeVariantSelected } from "../../../features/product/productAction";
import { formatColorCode } from "../../../utils/formatData";

// Style
import classNames from "classnames/bind";
import style from "./VariantBar.module.scss";
const cx = classNames.bind(style);

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
    productVariants.forEach((variant) => {
      if (!colorList.includes(variant.color)) colorList.push(variant.color);
    });

    return colorList;
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

  const colors = getColorsList();
  const [sizeSelected, setSizeSelected] = useState(currentVariant.size);
  const [colorSelected, setColorSelected] = useState(currentVariant.color);

  const handleChangeColor = (e) => {
    const newClr = e.target.value.toLowerCase();
    setColorSelected(newClr);
    const variant = findVariant(sizeSelected, newClr);
    changeVariantSelected(variant, dispatch);
    window.scrollTo(0, 0);
  };

  const handleChangeSize = (e) => {
    const newSize = e.target.value.toLowerCase();
    setSizeSelected(newSize);
    const variant = findVariant(newSize, colorSelected);
    changeVariantSelected(variant, dispatch);
  };

  return (
    <Container fluid={true} className={cx("variant-section")}>
      <Row>
        <Col>
          {colors.map((color, idx) => {
            return (
              <span key={idx}>
                <input
                  className={cx("radio__input")}
                  type="radio"
                  name="productVariants-clr"
                  value={color}
                  id={color}
                  onChange={(e) => handleChangeColor(e)}
                />
                <label
                  htmlFor={color}
                  className={cx(
                    "color-label",
                    `${formatColorCode(color)}`,
                    colorSelected === color ? "active" : "inactive"
                  )}
                ></label>
              </span>
            );
          })}
        </Col>
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
            S
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
            M
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
            L
          </label>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductVariantBar;
