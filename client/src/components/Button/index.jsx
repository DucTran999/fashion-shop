import React from "react";
import { Link } from "react-router-dom";

import ICONS from "../../assets/icons";
import IMAGES from "../../assets/images";
import "./Button.scss";

/**
 * Declare a button component.
 *
 * @param {Object} props     [hold material to build a button]
 * @constant {string} linkTo [It is a path when direct to page inside web, an URL link to outside web]
 * @constant {string} styles [styles will be applied]
 * @constant {string} icon   [ICONS will return a component that has matched the icon name]
 * @constant {title} title   [button title]
 *
 * @returns Button Component
 */

const Button = (props) => {
  const {
    type,
    linkTo,
    icon,
    title,
    imgUrl,
    styles,
    titleStyles,
    imgStyles,
    alt,
  } = props;

  const LinkContent = () => {
    return (
      <>
        {imgUrl && <img src={IMAGES[imgUrl]} alt={alt} className={imgStyles} />}
        {icon && ICONS[icon]}
        {title && <span className={titleStyles}>{title}</span>}
      </>
    );
  };

  const ButtonVariant = () => {
    switch (type) {
      case "submit":
        return <input className={styles} type={type} value={title} />;
      case "btn-submit":
        return (
          <button className={styles} type="submit">
            {icon && ICONS[icon]}
            {title}
          </button>
        );
      case "linkOut":
        return (
          <a href={linkTo} className={styles}>
            <LinkContent />
          </a>
        );
      default:
        return (
          <Link to={linkTo} className={styles}>
            <LinkContent />
          </Link>
        );
    }
  };

  return <ButtonVariant />;
};

export default React.memo(Button);
