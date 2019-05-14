import { Action } from "redux";

export const CLEAR_ERRORS = "CLEAR ERRORS";

type ClearActionType = Action<typeof CLEAR_ERRORS>;

export const clearErrors = (): ClearActionType => ({
  type: CLEAR_ERRORS,
});

export type AppErrorAction = ClearActionType;
