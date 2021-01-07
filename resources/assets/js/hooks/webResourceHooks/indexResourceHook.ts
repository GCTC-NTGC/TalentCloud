import {
  Reducer,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import {
  deleteRequest,
  FetchError,
  getRequest,
  postRequest,
  processJsonResponse,
  putRequest,
} from "../../helpers/httpRequests";
import { hasKey, identity } from "../../helpers/queries";
import indexCrudReducer, {
  initializeState,
  ResourceState,
  ActionTypes,
  AsyncAction,
} from "./indexCrudReducer";
import { Json, ResourceStatus } from "./types";

type IndexedObject<T> = {
  [id: number]: T;
};

function valuesSelector<T extends { id: number }>(
  state: ResourceState<T>,
): IndexedObject<T> {
  return Object.values(state.values).reduce(
    (collection: IndexedObject<T>, item) => {
      collection[item.value.id] = item.value;
      return collection;
    },
    {},
  );
}
function statusSelector<T extends { id: number }>(
  state: ResourceState<T>,
): IndexedObject<ResourceStatus> {
  // If the entire index is being refreshed, then each individual item should be considered "pending".
  const forcePending = state.indexMeta.status === "pending";
  return Object.values(state.values).reduce(
    (collection: IndexedObject<ResourceStatus>, item) => {
      collection[item.value.id] = forcePending ? "pending" : item.status;
      return collection;
    },
    {},
  );
}

// Defining these functions outside of the hook, despite their simplicity,
// so they remain constant between re-renders.

function defaultEntityEndpoint(baseEndpoint: string, id: number): string {
  return `${baseEndpoint}/${id}`;
}

function defaultCreateEndpoint(baseEndpoint: string): string {
  return baseEndpoint;
}

function doNothing(): void {
  /* do nothing */
}

// The value dispatched to the reducer must have an id, or the reducer cannot place it correctly.
function isValidEntity(value: any): boolean {
  return hasKey(value, "id");
}

function isValidEntityList(value: any): boolean {
  return Array.isArray(value) && value.every(isValidEntity);
}

export const UNEXPECTED_FORMAT_ERROR =
  "Response from server was not expected format";

export function useResourceIndex<T extends { id: number }>(
  endpoint: string, // API endpoint that returns a list of T.
  overrides?: {
    initialValue?: T[]; // Defaults to an empty list. If this is overriden, initial fetch is skipped (unless forceInitialRefresh is set to true).
    forceInitialRefresh?: boolean; // If you set an initialValue but also want to refresh immediately, set this to true.
    parseIndexResponse?: (response: Json) => T[]; // Defaults to the identity function.
    parseEntityResponse?: (response: Json) => T; // Defaults to the identity function.
    resolveEntityEndpoint?: (baseEndpoint: string, id: number) => string; // Defaults to appending '/id' to baseEndpoint. Used for update (PUT) and delete (DELETE) requests.
    resolveCreateEndpoint?: (baseEndpoint: string, newEntity: T) => string; // Defaults to identical to endpoint. Used for create (POST) requests.
    handleError?: (error: Error | FetchError) => void;
  },
): {
  values: IndexedObject<T>;
  indexStatus: ResourceStatus; // The state of any requests to reload the entire index.
  createStatus: ResourceStatus; // If ANY create requests are in progress, this is 'pending'. Otherwise, it is 'fulfilled' or 'rejected' depending on the last request to complete.
  entityStatus: IndexedObject<ResourceStatus>; // Note that if indexStatus is 'pending', every entity status will also be 'pending'.
  create: (newValue: T) => Promise<T>;
  refresh: () => Promise<T[]>; // Reloads the entire index.
  update: (newValue: T) => Promise<T>;
  deleteResource: (id: number) => Promise<void>;
} {
  const initialValue = overrides?.initialValue ?? [];
  const doInitialRefresh =
    overrides?.initialValue === undefined ||
    overrides?.forceInitialRefresh === true;
  const parseIndexResponse = overrides?.parseIndexResponse ?? identity;
  const parseEntityResponse = overrides?.parseEntityResponse ?? identity;
  const resolveEntityEndpoint =
    overrides?.resolveEntityEndpoint ?? defaultEntityEndpoint;
  const resolveCreateEndpoint =
    overrides?.resolveCreateEndpoint ?? defaultCreateEndpoint;
  const handleError = overrides?.handleError ?? doNothing;

  const isSubscribed = useRef(true);

  const [state, dispatch] = useReducer<
    Reducer<ResourceState<T>, AsyncAction<T>>,
    T[] // This represent type of initialValue, passed to initializeState to create initial state.
  >(indexCrudReducer, initialValue, initializeState);

  const values = useMemo(() => valuesSelector(state), [state]);
  const indexStatus = state.indexMeta.status;
  const createStatus = state.createMeta.status;
  const entityStatus = useMemo(() => statusSelector(state), [state]);

  const create = useCallback(
    async (newValue: T): Promise<T> => {
      dispatch({
        type: ActionTypes.CreateStart,
        meta: { item: newValue },
      });
      let entity: T;
      try {
        const json = await postRequest(
          resolveCreateEndpoint(endpoint, newValue),
          newValue,
        ).then(processJsonResponse);
        entity = parseEntityResponse(json);
        if (!isValidEntity(entity)) {
          throw new Error(UNEXPECTED_FORMAT_ERROR);
        }
      } catch (error) {
        if (isSubscribed.current) {
          dispatch({
            type: ActionTypes.CreateReject,
            payload: error,
            meta: { item: newValue },
          });
          handleError(error);
        }
        throw error;
      }
      if (isSubscribed.current) {
        dispatch({
          type: ActionTypes.CreateFulfill,
          payload: entity,
          meta: { item: newValue },
        });
      }
      return entity;
    },
    [endpoint, resolveCreateEndpoint, parseEntityResponse, handleError],
  );

  const refresh = useCallback(async (): Promise<T[]> => {
    dispatch({
      type: ActionTypes.IndexStart,
    });
    let index: T[];
    try {
      const json = await getRequest(endpoint).then(processJsonResponse);
      index = parseIndexResponse(json);
      if (!isValidEntityList(index)) {
        throw new Error(UNEXPECTED_FORMAT_ERROR);
      }
    } catch (error) {
      if (isSubscribed.current) {
        dispatch({
          type: ActionTypes.IndexReject,
          payload: error,
        });
        handleError(error);
      }
      throw error;
    }
    if (isSubscribed.current) {
      dispatch({
        type: ActionTypes.IndexFulfill,
        payload: index,
      });
    }
    return index;
  }, [endpoint, parseIndexResponse, handleError]);

  const update = useCallback(
    async (newValue: T): Promise<T> => {
      const meta = { id: newValue.id, item: newValue };
      dispatch({
        type: ActionTypes.UpdateStart,
        meta,
      });
      let value: T;
      try {
        const json = await putRequest(
          resolveEntityEndpoint(endpoint, newValue.id),
          newValue,
        ).then(processJsonResponse);
        value = parseEntityResponse(json);
        if (!isValidEntity(value)) {
          throw new Error(UNEXPECTED_FORMAT_ERROR);
        }
      } catch (error) {
        if (isSubscribed.current) {
          dispatch({
            type: ActionTypes.UpdateReject,
            payload: error,
            meta,
          });
          handleError(error);
        }
        throw error;
      }
      if (isSubscribed.current) {
        dispatch({
          type: ActionTypes.UpdateFulfill,
          payload: value,
          meta,
        });
      }
      return value;
    },
    [endpoint, resolveEntityEndpoint, parseEntityResponse, handleError],
  );

  const deleteResource = useCallback(
    async (id: number): Promise<void> => {
      dispatch({
        type: ActionTypes.DeleteStart,
        meta: { id },
      });
      try {
        const response = await deleteRequest(
          resolveEntityEndpoint(endpoint, id),
        );
        if (!response.ok) {
          throw new FetchError(response);
        }
      } catch (error) {
        if (isSubscribed.current) {
          dispatch({
            type: ActionTypes.DeleteReject,
            payload: error,
            meta: { id },
          });
          handleError(error);
        }
        throw error;
      }
      if (isSubscribed.current) {
        dispatch({
          type: ActionTypes.deleteFulfill,
          meta: { id },
        });
      }
    },
    [endpoint, resolveEntityEndpoint, handleError],
  );

  // Despite the usual guidlines, this should only be reconsidered if endpoint changes.
  // Changing doInitialRefresh after the first run (or refresh) should not cause this to rerun.
  useEffect(() => {
    if (doInitialRefresh) {
      refresh().catch(doNothing);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  // Unsubscribe from promises when this hook is unmounted.
  useEffect(() => {
    return (): void => {
      isSubscribed.current = false;
    };
  }, []);

  return {
    values,
    indexStatus,
    createStatus,
    entityStatus,
    create,
    refresh,
    update,
    deleteResource,
  };
}

export default useResourceIndex;
