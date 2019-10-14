import React from "react";
import { Redirect } from "react-router-dom";
import { Row, Col } from "reactstrap";
import { useSelector } from "react-redux";

import SignIn from "./auth/SignIn";
import Register from "./auth/Register";
import { Loading } from "./Loading";

export const LandingPage = () => {
  const { isLoading, isAuthenticated } = useSelector(state => state.auth);

  if (isAuthenticated) return <Redirect to="/dashboard" />;
  if (isLoading) return <Loading />;

  return (
    <div className="LandingPage">
      <div className="lp_container">
        <Row>
          <Col>
            <SignIn buttonLabel="Sign In" />
          </Col>
          <Col>
            <Register buttonLabel="Register" />
          </Col>
        </Row>
      </div>
    </div>
  );
};
