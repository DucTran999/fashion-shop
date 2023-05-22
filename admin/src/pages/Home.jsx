import React, { useEffect } from "react";
import Header from "../layouts/Header";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

function Home() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.login.currentUser);

  const MainDashboard = () => {
    return (
      <Container>
        <Row>
          <Col>Main Dashboard</Col>
        </Row>
      </Container>
    );
  };

  const Home = () => {
    return (
      <>
        <Header />
        <MainDashboard />
      </>
    );
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  return <Home />;
}

export default Home;
