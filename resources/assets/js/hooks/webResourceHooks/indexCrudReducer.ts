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
 * @param num
 */
function decrement(num: number): number {
  return num <= 0 ? 0 : num - 1;
}

function mergeItem<T extends { id: number }>(
  values: StateValues<T>,
  item: T,
): StateValues<T> {
  if (hasKey(values, item.id)) {
    // We leave the status and count as is, in case an update or delete is in progress for this item.
    return {
      ...values,
      [item.id]: {
        ...values[item.id],
        value: item,
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
function mergeIndexPayload<T extends { id: number }>(
  values: StateValues<T>,
  payload: T[],
): StateValues<T> {
  // Update or create a values entry for each item in the payload.
  const newValues = payload.reduce(mergeItem, values);
  // Delete any values entries that don't exist in the new payload.
  const payloadIds = payload.map(getId);
  return filterObjectProps(newValues, (item) =>
    payloadIds.includes(item.value.id),
  );
}

function mergeCreatePayload<T extends { id: number }>(
  values: StateValues<T>,
  payload: T,
): StateValues<T> {
  if (hasKey(values, payload.id)) {
    // Something has gone wrong if an existing item has the same id as the newly created one.
    // TODO: But should we throw the error, or just update the value and pretend everything's ok?
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
        values[action.meta.id].pendingCount === 1 ? "fulfilled" : "pending",
      pendingCount: decrement(values[action.meta.id].pendingCount),
      error: undefined,
    },
  };
}
function mergeUpdateReject<T extends { id: number }>(
  values: StateValues<T>,
  action: UpdateRejectAction<T>,
): StateValues<T> {
  if (!hasKey(values, action.meta.id)) {
    // In this case, the request has already errored, so don't throw an error.
    // Simply leave the state as is.
    return values;
  }
  return {
    ...values,
    [action.meta.id]: {
      ...values[action.meta.id],
      status: values[action.meta.id].pendingCount === 1 ? "error" : "pending",
      pendingCount: decrement(values[action.meta.id].pendingCount),
      error: action.payload,
    },
  };
}
function mergeDeleteStart<T extends { id: number }>(
  values: StateValues<T>,
  action: DeleteStartAction,
): StateValues<T> {
  if (!hasKey(values, action.meta.id)) {
    // If the item already doesn't exist, nothing needs to be done.
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
function mergeDeleteFulfill<T extends { id: number }>(
  values: StateValues<T>,
  action: DeleteFulfillAction,
): StateValues<T> {
  return deleteProperty(values, action.meta.id);
}
function mergeDeleteReject<T extends { id: number }>(
  values: StateValues<T>,
  action: DeleteRejectAction,
): StateValues<T> {
  if (!hasKey(values, action.meta.id)) {
    // If the item already doesn't exist, nothing needs to be done, despite the error.
    return values;
  }
  return {
    ...values,
    [action.meta.id]: {
      ...values[action.meta.id],
      status: values[action.meta.id].pendingCount === 1 ? "error" : "pending",
      pendingCount: decrement(values[action.meta.id].pendingCount),
      error: action.payload,
    },
  };
}

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
          status: state.indexMeta.pendingCount === 1 ? "fulfilled" : "pending",
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
          status: state.indexMeta.pendingCount === 1 ? "rejected" : "pending",
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
          status: state.createMeta.pendingCount === 1 ? "fulfilled" : "pending",
          pendingCount: decrement(state.createMeta.pendingCount),
          error: undefined,
        },
        values: mergeCreatePayload(state.values, action.payload),
      };
    case ActionTypes.CreateReject:
      return {
        ...state,
        createMeta: {
          status: state.createMeta.pendingCount === 1 ? "rejected" : "pending",
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
