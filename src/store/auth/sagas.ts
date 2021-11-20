import { all, fork, put, call, takeLeading, getContext } from "redux-saga/effects";
import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { navigate } from "src/navigation";
import { ROUTES } from "src/constants";
import { signInRequest, signInResponse } from "./";

export function* getAuthSaga({ payload }: { payload: { code: string; password: string } }) {
  const api: AxiosInstance = yield getContext("api");
  try {
    yield put(signInResponse.request(true));
    const response: AxiosResponse = yield call(() => api.post("login/", { payload }));
    yield put(signInResponse.success({ id: response.data.id }));
    navigate(ROUTES.MAIN);
  } catch (e) {
    yield put(signInResponse.failure(e as AxiosError));
  } finally {
    yield put(signInResponse.request(false));
  }
}

function* watchAuth() {
  yield takeLeading(signInRequest, getAuthSaga);
}

export default function* root() {
  yield all([fork(watchAuth)]);
}
