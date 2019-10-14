import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Button } from "reactstrap";

import { loadUser, logout } from "../actions/authActions";

import { Portfolio } from "./portfolio/Portfolio";
import { Loading } from "./Loading";

export const Dashboard = () => {
  const { isLoading, isLoggedIn, isAuthenticated } = useSelector(
    state => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) dispatch(loadUser());
  }, []);

  const onClick = () => {
    dispatch(logout());
  };

  if (!isLoggedIn) return <Redirect to="/" />;

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
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {/* <Col xs="auto"> */}
            <Button color="primary">Portfolio </Button>
            {/* </Col> */}
            {/* <Col xs="auto"> */}
            <Button color="primary">Transactions</Button>
            {/* </Col> */}
          </div>
        </Row>
        <Portfolio />
      </Container>
    </div>
  );
};
