import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./ImageCard.module.scss";

const cx = classNames.bind(styles);

function ImageCard({ linkTo, imageUrl, cardStyle, title, titleStyle }) {
  return (
    <div className={cx("card__wrap")}>
      <Link
        to={linkTo}
        className={cx(cardStyle)}
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></Link>
      <Link to={linkTo} className={cx(titleStyle)}>
        {title}
      </Link>
    </div>
  );
}

export default ImageCard;
