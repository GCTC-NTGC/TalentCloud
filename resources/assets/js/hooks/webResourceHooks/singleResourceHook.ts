import { useEffect, useRef, useState } from "react";
import { useFetch } from "react-async";
import { fetchParameters, FetchError } from "../../helpers/httpRequests";
import { identity } from "../../helpers/queries";
import reducer from "./indexCrudReducer";
import { Json, ResourceStatus } from "./types";

export interface ResourceState<T> {
  value: T;
  status: ResourceStatus;
  pendingCount: number;
  error: Error | FetchError | undefined;
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

/**
 * Decrement the number if it above zero, else return 0.
 * This helps to avoid some pathological edge cases where pendingCount becomes permanently bugged.
 * @param num
 */
function decrement(num: number): number {
  return num <= 0 ? 0 : num - 1;
}

export function reducer<T>(
  state: ResourceState<T>,
  action: AsyncAction<T>,
): ResourceState<T> {
  switch (action.type) {
    case ActionTypes.GetStart:
      return {
        value: state.value,
        status: "pending",
        pendingCount: state.pendingCount + 1,
        error: undefined,
      };
    case ActionTypes.GetFulfill:
      return {
        value: action.payload,
        status: state.pendingCount === 1 ? "fulfilled" : "pending",
        pendingCount: decrement(state.pendingCount),
        error: undefined,
      };
    case ActionTypes.GetReject:
      return {
        value: state.value,
        status: state.pendingCount === 1 ? "rejected" : "pending",
        pendingCount: decrement(state.pendingCount),
        error: action.payload,
      };
    default:
      return state;
  }
}

export function useResource<T>(
  endpoint: string,
  initialValue: T,
  overrides?: {
    parseResponse?: (response: Json) => T; // Defaults to the identity function.
    skipInitialFetch?: boolean; // Defaults to false. Override if you want to keep the initialValue until refresh is called manually.
  },
): {
  value: T;
  status: ResourceStatus;
  error: undefined | Error | FetchError;
  update: (newValue: T) => void;
  refresh: () => void;
} {
  const internalParseResponse = overrides?.parseResponse ?? identity;
  const skipInitialFetch = overrides?.skipInitialFetch === true;
  const isSubscribed = useRef(true);
  const [value, setValue] = useState(initialValue);
  const { error, status, reload, run } = useFetch(
    endpoint,
    fetchParameters("GET"),
    {
      onResolve: (data) => {
        if (isSubscribed.current) {
          setValue(internalParseResponse(data));
        }
      },
      initialValue: null, // Setting this prevents fetch from happening on first render. (We call it later if necessary.)
    },
  );
  const refresh = reload;
  const update = (newValue: T): void => run(fetchParameters("PUT", newValue));

  // Despite the usual useEffect guidelines, this should only run on first render or when endpoint changes.
  // Changing skipInitialFetch after the first render should not cause a refresh.
  useEffect(() => {
    if (!skipInitialFetch) {
      refresh();
    }
  }, [endpoint]);

  // Unsubscribe from promises when this hook is unmounted.
  useEffect(() => {
    return (): void => {
      isSubscribed.current = false;
    };
  }, []);

  return { value, status, error, update, refresh };
}

export default useResource;
