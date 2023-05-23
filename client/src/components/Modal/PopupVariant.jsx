import React, { Fragment } from "react";
import { Link } from "react-router-dom";

// Style
import classNames from "classnames/bind";
import ICONS from "../../assets/icons";
import styles from "./PopupVariant.module.scss";

const cx = classNames.bind(styles);

const LoadingAlert = () => {
  return (
    <div className={cx("popup-box__message--loading")}>
      {ICONS.loading}
      <div style={{ marginLeft: 10 }}>Give us a second...</div>
    </div>
  );
};

const ErrorAlert = ({ message, onClose }) => {
  return (
    <Fragment>
      <div className={cx("popup-box__message--fail")}>
        {ICONS.errorCircle}
        <div style={{ marginLeft: 10 }}>{message}</div>
      </div>
      <span className={cx("popup-box__btn", "inactive")} onClick={onClose}>
        <div className={cx("popup-box__btn--title")}>Close</div>
      </span>
    </Fragment>
  );
};

const SuccessAlertNavigate = ({ message, linkTo, btnTitle }) => {
  return (
    <Fragment>
      <div className={cx("popup-box__message--success")}>
        {ICONS.checkCircle}
        <div style={{ marginLeft: 10 }}>{message}</div>
      </div>
      <Link to={linkTo} className={cx("popup-box__btn", "active")}>
        <div className={cx("popup-box__btn--title")}>{btnTitle}</div>
      </Link>
    </Fragment>
  );
};

export { LoadingAlert, ErrorAlert, SuccessAlertNavigate };
