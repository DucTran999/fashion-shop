import React, { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./ImageCard.module.scss";

const cx = classNames.bind(styles);

function ImageCard({ linkTo, imageUrl, cardStyle, title, titleStyle }) {
  const [isShown, setIsShown] = useState(false);

  return (
    <div className={cx("card__wrap")}>
      <Link
        to={linkTo}
        className={cx(cardStyle)}
        style={{ backgroundImage: `url(${imageUrl})` }}
        onMouseEnter={() => setIsShown("active")}
        onMouseLeave={() => setIsShown("inactive")}
      ></Link>
      <Link to={linkTo} className={cx(titleStyle, `${isShown}`)}>
        {title}
      </Link>
    </div>
  );
}

export default ImageCard;
