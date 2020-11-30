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
import { identity } from "../../helpers/queries";
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

export function useResourceIndex<T extends { id: number }>(
  endpoint: string,
  overrides?: {
    initialValue?: T[]; // Defaults to an empty list.
    forceInitialRefresh: boolean; // If you set an initialValue but also want to refresh immediately, set this to true.
    parseIndexResponse?: (response: Json) => T[]; // Defaults to the identity function.
    parseEntityResponse?: (response: Json) => T; // Defaults to the identity function.
    resolveEntityEndpoint?: (baseEndpoint: string, id: number) => string; // Defaults to appending '/id' to baseEndpoint. Used for update (PUT) and delete (DELETE) requests.
    resolveCreateEndpoint?: (baseEndpoint: string, newEntity: T) => string; // Defaults to identical to endpoint. Used for create (POST) requests.
    handleError?: (error: Error | FetchError) => void;
  },
): {
  values: IndexedObject<T>;
  indexStatus: ResourceStatus;
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
  const entityStatus = useMemo(() => statusSelector(state), [state]);

  const create = useCallback(
    async (newValue: T): Promise<T> => {
      dispatch({
        type: ActionTypes.CreateStart,
        meta: { item: newValue },
      });
      let json: Json;
      try {
        json = await postRequest(
          resolveCreateEndpoint(endpoint, newValue),
          newValue,
        ).then(processJsonResponse);
      } catch (error) {
        if (isSubscribed.current) {
          dispatch({
            type: ActionTypes.CreateReject,
            payload: error,
            meta: { item: newValue },
          });
        }
        handleError(error);
        throw error;
      }
      const entity = parseEntityResponse(json) as T;
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
    let json: Json;
    try {
      json = await getRequest(endpoint).then(processJsonResponse);
    } catch (error) {
      if (isSubscribed.current) {
        dispatch({
          type: ActionTypes.IndexReject,
          payload: error,
        });
      }
      handleError(error);
      throw error;
    }
    const index = parseIndexResponse(json) as T[];
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
      let json: Json;
      try {
        json = await putRequest(
          resolveEntityEndpoint(endpoint, newValue.id),
          newValue,
        ).then(processJsonResponse);
      } catch (error) {
        if (isSubscribed.current) {
          dispatch({
            type: ActionTypes.UpdateReject,
            payload: error,
            meta,
          });
        }
        handleError(error);
        throw error;
      }
      const value = parseEntityResponse(json) as T;
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
        }
        handleError(error);
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
      refresh();
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
    entityStatus,
    create,
    refresh,
    update,
    deleteResource,
  };
}

export default useResourceIndex;
