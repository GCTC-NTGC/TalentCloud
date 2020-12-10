import { FetchError } from "../../helpers/httpRequests";
import {
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
  deleteFulfill = "DELETE_FULFILL",
  DeleteReject = "DELETE_REJECT",
}

export type IndexStartAction = { type: ActionTypes.IndexStart };
export type IndexFulfillAction<T> = {
  type: ActionTypes.IndexFulfill;
  payload: T[];
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
  payload: T;
  meta: { item: T };
};
export type CreateRejectAction<T> = {
  type: ActionTypes.CreateReject;
  payload: Error | FetchError;
  meta: { item: T };
};

export type UpdateStartAction<T> = {
  type: ActionTypes.UpdateStart;
  meta: { id: number; item: T };
};
export type UpdateFulfillAction<T> = {
  type: ActionTypes.UpdateFulfill;
  payload: T;
  meta: { id: number; item: T };
};
export type UpdateRejectAction<T> = {
  type: ActionTypes.UpdateReject;
  payload: Error | FetchError;
  meta: { id: number; item: T };
};

export type DeleteStartAction = {
  type: ActionTypes.DeleteStart;
  meta: { id: number };
};
export type DeleteFulfillAction = {
  type: ActionTypes.deleteFulfill;
  meta: { id: number };
};
export type DeleteRejectAction = {
  type: ActionTypes.DeleteReject;
  payload: Error | FetchError;
  meta: { id: number };
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
    [id: string]: {
      value: T;
      error: Error | FetchError | undefined;
      status: ResourceStatus;
      pendingCount: number;
    };
  };
}

export function initializeState<T extends { id: number }>(
  items: T[],
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
    values: mapToObjectTrans(items, getId, (item) => ({
      value: item,
      error: undefined,
      status: "initial",
      pendingCount: 0,
    })),
  };
}

type StateValues<T> = ResourceState<T>["values"];

/**
 * Decrement the number if it above zero, else return 0.
 * This helps to avoid some pathological edge cases where pendingCount becomes permanently bugged.
 * @param num
 */
function decrement(num: number): number {
  return num <= 0 ? 0 : num - 1;
}

function mergeIndexItem<T extends { id: number }>(
  values: StateValues<T>,
  item: T,
): StateValues<T> {
  if (hasKey(values, item.id)) {
    // We leave the pending count as is, in case an update or delete is in progress for this item.
    // We do overwrite errors, and set status to "fulfilled" if it was "initial" or "rejected"
    return {
      ...values,
      [item.id]: {
        ...values[item.id],
        value: item,
        status: values[item.id].status === "pending" ? "pending" : "fulfilled",
        error: undefined,
      },
    };
  }
  return {
    ...values,
    [item.id]: {
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
function mergeIndexPayload<T extends { id: number }>(
  values: StateValues<T>,
  payload: T[],
): StateValues<T> {
  // Update or create a values entry for each item in the payload.
  const newValues = payload.reduce(mergeIndexItem, values);
  // Delete any values entries that don't exist in the new payload.
  const payloadIds = payload.map(getId);
  return filterObjectProps(newValues, (item) =>
    payloadIds.includes(item.value.id),
  );
}

/**
 * Updates values in response to CREATE FULFILLED action.
 * - Throws an error if the newly created item has the same id as an existing item, since we cannot know which version to keep.
 *   This error should never happen during normal interaction with a REST api.
 * - Otherwise adds the new item to values, with "fulfilled" status.
 * @param values
 * @param payload
 */
function mergeCreatePayload<T extends { id: number }>(
  values: StateValues<T>,
  payload: T,
): StateValues<T> {
  if (hasKey(values, payload.id)) {
    // Something has gone wrong if an existing item has the same id as the newly created one.
    throw new Error(
      "Cannot create new item as an existing item shares the same id. Try refreshing the whole index.",
    );
  }
  return {
    ...values,
    [payload.id]: {
      value: payload,
      error: undefined,
      status: "fulfilled",
      pendingCount: 0,
    },
  };
}

/**
 * Updates values in response to UPDATE START action.
 * - Throws error if item being updated does not exist.
 * - Otherwise updates metadata for updated item
 * @param values
 * @param action
 */
function mergeUpdateStart<T extends { id: number }>(
  values: StateValues<T>,
  action: UpdateStartAction<T>,
): StateValues<T> {
  if (!hasKey(values, action.meta.id)) {
    throw new Error(
      "Cannot update an item that doesn't exist yet. Maybe you tried to update an item after deleting it?",
    );
  }
  return {
    ...values,
    [action.meta.id]: {
      // TODO: if we wanted to do an optimistic update, we could save action.payload.item here.
      // But we would need some way to reverse it if it failed.
      ...values[action.meta.id],
      status: "pending",
      pendingCount: values[action.meta.id].pendingCount + 1,
      error: undefined,
    },
  };
}
/**
 * Updates values in response to UPDATE FULFILLED action.
 * - Throws error if item being updated does not exist.
 * - Otherwise updates metadata for updated item and overwrites value with payload.
 * @param values
 * @param action
 */
function mergeUpdateFulfill<T extends { id: number }>(
  values: StateValues<T>,
  action: UpdateFulfillAction<T>,
): StateValues<T> {
  if (!hasKey(values, action.meta.id)) {
    throw new Error(
      "Cannot update an item that doesn't exist yet. Maybe you tried to update an item after deleting it?",
    );
  }
  return {
    ...values,
    [action.meta.id]: {
      value: action.payload,
      status:
        values[action.meta.id].pendingCount <= 1 ? "fulfilled" : "pending",
      pendingCount: decrement(values[action.meta.id].pendingCount),
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
function mergeUpdateReject<T extends { id: number }>(
  values: StateValues<T>,
  action: UpdateRejectAction<T>,
): StateValues<T> {
  if (!hasKey(values, action.meta.id)) {
    return values;
  }
  return {
    ...values,
    [action.meta.id]: {
      ...values[action.meta.id],
      status: values[action.meta.id].pendingCount <= 1 ? "rejected" : "pending",
      pendingCount: decrement(values[action.meta.id].pendingCount),
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
function mergeDeleteStart<T extends { id: number }>(
  values: StateValues<T>,
  action: DeleteStartAction,
): StateValues<T> {
  if (!hasKey(values, action.meta.id)) {
    return values;
  }
  return {
    ...values,
    [action.meta.id]: {
      ...values[action.meta.id],
      status: "pending",
      pendingCount: values[action.meta.id].pendingCount + 1,
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
function mergeDeleteFulfill<T extends { id: number }>(
  values: StateValues<T>,
  action: DeleteFulfillAction,
): StateValues<T> {
  return deleteProperty(values, action.meta.id);
}

/**
 * Updates values in response to DELETE REJECTED action.
 * Updates metadata for item if it exists.
 *
 * Does not throw an error if item does not exist, as there are plausible scenarios (eg mupliple queued DELETE requests) that could cause this.
 * @param values
 * @param action
 */
function mergeDeleteReject<T extends { id: number }>(
  values: StateValues<T>,
  action: DeleteRejectAction,
): StateValues<T> {
  if (!hasKey(values, action.meta.id)) {
    return values;
  }
  return {
    ...values,
    [action.meta.id]: {
      ...values[action.meta.id],
      status: values[action.meta.id].pendingCount <= 1 ? "rejected" : "pending",
      pendingCount: decrement(values[action.meta.id].pendingCount),
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
export function reducer<T extends { id: number }>(
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
    case ActionTypes.deleteFulfill:
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
