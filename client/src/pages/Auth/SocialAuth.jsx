import React, { Fragment } from "react";

import Separator from "../../components/LineSeparator";
import Button from "../../components/Button";

// Style
import classNames from "classnames/bind";
import styles from "./SocialAuth.module.scss";
const cx = classNames.bind(styles);

const SocialAuth = () => {
  return (
    <Fragment>
      <Separator content="OR" />
      <div className={cx("social-auth-list")}>
        <Button
          linkTo="/Facebook"
          styles={"box-style-cm mg-tb-1 active"}
          titleStyles={"sm-icon-title"}
          type={"linkOut"}
          icon={"facebook"}
          title={"Login with Facebook"}
        />
        <Button
          linkTo="/Google"
          styles={"box-style-cm mg-tb-1 active"}
          titleStyles={"sm-icon-title"}
          type={"linkOut"}
          icon={"google"}
          title={"Login with Google"}
        />
      </div>
      <Separator />
    </Fragment>
  );
};

export default SocialAuth;
