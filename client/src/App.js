import React, { useEffect } from "react";
import "./css/App.css";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import { LandingPage } from "./components/LandingPage";

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
