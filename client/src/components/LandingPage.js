import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Row, Col } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";

import { loadUser } from "../actions/authActions";

import SignIn from "./auth/SignIn";
import Register from "./auth/Register";
import { Loading } from "./Loading";

export const LandingPage = () => {
  const { isLoading, isLoggedIn } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     dispatch(loadUser());
  //   }, []);

  if (isLoggedIn) return <Redirect to="/dashboard" />;

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
