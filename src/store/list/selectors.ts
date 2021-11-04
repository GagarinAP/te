import { createCachedSelector } from "re-reselect";
import { RootState } from "src/store";
import { STATE } from "store/list/index";

export const listLoadingSelector = (state: RootState): STATE["listLoading"] => state.list.listLoading;
export const listSelector = (state: RootState): STATE["list"] => state.list.list;
export const activeTypeSelector = (state: RootState): STATE["activeType"] => state.list.activeType;

export const cachedListOfTypesSelector = createCachedSelector(listSelector, (list) => {
  return ["all", ...new Set(list.map((e) => e.type))];
})((_state_) => "types");

export const cachedListSelector = createCachedSelector(listSelector, activeTypeSelector, (list, activeType) => {
  return list.filter((e) => (activeType === "all" ? true : e.type === activeType));
})((_state_) => "list");
