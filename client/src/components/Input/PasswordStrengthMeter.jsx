import React, { useEffect, useState } from "react";

import classNames from "classnames/bind";
import styles from "./Input.module.scss";
import gradingPasswordStrength from "../../utils/PasswordStrengthMeter";

const cx = classNames.bind(styles);

const PASSWORD_STRENGTH = {
  WEAK: (grade) => 0 < grade && grade <= 8,
  MEDIUM: (grade) => 8 < grade && grade <= 14,
  STRONG: (grade) => 14 < grade,
};

function PasswordStrengthMeter({ password }) {
  let [grade, setGrade] = useState(0);
  let [boxState, setBoxState] = useState({ box1: "", box2: "", box3: "" });

  /* Grading when password change */
  useEffect(() => {
    setGrade(gradingPasswordStrength(password));
  }, [password]);

  /* When grade change update box state. */
  useEffect(() => {
    updatePasswordMeter(grade);
  }, [grade]);

  let updatePasswordMeter = (grade) => {
    switch (true) {
      case PASSWORD_STRENGTH.WEAK(grade):
        setBoxState({ box1: "active", box2: "", box3: "" });
        break;
      case PASSWORD_STRENGTH.MEDIUM(grade):
        setBoxState({ box1: "active", box2: "active", box3: "" });
        break;
      case PASSWORD_STRENGTH.STRONG(grade):
        setBoxState({ box1: "active", box2: "active", box3: "active" });
        break;
      default:
        setBoxState({ box1: "reset", box2: "reset", box3: "reset" });
    }
  };

  return (
    <div className={cx("state-bar")}>
      <div className={cx("state-bar__box1", boxState.box1)}></div>
      <div className={cx("state-bar__box2", boxState.box2)}></div>
      <div className={cx("state-bar__box3", boxState.box3)}></div>
    </div>
  );
}

export default PasswordStrengthMeter;
