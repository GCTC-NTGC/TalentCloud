import { Action as ReduxAction, ActionCreator } from "redux";

export interface Action<T extends string, P> extends ReduxAction<T> {
  payload: P;
}

const createAction: ActionCreator<ReduxAction> = <T extends string, P>(
  type: T,
  payload: P,
): Action<T, P> => {
  return {
    type,
    payload,
  };
};

export default createAction;
