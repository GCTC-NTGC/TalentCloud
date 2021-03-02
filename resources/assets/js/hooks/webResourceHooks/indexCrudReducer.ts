import { FetchError } from "../../helpers/httpRequests";
import {
  decrement,
  deleteProperty,
  filterObjectProps,
  getId,
  hasKey,
  mapToObjectTrans,
} from "../../helpers/queries";
import { ResourceStatus } from "./types";

export enum ActionTypes {
  IndexStart = "INDEX_START",
  IndexFulfill = "INDEX_FULFILL",
  IndexReject = "INDEX_REJECT",

  CreateStart = "CREATE_START",
  CreateFulfill = "CREATE_FULFILL",
  CreateReject = "CREATE_REJECT",

  UpdateStart = "UPDATE_START",
  UpdateFulfill = "UPDATE_FULFILL",
  UpdateReject = "UPDATE_REJECT",

  DeleteStart = "DELETE_START",
  DeleteFulfill = "DELETE_FULFILL",
  DeleteReject = "DELETE_REJECT",
}

export type IndexStartAction = { type: ActionTypes.IndexStart };
export type IndexFulfillAction<T> = {
  type: ActionTypes.IndexFulfill;
  payload: { item: T; key: string | number }[];
};
export type IndexRejectAction = {
  type: ActionTypes.IndexReject;
  payload: Error | FetchError;
};

export type CreateStartAction<T> = {
  type: ActionTypes.CreateStart;
  meta: { item: T };
};
export type CreateFulfillAction<T> = {
  type: ActionTypes.CreateFulfill;
  payload: { item: T; key: string | number };
  meta: { item: T };
};
export type CreateRejectAction<T> = {
  type: ActionTypes.CreateReject;
  payload: Error | FetchError;
  meta: { item: T };
};

export type UpdateStartAction<T> = {
  type: ActionTypes.UpdateStart;
  meta: { key: string | number; item: T };
};
export type UpdateFulfillAction<T> = {
  type: ActionTypes.UpdateFulfill;
  payload: T;
  meta: { key: string | number; item: T };
};
export type UpdateRejectAction<T> = {
  type: ActionTypes.UpdateReject;
  payload: Error | FetchError;
  meta: { key: string | number; item: T };
};

export type DeleteStartAction = {
  type: ActionTypes.DeleteStart;
  meta: { key: string | number };
};
export type DeleteFulfillAction = {
  type: ActionTypes.DeleteFulfill;
  meta: { key: string | number };
};
export type DeleteRejectAction = {
  type: ActionTypes.DeleteReject;
  payload: Error | FetchError;
  meta: { key: string | number };
};
export type AsyncAction<T> =
  | IndexStartAction
  | IndexFulfillAction<T>
  | IndexRejectAction
  | CreateStartAction<T>
  | CreateFulfillAction<T>
  | CreateRejectAction<T>
  | UpdateStartAction<T>
  | UpdateFulfillAction<T>
  | UpdateRejectAction<T>
  | DeleteStartAction
  | DeleteFulfillAction
  | DeleteRejectAction;

export interface ResourceState<T> {
  indexMeta: {
    status: ResourceStatus;
    pendingCount: number;
    error: Error | FetchError | undefined;
  };
  createMeta: {
    status: ResourceStatus;
    pendingCount: number;
    error: Error | FetchError | undefined; // Only stores the most recent error;
  };
  values: {
    [key: string]: {
      value: T;
      error: Error | FetchError | undefined;
      status: ResourceStatus;
      pendingCount: number;
    };
  };
}

export function initializeState<T>(
  items: { item: T; key: string }[],
): ResourceState<T> {
  return {
    indexMeta: {
      status: "initial",
      pendingCount: 0,
      error: undefined,
    },
    createMeta: {
      status: "initial",
      pendingCount: 0,
      error: undefined,
    },
    values: mapToObjectTrans(
      items,
      (x) => x.key,
      (x) => ({
        value: x.item,
        error: undefined,
        status: "initial",
        pendingCount: 0,
      }),
    ),
  };
}

type StateValues<T> = ResourceState<T>["values"];

function mergeIndexItem<T>(
  values: StateValues<T>,
  { item, key }: { item: T; key: string | number },
): StateValues<T> {
  if (hasKey(values, key)) {
    // We leave the pending count as is, in case an update or delete is in progress for this item.
    // We do overwrite errors, and set status to "fulfilled" if it was "initial" or "rejected"
    return {
      ...values,
      [key]: {
        ...values[key],
        value: item,
        status: values[key].status === "pending" ? "pending" : "fulfilled",
        error: undefined,
      },
    };
  }
  return {
    ...values,
    [key]: {
      value: item,
      error: undefined,
      status: "fulfilled",
      pendingCount: 0,
    },
  };
}

/**
 * Updates values in response to INDEX FULFILLED action:
 *   - Updates the value of existing items without modifying item-specific metadata (related to UPDATE and DELETE requests).
 *   - Creates new items (with "fulfilled" status metadata).
 *   - Deletes existing state items that are not part of the new payload.
 * @param values
 * @param payload
 */
function mergeIndexPayload<T>(
  values: StateValues<T>,
  payload: { item: T; key: string | number }[],
): StateValues<T> {
  // Update or create a values entry for each item in the payload.
  const newValues = payload.reduce(mergeIndexItem, values);
  // Delete any values entries that don't exist in the new payload.
  const payloadKeys = payload.map((x) => String(x.key)); // If x.key is a number, cast it to a string so it can be compared to key in filterObjectProps
  return filterObjectProps(newValues, (_, key) => payloadKeys.includes(key));
}

/**
 * Updates values in response to CREATE FULFILLED action.
 * - Adds the new item to values, with "fulfilled" status.
 * - Note: If newly created item has the same key as an existing item, update that item instead.
 *    This should never happen during normal interaction with a REST api.
 * @param values
 * @param payload
 */
function mergeCreatePayload<T>(
  values: StateValues<T>,
  payload: { item: T; key: string | number },
): StateValues<T> {
  if (hasKey(values, payload.key)) {
    // It doesn't really make sense for the result of a create request to already exist...
    // But we have to trust the latest response from the server. Update the existing item.
    return {
      ...values,
      [payload.key]: {
        value: payload.item,
        status: values[payload.key].pendingCount <= 1 ? "fulfilled" : "pending",
        pendingCount: decrement(values[payload.key].pendingCount),
        error: undefined,
      },
    };
  }
  return {
    ...values,
    [payload.key]: {
      value: payload.item,
      error: undefined,
      status: "fulfilled",
      pendingCount: 0,
    },
  };
}

/**
 * Updates values in response to UPDATE START action.
 * - Updates metadata for updated item.
 * - Does nothing if the item does not yet exist.
 * @param values
 * @param action
 */
function mergeUpdateStart<T>(
  values: StateValues<T>,
  action: UpdateStartAction<T>,
): StateValues<T> {
  if (!hasKey(values, action.meta.key)) {
    // Do not update values. We don't want to create a new value in case the request fails and it doesn't represent anything on the server.
    // NOTE: if we move to optimistic updates, we should add to values here.
    return values;
  }
  return {
    ...values,
    [action.meta.key]: {
      // TODO: if we wanted to do an optimistic update, we could save action.payload.item here.
      // But we would need some way to reverse it if it failed.
      ...values[action.meta.key],
      status: "pending",
      pendingCount: values[action.meta.key].pendingCount + 1,
      error: undefined,
    },
  };
}
/**
 * Updates values in response to UPDATE FULFILLED action.
 * - Updates metadata for updated item and overwrites value with payload.
 * @param values
 * @param action
 */
function mergeUpdateFulfill<T>(
  values: StateValues<T>,
  action: UpdateFulfillAction<T>,
): StateValues<T> {
  if (!hasKey(values, action.meta.key)) {
    // Even though it didn't exist in local state yet, if the server says it exists, it exists.
    return {
      ...values,
      [action.meta.key]: {
        value: action.payload,
        status: "fulfilled",
        pendingCount: 0,
        error: undefined,
      },
    };
  }
  return {
    ...values,
    [action.meta.key]: {
      value: action.payload,
      status:
        values[action.meta.key].pendingCount <= 1 ? "fulfilled" : "pending",
      pendingCount: decrement(values[action.meta.key].pendingCount),
      error: undefined,
    },
  };
}
/**
 * Updates values in response to UPDATE REJECTED action.
 * - DOES NOT throw error if item does exist, unlike other update mergeUpdate functions.
 *   UPDATE REJECTED action already represents a graceful response to an error.
 *   There is no relevant metadata to update, and nowhere to store the error, so return state as is.
 * - Otherwise updates metdata for item and overwrites error with payload.f
 * @param values
 * @param action
 */
function mergeUpdateReject<T>(
  values: StateValues<T>,
  action: UpdateRejectAction<T>,
): StateValues<T> {
  if (!hasKey(values, action.meta.key)) {
    return values;
  }
  return {
    ...values,
    [action.meta.key]: {
      ...values[action.meta.key],
      status:
        values[action.meta.key].pendingCount <= 1 ? "rejected" : "pending",
      pendingCount: decrement(values[action.meta.key].pendingCount),
      error: action.payload,
    },
  };
}
/**
 * Updates values in response to DELETE START action.
 * Updates metadata for item if it exists.
 *
 * Does not throw an error if item does not exist, as there are plausible scenarios (eg mupliple queued DELETE requests) that could cause this.
 * @param values
 * @param action
 */
function mergeDeleteStart<T>(
  values: StateValues<T>,
  action: DeleteStartAction,
): StateValues<T> {
  if (!hasKey(values, action.meta.key)) {
    return values;
  }
  return {
    ...values,
    [action.meta.key]: {
      ...values[action.meta.key],
      status: "pending",
      pendingCount: values[action.meta.key].pendingCount + 1,
      error: undefined,
    },
  };
}
/**
 * Updates values in response to DELETE FULFILLED action.
 * Deletes the entire value entry, metadata included. (No effect if entry already doesn't exist.)
 *
 * Note: We can safely delete the metadata because any subsequent DELETE or UPDATE requests
 *   on the same item will presumably be REJECTED by the REST api.
 *   DELETE REJECTED and UPDATE REJECTED actions are gracefully handled by the reducer,
 *   even when no metadata is present.
 * @param values
 * @param action
 */
function mergeDeleteFulfill<T>(
  values: StateValues<T>,
  action: DeleteFulfillAction,
): StateValues<T> {
  return deleteProperty(values, action.meta.key);
}

/**
 * Updates values in response to DELETE REJECTED action.
 * Updates metadata for item if it exists.
 *
 * Does not throw an error if item does not exist, as there are plausible scenarios (eg mupliple queued DELETE requests) that could cause this.
 * @param values
 * @param action
 */
function mergeDeleteReject<T>(
  values: StateValues<T>,
  action: DeleteRejectAction,
): StateValues<T> {
  if (!hasKey(values, action.meta.key)) {
    return values;
  }
  return {
    ...values,
    [action.meta.key]: {
      ...values[action.meta.key],
      status:
        values[action.meta.key].pendingCount <= 1 ? "rejected" : "pending",
      pendingCount: decrement(values[action.meta.key].pendingCount),
      error: action.payload,
    },
  };
}

/**
 * This Reducer manages the lifecycle of several http requests related to a single type of resource.
 * It helps keep a local version of a list of entities in sync with a REST server.
 *
 * There are 4 types of request:
 *   - INDEX requests fetch a list of items from the server.
 *   - CREATE requests create add a new item to the list.
 *   - UPDATE requests modify a single existing item in the list.
 *   - DELETE requests remove a single existing item from the list.
 * Every request has a lifecycle reflected by 3 possible states, resulting in a total of 12 possible reducer Actions.
 *   - START: every request begins with a START action.
 *   - FULFILLED: a successful request dispatches a FULFILLED action, with the response as its payload.
 *   - REJECTED: a request that fails for any reason dispatches a REJECTED action, with the Error as its payload.
 * Any data sent with the requests is included in the actions (in all three states) as metadata.
 *
 * The Reducer's State contains:
 *   - values: a map of items and associated request metadata (specifically UPDATE and DELETE request metadata)
 *   - indexMeta: metadata associated with INDEX requests, as they don't relate to specific items
 *   - createMeta: metadata associated with CREATE requests, as they don't relate to existing items
 *
 * The metadata associated with a request includes:
 *   - status: one of four values:
 *     - "initial" if a request has never been made
 *     - "pending" if ANY request is in progress which could modify this resource
 *     - "fulfilled" if the last completed request succeeded and no other request is in progress
 *     - "rejected" if the last completed request failed and no other request is in progress
 *   - pendingCount: stores the number of requests in progress. This helps account for the possibility of multiple requests being started in succession, and means one request could finish and the resource still be considered "pending".
 *   - error: stores the last error recieved from a REJECTED action. Overwritten with undefined if a later request is STARTed or FULFILLED.
 *
 * Notes about item values:
 *   - Its possible to include items in the initial state and then not begin any requests, in which case there will be existing values with the "initial" status.
 *   - REJECTED actions do not overwrite the value. Therefore when a request fails and status becomes "rejected", the last good value is still available (though it may become out-of-sync with the REST api).
 * @param state
 * @param action
 */
export function reducer<T>(
  state: ResourceState<T>,
  action: AsyncAction<T>,
): ResourceState<T> {
  switch (action.type) {
    case ActionTypes.IndexStart:
      return {
        ...state,
        indexMeta: {
          ...state.indexMeta,
          status: "pending",
          pendingCount: state.indexMeta.pendingCount + 1,
          error: undefined,
        },
      };
    case ActionTypes.IndexFulfill:
      return {
        ...state,
        indexMeta: {
          ...state.indexMeta,
          status: state.indexMeta.pendingCount <= 1 ? "fulfilled" : "pending",
          pendingCount: decrement(state.indexMeta.pendingCount),
          error: undefined,
        },
        values: mergeIndexPayload(state.values, action.payload),
      };
    case ActionTypes.IndexReject:
      return {
        ...state,
        indexMeta: {
          ...state.indexMeta,
          status: state.indexMeta.pendingCount <= 1 ? "rejected" : "pending",
          pendingCount: decrement(state.indexMeta.pendingCount),
          error: action.payload,
        },
      };
    case ActionTypes.CreateStart:
      // TODO: We could add an optimistic update here.
      return {
        ...state,
        createMeta: {
          ...state.createMeta,
          status: "pending",
          pendingCount: state.createMeta.pendingCount + 1,
          error: undefined,
        },
      };
    case ActionTypes.CreateFulfill:
      return {
        ...state,
        createMeta: {
          status: state.createMeta.pendingCount <= 1 ? "fulfilled" : "pending",
          pendingCount: decrement(state.createMeta.pendingCount),
          error: undefined,
        },
        values: mergeCreatePayload(state.values, action.payload),
      };
    case ActionTypes.CreateReject:
      return {
        ...state,
        createMeta: {
          status: state.createMeta.pendingCount <= 1 ? "rejected" : "pending",
          pendingCount: decrement(state.createMeta.pendingCount),
          error: action.payload,
        },
      };
    case ActionTypes.UpdateStart:
      return {
        ...state,
        values: mergeUpdateStart(state.values, action),
      };
    case ActionTypes.UpdateFulfill:
      return {
        ...state,
        values: mergeUpdateFulfill(state.values, action),
      };
    case ActionTypes.UpdateReject:
      return {
        ...state,
        values: mergeUpdateReject(state.values, action),
      };
    case ActionTypes.DeleteStart:
      return {
        ...state,
        values: mergeDeleteStart(state.values, action),
      };
    case ActionTypes.DeleteFulfill:
      return {
        ...state,
        values: mergeDeleteFulfill(state.values, action),
      };
    case ActionTypes.DeleteReject:
      return {
        ...state,
        values: mergeDeleteReject(state.values, action),
      };

    default:
      return state;
  }
}

export default reducer;
