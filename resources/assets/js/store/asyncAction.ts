import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

export type AsyncActionStatus =
  | "UNSTARTED"
  | "STARTED"
  | "SUCCEEDED"
  | "FAILED";

interface StartedAsyncAction<T> {
  type: T;
  status: "STARTED";
}

interface SucceededAsyncAction<T, P> {
  type: T;
  status: "SUCCEEDED";
  payload: P;
}

interface FailedAsyncAction<T> {
  type: T;
  status: "FAILED";
  payload: Error;
}

export type AsyncAction<T, P> =
  | StartedAsyncAction<T>
  | SucceededAsyncAction<T, P>
  | FailedAsyncAction<T>;

function startedAsyncAction<T>(type: T): StartedAsyncAction<T> {
  return {
    type,
    status: "STARTED",
  };
}

function succeededAsyncAction<T, P>(
  type: T,
  payload: P,
): SucceededAsyncAction<T, P> {
  return {
    type,
    status: "SUCCEEDED",
    payload,
  };
}

function failedAsyncAction<T>(type: T, error: Error): FailedAsyncAction<T> {
  return {
    type,
    status: "FAILED",
    payload: error,
  };
}

export default function asyncAction<T, P>(
  type: T,
  effect: () => Promise<P>,
): ThunkAction<Promise<void>, any, {}, AnyAction> {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(startedAsyncAction(type));
    return effect()
      .then(
        (payload: P): void => {
          dispatch(succeededAsyncAction(type, payload));
        },
      )
      .catch(
        (error: Error): void => {
          dispatch(failedAsyncAction(type, error));
        },
      );
  };
}
