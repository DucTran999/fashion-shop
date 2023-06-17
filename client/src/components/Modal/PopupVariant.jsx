import React, { Fragment } from "react";

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
      <span className={cx("popup-box__btn", "active")} onClick={onClose}>
        <div className={cx("popup-box__btn--title")}>Close</div>
      </span>
    </Fragment>
  );
};

const SuccessAlertNavigate = ({ message, btnTitle, onClickEvent }) => {
  return (
    <Fragment>
      <div className={cx("popup-box__message--success")}>
        {ICONS.checkCircle}
        <div style={{ marginLeft: 10 }}>{message}</div>
      </div>
      <div className={cx("popup-box__btn", "active")} onClick={onClickEvent}>
        <div className={cx("popup-box__btn--title")}>{btnTitle}</div>
      </div>
    </Fragment>
  );
};

const InfoAlertNavigate = ({ message, btnTitle, onClickEvent }) => {
  return (
    <Fragment>
      <div className={cx("popup-box__message--info")}>
        {ICONS.infoIcon}
        <div style={{ marginLeft: 10 }}>{message}</div>
      </div>
      <div className={cx("popup-box__btn", "inactive")} onClick={onClickEvent}>
        <div className={cx("popup-box__btn--title")}>{btnTitle}</div>
      </div>
    </Fragment>
  );
};

export { LoadingAlert, ErrorAlert, SuccessAlertNavigate, InfoAlertNavigate };
