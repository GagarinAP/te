import { combineReducers } from "redux";

import ListReducer from "./list";

export const reducers = combineReducers({
  list: ListReducer,
});
