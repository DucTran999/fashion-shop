import React, { useEffect, useRef, useState } from "react";

import ICONS from "../../assets/icons";

import classNames from "classnames/bind";
import style from "./Dialog.module.scss";
const cx = classNames.bind(style);

const ErrorDialog = ({ message }) => {
  return (
    <>
      <div className={cx("icon", "error")}>{ICONS.errorCircle}</div>
      <div className={cx("message", "error")}>{message}</div>
    </>
  );
};

const SuccessDialog = ({ message }) => {
  return (
    <>
      <div className={cx("icon", "success")}>{ICONS.checkCircle}</div>
      <div className={cx("message", "success")}>{message}</div>
    </>
  );
};

const InfoDialog = ({ message }) => {
  return (
    <>
      <div className={cx("icon", "info")}>{ICONS.infoIcon}</div>
      <div className={cx("message", "info")}>{message}</div>
    </>
  );
};

const Dialog = ({ onClose, typeDialog, message }) => {
  const isMounted = useRef(false);
  const [visible, setVisible] = useState(true);

  const autoOffDialog = async () => {
    setTimeout(() => {
      setVisible(false);
    }, 3000);

    setTimeout(() => {
      onClose();
    }, 3500);
  };

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      autoOffDialog();
    }

    // eslint-disable-next-line
  }, []);

  return (
    <div className={cx("dialog-wrap", visible ? "active" : "inactive")}>
      {typeDialog === "success" ? (
        <SuccessDialog message={message} />
      ) : typeDialog === "error" ? (
        <ErrorDialog message={message} />
      ) : (
        <InfoDialog message={message} />
      )}
    </div>
  );
};

export default React.memo(Dialog);
