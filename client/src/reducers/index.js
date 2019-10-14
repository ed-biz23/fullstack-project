import { combineReducers } from "redux";
import transactionReducer from "./transactionReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
  transaction: transactionReducer,
  error: errorReducer,
  auth: authReducer
});
