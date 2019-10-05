import React from "react";
import { useSelector } from "react-redux";
import { Row, Col } from "reactstrap";

import SignIn from "./auth/SignIn";
import Register from "./auth/Register";

export const LandingPage = () => {
  const { isLoggedIn } = useSelector(state => state.auth);
  console.log(isLoggedIn);
  if (!isLoggedIn) {
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
  } else {
    return null;
  }
};
