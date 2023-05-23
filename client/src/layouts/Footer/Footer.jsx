import React from "react";
import className from "classnames/bind";
import { Container, Row, Col } from "react-bootstrap";

import Button from "../../components/Button/Button";
import SubscribeForm from "../../components/Form/SubscribeForm";
import style from "./Footer.module.scss";

const footerStyle = className.bind(style);

function Footer() {
  const ShopInfo = () => {
    return (
      <>
        <div className={footerStyle("primary-footer__header")}>About us</div>
        <p className={footerStyle("shop-introduction")}>
          With endless inspiration on women's fashion and understanding the
          hassle of choosing the right outfit. Atlanta has always wanted to
          bring every woman high-quality and impressive products.
        </p>
        <div className={footerStyle("social")}>
          <span className={footerStyle("social__label")}>Follow us:</span>
          <Button
            linkTo={"/#Instagram"}
            type={"linkOut"}
            icon={"instagram"}
            styles={"box-circle-icon instagram"}
          />
          <Button
            linkTo={"/#Facebook"}
            type={"linkOut"}
            icon={"facebook"}
            styles={"box-circle-icon facebook"}
          />
          <Button
            linkTo={"/#Youtube"}
            type={"linkOut"}
            icon={"youtube"}
            styles={"box-circle-icon youtube"}
          />
        </div>
      </>
    );
  };

  const UserService = () => {
    return (
      <>
        <div className={footerStyle("primary-footer__header")}>
          User Service
        </div>
        <div className={footerStyle("user-service-list")}>
          <Button
            linkTo={"/#help"}
            styles={"line-style-left deco-bt-line lg-fit-content"}
            titleStyles={"md-title dark-theme lg-hide-background"}
            title={"Help Centre"}
          />
          <Button
            linkTo={"/#careers"}
            styles={"line-style-left deco-bt-line lg-fit-content"}
            titleStyles={"md-title dark-theme lg-hide-background"}
            title={"Careers"}
          />
          <Button
            linkTo={"/#flash-deal"}
            styles={"line-style-left deco-bt-line lg-fit-content"}
            titleStyles={"md-title dark-theme lg-hide-background"}
            title={"Flash Deals"}
          />
          <Button
            linkTo={"/#Store"}
            styles={"line-style-left deco-bt-line lg-fit-content"}
            titleStyles={"md-title dark-theme lg-hide-background"}
            title={"Store"}
          />
          <Button
            linkTo={"/#Atlana"}
            styles={"line-style-left deco-bt-line lg-fit-content"}
            titleStyles={"md-title dark-theme lg-hide-background"}
            title={"Atlana Policy"}
          />
        </div>
      </>
    );
  };

  const AppDownload = () => {
    return (
      <>
        <div className={footerStyle("primary-footer__header")}>
          App Download
        </div>
        <div className={footerStyle("app-download")}>
          <Button
            linkTo={"/#QR"}
            imgUrl={"downloadQR"}
            alt="QR Code"
            imgStyles={"sm-img-only"}
          />
          <div className={footerStyle("app-download__store")}>
            <Button
              linkTo={"/#app-store"}
              imgUrl={"downloadAppStore"}
              imgStyles={"md-img-only"}
              alt="App store"
            />
            <Button
              linkTo={"/#ch-play"}
              imgStyles={"md-img-only"}
              imgUrl={"downloadGooglePlay"}
              alt=""
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <div className={footerStyle("site-footer")}>
      <div className={footerStyle("primary-footer")}>
        <Container>
          <Row className="gx-5">
            <Col sx={12} sm={12} md={6} lg={3}>
              <ShopInfo />
            </Col>
            <Col sx={12} sm={12} md={6} lg={3}>
              <UserService />
            </Col>
            <Col sx={12} sm={12} md={6} lg={3}>
              <AppDownload />
            </Col>
            <Col sx={12} sm={12} md={6} lg={3}>
              <div className={footerStyle("primary-footer__header")}>
                Subscribe
              </div>
              <SubscribeForm />
            </Col>
          </Row>
        </Container>
      </div>
      <div className={footerStyle("copyright-footer")}>
        <span className={footerStyle("copyright")}>
          ©2023 Duc Tran. All Rights Reserved.
        </span>
      </div>
    </div>
  );
}

export default React.memo(Footer);
