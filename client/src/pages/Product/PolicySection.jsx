import React from "react";
import { Row, Col } from "react-bootstrap";

import ICONS from "../../assets/icons";

import style from "./PolicySection.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

const PolicySection = () => {
  return (
    <>
      <Row className={cx("row-mg")}>
        <Col className={cx("col-no-gd")}>
          <span className={cx("policy__header")}>
            {ICONS.shipping}
            <span className={cx("policy__header--title")}>
              Miễn phí giao hàng
            </span>
          </span>
          <div className={cx("policy-description")}>
            - Nội thành HCM: đơn từ 300K
          </div>
          <div className={cx("policy-description")}>- Giao hàng toàn quốc</div>
        </Col>
      </Row>
      <Row className={cx("row-mg")}>
        <Col className={cx("col-no-gd")}>
          <span className={cx("policy__header")}>
            {ICONS.exchange}
            <span className={cx("policy__header--title")}>
              Đổi/Trả dễ dàng 30 ngày
            </span>
          </span>
          <div className={cx("policy-description")}>
            - Miễn phí đổi/trả hàng 30 ngày từ khi nhận sản phẩm
          </div>
          <div className={cx("policy-description")}>
            - Áp dụng tất cả sản phẩm
          </div>
          <div className={cx("policy-description")}>
            - Hoàn tiền 100% khi khách hàng đổi ý
          </div>
        </Col>
      </Row>
    </>
  );
};

export default PolicySection;
