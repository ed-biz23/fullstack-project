import axios from "axios";
import { returnErrors } from "./errorActions";

import { GET_PORTFOLIO, GET_TRANSACTIONS, ADD_TRANSACTION } from "./types";

// Setup config/headers and token
export const tokenConfig = getState => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};

// Check token & load user portfolio
export const loadUserPortfolio = userId => (dispatch, getState) => {
  axios
    .get(`/api/transactions/portfolio?userId=${userId}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: GET_PORTFOLIO,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// Check token & load user transactions
export const loadUserTransactions = userId => (dispatch, getState) => {
  axios
    .get(`/api/transactions?userId=${userId}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: GET_TRANSACTIONS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// Check token & purchase transactions
export const purchaseTransaction = props => (dispatch, getState) => {
  const { ticker, userId, qty } = props;
  axios
    .get(
      `/api/transactions/purchase?userId=${userId}&ticker=${ticker}&qty=${qty}`,
      tokenConfig(getState)
    )
    .then(res =>
      dispatch({
        type: ADD_TRANSACTION,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
