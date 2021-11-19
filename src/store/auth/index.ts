import { createReducer, createAsyncAction, createAction } from "typesafe-actions";
import produce from "immer";
import type { Action } from "redux";
import type { Payload } from "store/types";
import { AxiosError } from "axios";
import { UserType } from "./types";

export interface STATE {
  user: UserType;
  loading: boolean;
  error: AxiosError;
}

const INITIAL_STATE = {
  user: {
    id: "",
  },
  loading: false,
  error: {} as AxiosError,
};

export const logout = createAction("AUTH/GET_LOGOUT")();

export const signInRequest = createAction("AUTH/GET_SIGN_IN", (params: string) => params)();

export const signInResponse = createAsyncAction("AUTH/SIGN_IN_LOADING", "AUTH/SIGN_IN_SUCCESS", "AUTH/SIGN_IN_ERROR")<
  boolean,
  UserType,
  AxiosError
>();

export default createReducer<STATE, Action>(INITIAL_STATE)
  .handleAction(
    signInResponse.request,
    produce<STATE, Payload<boolean>>((state, { payload }) => {
      state.loading = payload;
    }),
  )
  .handleAction(
    signInResponse.success,
    produce<STATE, Payload<UserType>>((state, { payload }) => {
      state.user = payload;
    }),
  )
  .handleAction(
    signInResponse.failure,
    produce<STATE, Payload<AxiosError>>((state, { payload }) => {
      state.error = payload;
    }),
  )
  .handleAction(
    logout,
    produce<STATE>((state) => {
      state.user = {
        id: "",
      };
      state.loading = false;
      state.error = {} as AxiosError;
    }),
  );
