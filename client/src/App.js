import React, { useState, useEffect } from "react";
import { Spinner } from "reactstrap";
import "./css/App.css";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import { LandingPage } from "./components/LandingPage";

const Loading = () => {
  return (
    <div>
      <Spinner color="primary" />
      <Spinner color="secondary" />
      <Spinner color="success" />
      <Spinner color="danger" />
      <Spinner color="warning" />
      <Spinner color="info" />
      <Spinner color="light" />
      <Spinner color="dark" />
    </div>
  );
};

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  });

  return (
    <Provider store={store}>
      <div className="App">
        <LandingPage />
      </div>
    </Provider>
  );
}

export default App;
