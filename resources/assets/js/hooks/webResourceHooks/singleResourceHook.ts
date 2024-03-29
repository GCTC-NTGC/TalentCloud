import { Reducer, useCallback, useEffect, useReducer, useRef } from "react";
import {
  FetchError,
  getRequest,
  processJsonResponse,
  putRequest,
} from "../../helpers/httpRequests";
import { decrement, identity } from "../../helpers/queries";
import { Json, ResourceStatus } from "./types";

export interface ResourceState<T> {
  value: T;
  status: ResourceStatus;
  pendingCount: number;
  error: Error | FetchError | undefined;
  initialRefreshFinished: boolean;
}

export enum ActionTypes {
  GetStart = "GET_START",
  GetFulfill = "GET_FULFILL",
  GetReject = "GET_REJECT",

  UpdateStart = "UPDATE_START",
  UpdateFulfill = "UPDATE_FULFILL",
  UpdateReject = "UPDATE_REJECT",
}

export type GetStartAction = { type: ActionTypes.GetStart };
export type GetFulfillAction<T> = {
  type: ActionTypes.GetFulfill;
  payload: T;
};
export type GetRejectAction = {
  type: ActionTypes.GetReject;
  payload: Error | FetchError;
};

export type UpdateStartAction<T> = {
  type: ActionTypes.UpdateStart;
  meta: { item: T };
};
export type UpdateFulfillAction<T> = {
  type: ActionTypes.UpdateFulfill;
  payload: T;
  meta: { item: T };
};
export type UpdateRejectAction<T> = {
  type: ActionTypes.UpdateReject;
  payload: Error | FetchError;
  meta: { item: T };
};
export type AsyncAction<T> =
  | GetStartAction
  | GetFulfillAction<T>
  | GetRejectAction
  | UpdateStartAction<T>
  | UpdateFulfillAction<T>
  | UpdateRejectAction<T>;

export function initialState<T>(
  initialValue: T,
  doInitialRefresh: boolean,
): ResourceState<T> {
  return {
    value: initialValue,
    status: "initial",
    pendingCount: 0,
    error: undefined,
    initialRefreshFinished: !doInitialRefresh,
  };
}

export function reducer<T>(
  state: ResourceState<T>,
  action: AsyncAction<T>,
): ResourceState<T> {
  switch (action.type) {
    case ActionTypes.GetStart:
    case ActionTypes.UpdateStart: // TODO: For now GET and UPDATE actions can be treated the same. If we want to add optimistic updates, this can change.
      return {
        value: state.value,
        status: "pending",
        pendingCount: state.pendingCount + 1,
        error: undefined,
        initialRefreshFinished: state.initialRefreshFinished,
      };
    case ActionTypes.GetFulfill:
    case ActionTypes.UpdateFulfill:
      return {
        value: action.payload,
        status: state.pendingCount <= 1 ? "fulfilled" : "pending",
        pendingCount: decrement(state.pendingCount),
        error: undefined,
        initialRefreshFinished: true,
      };
    case ActionTypes.GetReject:
    case ActionTypes.UpdateReject:
      return {
        value: state.value,
        status: state.pendingCount <= 1 ? "rejected" : "pending",
        pendingCount: decrement(state.pendingCount),
        error: action.payload,
        initialRefreshFinished: true,
      };
    default:
      return state;
  }
}

function doNothing(): void {
  /* do nothing */
}

export type UseResourceReturnType<T> = {
  value: T;
  status: ResourceStatus;
  error: undefined | Error | FetchError;
  initialRefreshFinished: boolean; // Becomes true after the initial request is fulfilled or rejected. NOTE: if initial fetch is skipped, this will be set to true immediately.
  update: (newValue: T) => Promise<T>;
  refresh: () => Promise<T>;
};

export function useResource<T>(
  endpoint: string,
  initialValue: T,
  overrides?: {
    parseResponse?: (response: Json) => T; // Defaults to the identity function.
    skipInitialRefresh?: boolean; // Defaults to false. Override if you want to keep the initialValue until refresh is called manually.
    handleError?: (error: Error | FetchError) => void; // In addition to using the error returned by the hook, you may provide a callback called on every new error.
  },
): UseResourceReturnType<T> {
  const parseResponse = overrides?.parseResponse ?? identity;
  const doInitialRefresh = overrides?.skipInitialRefresh !== true;
  const handleError = overrides?.handleError ?? doNothing;
  const isSubscribed = useRef(true);

  const [state, dispatch] = useReducer<
    Reducer<ResourceState<T>, AsyncAction<T>>
  >(reducer, initialState(initialValue, doInitialRefresh));

  const refresh = useCallback(async (): Promise<T> => {
    dispatch({ type: ActionTypes.GetStart });
    let json: Json;
    try {
      json = await getRequest(endpoint).then(processJsonResponse);
    } catch (error) {
      if (isSubscribed.current) {
        dispatch({
          type: ActionTypes.GetReject,
          payload: error,
        });
        handleError(error);
      }
      throw error;
    }
    const responseValue = parseResponse(json) as T;
    if (isSubscribed.current) {
      dispatch({
        type: ActionTypes.GetFulfill,
        payload: responseValue,
      });
    }
    return responseValue;
  }, [endpoint, parseResponse, handleError]);

  const update = useCallback(
    async (newValue): Promise<T> => {
      dispatch({ type: ActionTypes.UpdateStart, meta: { item: newValue } });
      let json: Json;
      try {
        json = await putRequest(endpoint, newValue).then(processJsonResponse);
      } catch (error) {
        if (isSubscribed.current) {
          dispatch({
            type: ActionTypes.UpdateReject,
            payload: error,
            meta: { item: newValue },
          });
          handleError(error);
        }
        throw error;
      }
      const responseValue = parseResponse(json) as T;
      if (isSubscribed.current) {
        dispatch({
          type: ActionTypes.UpdateFulfill,
          payload: responseValue,
          meta: { item: newValue },
        });
      }
      return responseValue;
    },
    [endpoint, parseResponse, handleError],
  );

  // Despite the usual guidelines, this should only be reconsidered if endpoint changes.
  // Changing doInitialRefresh after the first run (or the refresh function) should not cause this to rerun.
  useEffect(() => {
    if (doInitialRefresh) {
      refresh().catch(doNothing);
    }

    // Unsubscribe from promises when this hook is unmounted.
    return (): void => {
      isSubscribed.current = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  return {
    value: state.value,
    status: state.status,
    error: state.error,
    initialRefreshFinished: state.initialRefreshFinished,
    update,
    refresh,
  };
}

export default useResource;
