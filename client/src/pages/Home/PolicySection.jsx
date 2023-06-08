import React, { useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ICONS from "../../assets/icons";

import classNames from "classnames/bind";
import style from "./PolicySection.module.scss";
const cx = classNames.bind(style);

const Policy = ({ policy }) => {
  return (
    <div className={cx("policy-wrap")}>
      <div className={cx("policy__icon")}>{policy.icon}</div>
      <div className={cx("policy__title")}>{policy.title}</div>
      <span className={cx("policy__content")}>{policy.content}</span>
    </div>
  );
};

const PolicySection = () => {
  const policyData = useRef([
    {
      icon: ICONS.shipping,
      title: "Free shipping",
      content: `Apply for orders from 300,000 VND (Ha Noi area). Nationwide delivery.`,
    },
    {
      icon: ICONS.headphone,
      title: "Hotline",
      content: `Contact for consult and purchase over the hotline: 1900 100C0 or email example@gmail.com. Open 7 days a week  (9 am - 9 pm)`,
    },
    {
      icon: ICONS.paymentCard,
      title: "Secure payment",
      content: `Available payment methods:\n Cash on delivery, Bank transfer, Visa Card, Momo payment commission, Zalopay, Shopeepay`,
    },
    {
      icon: ICONS.boxOpen,
      title: "30-day Free exchange or return",
      content: `Quick and convenient return and exchange process. Customers are completely assured when shopping`,
    },
  ]);

  return (
    <Container fluid={true} className={cx("container-policy")}>
      <Container>
        <Row>
          {policyData.current.map((policy, idx) => {
            return (
              <Col xs="6" lg="3" key={idx}>
                <Policy policy={policy} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </Container>
  );
};

export default React.memo(PolicySection);
