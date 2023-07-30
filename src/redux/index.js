import { combineReducers } from "redux";
import { sessionReducer } from "./reducers/sessionReducer";

const reducers = combineReducers({
  session: sessionReducer
});

export default reducers;
