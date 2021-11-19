import { RootState } from "src/store";
import { STATE } from "store/auth/index";

export const authLoadingSelector = (state: RootState): STATE["loading"] => state.auth.loading;
export const authUserSelector = (state: RootState): STATE["user"] => state.auth.user;
