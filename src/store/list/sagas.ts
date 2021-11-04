import { all, fork, put, call, takeLeading, getContext } from "redux-saga/effects";
import { AxiosInstance, AxiosResponse } from "axios";
import { getList, listAction } from "./";

export function* getListSaga() {
  const api: AxiosInstance = yield getContext("api");
  try {
    yield put(listAction.request(true));
    const response: AxiosResponse = yield call(() => api.get("assets"));
    yield put(listAction.success(response?.data?.data?.assets));
  } catch (e) {
    yield put(listAction.failure(e as Error));
  } finally {
    yield put(listAction.request(false));
  }
}

function* watchList() {
  yield takeLeading(getList, getListSaga);
}

export default function* root() {
  yield all([fork(watchList)]);
}
