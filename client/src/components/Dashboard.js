import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, Row, Button } from "reactstrap";

import { loadUser } from "../actions/authActions";
import { logout } from "../actions/authActions";

import { Portfolio } from "./portfolio/Portfolio";

export const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  const onClick = () => {
    dispatch(logout());
  };

  return (
    <div className="dashboard" style={{ padding: "3rem" }}>
      <Container>
        <Button
          color="danger"
          style={{ display: "flex", justifyContent: "flex-start" }}
          onClick={onClick}
        >
          Sign Out
        </Button>
        <span style={{ display: "flex", justifyContent: "flex-end" }}>
          Portfolio | Transactions
        </span>
        <Portfolio />
      </Container>
    </div>
  );
};
