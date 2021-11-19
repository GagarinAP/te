import { all, fork } from "redux-saga/effects";
import authSagas from "store/auth/sagas";

const rootSagas = function* () {
  yield all([fork(authSagas)]);
};

export default rootSagas;
