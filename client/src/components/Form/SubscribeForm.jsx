import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";

import Button from "../Button/Button";
import styles from "./SubscribeForm.module.scss";
import { isEmail } from "../../utils/Validator";
import InputErrorMessage from "../Input/InputErrorMessage";

const cx = classNames.bind(styles);

function SubscribeForm() {
  const [formData, setFormState] = useState("");
  const [buttonState, setButtonState] = useState("inactive");
  const [errorMessage, setErrMessage] = useState("");

  useEffect(() => {
    if (isEmail(formData)) {
      setButtonState("active");
      setErrMessage("");
    } else {
      setButtonState("inactive");
      setErrMessage(InputErrorMessage.emailInvalid);
    }
  }, [formData]);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <div className={cx("subscribe-form")}>
      <p className={cx("subscribe-form__title")}>
        Please enter your email here to receive the latest fashion trends and
        promotions from Atlana.
      </p>
      <form onSubmit={handleOnSubmit} className={cx("subscribe-form__form")}>
        <input
          type="text"
          name="user-email"
          className={cx("subscribe-form__field")}
          placeholder="Your email"
          onChange={(event) => setFormState(event.target.value)}
          required
        />
        <div className={cx("subscribe-form__field--err")}>{errorMessage}</div>
        <Button
          type="btn-submit"
          icon={"emailFilled"}
          styles={`box-square-icon ${buttonState}`}
        />
      </form>
    </div>
  );
}

export default SubscribeForm;
