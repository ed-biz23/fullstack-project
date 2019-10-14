import { GET_PORTFOLIO, GET_TRANSACTIONS } from "../actions/types";

const initialState = {
  transactions: null,
  portfolio: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PORTFOLIO:
      return {
        ...state,
        portfolio: action.payload
      };
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload
      };
    default:
      return state;
  }
}
