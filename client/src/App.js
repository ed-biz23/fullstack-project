import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./css/App.css";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import { LandingPage } from "./components/LandingPage";
import { Dashboard } from "./components/Dashboard";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  });

  return (
    <Router>
      <Provider store={store}>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </Provider>
    </Router>
  );
}

export default App;
