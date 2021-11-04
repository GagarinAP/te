import { all, fork } from "redux-saga/effects";
import listSagas from "store/list/sagas";

const rootSagas = function* () {
  yield all([fork(listSagas)]);
};

export default rootSagas;
