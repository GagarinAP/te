import { createReducer, createAsyncAction, createAction } from "typesafe-actions";
import produce from "immer";
import type { Action } from "redux";
import type { Payload } from "store/types";
import { ListItem } from "./types";

export interface STATE {
  list: Array<ListItem>;
  listLoading: boolean;
  listError: {
    name: string;
  };
  activeType: string;
}

const INITIAL_STATE = {
  list: [],
  listLoading: false,
  listError: {
    name: "",
  },
  activeType: "all",
};

export const setActiveType = createAction("LIST/SET_ACTIVE_TYPE", (type: string) => type)();

export const getList = createAction("LIST/GET_LIST")();

export const listAction = createAsyncAction("LIST/LIST_ACTION_LOADING", "LIST/LIST_ACTION", "LIST/LIST_ACTION_ERROR")<
  boolean,
  Array<ListItem>,
  { name: string }
>();

export default createReducer<STATE, Action>(INITIAL_STATE)
  .handleAction(
    listAction.request,
    produce<STATE, Payload<boolean>>((state, { payload }) => {
      state.listLoading = payload;
    }),
  )
  .handleAction(
    listAction.success,
    produce<STATE, Payload<Array<ListItem>>>((state, { payload }) => {
      state.list = payload;
    }),
  )
  .handleAction(
    listAction.failure,
    produce<STATE, Payload<{ name: string }>>((state, { payload }) => {
      state.listError = payload;
    }),
  )
  .handleAction(
    setActiveType,
    produce<STATE, Payload<string>>((state, { payload }) => {
      state.activeType = payload;
    }),
  );
