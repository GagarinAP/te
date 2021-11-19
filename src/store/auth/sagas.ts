import { all, fork, put, call, takeLeading, getContext } from "redux-saga/effects";
import { AxiosInstance, AxiosResponse } from "axios";
import { navigate } from "src/navigation";
import { ROUTES } from "src/constants";
import { signInRequest, signInResponse } from "./";

const delay = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

export function* getListSaga({ payload }: { payload: string }) {
  const api: AxiosInstance = yield getContext("api");
  try {
    yield put(signInResponse.request(true));
    //const response: AxiosResponse = yield call(() => api.post("", { payload }));
    yield call(delay, 2000);
    yield put(signInResponse.success({ id: payload }));
    navigate(ROUTES.MAIN);
  } catch (e) {
    //yield put(signInResponse.failure(e as Error));
  } finally {
    yield put(signInResponse.request(false));
  }
}

function* watchList() {
  yield takeLeading(signInRequest, getListSaga);
}

export default function* root() {
  yield all([fork(watchList)]);
}
