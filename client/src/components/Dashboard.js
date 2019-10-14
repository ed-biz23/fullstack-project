import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Button } from "reactstrap";

import { loadUser, logout } from "../actions/authActions";

import { Portfolio } from "./portfolio/Portfolio";
import { Transactions } from "./portfolio/Transactions";
import { Loading } from "./Loading";

export const Dashboard = () => {
  const { isLoading, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [portfolioBtn, setPortfolioBtn] = useState(true);
  const [transactionsBtn, setTransactionsBtn] = useState(false);

  useEffect(() => {
    if (isAuthenticated) dispatch(loadUser());
  }, []);

  const onClick = () => {
    dispatch(logout());
  };

  const handlePortfolioBtnOnClick = () => {
    setPortfolioBtn(!portfolioBtn);
    setTransactionsBtn(!transactionsBtn);
  };

  const handleTransactionsBtnOnClick = () => {
    setTransactionsBtn(!transactionsBtn);
    setPortfolioBtn(!portfolioBtn);
  };

  if (!isAuthenticated) return <Redirect to="/" />;

  if (isLoading) return <Loading />;

  return (
    <div className="dashboard" style={{ padding: "3rem" }}>
      <Container>
        <Row>
          <Col xs="auto">
            <Button color="danger" onClick={onClick}>
              Sign Out
            </Button>
          </Col>
        </Row>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            color="primary"
            disabled={portfolioBtn}
            onClick={handlePortfolioBtnOnClick}
          >
            Portfolio{" "}
          </Button>
          <Button
            color="primary"
            disabled={transactionsBtn}
            onClick={handleTransactionsBtnOnClick}
          >
            Transactions
          </Button>
        </div>
        {portfolioBtn ? <Portfolio /> : <Transactions />}
      </Container>
    </div>
  );
};
