import React from "react";
import { Row, Col } from "reactstrap";

import SignIn from "./auth/SignIn";
import Register from "./auth/Register";

export const LandingPage = () => {
  return (
    <div className="LandingPage">
      {/* <div className="lp_overlay" /> */}
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
